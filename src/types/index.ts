export type CaseStatus = 'Abierto' | 'En mediación' | 'En juicio' | 'Cerrado';
export type PaymentStatus = 'Pagado' | 'Pendiente';
export type Priority = 'Alta' | 'Media' | 'Baja';
export type EventType = 'Audiencia' | 'Vencimiento de Plazo' | 'Presentación de Pruebas' | 'Alegatos' | 'Mediación Judicial' | 'Peritaje';

export interface LegalCase {
  id: string;
  expedienteNumber: string;
  title: string;
  client: string;
  defendant: string;
  court: string;
  category: 'Laboral' | 'Civil y Comercial' | 'Familia' | 'Penal' | 'Sucesiones' | 'Contencioso Administrativo';
  description: string;
  status: CaseStatus;
  fee: number;
  currency: string;
  paymentStatus: PaymentStatus;
  paymentDate?: string;
  nextDeadline: string; // YYYY-MM-DD
  nextDeadlineTime?: string; // HH:mm
  deadlineType: EventType;
  priority: Priority;
  createdAt: string;
  notes?: string[];
}

export interface CalendarEvent {
  id: string;
  caseId: string;
  caseTitle: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  type: EventType;
  location?: string;
  description?: string;
  completed: boolean;
}

export interface NotificationItem {
  id: string;
  caseId?: string;
  caseTitle?: string;
  title: string;
  message: string;
  type: 'urgente' | 'audiencia' | 'vencimiento' | 'pago' | 'info';
  date: string;
  read: boolean;
}

export interface DailyTask {
  id: string;
  caseId?: string;
  caseTitle?: string;
  title: string;
  date: string; // YYYY-MM-DD
  time?: string;
  priority: Priority;
  completed: boolean;
  type: 'audiencia' | 'plazo' | 'escrito' | 'reunion';
}

export interface FilterState {
  searchTerm: string;
  statusFilter: string; // 'Todos' | CaseStatus
  paymentFilter: string; // 'Todos' | PaymentStatus
  categoryFilter: string; // 'Todos' | Category
  sortBy: 'deadline-asc' | 'deadline-desc' | 'fee-desc' | 'fee-asc' | 'title-asc' | 'created-desc';
  dateRange: 'all' | 'today' | 'this-week' | 'this-month' | 'overdue';
}
