# PRD - Sistema Web de Registro de Asistencia

## 1. Problema

Actualmente, el registro de asistencia puede realizarse mediante métodos manuales que requieren que el docente marque individualmente a los estudiantes y posteriormente conserve o entregue el registro obtenido.

El proyecto busca implementar una aplicación web sencilla que permita digitalizar este proceso mediante un listado predefinido de estudiantes. El docente podrá registrar la asistencia de cada estudiante durante la toma de asistencia y, al finalizar, confirmar y almacenar el registro junto con la información correspondiente al curso, docente, fecha y hora.

El sistema también permitirá consultar los registros de asistencia realizados para un grupo, facilitando la visualización de cuándo se realizó cada toma de asistencia.

---

## 2. Usuarios

### 2.1 Docente

El usuario principal del sistema será el docente encargado de realizar la toma de asistencia.

El docente podrá:

* Visualizar el listado de estudiantes correspondiente a un curso.
* Marcar los estudiantes que se encuentren presentes.
* Revisar el estado de asistencia antes de finalizar el registro.
* Finalizar y guardar la toma de asistencia.
* Consultar los registros de asistencia realizados para el grupo.

No se contemplan diferentes tipos de usuarios ni distintos niveles de permisos.

---

## 3. Objetivo

Desarrollar una aplicación web que permita al docente registrar y almacenar de forma sencilla la asistencia de los estudiantes de un curso, reemplazando el registro manual por un proceso digital que conserve la información de cada toma de asistencia, incluyendo el docente responsable, el curso, la fecha y la hora en que fue registrada.

El sistema deberá proporcionar además una consulta básica de los registros de asistencia del grupo.

---

## 4. Alcance

El proyecto será una aplicación web de alcance reducido y propósito específico, centrada exclusivamente en el proceso de toma y consulta de asistencia.

El sistema contará con una base de datos relacional pequeña, diseñada para almacenar la información necesaria para:

* Docentes.
* Estudiantes.
* Cursos.
* Registros de asistencia.
* Relación entre estudiantes y registros de asistencia.

La aplicación permitirá realizar el flujo completo de una toma de asistencia:

1. Seleccionar o cargar el curso correspondiente.
2. Visualizar el listado predefinido de estudiantes.
3. Marcar los estudiantes presentes.
4. Finalizar la toma de asistencia.
5. Registrar la asistencia en la base de datos.
6. Asociar el registro con el docente, curso, fecha y hora.
7. Consultar posteriormente los registros realizados para el grupo.

El proyecto no pretende convertirse en un sistema de gestión académica general. Su propósito se limita al registro y consulta básica de asistencia.

---

## 5. Funciones principales

### 5.1 Visualización del listado

El sistema deberá mostrar al docente un listado predefinido de estudiantes pertenecientes al curso seleccionado.

Cada estudiante deberá aparecer de forma identificable y contar con un mecanismo para indicar si estuvo presente.

### 5.2 Registro de asistencia

El docente podrá marcar como presentes a los estudiantes durante la toma de asistencia.

El sistema deberá mantener el estado de asistencia mientras el docente completa el listado.

### 5.3 Finalización de la toma de asistencia

Una vez revisado el listado, el docente podrá finalizar la toma de asistencia.

Al finalizar, el sistema deberá guardar el registro correspondiente en la base de datos.

El registro deberá incluir como mínimo:

* Docente responsable.
* Curso.
* Estudiantes registrados como presentes.
* Fecha de la toma de asistencia.
* Hora de la toma de asistencia.

La fecha y hora deberán corresponder al momento en que se finaliza y registra la toma de asistencia.

### 5.4 Consulta de asistencia del grupo

El sistema deberá permitir consultar los registros de asistencia correspondientes al grupo.

La consulta deberá mostrar, como mínimo:

* Fecha de la toma de asistencia.
* Hora de la toma de asistencia.
* Información del curso.
* Docente responsable.

La consulta tendrá como finalidad permitir identificar cuándo se realizaron las diferentes tomas de asistencia.

---

## 6. Flujos principales

### Flujo 1: Realizar una toma de asistencia

1. El docente ingresa a la aplicación.
2. El sistema muestra el curso y su listado de estudiantes.
3. El docente revisa el listado.
4. El docente marca como presentes a los estudiantes correspondientes.
5. El docente revisa el estado del listado.
6. El docente selecciona la opción para finalizar la toma de asistencia.
7. El sistema valida la información.
8. El sistema registra la toma de asistencia en la base de datos.
9. El sistema registra la fecha y hora de finalización.
10. El sistema confirma que la asistencia fue almacenada correctamente.

