import { LegalCase, CalendarEvent, NotificationItem, DailyTask } from '../types';

export const INITIAL_CASES: LegalCase[] = [
  {
    id: 'case-101',
    expedienteNumber: 'EXP-8492/2026',
    title: 'Demanda por Despido Incausado y Diferencias Salariales',
    client: 'Marcelo Alejandro Gómez',
    defendant: 'Logística & Distribución Sur S.A.',
    court: 'Juzgado Nacional del Trabajo N° 14',
    category: 'Laboral',
    description: 'Reclamo indemnizatorio integral por despido indirecto fundado en registración defectuosa y falta de pago de horas suplementarias. Trámite ordinario con traba de embargo preventivo.',
    status: 'En juicio',
    fee: 1850000,
    currency: '$',
    paymentStatus: 'Pendiente',
    nextDeadline: '2026-09-10',
    nextDeadlineTime: '11:30',
    deadlineType: 'Audiencia',
    priority: 'Alta',
    createdAt: '2026-05-12',
    notes: [
      'Se notificó a los testigos de la parte actora.',
      'La perito contable solicitó prórroga de 5 días para presentar informe.'
    ]
  },
  {
    id: 'case-102',
    expedienteNumber: 'EXP-3140/2026',
    title: 'Daños y Perjuicios por Accidente de Tránsito',
    client: 'Dra. Silvina Romero',
    defendant: 'Aseguradora Horizonte Patrimonial S.A.',
    court: 'Juzgado Civil y Comercial N° 7',
    category: 'Civil y Comercial',
    description: 'Demanda por colisión vehicular con lesiones graves e incapacidad sobreviniente del 18%. Rubros reclamados: daño emergente, lucro cesante y daño moral.',
    status: 'En juicio',
    fee: 3400000,
    currency: '$',
    paymentStatus: 'Pendiente',
    nextDeadline: '2026-09-11',
    nextDeadlineTime: '09:30',
    deadlineType: 'Vencimiento de Plazo',
    priority: 'Alta',
    createdAt: '2026-04-18',
    notes: [
      'Vence plazo de 5 días para contestar excepciones de previo y especial pronunciamiento.',
      'Documental reservada en secretaría.'
    ]
  },
  {
    id: 'case-103',
    expedienteNumber: 'EXP-5591/2026',
    title: 'Divorcio Vincular y Liquidación de Régimen Patrimonial',
    client: 'Mariana Eugenia Benítez',
    defendant: 'Carlos Alberto Rossi',
    court: 'Juzgado de Familia N° 3',
    category: 'Familia',
    description: 'Presentación unilateral de propuesta reguladora de divorcio. Discusión en torno a la atribución de la vivienda familiar, compensación económica y cuidado personal compartido.',
    status: 'En mediación',
    fee: 980000,
    currency: '$',
    paymentStatus: 'Pagado',
    paymentDate: '2026-09-02',
    nextDeadline: '2026-09-16',
    nextDeadlineTime: '10:00',
    deadlineType: 'Mediación Judicial',
    priority: 'Media',
    createdAt: '2026-07-10',
    notes: [
      'Propuesta de convenio enviada a la letrada de la contraparte.',
      'Honorarios de mediación y primera etapa abonados en su totalidad.'
    ]
  },
  {
    id: 'case-104',
    expedienteNumber: 'EXP-9021/2026',
    title: 'Ejecución Cambiaria y Traba de Embargo',
    client: 'Financiera del Litoral S.R.L.',
    defendant: 'Constructora Austral S.A.',
    court: 'Juzgado Comercial N° 22, Secretaría 44',
    category: 'Civil y Comercial',
    description: 'Cobro ejecutivo de 4 pagarés bursátiles impagos por un valor nominal de $ 18.500.000 más intereses punitorios compensatorios pactados. Mandamiento de intimación al pago.',
    status: 'Abierto',
    fee: 2200000,
    currency: '$',
    paymentStatus: 'Pendiente',
    nextDeadline: '2026-09-14',
    nextDeadlineTime: '12:00',
    deadlineType: 'Presentación de Pruebas',
    priority: 'Alta',
    createdAt: '2026-08-01',
    notes: [
      'Diligenciamiento de oficio al Banco Central para inhibición general de bienes.'
    ]
  },
  {
    id: 'case-105',
    expedienteNumber: 'EXP-1204/2025',
    title: 'Sucesión Ab-Intestato y Declaratoria de Herederos',
    client: 'Federico y Laura Fernández',
    defendant: 'Herederos de Roberto Fernández (Causante)',
    court: 'Juzgado Civil N° 11',
    category: 'Sucesiones',
    description: 'Trámite sucesorio de tres inmuebles y cuentas bancarias. Publicación de edictos cumplimentada en el Boletín Oficial sin oposición de terceros acreedores.',
    status: 'Abierto',
    fee: 1450000,
    currency: '$',
    paymentStatus: 'Pagado',
    paymentDate: '2026-08-15',
    nextDeadline: '2026-09-21',
    nextDeadlineTime: '13:00',
    deadlineType: 'Vencimiento de Plazo',
    priority: 'Baja',
    createdAt: '2025-11-20',
    notes: [
      'Pendiente inscripción de declaratoria de herederos en el Registro de la Propiedad Inmueble.'
    ]
  },
  {
    id: 'case-106',
    expedienteNumber: 'EXP-6743/2026',
    title: 'Acción de Amparo Colectivo contra Clausura de Establecimiento',
    client: 'Cámara Gastronómica Regional',
    defendant: 'Municipalidad de San Isidro',
    court: 'Juzgado Contencioso Administrativo N° 2',
    category: 'Contencioso Administrativo',
    description: 'Medida cautelar innovativa solicitando el cese de ordenanzas restrictivas de funcionamiento nocturno. Afectación al derecho a trabajar y seguridad jurídica comercial.',
    status: 'En juicio',
    fee: 4100000,
    currency: '$',
    paymentStatus: 'Pendiente',
    nextDeadline: '2026-09-18',
    nextDeadlineTime: '11:00',
    deadlineType: 'Alegatos',
    priority: 'Alta',
    createdAt: '2026-06-03',
    notes: [
      'Se obtuvo dictamen favorable preliminar de la Fiscalía de Estado.',
      'Reunión de coordinación con los directivos de la Cámara fijada.'
    ]
  },
  {
    id: 'case-107',
    expedienteNumber: 'EXP-4820/2026',
    title: 'Defensa Penal en Causa por Infracción Tributaria',
    client: 'Ing. Lucas Montenegro (Director Agrovalle)',
    defendant: 'Ministerio Público Fiscal - Juzgado Federal N° 4',
    court: 'Tribunal Oral Federal N° 1',
    category: 'Penal',
    description: 'Defensa técnica penal en causa de evasión tributaria simple art. 1 Ley 27.430. Presentación de pericia contable de descargo y pedido de probation.',
    status: 'Abierto',
    fee: 5200000,
    currency: '$',
    paymentStatus: 'Pendiente',
    nextDeadline: '2026-09-25',
    nextDeadlineTime: '09:00',
    deadlineType: 'Peritaje',
    priority: 'Alta',
    createdAt: '2026-07-28',
    notes: [
      'Entrevista con el perito oficial en el cuerpo médico y contable forense.'
    ]
  },
  {
    id: 'case-108',
    expedienteNumber: 'EXP-7712/2025',
    title: 'Homologación de Acuerdo Conciliatorio Laboral',
    client: 'Esteban Darío Peralta',
    defendant: 'Supermercados del Centro S.A.',
    court: 'Tribunal de Trabajo N° 5',
    category: 'Laboral',
    description: 'Cierre favorable y homologación judicial de acuerdo extintivo de mutuo acuerdo con gratificación extraordinaria. Liquidación cobrada por el cliente.',
    status: 'Cerrado',
    fee: 1200000,
    currency: '$',
    paymentStatus: 'Pagado',
    paymentDate: '2026-08-30',
    nextDeadline: '2026-08-30',
    nextDeadlineTime: '10:00',
    deadlineType: 'Audiencia',
    priority: 'Baja',
    createdAt: '2025-10-15',
    notes: [
      'Expediente archivado. Recibos de honorarios extendidos y honorarios percibidos al 100%.'
    ]
  }
];

