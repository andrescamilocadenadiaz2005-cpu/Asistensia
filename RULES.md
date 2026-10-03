# RULES - Reglas de desarrollo del proyecto

Este documento define las reglas que el agente de IA deberá seguir durante todo el desarrollo del proyecto.

Las reglas de este documento son obligatorias y deberán respetarse junto con los requisitos establecidos en `PRD.md`.

---

## 1. Regla de oro

**No ejecutar ninguna acción que modifique el entorno o los archivos del proyecto sin que el usuario lo indique explícitamente.**

Esto incluye, entre otras acciones:

* Instalar librerías o paquetes.
* Ejecutar scripts.
* Ejecutar migraciones.
* Ejecutar seeds o generar datos.
* Crear archivos.
* Modificar archivos existentes.
* Eliminar archivos.
* Sobrescribir archivos.
* Iniciar servicios.
* Ejecutar comandos de Docker.
* Ejecutar comandos relacionados con la base de datos.

El usuario ha establecido que primero se documentará y planificará el proyecto. El agente deberá esperar las indicaciones del usuario antes de ejecutar cualquier acción.

Cuando sea necesario realizar una acción para continuar, el agente deberá indicar qué acción se requiere y esperar la autorización correspondiente.

---

## 2. Cumplimiento del alcance

* El agente deberá utilizar `PRD.md` como referencia principal para determinar qué debe construirse.
* No deberá inventar requisitos o funcionalidades que no estén definidas.
* No deberá modificar el alcance del proyecto para solucionar problemas técnicos.
* No deberá incorporar funcionalidades adicionales únicamente porque puedan resultar útiles.
* Si una funcionalidad no está definida y es necesaria para continuar, deberá solicitar una definición al usuario.
* Las funcionalidades marcadas como fuera de alcance en `PRD.md` no deberán implementarse.

---

## 3. Tecnologías

* El agente deberá utilizar las tecnologías definidas para el proyecto.
* No deberá sustituir una tecnología por otra sin autorización explícita del usuario.
* No deberá introducir nuevas tecnologías, frameworks o librerías cuando no sean necesarias para cumplir el alcance.
* Las decisiones tecnológicas previamente establecidas deberán mantenerse durante el desarrollo.

El stack definido para este proyecto deberá respetarse salvo modificación explícita por parte del usuario.

---

## 4. Estructura del código

El proyecto deberá mantener una separación clara entre:

* Interfaz de usuario (UI).
* Lógica de aplicación.
* Acceso y operaciones sobre la base de datos.

El código deberá organizarse de forma que cada responsabilidad tenga una ubicación clara y no se mezclen innecesariamente las diferentes capas.

No se deberán crear abstracciones, clases, servicios o estructuras adicionales si el alcance del proyecto no las requiere.

---

## 5. Complejidad

El proyecto deberá mantenerse proporcional a su alcance.

El agente:

* No deberá sobre-diseñar la aplicación.
* No deberá crear arquitecturas innecesariamente complejas.
* No deberá introducir patrones de diseño únicamente por seguir una metodología.
* No deberá crear abstracciones prematuras.
* No deberá añadir frameworks o dependencias para resolver problemas sencillos que puedan resolverse con las herramientas ya seleccionadas.

La solución deberá ser suficientemente estructurada para mantener el proyecto organizado, pero no más compleja de lo necesario.

---

## 6. Validaciones y manejo de errores

Las validaciones y mecanismos de manejo de errores deberán estar relacionados con situaciones que puedan ocurrir realmente dentro del contexto definido en `PRD.md`.

El agente no deberá implementar validaciones, sistemas de recuperación o manejo de errores para escenarios hipotéticos que no puedan ocurrir dentro del contexto del proyecto.

Sin embargo, los errores que puedan producirse durante el funcionamiento normal de las funcionalidades definidas sí deberán corregirse adecuadamente.

El objetivo es mantener un equilibrio entre:

