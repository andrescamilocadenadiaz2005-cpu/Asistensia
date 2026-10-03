# Memoria del proyecto

## Estado actual

La base de datos del proyecto quedó levantada con Docker y la estructura inicial quedó aplicada con Prisma.

Se confirmó lo siguiente:

* Node.js y npm están disponibles en el entorno local.
* Next.js, TypeScript, Tailwind CSS y shadcn/ui quedaron configurados.
* Prisma quedó configurado y generado correctamente.
* El contenedor MySQL quedó corriendo en el puerto `3307`.
* La migración inicial quedó aplicada sobre la base de datos `attendance_db`.
* El seed de datos de prueba quedó ejecutado con un docente, un curso, seis estudiantes y un registro de asistencia de ejemplo.
* La aplicación compila y responde en modo desarrollo en `http://localhost:3000`.

## Cambios realizados

* Se creó la estructura inicial del esquema Prisma con docentes, cursos, estudiantes, registros y detalles de asistencia.
* Se generó la migración inicial de la base de datos.
* Se cargó un seed con datos de prueba coherentes con el PRD.
* Se dejó configurado el acceso a la base de datos en local para continuar con la capa de interfaz y lógica de negocio.

## Siguiente paso recomendado

Continuar con la implementación de la interfaz de usuario y la lógica de asistencia según la fase 3 y 4 del proyecto.
