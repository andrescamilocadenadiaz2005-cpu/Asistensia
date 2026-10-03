import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.attendanceDetail.deleteMany();
  await prisma.attendanceRecord.deleteMany();
  await prisma.student.deleteMany();
  await prisma.course.deleteMany();
  await prisma.teacher.deleteMany();

  const teacher = await prisma.teacher.create({
    data: {
      name: "Ana Gómez",
    },
  });

  const course = await prisma.course.create({
    data: {
      name: "Programación I - Sección A",
    },
  });

  const students = await Promise.all(
    [
      "Carlos Ruiz",
      "María López",
      "Diego Torres",
      "Valentina Morales",
      "Sofía García",
      "Mateo Pérez",
    ].map((name) =>
      prisma.student.create({
        data: {
          name,
          courseId: course.id,
        },
      }),
    ),
  );

  const record = await prisma.attendanceRecord.create({
    data: {
      teacherId: teacher.id,
      courseId: course.id,
      details: {
        create: students.map((student, index) => ({
          studentId: student.id,
          present: index % 2 === 0,
        })),
      },
    },
  });

  console.log(`Seed listo: docente ${teacher.name}, curso ${course.name}, registro ${record.id}, estudiantes ${students.length}.`);
}

main()
  .catch((error) => {
    console.error("Error al sembrar la base de datos:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
