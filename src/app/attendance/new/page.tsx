import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ClipboardCheck } from "lucide-react";
import { AttendanceChecklist } from "@/components/attendance-checklist";
import { attendanceTimeZone, getAttendanceDayRange } from "@/lib/attendance-date";
import { prisma } from "@/lib/prisma";

type NewAttendancePageProps = {
  searchParams: { courseId?: string };
};

export default async function NewAttendancePage({
  searchParams,
}: NewAttendancePageProps) {
  const requestedCourseId = Number(searchParams.courseId);
  const hasCourseId =
    Number.isSafeInteger(requestedCourseId) && requestedCourseId > 0;

  const [course, teachers] = await Promise.all([
    hasCourseId
      ? prisma.course.findUnique({
          where: { id: requestedCourseId },
          include: { students: { orderBy: { name: "asc" } } },
        })
      : prisma.course.findFirst({
          orderBy: { name: "asc" },
          include: { students: { orderBy: { name: "asc" } } },
        }),
    prisma.teacher.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (hasCourseId && !course) {
    notFound();
  }

  if (!course) {
    return (
      <div className="page-stack">
        <header className="page-heading">
          <div>
            <span className="eyebrow">Nueva toma</span>
            <h1>Preparar asistencia</h1>
            <p>Para iniciar, debe existir al menos un curso registrado.</p>
          </div>
        </header>
        <div className="content-card empty-state">
          <span className="empty-icon">
            <ClipboardCheck aria-hidden="true" size={22} />
          </span>
          <h2>No hay cursos disponibles</h2>
          <p>Cuando haya cursos registrados, podrás pasar lista desde aquí.</p>
          <Link className="button button-primary" href="/courses">
            Volver a cursos
          </Link>
        </div>
      </div>
    );
  }

  const { start, end } = getAttendanceDayRange();
  const todaysAttendance = await prisma.attendanceRecord.findFirst({
    where: {
      courseId: course.id,
      createdAt: { gte: start, lt: end },
    },
    include: { teacher: true },
  });

  return (
    <div className="page-stack">
      <header className="page-heading page-heading-compact">
        <div>
          <Link className="back-link" href="/courses">
            <ArrowLeft aria-hidden="true" size={16} />
            Volver a cursos
          </Link>
          <span className="eyebrow">Nueva toma de asistencia</span>
          <h1>{course.name}</h1>
          <p>Marca los estudiantes presentes y revisa el resumen antes de finalizar.</p>
        </div>
        <span className="count-pill">{course.students.length} estudiantes</span>
      </header>

      {todaysAttendance ? (
        <section className="content-card review-panel" aria-live="polite">
          <span className="review-icon">
            <ClipboardCheck aria-hidden="true" size={28} />
          </span>
          <span className="eyebrow">Asistencia registrada hoy</span>
          <h2>Ya se pasó lista para este curso</h2>
          <p>
            {course.name} tiene una toma registrada por{" "}
            <strong>{todaysAttendance.teacher.name}</strong> a las{" "}
            {new Intl.DateTimeFormat("es-CO", {
              timeZone: attendanceTimeZone,
              dateStyle: "medium",
              timeStyle: "short",
            }).format(todaysAttendance.createdAt)}
            . Podrás registrar una nueva asistencia mañana.
          </p>
          <div className="review-actions">
            <Link className="button button-secondary" href="/courses">
              <ArrowLeft aria-hidden="true" size={16} />
              Volver a cursos
            </Link>
            <Link className="button button-primary" href="/attendance">
              Ver historial
            </Link>
          </div>
        </section>
      ) : teachers.length === 0 ? (
        <div className="content-card empty-state">
          <span className="empty-icon">
            <ClipboardCheck aria-hidden="true" size={22} />
          </span>
          <h2>No hay docentes registrados</h2>
          <p>Se necesita un docente para asociarlo a la toma de asistencia.</p>
        </div>
      ) : course.students.length === 0 ? (
        <div className="content-card empty-state">
          <span className="empty-icon">
            <ClipboardCheck aria-hidden="true" size={22} />
          </span>
          <h2>Este curso no tiene estudiantes</h2>
          <p>No es posible preparar una toma de asistencia sin estudiantes.</p>
        </div>
      ) : (
        <AttendanceChecklist
          course={{ id: course.id, name: course.name }}
          selectedTeacherId={teachers[0].id}
          students={course.students.map(({ id, name }) => ({ id, name }))}
          teachers={teachers}
        />
      )}
    </div>
  );
}