### Flujo 2: Consultar registros de asistencia

1. El docente accede a la consulta de asistencia del grupo.
2. El sistema obtiene los registros almacenados.
3. El sistema muestra las tomas de asistencia realizadas.
4. Cada registro muestra la fecha y hora correspondiente y la información básica del curso y docente.

### Flujo 3: Validación antes de guardar

Antes de almacenar una toma de asistencia, el sistema deberá comprobar que la información necesaria sea válida.

Si existe información incompleta, inconsistente o inválida, el sistema deberá impedir el registro y mostrar un mensaje que permita identificar el problema.

---

## 7. Datos necesarios

### Docente

* Identificador.
* Nombre.

### Estudiante

* Identificador.
* Nombre.
* Identificador del curso al que pertenece.

### Curso

* Identificador.
* Nombre o identificación del curso.

### Registro de asistencia

* Identificador.
* Identificador del docente.
* Identificador del curso.
* Fecha.
* Hora.

### Detalle de asistencia

* Identificador del registro de asistencia.
* Identificador del estudiante.
* Estado de asistencia.

La estructura definitiva de las tablas y sus relaciones será determinada durante la implementación de la base de datos, respetando los datos y restricciones establecidos en este documento.

---

## 8. Criterios de aceptación

El proyecto será considerado funcionalmente aceptado cuando cumpla, como mínimo, con los siguientes criterios:

### Interfaz

* La aplicación deberá ser responsiva y poder utilizarse correctamente en diferentes tamaños de pantalla.
* El listado de estudiantes deberá ser claro y permitir identificar fácilmente el estado de asistencia.
* Las acciones principales deberán ser comprensibles para el usuario.

### Registro de información

* Una toma de asistencia finalizada deberá almacenarse correctamente.
* Cada registro deberá conservar el docente, curso, fecha y hora correspondientes.
* La asistencia de los estudiantes deberá quedar asociada al registro de asistencia correcto.
* No deberán generarse registros duplicados como consecuencia de una misma acción.
* Los datos obligatorios no deberán almacenarse como valores nulos o vacíos.
* Las relaciones entre docentes, estudiantes, cursos y registros de asistencia deberán mantener coherencia.

### Consulta

* Los registros almacenados deberán poder consultarse posteriormente.
* La consulta deberá mostrar correctamente la fecha y hora de cada toma de asistencia.
* Los datos mostrados deberán corresponder a los registros almacenados en la base de datos.

### Integridad

* El sistema deberá impedir el almacenamiento de información que incumpla las restricciones definidas para los datos.
* Las operaciones deberán producir resultados coherentes con las acciones realizadas por el docente.
* La aplicación no deberá presentar errores que impidan completar el flujo principal de toma de asistencia.

---

## 9. Fuera de alcance

Las siguientes funcionalidades no forman parte de este proyecto:

* Sistema de roles y permisos.
* Login o autenticación de usuarios.
* Recuperación de contraseñas.
* Verificación en dos pasos.
* Cualquier otro mecanismo de autenticación o verificación de identidad.
* Gestión académica completa.
* Gestión de notas.
* Gestión de horarios.
* Creación y administración de cuentas.
* Gestión completa de cursos.
* Gestión administrativa de estudiantes.
* Reportes académicos avanzados.
* Notificaciones.
* Integración con sistemas académicos externos.
* Aplicación móvil independiente.
* Funciones de reconocimiento facial, códigos QR u otros mecanismos alternativos de identificación.
* Arquitecturas distribuidas o servicios independientes que no sean necesarios para cumplir el objetivo del proyecto.
* Funcionalidades no especificadas explícitamente en este documento.

---

## 10. Restricción de alcance

El desarrollo deberá mantenerse limitado a las funcionalidades descritas en este documento.

La aparición de una necesidad o idea adicional durante la implementación no implicará automáticamente su incorporación al proyecto. Cualquier modificación del alcance deberá ser definida explícitamente antes de su implementación.

Si una decisión necesaria para implementar una funcionalidad no está especificada en este documento y puede afectar el comportamiento del sistema, deberá solicitarse una definición antes de proceder.