export const INITIAL_EVENTS: CalendarEvent[] = [
  {
    id: 'evt-1',
    caseId: 'case-101',
    caseTitle: 'Demanda por Despido Incausado - Gómez c/ Logística Sur',
    title: 'Audiencia Testimonial y Confesional',
    date: '2026-09-10',
    time: '11:30',
    type: 'Audiencia',
    location: 'Sala 4 - Juzgado Nacional del Trabajo N° 14 (Híbrida)',
    description: 'Declaración de los 3 testigos ofrecidos por la parte actora. Asistir con pliego de preguntas reservado.',
    completed: false
  },
  {
    id: 'evt-2',
    caseId: 'case-102',
    caseTitle: 'Daños y Perjuicios - Romero c/ Horizonte Patrimonial',
    title: 'Vencimiento Contestación de Excepciones',
    date: '2026-09-11',
    time: '09:30',
    type: 'Vencimiento de Plazo',
    location: 'Mesa de Entradas Virtual (Poder Judicial)',
    description: 'Plazo perentorio de dos primeras horas para subir escrito de responde a la excepción de falta de legitimación pasiva.',
    completed: false
  },
  {
    id: 'evt-3',
    caseId: 'case-104',
    caseTitle: 'Ejecución Cambiaria - Financiera Litoral c/ Constructora Austral',
    title: 'Presentación de Informe de Inhibición Bancaria',
    date: '2026-09-14',
    time: '12:00',
    type: 'Presentación de Pruebas',
    location: 'Juzgado Comercial N° 22',
    description: 'Adjuntar constancias de retención de cuentas embargadas en Banco Macro y Santander.',
    completed: false
  },
  {
    id: 'evt-4',
    caseId: 'case-103',
    caseTitle: 'Divorcio Vincular - Benítez c/ Rossi',
    title: 'Audiencia de Mediación Prejudicial Obligatoria',
    date: '2026-09-16',
    time: '10:00',
    type: 'Mediación Judicial',
    location: 'Oficina Mediación Dra. Castelli - Zoom Sala 2',
    description: 'Negociación sobre plan de parentalidad y compensación en cuotas del inmueble de San Isidro.',
    completed: false
  },
  {
    id: 'evt-5',
    caseId: 'case-106',
    caseTitle: 'Amparo Colectivo - Cámara Gastronómica c/ Municipalidad',
    title: 'Presentación de Alegatos de Bien Probado',
    date: '2026-09-18',
    time: '11:00',
    type: 'Alegatos',
    location: 'Juzgado Contencioso Administrativo N° 2',
    description: 'Vencimiento común para que ambas partes presenten alegato final antes del llamado de autos para sentencia.',
    completed: false
  },
  {
    id: 'evt-6',
    caseId: 'case-105',
    caseTitle: 'Sucesión - Fernández',
    title: 'Retiro de Testimonio e Hijuelas Inscripción',
    date: '2026-09-21',
    time: '13:00',
    type: 'Vencimiento de Plazo',
    location: 'Juzgado Civil N° 11',
    description: 'Confrontación y firma de oficios para el Registro de la Propiedad.',
    completed: false
  },
  {
    id: 'evt-7',
    caseId: 'case-107',
    caseTitle: 'Defensa Penal - Agrovalle c/ AFIP',
    title: 'Punto de Pericia Contable en Cuerpo Forense',
    date: '2026-09-25',
    time: '09:00',
    type: 'Peritaje',
    location: 'Cuerpo de Peritos Contadores Oficiales',
    description: 'Presentación de libros societarios y balances rubricados 2024-2025 con el perito de parte.',
    completed: false
  },
  {
    id: 'evt-8',
    caseId: 'case-101',
    caseTitle: 'Demanda Laboral - Gómez c/ Logística Sur',
    title: 'Audiencia Conciliatoria Suplementaria',
    date: '2026-10-02',
    time: '10:30',
    type: 'Audiencia',
    location: 'Juzgado Nacional del Trabajo N° 14',
    description: 'Intento de conciliación ante el Secretario de Juzgado previo a sentencia.',
    completed: false
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    caseId: 'case-101',
    caseTitle: 'Gómez c/ Logística Sur S.A.',
    title: '⚠️ Audiencia Inminente Hoy',
    message: 'Audiencia testimonial a las 11:30 hs en Juzgado Nac. del Trabajo N° 14. Verificar pliego de preguntas.',
    type: 'urgente',
    date: '2026-09-10T08:00:00',
    read: false
  },
  {
    id: 'notif-2',
    caseId: 'case-102',
    caseTitle: 'Romero c/ Horizonte Patrimonial',
    title: '⏳ Vencimiento en 24 Horas',
    message: 'Vence el plazo para contestar excepciones de la aseguradora. Escrito pendiente de firma electrónica.',
    type: 'vencimiento',
    date: '2026-09-09T18:30:00',
    read: false
  },
  {
    id: 'notif-3',
    caseId: 'case-104',
    caseTitle: 'Financiera del Litoral c/ Constructora Austral',
    title: '💰 Honorarios Pendientes de Cobro',
    message: 'El cliente confirmó acreditación de pago de honorarios por $ 2.200.000 para esta semana.',
    type: 'pago',
    date: '2026-09-08T14:15:00',
    read: false
  },
  {
    id: 'notif-4',
    caseId: 'case-103',
    caseTitle: 'Benítez c/ Rossi',
    title: '📅 Mediación Confirmada',
    message: 'Se fijó sala virtual de Zoom para el día 16 de Septiembre a las 10:00 hs.',
    type: 'audiencia',
    date: '2026-09-07T11:20:00',
    read: true
  },
  {
    id: 'notif-5',
    caseId: 'case-108',
    caseTitle: 'Peralta c/ Supermercados del Centro',
    title: '✅ Caso Archivada y Liquidado',
    message: 'Cobro de honorarios de $ 1.200.000 registrado con éxito y liquidación entregada.',
    type: 'info',
    date: '2026-09-01T16:00:00',
    read: true
  }
];

