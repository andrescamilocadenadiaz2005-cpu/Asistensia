# Memoria del proyecto

## Estado

Las fases 0 a 5 estan completadas.

* Stack configurado: Next.js, TypeScript, Tailwind CSS, shadcn/ui, Prisma y MySQL con Docker.
* MySQL se publica en el puerto local `3307`; el esquema de `attendance_db` esta aplicado con Prisma.
* La interfaz dispone de inicio, cursos, estudiantes, toma de asistencia e historial.
* La toma guarda docente, curso, fecha/hora y el estado de todos los estudiantes del curso.
* La regla acordada es una toma por curso y dia, delimitada por la fecha local de Bogota (`America/Bogota`).
* No ejecutar el seed sin autorizacion: el script elimina y recrea filas.

## Verificaciones finales

* `npm run build` finalizo correctamente.
* `npx prisma validate` confirmo que el esquema es valido.
* Se probaron los limites de fecha diaria de Bogota.
* Se completo un flujo end-to-end temporal desde la interfaz hasta el guardado y la consulta en el historial.
* Un segundo envio para el mismo curso y dia fue rechazado con HTTP 409.
* Se verificaron asociaciones, conteos de presentes/ausentes, detalles y ausencia de duplicados u orfandad.
* Se comprobo la navegacion responsive en viewport movil de 390 px.
* Las filas y entidades temporales de QA se eliminaron. Los registros existentes se conservaron sin cambios.
* `npm run lint` muestra el asistente interactivo de configuracion de ESLint porque no hay configuracion definida; no se agrego una configuracion nueva en esta fase.

## Siguiente paso

La implementacion descrita en `PRD.md` y las fases de `TASKS.md` esta terminada. No hay trabajo pendiente de las fases actuales.
