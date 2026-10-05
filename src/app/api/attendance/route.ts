import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { getAttendanceDayRange } from "@/lib/attendance-date";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type AttendanceRequest = {
  courseId: number;
  teacherId: number;
  presentStudentIds: number[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseRequest(value: unknown): AttendanceRequest | null {
  if (!isRecord(value)) {
    return null;
  }

  const { courseId, teacherId, presentStudentIds } = value;
  if (
    typeof courseId !== "number" ||
    !Number.isSafeInteger(courseId) ||
    Number(courseId) <= 0 ||
    typeof teacherId !== "number" ||
    !Number.isSafeInteger(teacherId) ||
    Number(teacherId) <= 0 ||
    !Array.isArray(presentStudentIds) ||
    !presentStudentIds.every(
      (id) =>
        typeof id === "number" && Number.isSafeInteger(id) && Number(id) > 0,
    ) ||
    new Set(presentStudentIds).size !== presentStudentIds.length
  ) {
    return null;
  }

  return {
    courseId: Number(courseId),
    teacherId: Number(teacherId),
    presentStudentIds: presentStudentIds.map(Number),
  };
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "El contenido de la solicitud no es JSON válido." },
      { status: 400 },
    );
  }

  const input = parseRequest(body);
  if (!input) {
    return NextResponse.json(
      { error: "Los datos de asistencia son inválidos o están incompletos." },
      { status: 400 },
    );
  }

  const createdAt = new Date();
  const { start, end } = getAttendanceDayRange(createdAt);

  try {
    const attendance = await prisma.$transaction(async (transaction) => {
      const lockedCourses = await transaction.$queryRaw<{ id: number }[]>`
        SELECT id
        FROM courses
        WHERE id = ${input.courseId}
        FOR UPDATE
      `;

      if (lockedCourses.length === 0) {
        return { error: "No se encontró el curso seleccionado.", status: 404 } as const;
      }

      const [course, teacher] = await Promise.all([
        transaction.course.findUnique({
          where: { id: input.courseId },
          include: { students: { select: { id: true } } },
        }),
        transaction.teacher.findUnique({
          where: { id: input.teacherId },
          select: { id: true },
        }),
      ]);

      if (!course) {
        return { error: "No se encontró el curso seleccionado.", status: 404 } as const;
      }

      if (!teacher) {
        return { error: "No se encontró el docente seleccionado.", status: 404 } as const;
      }

      if (course.students.length === 0) {
        return {
          error: "No se puede registrar asistencia para un curso sin estudiantes.",
          status: 400,
        } as const;
      }

      const courseStudentIds = new Set(course.students.map((student) => student.id));
      if (
        input.presentStudentIds.some((studentId) => !courseStudentIds.has(studentId))
      ) {
        return {
          error: "La selección contiene estudiantes que no pertenecen a este curso.",
          status: 400,
        } as const;
      }

      const existingAttendance = await transaction.attendanceRecord.findFirst({
        where: {
          courseId: input.courseId,
          createdAt: { gte: start, lt: end },
        },
        select: { id: true },
      });

      if (existingAttendance) {
        return {
          error: "Ya existe una toma de asistencia para este curso durante el día de hoy.",
          status: 409,
        } as const;
      }

      const presentStudentIds = new Set(input.presentStudentIds);
      const record = await transaction.attendanceRecord.create({
        data: {
          teacherId: input.teacherId,
          courseId: input.courseId,
          createdAt,
          details: {
            create: course.students.map((student) => ({
              studentId: student.id,
              present: presentStudentIds.has(student.id),
            })),
          },
        },
        select: { id: true, createdAt: true },
      });

      return { record, status: 201 } as const;
    });

    if ("error" in attendance) {
      return NextResponse.json(
        { error: attendance.error },
        { status: attendance.status },
      );
    }

    return NextResponse.json(
      {
        id: attendance.record.id,
        createdAt: attendance.record.createdAt.toISOString(),
      },
      { status: attendance.status },
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2003") {
        return NextResponse.json(
          { error: "Los datos seleccionados ya no existen. Actualiza la página e inténtalo de nuevo." },
          { status: 400 },
        );
      }

      if (error.code === "P2034" || error.code === "P2002") {
        return NextResponse.json(
          { error: "La asistencia de este curso ya fue registrada hoy." },
          { status: 409 },
        );
      }
    }

    console.error("No se pudo guardar la toma de asistencia:", error);
    return NextResponse.json(
      { error: "No se pudo guardar la asistencia. Inténtalo de nuevo." },
      { status: 500 },
    );
  }
}