* Integridad de los datos.
* Funcionamiento correcto.
* Simplicidad del proyecto.

---

## 7. Archivos existentes

Antes de eliminar, reemplazar o sobrescribir un archivo que contenga código, datos, resultados o configuraciones existentes, el agente deberá solicitar confirmación al usuario.

No deberá asumir que un archivo puede eliminarse o reemplazarse porque parezca obsoleto.

Los archivos existentes deberán conservarse hasta que el usuario autorice explícitamente su modificación, eliminación o reemplazo.

---

## 8. Scripts y código ejecutable

* No ejecutar scripts de forma proactiva.
* No ejecutar código para comprobar una solución sin autorización explícita del usuario.
* No dejar scripts o código en un estado incompleto.
* Todo script que se considere terminado deberá poder ejecutarse de principio a fin sin errores.
* No considerar una implementación como terminada si contiene código deliberadamente incompleto, errores conocidos o pasos pendientes.

---

## 9. Base de datos

Las modificaciones relacionadas con la base de datos deberán realizarse únicamente cuando hayan sido definidas y autorizadas.

El agente no deberá:

* Ejecutar migraciones sin autorización.
* Ejecutar seeds sin autorización.
* Eliminar datos existentes sin autorización.
* Sobrescribir datos existentes sin autorización.
* Modificar la estructura de la base de datos para resolver problemas sin informar al usuario.
* Inventar tablas, campos o relaciones que no estén justificadas por los requisitos definidos.

La estructura de la base de datos deberá mantenerse coherente con los requisitos establecidos en `PRD.md`.

---

## 10. Datos sensibles

* No utilizar datos personales reales cuando no sean necesarios para el desarrollo.
* Utilizar datos ficticios para las pruebas y registros iniciales.
* No almacenar credenciales, contraseñas, claves API u otros secretos directamente en el código fuente.
* No compartir ni realizar commits con datos sensibles reales.
* Los archivos de configuración que contengan secretos deberán mantenerse fuera del control de versiones cuando corresponda.

---

## 11. Documentación del proyecto

El agente deberá mantener actualizada la documentación conforme avance el proyecto.

Cuando se produzca un cambio relevante en el estado del proyecto, deberá actualizarse:

* `TASKS.md`
* `MEMORY.md`

Sin embargo, estas actualizaciones deberán realizarse respetando la regla de oro: **el agente no deberá modificar dichos archivos sin que el usuario indique explícitamente que desea ejecutar o realizar esa actualización.**

La documentación deberá reflejar el estado real del proyecto y no asumir tareas como completadas si todavía no han sido realizadas.

---

## 12. Comunicación y toma de decisiones

Cuando exista una decisión que no esté definida en la documentación del proyecto, el agente deberá:

1. Identificar claramente qué decisión falta.
2. Explicar brevemente por qué es necesaria.
3. Presentar las opciones relevantes cuando corresponda.
4. Esperar la decisión del usuario cuando dicha decisión afecte al alcance, arquitectura, tecnologías o comportamiento del sistema.

El agente no deberá ocultar decisiones importantes dentro de la implementación.

---

## 13. Principio de trazabilidad

Cada funcionalidad implementada deberá poder relacionarse con un requisito definido en `PRD.md` y, cuando corresponda, con una tarea de `TASKS.md`.

No deberá existir funcionalidad implementada únicamente porque el agente consideró que "sería conveniente".

El objetivo es que pueda determinarse:

**Requisito → Tarea → Implementación → Verificación**

---

## 14. Prioridad de las reglas

En caso de conflicto entre una sugerencia del agente y las especificaciones del proyecto, deberán respetarse las especificaciones documentadas.

La prioridad será:

1. Indicaciones explícitas del usuario.
2. `PRD.md`
3. `RULES.md`
4. `TASKS.md`
5. Decisiones y documentación técnica existente.
6. Criterio del agente.

El criterio del agente no deberá utilizarse para modificar silenciosamente una decisión establecida en los niveles superiores.
