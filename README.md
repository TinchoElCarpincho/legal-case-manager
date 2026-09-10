# ⚖️ LexFlow — Plataforma Integral de Gestión de Casos Legales

**LexFlow** es una plataforma web moderna e intuitiva diseñada para abogados y estudios jurídicos. Integra una experiencia visual inspirada en catálogos de e-commerce para la gestión de expedientes, junto con un sistema de notificaciones de plazos, calendario de audiencias y un panel diario de tareas críticas.

---

## 🚀 Características Principales

### 1. 🛍️ Dashboard Estilo E-Commerce (Catálogo de Casos)
- **Visualización en Grilla (Grid) de Tarjetas (Cards)**: Diseñada con métricas claras y alta legibilidad:
  - **Título del Caso & N° de Expediente** (ej. *EXP-8492/2026*).
  - **Badges de Estado con código de color**: *Abierto*, *En mediación*, *En juicio*, *Cerrado*.
  - **Próximo Vencimiento / Audiencia**: Fechas con indicador dinámico de urgencia (*¡Vence HOY!*, *Vence MAÑANA*, *En 3 días*, *Vencido*).
  - **Honorarios & Badge Interactivo de Pago**: Muestra el monto pactado e incluye un botón de 1 clic para alternar entre **Pagado** y **Pendiente**.
  - **Acceso a Expediente**: Modal completo con descripción de estrategia, partes intervinientes, bitácora de notas y eventos vinculados.

### 2. 📝 Carga Manual de Casos (Formulario Modal)
- Incluye todos los campos obligatorios requeridos:
  - **Título** del caso.
  - **Descripción detallada** (fundamentos, hechos, pretensión).
  - **Estado del caso** (*Abierto*, *En mediación*, *En juicio*, *Cerrado*).
  - **Honorarios** (monto numérico con formato monetario).
  - **Estado de pago** (Toggle / Checkbox interactivo *Pagado* vs *Pendiente*).
- Campos procesales adicionales: Cliente / Representado, Demandado, N° de Expediente, Fuero/Materia (Laboral, Civil, Familia, Penal, etc.), Juzgado y Próximo Hito Procesal.

### 3. 🔍 Filtros y Organización Avanzada
- **Búsqueda en tiempo real**: Por título de caso, cliente, demandado o N° de expediente.
- **Filtro por Estado del Caso**: Todos, Abierto, En mediación, En juicio, Cerrado.
- **Filtro por Estado de Pago**: Todos, Pagados, Pendientes.
- **Filtro por Rango de Fechas**: Todos, Vence Hoy, Próximos 7 días, Este mes, Vencidos.
- **Ordenamiento Inteligente**: Por urgencia de vencimiento, mayor honorario, menor honorario, título A-Z o fecha de alta.

### 4. 🔔 Sistema de Notificaciones Judiciales
- Ícono de campana en la barra superior con **contador de notificaciones no leídas** animado.
- Desplegable con alertas de:
  - Audiencias inminentes (< 24hs).
  - Vencimientos de plazos perentorios.
  - Alertas de cobro de honorarios pendientes.
  - Altas de nuevos expedientes.
- Clic directo para abrir el expediente relacionado y botón para **Marcar todas como leídas**.

### 5. 📅 Calendario Judicial Integrado
- Vista mensual interactiva con navegación mes a mes y botón directo a **Hoy**.
- Marcadores de actos procesales diferenciados por color:
  - 🔵 **Audiencia**
  - 🔴 **Vencimiento de Plazo**
  - 🟢 **Presentación de Pruebas**
  - 🟡 **Mediación Judicial**
  - 🟣 **Alegatos / Peritaje**
- **Panel lateral de eventos del día seleccionado**: Permite ver detalle de hora, juzgado, notas, marcar como cumplido o agendar un nuevo evento vinculado.

### 6. ✅ Lista de Tareas y Pendientes Diarios
- Panel lateral en el Dashboard y vista dedicada de **"Casos del Día & Acciones Pendientes"**.
- Muestra las audiencias y plazos perentorios de la fecha.
- Checklist interactivo de tareas con checkbox tachado al completar.
- Carga rápida de nuevas tareas con asignación de prioridad (Alta, Media, Baja) y vinculación a un caso.

### 7. 💾 Persistencia y Datos de Prueba (Mock Data)
- **Mock Data Realista**: Precargada con casos habituales (Derecho Laboral, Daños y Perjuicios, Divorcio, Ejecución Comercial, Penal Tributario, Sucesiones).
- **Persistencia en LocalStorage**: Cualquier cambio (nuevos casos, cambios de pago, eventos o tareas completadas) se guarda automáticamente en el navegador.
- **Botón de Reset**: Botón en la barra de navegación para restaurar los datos iniciales en cualquier momento.

---

## 🛠️ Tecnologías Utilizadas

- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Vite 8** (Build ultra rápido en < 500ms)
- **Lucide Icons** (Iconografía moderna y profesional)

---

## 💻 Instrucciones de Uso y Ejecución

El proyecto está listo en `/home/lautaro/legal-case-manager`.

### Iniciar servidor de desarrollo:
```bash
cd /home/lautaro/legal-case-manager
npm run dev
```
Acceso: `http://localhost:5173`

### Compilar para producción:
```bash
npm run build
```

### Previsualizar la versión de producción:
```bash
npm run preview -- --port 5173
```
Acceso: `http://localhost:5173`

