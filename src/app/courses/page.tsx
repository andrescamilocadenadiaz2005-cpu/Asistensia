import Link from "next/link";
import { ArrowRight, BookOpen, Users } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    include: { _count: { select: { students: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <div className="page-stack">
      <header className="page-heading">
        <div>
          <span className="eyebrow">Tus grupos</span>
          <h1>Cursos</h1>
          <p>Consulta tus cursos y prepara la asistencia de cada grupo.</p>
        </div>
        <span className="count-pill">
          {courses.length} {courses.length === 1 ? "curso" : "cursos"}
        </span>
      </header>

      {courses.length > 0 ? (
        <section aria-label="Cursos disponibles" className="course-grid">
          {courses.map((course, index) => (
            <article className="course-card" key={course.id}>
              <div className="course-card-top">
                <span className={`course-symbol course-symbol-${index % 4}`}>
                  <BookOpen aria-hidden="true" size={21} />
                </span>
                <span className="course-kicker">CURSO {String(index + 1).padStart(2, "0")}</span>
              </div>
              <h2>{course.name}</h2>
              <div className="course-meta">
                <Users aria-hidden="true" size={16} />
                <span>
                  {course._count.students}{" "}
                  {course._count.students === 1 ? "estudiante" : "estudiantes"}
                </span>
              </div>
              <div className="course-actions">
                <Link className="text-link" href="/students">
                  Ver listado <ArrowRight aria-hidden="true" size={15} />
                </Link>
                <Link
                  aria-label={`Preparar asistencia para ${course.name}`}
                  className="icon-action"
                  href={`/attendance/new?courseId=${course.id}`}
                >
                  <ArrowRight aria-hidden="true" size={17} />
                </Link>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <div className="content-card empty-state">
          <span className="empty-icon">
            <BookOpen aria-hidden="true" size={22} />
          </span>
          <h2>Aún no hay cursos</h2>
          <p>Cuando existan cursos registrados, aparecerán aquí.</p>
        </div>
      )}
    </div>
  );
}
