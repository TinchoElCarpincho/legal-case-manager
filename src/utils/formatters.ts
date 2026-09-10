import { CaseStatus, PaymentStatus, Priority, EventType } from '../types';

export const formatCurrency = (amount: number, currency: string = '$'): string => {
  return `${currency} ${amount.toLocaleString('es-AR')}`;
};

export const formatDate = (dateStr: string): string => {
  if (!dateStr) return 'Sin fecha';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  const date = new Date(year, month, day);
  return date.toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

export const getDaysRemaining = (deadlineStr: string): number => {
  if (!deadlineStr) return 999;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const parts = deadlineStr.split('-');
  if (parts.length !== 3) return 999;
  const target = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  target.setHours(0, 0, 0, 0);

  const diffTime = target.getTime() - today.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
};

export const getDeadlineBadgeInfo = (deadlineStr: string) => {
  const days = getDaysRemaining(deadlineStr);
  if (days < 0) {
    return {
      label: `Vencido hace ${Math.abs(days)} d`,
      class: 'bg-rose-100 text-rose-800 border-rose-200 font-semibold',
      urgency: 'critical',
      icon: 'alert-circle'
    };
  }
  if (days === 0) {
    return {
      label: '¡Vence HOY!',
      class: 'bg-red-500 text-white font-bold animate-pulse shadow-sm',
      urgency: 'today',
      icon: 'clock'
    };
  }
  if (days === 1) {
    return {
      label: 'Vence MAÑANA',
      class: 'bg-amber-100 text-amber-900 border-amber-300 font-bold',
      urgency: 'tomorrow',
      icon: 'clock'
    };
  }
  if (days <= 3) {
    return {
      label: `En ${days} días`,
      class: 'bg-amber-50 text-amber-800 border-amber-200 font-medium',
      urgency: 'soon',
      icon: 'calendar'
    };
  }
  if (days <= 7) {
    return {
      label: `En ${days} días`,
      class: 'bg-blue-50 text-blue-700 border-blue-200 font-medium',
      urgency: 'normal',
      icon: 'calendar'
    };
  }
  return {
    label: formatDate(deadlineStr),
    class: 'bg-slate-100 text-slate-700 border-slate-200',
    urgency: 'future',
    icon: 'calendar'
  };
};

export const getStatusBadgeColor = (status: CaseStatus) => {
  switch (status) {
    case 'Abierto':
      return 'bg-blue-50 text-blue-700 border-blue-200 ring-1 ring-blue-500/10';
    case 'En mediación':
      return 'bg-amber-50 text-amber-700 border-amber-200 ring-1 ring-amber-500/10';
    case 'En juicio':
      return 'bg-purple-50 text-purple-700 border-purple-200 ring-1 ring-purple-500/10';
    case 'Cerrado':
      return 'bg-slate-100 text-slate-600 border-slate-200 ring-1 ring-slate-400/10';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

export const getPaymentBadgeColor = (status: PaymentStatus) => {
  if (status === 'Pagado') {
    return 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-1 ring-emerald-500/10';
  }
  return 'bg-amber-50 text-amber-800 border-amber-300 ring-1 ring-amber-500/10';
};

export const getPriorityBadgeColor = (priority: Priority) => {
  switch (priority) {
    case 'Alta':
      return 'bg-rose-100 text-rose-700 border-rose-200';
    case 'Media':
      return 'bg-sky-100 text-sky-700 border-sky-200';
    case 'Baja':
      return 'bg-slate-100 text-slate-600 border-slate-200';
  }
};

export const getEventTypeColor = (type: EventType) => {
  switch (type) {
    case 'Audiencia':
      return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    case 'Vencimiento de Plazo':
      return 'bg-rose-100 text-rose-800 border-rose-200';
    case 'Presentación de Pruebas':
      return 'bg-cyan-100 text-cyan-800 border-cyan-200';
    case 'Alegatos':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'Mediación Judicial':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'Peritaje':
      return 'bg-teal-100 text-teal-800 border-teal-200';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};
