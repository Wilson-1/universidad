# Guía de Pruebas con Postman - Universidad API

## 📋 Descripción

Esta colección de Postman contiene todos los endpoints de la API de gestión universitaria con 3 bases de datos separadas:

- **Universidad**: Datos académicos (carreras, ciclos, materias, estudiantes, docentes)
- **Usuarios**: Autenticación y gestión de usuarios
- **Reportes**: Analytics y reportes

## 🚀 Cómo Importar la Colección

1. Abre **Postman**
2. Click en **Import** (arriba a la izquierda)
3. Selecciona el archivo `universidad-api-2026.postman_collection.json`
4. También importa `Universidad-Environment.postman_environment.json`

## 🔑 Pasos Iniciales

### 1. Selecciona el Environment
- En la esquina superior derecha, busca el selector de Environment
- Selecciona **"Universidad - Development"**

### 2. Haz Login Primero
- Ve a la carpeta **Auth** → **Login**
- El token se guardará automáticamente en la variable `{{token}}`
- Este token se usa en todos los demás endpoints

**Credenciales de prueba:**
```json
{
  "email": "student1@universidad.com",
  "password": "password123"
}
```

## 📊 Estructura de la Colección

### Auth 🔐
- `POST /auth/login` - Obtener JWT token

### Carreras 🎓
- `GET /carrera` - Obtener todas las carreras
- `GET /carrera/:id` - Obtener carrera por ID
- `GET /carrera/nombre/:nombre` - Buscar por nombre
- `POST /carrera` - Crear nueva carrera

### Ciclos 📅
- `GET /ciclo` - Obtener todos los ciclos
- `GET /ciclo/:id` - Obtener ciclo por ID
- `POST /ciclo` - Crear nuevo ciclo

### Materias 📚
- `GET /materia/by-carrera/:carreraId` - Materias de una carrera

### Estudiantes 👨‍🎓
- `GET /estudiante/active-with-career` - Estudiantes activos
- `GET /estudiante/search?nombre=...` - Buscar estudiantes
- `POST /estudiante` - Crear estudiante

### Docentes 👨‍🏫
- `GET /docente/multiple-subjects` - Docentes con múltiples materias
- `GET /docente/search?nombre=...` - Buscar docentes

### Inscripciones 📝
- `GET /inscripcion/student/:id/ciclo/:ciclo` - Inscripciones del estudiante
- `GET /inscripcion/report` - Reporte de inscripciones
- `POST /inscripcion/enroll` - Inscribir estudiante a materia

### Reportes 📈
- `POST /reportes/academico` - Crear reporte académico
- `GET /reportes/academico` - Obtener reportes académicos
- `POST /reportes/docente` - Crear reporte de docente
- `GET /reportes/docente` - Obtener reportes de docentes
- `POST /reportes/carrera` - Crear reporte de carrera
- `GET /reportes/carrera` - Obtener reportes de carreras
- `GET /reportes/estadisticas` - Obtener estadísticas

## 🧪 Datos de Prueba Disponibles

Después de ejecutar `npm run seed`, tienes datos precargados:

### Estudiantes
- email: `student1@universidad.com` password: `password123`
- email: `student2@universidad.com` password: `password123`

### Carreras
1. Ingeniería en Sistemas
2. Administración de Empresas
3. Derecho

### Ciclos
1. Primero (Carrera 1)
2. Segundo (Carrera 1)
3. Primero (Carrera 2)
4. Primero (Carrera 3)

### Estudiantes (6 totales)
- Juan Pérez, María López, Carlos García, etc.

## 💡 Tips

1. **El token expira en 7 días** - Si expira, vuelve a hacer login
2. **Usa {{token}}** en la cabecera Authorization - Se llena automáticamente
3. **Variables disponibles**:
   - `{{baseUrl}}` - http://localhost:3000
   - `{{token}}` - JWT token (se llena al hacer login)
   - `{{userId}}` - ID del usuario (se llena al hacer login)

## 🔍 Ejemplo de Flujo Completo

1. **Login** (`POST /auth/login`)
   ```json
   {
     "email": "student1@universidad.com",
     "password": "password123"
   }
   ```

2. **Obtener carreras** (`GET /carrera`)
   - Usa el token que acabas de obtener

3. **Obtener ciclos** (`GET /ciclo`)
   - Verifica los ciclos disponibles

4. **Ver inscripciones** (`GET /inscripcion/report`)
   - Mira todas las inscripciones del sistema

5. **Crear reporte académico** (`POST /reportes/academico`)
   - Genera un nuevo reporte con datos de ejemplo

## ⚙️ Base de Datos

El API usa 3 bases de datos PostgreSQL en Neon:

| BD | Propósito | Schema |
|----|-----------|--------|
| Universidad | Académicos | universidad |
| Usuarios | Auth | usuarios |
| Reportes | Analytics | reportes |

## 🐛 Troubleshooting

**Error: "Authorization required"**
- Asegúrate de haber hecho login primero
- Verifica que el token esté en la cabecera `Authorization: Bearer <token>`

**Error: "Invalid token"**
- El token ha expirado, vuelve a hacer login
- Comprueba que el environment correcto está seleccionado

**Error: "Record not found"**
- Los IDs pueden variar según los datos semilla
- Intenta primero `GET /carrera` para ver los IDs disponibles

## 📞 Contacto

Para preguntas sobre los endpoints, revisa:
- Documentación de la API: `/docs`
- Logs del servidor: Terminal donde ejecutaste `npm run start:dev`
