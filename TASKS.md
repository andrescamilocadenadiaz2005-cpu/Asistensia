# TASKS - Sistema Web de Registro de Asistencia

## Fase 0 - Entorno

- [x] Configurar el entorno de desarrollo del proyecto.
- [x] Configurar Node.js y npm.
- [x] Inicializar el proyecto con Next.js.
- [x] Configurar TypeScript.
- [x] Configurar Tailwind CSS.
- [x] Configurar shadcn/ui.
- [x] Configurar Prisma ORM.
- [x] Configurar MySQL mediante Docker.
- [x] Configurar las variables de entorno necesarias.
- [x] Configurar Git y `.gitignore`.
- [x] Verificar que el entorno pueda ejecutar el proyecto correctamente.

---

## Fase 1 - Documentacion

- [x] Crear y revisar `README.md`.
- [x] Crear y revisar `PRD.md`.
- [x] Crear y revisar `RULES.md`.
- [x] Crear este archivo `TASKS.md`.
- [x] Verificar que la documentacion sea coherente entre so.
- [x] Verificar que la IA utilice `PRD.md`, `RULES.md` y `TASKS.md` (este archivo) como referencia durante el desarrollo.

---

## Fase 2 - Base de datos

- [x] Definir la estructura de las tablas necesarias.
- [x] Definir las relaciones entre las tablas.
- [x] Definir las restricciones de integridad de los datos.
- [x] Configurar el esquema de Prisma.
- [x] Crear las migraciones de la base de datos.
- [x] Definir los datos iniciales de prueba.
- [x] Crear el seed de la base de datos.
- [x] Verificar la estructura y relaciones de la base de datos.
- [x] Verificar que los datos de prueba sean coherentes con el PRD.

---

## Fase 3 - Interfaz de usuario

- [x] Crear la estructura principal de la aplicacion (incluye botones que permitan ir a las vistas de cursos, listado de estudiantes y registro de asistencias).
- [x] Crear la vista del curso y listado de estudiantes.
- [x] Implementar el control visual para marcar la asistencia.
- [x] Implementar la visualizacion del estado de cada estudiante.
- [x] Crear la accion de interfaz para revisar y finalizar la toma de asistencia.
- [x] Crear la vista de consulta de registros de asistencia.
- [x] Aplicar Tailwind CSS y los componentes necesarios de shadcn/ui.
- [x] Implementar el diseño responsive.
- [x] Verificar que la interfaz corresponda con las funciones definidas en `PRD.md`.

Nota: el guardado efectivo de la toma de asistencia y su persistencia en la base de datos corresponden a la Fase 4.

---

## Fase 4 - Logica e integracion

- [x] Implementar la obtencion del curso y sus estudiantes.
- [x] Implementar el registro de asistencia.
- [x] Implementar el almacenamiento de la fecha y hora de la toma de asistencia.
- [x] Asociar correctamente docente, curso, registro de asistencia y estudiantes.
- [x] Implementar la consulta de registros de asistencia.
- [x] Implementar las validaciones necesarias.
- [x] Integrar la interfaz, la logica de aplicacion y la base de datos.
- [x] Implementar la proteccion contra registros duplicados o datos incoherentes: una toma por curso al dia.

Nota: el flujo positivo end-to-end y la verificacion de integridad se completaron en la Fase 5 usando entidades de QA temporales, que fueron eliminadas al terminar. Los registros existentes se conservaron.

---

## Fase 5 - Verificacion final

- [x] Verificar el flujo completo de toma de asistencia.
- [x] Verificar el flujo de consulta de asistencia.
- [x] Verificar la integridad de los datos almacenados.
- [x] Verificar la ausencia de registros duplicados.
- [x] Verificar que los datos obligatorios no sean nulos o vacios.
- [x] Verificar el comportamiento responsive.
- [x] Verificar los criterios de aceptacion definidos en `PRD.md`.
- [x] Corregir los errores encontrados sin modificar el alcance del proyecto.
- [x] Actualizar `MEMORY.md` (archivo de memoria del proyecto) con el estado final.
- [x] Actualizar `TASKS.md` (este archivo) indicando las tareas completadas.

Verificacion realizada con `npm run build`, `npx prisma validate`, comprobaciones de limites de fecha de Bogota y una prueba end-to-end temporal de guardado, consulta y rechazo de duplicados. Los datos temporales de QA se eliminaron de forma especifica; los registros existentes se conservaron. `npm run lint` requiere configurar ESLint de forma interactiva y no se cambio esa configuracion durante esta fase.
