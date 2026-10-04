import Link from "next/link";
import { ArrowRight, BookOpen, ClipboardCheck, Users } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [courseCount, studentCount, attendanceCount, latestAttendance] =
    await Promise.all([
      prisma.course.count(),
      prisma.student.count(),
      prisma.attendanceRecord.count(),
      prisma.attendanceRecord.findFirst({
        orderBy: { createdAt: "desc" },
        include: { course: true, teacher: true },
      }),
    ]);

  const cards = [
    {
      label: "Cursos disponibles",
      value: courseCount,
      icon: BookOpen,
      href: "/courses",
      tone: "mint",
    },
    {
      label: "Estudiantes",
      value: studentCount,
      icon: Users,
      href: "/students",
      tone: "blue",
    },
    {
      label: "Tomas registradas",
      value: attendanceCount,
      icon: ClipboardCheck,
      href: "/attendance",
      tone: "gold",
    },
  ];

  return (
    <div className="page-stack">
      <section className="welcome-panel">
        <div className="welcome-copy">
          <span className="eyebrow">Panel principal</span>
          <h1>Tu clase, presente.</h1>
          <p>
            Revisa tus cursos, encuentra a tus estudiantes y prepara la toma de
            asistencia del grupo.
          </p>
          <Link className="button button-light" href="/courses">
            Ver cursos <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>
        <div className="welcome-art" aria-hidden="true">
          <div className="art-sun" />
          <div className="art-card art-card-back" />
          <div className="art-card art-card-front">
            <span className="art-check">✓</span>
            <span className="art-line art-line-long" />
            <span className="art-line" />
            <span className="art-line art-line-short" />
          </div>
          <span className="art-dot art-dot-one" />
          <span className="art-dot art-dot-two" />
        </div>
      </section>

      <section aria-label="Resumen" className="stats-grid">
        {cards.map(({ label, value, icon: Icon, href, tone }) => (
          <Link className="stat-card" href={href} key={label}>
            <div className={`stat-icon stat-icon-${tone}`}>
              <Icon aria-hidden="true" size={19} />
            </div>
            <div className="stat-detail">
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
            <ArrowRight aria-hidden="true" className="stat-arrow" size={18} />
          </Link>
        ))}
      </section>

      <section className="dashboard-bottom">
        <div className="content-card quick-actions">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Accesos rápidos</span>
              <h2>¿Qué necesitas hacer?</h2>
            </div>
          </div>
          <div className="action-list">
            <Link className="action-row" href="/attendance/new">
              <span className="action-icon action-icon-green">
                <ClipboardCheck aria-hidden="true" size={19} />
              </span>
              <span className="action-text">
                <strong>Preparar asistencia</strong>
                <small>Marca quién está presente hoy</small>
              </span>
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <Link className="action-row" href="/students">
              <span className="action-icon action-icon-blue">
                <Users aria-hidden="true" size={19} />
              </span>
              <span className="action-text">
                <strong>Consultar estudiantes</strong>
                <small>Revisa los listados de tus cursos</small>
              </span>
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>
        </div>

        <div className="content-card latest-card">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Actividad</span>
              <h2>Última toma</h2>
            </div>
            <Link className="text-link" href="/attendance">
              Ver todas
            </Link>
          </div>
          {latestAttendance ? (
            <div className="latest-entry">
              <div className="latest-mark">
                <ClipboardCheck aria-hidden="true" size={20} />
              </div>
              <div className="latest-info">
                <strong>{latestAttendance.course.name}</strong>
                <span>
                  {latestAttendance.teacher.name} ·{" "}
                  {new Intl.DateTimeFormat("es-CO", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(latestAttendance.createdAt)}
                </span>
              </div>
            </div>
          ) : (
            <div className="empty-compact">
              <span className="empty-icon">
                <ClipboardCheck aria-hidden="true" size={20} />
              </span>
              <p>Aún no hay tomas de asistencia.</p>
              <Link className="text-link" href="/attendance/new">
                Preparar la primera
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