export const INITIAL_TASKS: DailyTask[] = [
  {
    id: 'task-1',
    caseId: 'case-101',
    caseTitle: 'Gómez c/ Logística Sur',
    title: 'Preparar pliego de repreguntas para audiencia de las 11:30 hs',
    date: '2026-09-10',
    time: '10:30',
    priority: 'Alta',
    completed: false,
    type: 'audiencia'
  },
  {
    id: 'task-2',
    caseId: 'case-102',
    caseTitle: 'Romero c/ Horizonte',
    title: 'Redactar y firmar contestación de excepciones de aseguradora',
    date: '2026-09-10',
    time: '16:00',
    priority: 'Alta',
    completed: false,
    type: 'escrito'
  },
  {
    id: 'task-3',
    caseId: 'case-104',
    caseTitle: 'Financiera Litoral',
    title: 'Llamar al oficial de justicia por mandamiento de embargo',
    date: '2026-09-10',
    time: '14:00',
    priority: 'Media',
    completed: true,
    type: 'plazo'
  },
  {
    id: 'task-4',
    caseId: 'case-103',
    caseTitle: 'Benítez c/ Rossi',
    title: 'Enviar liquidación de alimentos y gastos colegiales a clienta',
    date: '2026-09-10',
    time: '18:00',
    priority: 'Media',
    completed: false,
    type: 'reunion'
  },
  {
    id: 'task-5',
    caseId: 'case-107',
    caseTitle: 'Defensa Agrovalle',
    title: 'Revisar balance impositivo y cruce de facturas AFIP con contador',
    date: '2026-09-11',
    time: '10:00',
    priority: 'Alta',
    completed: false,
    type: 'escrito'
  }
];
