# Memoria del proyecto

## Estado actual

La base de datos del proyecto esta levantada con Docker y su estructura inicial esta aplicada con Prisma.

* Node.js y npm estan disponibles en el entorno local.
* Next.js, TypeScript, Tailwind CSS y shadcn/ui estan configurados.
* Prisma esta configurado y generado correctamente.
* MySQL esta corriendo en el puerto `3307`.
* La migracion inicial esta aplicada sobre `attendance_db`.
* Los datos iniciales fueron sembrados anteriormente. El usuario modifico despues los registros de asistencia; conservar el estado actual y no volver a ejecutar el seed sin autorizacion, ya que este elimina y recrea filas.
* La Fase 3 esta completada: interfaz principal, vistas de cursos y estudiantes, toma interactiva de asistencia e historial.
* El build de produccion y la revision responsive de las pantallas principales se completaron correctamente.

## Cambios realizados

* Se creo el esquema Prisma para docentes, cursos, estudiantes, registros y detalles de asistencia.
* Se genero y aplico la migracion inicial.
* Se implementaron las vistas de inicio, cursos, estudiantes y asistencias.
* La toma permite marcar presentes, ver el conteo y revisar un resumen antes de finalizar.
* La seleccion de asistencia todavia no persiste cambios en la base de datos.

## Siguiente paso recomendado

Continuar con la Fase 4: integrar la toma de asistencia con Prisma, persistir docente, curso, fecha, hora y estado por estudiante, e implementar la consulta de los registros almacenados. Respetar los datos de prueba actuales y no ejecutar el seed sin autorizacion.
