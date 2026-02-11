# 🎓 Guía Rápida de Pruebas - Universidad API

## 🔐 CREDENCIALES PARA PRUEBAS

### Opción 1: Estudiante
```
📧 Email:    estudiante@universidad.com
🔑 Password: password123
👤 Rol:      Estudiante
```

### Opción 2: Profesor
```
📧 Email:    profesor@universidad.com
🔑 Password: password123
👤 Rol:      Profesor
```

### Opción 3: Administrador
```
📧 Email:    admin@universidad.com
🔑 Password: password123
👤 Rol:      Administrador
```

---

## 🚀 PRIMEROS PASOS

### 1. LOGIN (Obtener Token)
```
POST http://localhost:3000/auth/login

Body (JSON):
{
  "email": "estudiante@universidad.com",
  "password": "password123"
}

Response:
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 3,
    "email": "estudiante@universidad.com",
    "nombre": "Estudiante",
    "role": "student"
  }
}
```

### 2. USAR EL TOKEN
Copia el `access_token` y úsalo en todos los requests:

```
Header: Authorization
Value:  Bearer <token_aqui>
```

---

## 📚 ENDPOINTS PRINCIPALES

### 🎓 CARRERAS
```
GET  /carrera                    → Obtener todas
GET  /carrera/1                  → Obtener por ID
GET  /carrera/nombre/Ingeniería  → Obtener por nombre
POST /carrera                    → Crear nueva
```

### 📖 MATERIAS
```
GET /materia/by-carrera/1  → Materias de carrera ID 1
```

### 📅 CICLOS
```
GET  /ciclo      → Obtener todos
GET  /ciclo/1    → Obtener por ID
POST /ciclo      → Crear nuevo
```

### 👨‍🎓 ESTUDIANTES
```
GET /estudiante/active-with-career        → Activos
GET /estudiante/search?nombre=Juan        → Buscar
POST /estudiante                          → Crear
```

### 👨‍🏫 DOCENTES
```
GET /docente/multiple-subjects  → Con múltiples materias
GET /docente/search?nombre=Perez  → Buscar
```

### 📝 INSCRIPCIONES
```
GET  /inscripcion/student/1/ciclo/2024-I  → Por estudiante
GET  /inscripcion/report                  → Reporte general
POST /inscripcion/enroll                  → Inscribir
```

### 📊 REPORTES
```
POST /reportes/academico      → Crear reporte académico
GET  /reportes/academico      → Obtener reportes
POST /reportes/docente        → Crear reporte docente
GET  /reportes/docente        → Obtener reportes
POST /reportes/carrera        → Crear reporte carrera
GET  /reportes/carrera        → Obtener reportes
GET  /reportes/estadisticas   → Ver estadísticas
```

---

## 💡 EJEMPLOS DE REQUESTS

### Ejemplo 1: Obtener todas las carreras
```bash
curl -X GET http://localhost:3000/carrera \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Ejemplo 2: Crear una carrera
```bash
curl -X POST http://localhost:3000/carrera \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Ingeniería Civil",
    "duracion": 5
  }'
```

### Ejemplo 3: Buscar estudiante por nombre
```bash
curl -X GET "http://localhost:3000/estudiante/search?nombre=Juan" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Ejemplo 4: Crear estudiante
```bash
curl -X POST http://localhost:3000/estudiante \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Diego",
    "apellido": "López",
    "correo": "diego.lopez@estudiante.com",
    "carreraId": 1,
    "cicloId": 1
  }'
```

### Ejemplo 5: Crear reporte académico
```bash
curl -X POST http://localhost:3000/reportes/academico \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "estudianteId": 1,
    "nombreEstudiante": "Juan Pérez",
    "carrera": "Ingeniería en Sistemas",
    "promedio": 3.8,
    "creditosAprobados": 45,
    "creditosReprobados": 3,
    "tasaAprobacion": 0.94,
    "semestre": "2024-I"
  }'
```

---

## 📊 DATOS PRECARGADOS

### Carreras
- ✅ Ingeniería en Sistemas
- ✅ Administración de Empresas
- ✅ Derecho

### Estudiantes
- ✅ Juan Pérez (Ing. Sistemas)
- ✅ María López (Ing. Sistemas)
- ✅ Carlos García (Admin. Empresas)
- ✅ Ana Martínez (Derecho)
- ✅ Roberto Sánchez (Ing. Sistemas)
- ✅ Laura Rodríguez (Admin. Empresas)

### Docentes
- ✅ Dr. García
- ✅ Ing. Rodríguez
- ✅ Lic. Martínez
- ✅ Prof. Sánchez

---

## 🎯 FLUJO RECOMENDADO

```
1. LOGIN
   ↓
2. GET /carrera (Ver carreras disponibles)
   ↓
3. GET /ciclo (Ver ciclos)
   ↓
4. GET /estudiante/active-with-career (Ver estudiantes)
   ↓
5. GET /materia/by-carrera/1 (Ver materias)
   ↓
6. POST /inscripcion/enroll (Inscribir estudiante)
   ↓
7. POST /reportes/academico (Crear reporte)
   ↓
8. GET /reportes/estadisticas (Ver stats)
```

---

## ❌ ERRORES COMUNES

### "Authorization required"
❌ No incluiste el token
✅ Solución: Incluye `Authorization: Bearer <token>` en los headers

### "Invalid token"  
❌ El token expiró (7 días)
✅ Solución: Haz login de nuevo

### "Record not found"
❌ El ID no existe
✅ Solución: Verifica primero con GET para ver IDs válidos

### "Validation error"
❌ Falta un campo en el body
✅ Solución: Revisa los ejemplos arriba

---

## 🌐 URL BASE
```
http://localhost:3000
```

## 🔑 HEADERS REQUERIDOS
```
Content-Type: application/json
Authorization: Bearer <YOUR_TOKEN>
```

---

## 📞 SOPORTE

**¿Token expirado?**
→ Login de nuevo

**¿Endpoint no funciona?**
→ Verifica el método (GET/POST) y la URL

**¿Necesitas otros datos?**
→ Ejecuta `npm run seed` para recargar datos

---

## 🎓 ESTRUCTURA DE BASES DE DATOS

```
📦 UNIVERSIDAD DB
   ├─ Carreras (3)
   ├─ Ciclos (4)
   ├─ Estudiantes (6)
   ├─ Docentes (4)
   ├─ Materias
   └─ Inscripciones (8)

📦 USUARIOS DB
   ├─ Users (3)
   ├─ Tokens
   ├─ Permisos (3)
   └─ RolPermisos (4)

📦 REPORTES DB
   ├─ ReportesAcademicos
   ├─ ReportesDocentes
   ├─ ReportesCarrera
   └─ Estadísticas
```

---

✅ **¡Todo listo para empezar a probar!** 🚀
