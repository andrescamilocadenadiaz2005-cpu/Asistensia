import Link from "next/link";
import { ArrowRight, GraduationCap, Users } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function StudentsPage() {
  const courses = await prisma.course.findMany({
    include: { students: { orderBy: { name: "asc" } } },
    orderBy: { name: "asc" },
  });
  const studentCount = courses.reduce(
    (total, course) => total + course.students.length,
    0,
  );

  return (
    <div className="page-stack">
      <header className="page-heading">
        <div>
          <span className="eyebrow">Directorio académico</span>
          <h1>Estudiantes</h1>
          <p>Los estudiantes están organizados según el curso al que pertenecen.</p>
        </div>
        <span className="count-pill">
          {studentCount} {studentCount === 1 ? "estudiante" : "estudiantes"}
        </span>
      </header>

      {courses.some((course) => course.students.length > 0) ? (
        <div className="student-course-list">
          {courses
            .filter((course) => course.students.length > 0)
            .map((course, courseIndex) => (
              <section className="content-card student-course" key={course.id}>
                <header className="student-course-heading">
                  <div className={`course-symbol course-symbol-${courseIndex % 4}`}>
                    <GraduationCap aria-hidden="true" size={20} />
                  </div>
                  <div>
                    <span className="eyebrow">Grupo</span>
                    <h2>{course.name}</h2>
                  </div>
                  <span className="count-pill count-pill-small">
                    {course.students.length}
                  </span>
                  <Link
                    aria-label={`Preparar asistencia para ${course.name}`}
                    className="icon-action"
                    href={`/attendance/new?courseId=${course.id}`}
                  >
                    <ArrowRight aria-hidden="true" size={17} />
                  </Link>
                </header>

                <ul className="student-list">
                  {course.students.map((student, index) => (
                    <li className="student-row" key={student.id}>
                      <span className={`student-avatar student-avatar-${index % 5}`}>
                        {student.name.trim().charAt(0).toLocaleUpperCase("es-CO")}
                      </span>
                      <span className="student-name">{student.name}</span>
                      <span className="student-course-label">{course.name}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
        </div>
      ) : (
        <div className="content-card empty-state">
          <span className="empty-icon">
            <Users aria-hidden="true" size={22} />
          </span>
          <h2>No hay estudiantes registrados</h2>
          <p>Los estudiantes de tus cursos aparecerán en esta lista.</p>
        </div>
      )}
    </div>
  );
}
