# 👥 Credenciales de Estudiantes para Pruebas

## Usuarios Disponibles en la Base de Datos

### 📚 Estudiantes

#### 1️⃣ Estudiante Principal
```
Email:    estudiante@universidad.com
Password: password123
Rol:      student
Nombre:   Estudiante Principal
```

### 👨‍🏫 Profesor

#### 2️⃣ Profesor Principal
```
Email:    profesor@universidad.com
Password: password123
Rol:      teacher
Nombre:   Profesor Principal
```

### 🔐 Administrador

#### 3️⃣ Administrador del Sistema
```
Email:    admin@universidad.com
Password: password123
Rol:      admin
Nombre:   Administrador Sistema
```

---

## 📋 Datos de Estudiantes Académicos

### Estudiantes en el Sistema (Base de datos Universidad)

| ID | Nombre | Apellido | Email | Carrera | Ciclo | Estado |
|----|--------|----------|-------|---------|-------|--------|
| 1 | Juan | Pérez | juan.perez@estudiante.com | Ingeniería en Sistemas | 1 | Activo |
| 2 | María | López | maria.lopez@estudiante.com | Ingeniería en Sistemas | 1 | Activo |
| 3 | Carlos | García | carlos.garcia@estudiante.com | Administración de Empresas | 1 | Activo |
| 4 | Ana | Martínez | ana.martinez@estudiante.com | Derecho | 1 | Activo |
| 5 | Roberto | Sánchez | roberto.sanchez@estudiante.com | Ingeniería en Sistemas | 2 | Activo |
| 6 | Laura | Rodríguez | laura.rodriguez@estudiante.com | Administración de Empresas | 1 | Activo |

---

## 🔄 Cómo Usar en Postman

### Opción 1: Login como Estudiante
1. Abre Postman
2. Ve a **Auth → Login**
3. Cambia el email a: `estudiante@universidad.com`
4. Cambia la contraseña a: `password123`
5. Presiona **Send**
6. El token se guardará automáticamente

### Opción 2: Login como Profesor
1. Cambia el email a: `profesor@universidad.com`
2. Contraseña: `password123`

### Opción 3: Login como Admin
1. Cambia el email a: `admin@universidad.com`
2. Contraseña: `password123`

---

## 📊 Curls de Prueba Rápida

### Login y obtener token
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "estudiante@universidad.com",
    "password": "password123"
  }'
```

### Obtener carreras (con token)
```bash
curl -X GET http://localhost:3000/carrera \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Ver estudiantes activos (con token)
```bash
curl -X GET http://localhost:3000/estudiante/active-with-career \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Buscar estudiante por nombre
```bash
curl -X GET "http://localhost:3000/estudiante/search?nombre=Juan" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🎯 Flujo Recomendado de Pruebas

### Paso 1: Autenticación
- Login con `estudiante@universidad.com`
- Guarda el token

### Paso 2: Explorar Académico
- Obtener carreras disponibles
- Ver ciclos de cada carrera
- Listar materias por carrera

### Paso 3: Ver Inscripciones
- Revisar inscripciones del estudiante
- Ver notas y progreso

### Paso 4: Reportes
- Crear reporte académico
- Crear reporte de carrera
- Ver estadísticas

### Paso 5: Consultas Avanzadas
- Buscar estudiantes por nombre
- Buscar docentes por especialidad
- Ver profesores con múltiples materias

---

## ⚡ Contraseña Común

**Todos los usuarios comparten la misma contraseña:**
```
password123
```

---

## 🔑 Permisos por Rol

| Acción | Admin | Profesor | Estudiante |
|--------|-------|----------|-----------|
| Crear Carrera | ✅ | ❌ | ❌ |
| Editar Carrera | ✅ | ❌ | ❌ |
| Ver Reportes | ✅ | ✅ | ✅ |
| Ver Propias Inscripciones | ✅ | ✅ | ✅ |
| Crear Reportes | ✅ | ✅ | ✅ |

---

## 📌 Notas Importantes

1. **Los tokens expiran en 7 días**
   - Si expira, vuelve a hacer login

2. **Cambiar contraseña**
   - Actualmente no hay endpoint, puedes modificar en DB directamente

3. **Crear nuevos usuarios**
   - Solo el admin puede crear nuevos usuarios (implementar en futuro)

4. **Pruebas de rol**
   - Intenta hacer acciones de admin con cuenta de estudiante para ver restricciones

---

## 🆘 Troubleshooting

**Error: "Invalid credentials"**
- Verifica que el email y password sean exactos
- La contraseña es: `password123`

**Error: "Authorization required"**
- No copiaste el token correctamente
- Intenta login de nuevo

**Error: "Token expired"**
- Haz login de nuevo para obtener un nuevo token

---

## 📱 JSON para Postman Body

### Login Student
```json
{
  "email": "estudiante@universidad.com",
  "password": "password123"
}
```

### Login Teacher
```json
{
  "email": "profesor@universidad.com",
  "password": "password123"
}
```

### Login Admin
```json
{
  "email": "admin@universidad.com",
  "password": "password123"
}
```
