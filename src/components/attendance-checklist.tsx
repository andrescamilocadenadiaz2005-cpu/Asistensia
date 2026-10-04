"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, UserRound } from "lucide-react";

type AttendanceChecklistProps = {
  course: { id: number; name: string };
  students: { id: number; name: string }[];
  teachers: { id: number; name: string }[];
  selectedTeacherId: number;
};

export function AttendanceChecklist({
  course,
  students,
  teachers,
  selectedTeacherId,
}: AttendanceChecklistProps) {
  const [teacherId, setTeacherId] = useState(String(selectedTeacherId));
  const [presentIds, setPresentIds] = useState<number[]>([]);
  const [isReviewing, setIsReviewing] = useState(false);
  const presentSet = useMemo(() => new Set(presentIds), [presentIds]);
  const presentCount = presentIds.length;

  function toggleStudent(studentId: number) {
    setPresentIds((current) =>
      current.includes(studentId)
        ? current.filter((id) => id !== studentId)
        : [...current, studentId],
    );
  }

  if (isReviewing) {
    return (
      <section className="content-card review-panel" aria-live="polite">
        <span className="review-icon">
          <CheckCircle2 aria-hidden="true" size={28} />
        </span>
        <span className="eyebrow">Revisión completa</span>
        <h2>La lista está lista para finalizar</h2>
        <p>
          {presentCount} de {students.length} estudiantes aparecen como
          presentes en <strong>{course.name}</strong>. La toma está preparada
          para conectarse al guardado de base de datos en la fase de integración.
        </p>
        <div className="review-summary">
          <div>
            <span>Docente responsable</span>
            <strong>
              {teachers.find((teacher) => String(teacher.id) === teacherId)?.name}
            </strong>
          </div>
          <div>
            <span>Presentes</span>
            <strong>{presentCount}</strong>
          </div>
          <div>
            <span>Ausentes</span>
            <strong>{students.length - presentCount}</strong>
          </div>
        </div>
        <div className="review-actions">
          <button
            className="button button-secondary"
            onClick={() => setIsReviewing(false)}
            type="button"
          >
            <ArrowLeft aria-hidden="true" size={16} />
            Volver a la lista
          </button>
          <Link className="button button-primary" href="/attendance">
            Ir al historial <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div className="attendance-workspace">
      <div className="content-card checklist-card">
        <div className="checklist-heading">
          <div>
            <span className="eyebrow">Lista del curso</span>
            <h2>Marca quién está presente</h2>
          </div>
          <span className="progress-pill">
            {presentCount} <span>de {students.length} presentes</span>
          </span>
        </div>

        <div className="progress-track" aria-label={`${presentCount} de ${students.length} presentes`}>
          <span
            className="progress-fill"
            style={{
              width: `${students.length ? (presentCount / students.length) * 100 : 0}%`,
            }}
          />
        </div>

        <ul className="attendance-list">
          {students.map((student, index) => {
            const isPresent = presentSet.has(student.id);
            return (
              <li key={student.id}>
                <button
                  aria-pressed={isPresent}
                  className={`attendance-student${isPresent ? " attendance-student-present" : ""}`}
                  onClick={() => toggleStudent(student.id)}
                  type="button"
                >
                  <span className={`student-avatar student-avatar-${index % 5}`}>
                    {student.name.trim().charAt(0).toLocaleUpperCase("es-CO")}
                  </span>
                  <span className="attendance-student-name">{student.name}</span>
                  <span className={`attendance-state${isPresent ? " attendance-state-present" : ""}`}>
                    {isPresent ? "Presente" : "Marcar presente"}
                  </span>
                  <span className={`attendance-check${isPresent ? " attendance-check-active" : ""}`}>
                    {isPresent && <Check aria-hidden="true" size={15} strokeWidth={3} />}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <aside className="attendance-side">
        <div className="content-card attendance-context">
          <span className="eyebrow">Datos de la toma</span>
          <h2>{course.name}</h2>
          <div className="context-row">
            <span className="context-icon">
              <UserRound aria-hidden="true" size={17} />
            </span>
            <label htmlFor="teacher">Docente responsable</label>
          </div>
          <select
            className="teacher-select"
            id="teacher"
            onChange={(event) => setTeacherId(event.target.value)}
            value={teacherId}
          >
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </select>
          <div className="context-divider" />
          <div className="context-total">
            <span>Estudiantes del grupo</span>
            <strong>{students.length}</strong>
          </div>
          <div className="context-total">
            <span>Marcados presentes</span>
            <strong className="context-present">{presentCount}</strong>
          </div>
        </div>

        <div className="integration-note">
          <span className="integration-dot" />
          <p>
            Esta fase permite revisar la selección. El guardado de la toma se
            conectará en la fase de integración.
          </p>
        </div>
        <button
          className="button button-primary button-full"
          disabled={students.length === 0 || teachers.length === 0}
          onClick={() => setIsReviewing(true)}
          type="button"
        >
          Revisar y finalizar <ArrowRight aria-hidden="true" size={17} />
        </button>
      </aside>
    </div>
  );
}
