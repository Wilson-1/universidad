Atomicidad (Atomicity)

- La matriculación se ejecuta como una sola transacción: verificación de estudiante activo, comprobación de cupo, creación de inscripción y decremento de cupo. Si alguna operación falla se revierte todo, evitando estados parciales.

Consistencia (Consistency)

- Las reglas de negocio (p. ej. no matricular estudiantes inactivos, no permitir cupos negativos) se aplican dentro de la transacción, de modo que la base de datos siempre pasa de un estado válido a otro válido.

Aislamiento (Isolation)

- Cuando varios estudiantes intentan matricular simultáneamente, la transacción usará el aislamiento provisto por el gestor (Postgres) para evitar condiciones de carrera al decrementar `cupo`. Uso de transacciones asegura que cada operación no vea cambios intermedios de otras transacciones.

Durabilidad (Durability)

- Una vez que la transacción se confirma, los cambios (inscripción y nuevo cupo) quedan persistidos en la base de datos. Esto asegura que la información de matrícula no se pierda ante fallos.

Conclusión

- El proceso de matriculación implementado utiliza transacciones para garantizar atomicidad y consistencia, confía en las garantías de aislamiento del SGBD para evitar condiciones de carrera y en la durabilidad del sistema para persistir los cambios importantes.
