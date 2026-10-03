# Sistema Web de Registro de Asistencia

Aplicación web desarrollada para digitalizar el proceso de toma de asistencia de un docente. Permite visualizar un listado predefinido de estudiantes, registrar su asistencia y consultar posteriormente las tomas realizadas junto con el curso, docente, fecha y hora correspondientes.

---

## Estado actual del proyecto

El entorno base del proyecto quedó configurado y validado en el workspace actual.

Se confirmó que:

* Node.js y npm están disponibles.
* Next.js, TypeScript, Tailwind CSS y shadcn/ui quedaron configurados.
* Prisma quedó configurado y fue generado correctamente.
* MySQL quedó levantado con Docker en el puerto `3307`.
* El esquema principal de la base de datos quedó aplicado con la migración inicial.
* El seed de desarrollo quedó cargado con datos de prueba válidos.
* La aplicación compila y puede ejecutarse en modo desarrollo.

---

## Tecnologías

### Lenguaje

* **TypeScript**

### Frontend y aplicación web

* **Next.js**
* **React**
* **Tailwind CSS**
* **shadcn/ui**

### Base de datos

* **MySQL**
* **Prisma ORM**

### Entorno

* **Node.js**
* **npm**
* **Docker**
* **Git**

---

## Herramientas necesarias

Para trabajar con el proyecto se requiere tener instalado:

* Node.js
* npm
* Docker
* Git

MySQL se ejecutará mediante Docker, por lo que no es necesario mantener una instalación independiente del servidor MySQL para ejecutar la base de datos del proyecto.

---

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/andrescamilocadenadiaz2005-cpu/Asistensia.git
```

Entrar en el proyecto:

```bash
cd listado
```

Instalar las dependencias:

```bash
npm install
```

Crear el archivo de variables de entorno:

```text
.env
```

tomando como referencia:

```text
.env.example
```

Levantar la base de datos MySQL mediante Docker:

```bash
docker compose up -d
```

Ejecutar la migración inicial de Prisma:

```bash
npx prisma migrate dev --name init
```

Ejecutar el seed de datos de prueba:

```bash
npm run prisma:seed
```

---

## Variables de entorno

El proyecto utiliza variables de entorno para separar la configuración del código fuente.

El archivo `.env.example` contiene valores de ejemplo y no credenciales reales del entorno productivo.

Ejemplo:

```env
DATABASE_URL="mysql://root:root@localhost:3307/attendance_db"
```

### Variables

| Variable       | Descripción                                                      |
| -------------- | ---------------------------------------------------------------- |
| `DATABASE_URL` | Cadena de conexión utilizada por Prisma para conectarse a MySQL. |

---

## Base de datos

La aplicación utiliza **MySQL ejecutándose mediante Docker** y **Prisma** como ORM.

La estructura de datos está basada en las entidades definidas en `PRD.md`:

```text
Docente
   ¦
   +---- Registro de asistencia
                  ¦
                  +---- Curso
                  ¦
                  +---- Detalle de asistencia
                                ¦
                                +---- Estudiante
```

La estructura definitiva de las tablas, relaciones, restricciones y datos iniciales quedó definida mediante el esquema de Prisma y sus migraciones.

Los datos de prueba son ficticios y están destinados exclusivamente al desarrollo y verificación de la aplicación.

---

## Migraciones y datos iniciales

Las modificaciones de la estructura de la base de datos deben realizarse mediante Prisma.

El proyecto ya cuenta con la migración inicial generada y con un seed reproducible para datos de ejemplo.

---

## Estructura del proyecto

```text
listado/
+-- .env
+-- .env.example
+-- .gitignore
+-- README.md
+-- PRD.md
+-- RULES.md
+-- TASKS.md
+-- MEMORY.md
+-- docker-compose.yml
+-- package.json
+-- tsconfig.json
+-- next.config.mjs
+-- prisma/
¦   +-- schema.prisma
¦   +-- migrations/
¦   +-- seed.ts
+-- src/
¦   +-- app/
¦   +-- components/
¦   +-- lib/
¦   +-- ...
+-- ...
```

---

## Documentación del proyecto

El desarrollo sigue los documentos establecidos en la raíz del proyecto:

```text
PRD.md
RULES.md
TASKS.md
MEMORY.md
```

---

## Ejecución

Una vez configurado el entorno y la base de datos, la aplicación puede ejecutarse con:

```bash
npm run dev
```

La aplicación queda disponible en el entorno local de desarrollo de Next.js.
