import Link from "next/link";
import { ArrowRight, ClipboardList, Clock3, Users } from "lucide-react";
import { attendanceTimeZone } from "@/lib/attendance-date";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AttendancePage() {
  const records = await prisma.attendanceRecord.findMany({
    include: {
      course: true,
      teacher: true,
      details: { select: { present: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="page-stack">
      <header className="page-heading">
        <div>
          <span className="eyebrow">Historial del grupo</span>
          <h1>Asistencias</h1>
          <p>Consulta las tomas registradas con su curso, responsable y horario.</p>
        </div>
        <Link className="button button-primary" href="/attendance/new">
          <ClipboardList aria-hidden="true" size={17} />
          Nueva asistencia
        </Link>
      </header>

      {records.length > 0 ? (
        <section aria-label="Registros de asistencia" className="content-card history-card">
          <div className="table-scroll">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Curso</th>
                  <th>Docente</th>
                  <th>Fecha y hora</th>
                  <th>Presentes</th>
                  <th aria-label="Acción" />
                </tr>
              </thead>
              <tbody>
                {records.map((record) => {
                  const presentCount = record.details.filter(
                    (detail) => detail.present,
                  ).length;

                  return (
                    <tr key={record.id}>
                      <td>
                        <span className="table-primary">{record.course.name}</span>
                      </td>
                      <td>{record.teacher.name}</td>
                      <td>
                        <span className="date-cell">
                          <Clock3 aria-hidden="true" size={15} />
                          {new Intl.DateTimeFormat("es-CO", {
                            timeZone: attendanceTimeZone,
                            dateStyle: "medium",
                            timeStyle: "short",
                          }).format(record.createdAt)}
                        </span>
                      </td>
                      <td>
                        <span className="attendance-count">
                          <Users aria-hidden="true" size={15} />
                          {presentCount}/{record.details.length}
                        </span>
                      </td>
                      <td className="table-action-cell">
                        <ArrowRight aria-hidden="true" size={17} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <div className="content-card empty-state">
          <span className="empty-icon">
            <ClipboardList aria-hidden="true" size={22} />
          </span>
          <h2>Aún no hay asistencias</h2>
          <p>
            Cuando registres una toma, podrás consultar aquí su fecha, hora,
            curso y docente responsable.
          </p>
          <Link className="button button-primary" href="/attendance/new">
            Preparar primera asistencia <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
      )}
    </div>
  );
}
