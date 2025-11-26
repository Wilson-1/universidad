#  Universidad Backend

API REST modular desarrollada con **NestJS**, **Prisma** y **PostgreSQL**, que gestiona la información de docentes, estudiantes, materias, ciclos, carreras e inscripciones.

---

##  Propósito

Desarrollar una **API REST modular** con NestJS y Prisma que exponga endpoints `GET` para todas las tablas del modelo de datos y, como mínimo, la estructura funcional del `POST` para crear registros en cada recurso principal.

---

##  Resultados de Aprendizaje

- Configurar un proyecto NestJS con Prisma y una base de datos PostgreSQL.  
- Implementar controladores y servicios con buenas prácticas (DTOs, validación, manejo de errores).  
- Exponer endpoints `GET` (listar y obtener por id) para todas las tablas.  
- Implementar `POST` básico (DTO + validación + servicio + respuesta estandarizada).  

---

##  Modelo de Datos

El modelo de datos incluye las siguientes entidades:

- **Carrera** – Contiene la información de las carreras universitarias.  
- **Ciclo** – Representa los ciclos académicos asociados a una carrera.  
- **Estudiante** – Almacena los datos de los estudiantes y su relación con la carrera y ciclo.  
- **Docente** – Contiene los docentes con su especialidad y relación con carrera.  
- **Materia** – Materias dictadas por los docentes, pertenecientes a una carrera.  
- **Inscripción** – Relación entre estudiantes y materias, con notas y ciclo académico.

---

##  Requisitos Técnicos

- **NestJS** v10+  
- **Prisma** v5+  
- **TypeScript**  
- **PostgreSQL**  
- **class-validator** y **class-transformer** para validaciones  
- **dotenv** para manejo de variables de entorno  

---

##  Estructura del Proyecto

```plaintext
universidad-backend/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── src/
│   ├── carrera/
│   ├── ciclo/
│   ├── docente/
│   ├── estudiante/
│   ├── materia/
│   ├── inscripcion/
│   ├── prisma/
│   └── main.ts
│
├── .env
├── package.json
└── README.md

```

---

##  Comandos para Crear el Proyecto

```bash
# 1️⃣ Crear el proyecto base
nest new universidad-backend

# 2️⃣ Instalar dependencias
cd universidad-backend
npm install @nestjs/config @nestjs/class-validator @nestjs/class-transformer
npm install @prisma/client
npm install prisma --save-dev

# 3️⃣ Inicializar Prisma
npx prisma init

# 4️⃣ Crear migración inicial
npx prisma migrate dev --name init

# 5️⃣ Generar módulos CRUD
nest g resource carrera
nest g resource ciclo
nest g resource docente
nest g resource estudiante
nest g resource materia
nest g resource inscripcion

```

##  Variables de Entorno (.env)

```
DATABASE_URL="postgresql://user:password@localhost:5432/universidad?schema=public"
PORT=3000
```
##  Ejecución del Proyecto

```
npm run start:dev
```

##  Scripts útiles

- Crear migración
```
npx prisma migrate dev --name init
```

- Visualizar base de datos
```
npx prisma studio
```

---

## Autenticación (JWT) — Instrucciones rápidas

1. Añadimos un modelo `User` en `prisma/schema.prisma`. Para aplicar los cambios ejecuta:

```powershell
npx prisma migrate dev --name add_user
npx prisma generate
```

2. Crear un usuario inicial (ejemplo usando el script incluido):

```powershell
npx ts-node scripts/seed-user.ts --email admin@uni.com --password secret --name Admin
```

3. Iniciar el servidor:

```powershell
npm run start:dev
```

4. Login (obtén el token):

POST `http://localhost:3000/auth/login`

Body JSON:

```json
{
	"email": "admin@uni.com",
	"password": "secret"
}
```

Respuesta:

```json
{ "access_token": "..." }
```

5. Usar el token para llamadas protegidas (`Authorization: Bearer <token>`). Ejemplo: `POST /carrera` ahora requiere un JWT válido.


- Formatear el código
```
npm run format
```

- Verificar errores de lint
```
npm run lint
```

##  Autor

**Wilson Criollo**  
Proyecto académico — *Sistema de Control Universitario*  
Desarrollado con **NestJS**, **Prisma** y **PostgreSQL**
