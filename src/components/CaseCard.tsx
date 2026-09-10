import React from 'react';
import { 
  Clock, 
  User, 
  Building2, 
  CheckCircle2, 
  ArrowRight,
  CalendarPlus
} from 'lucide-react';

import { LegalCase } from '../types';
import { useLegalContext } from '../context/LegalContext';
import { 
  formatCurrency, 
  formatDate, 
  getStatusBadgeColor, 
  getDeadlineBadgeInfo,
  getEventTypeColor 
} from '../utils/formatters';

interface CaseCardProps {
  legalCase: LegalCase;
}

export const CaseCard: React.FC<CaseCardProps> = ({ legalCase }) => {
  const { setSelectedCase, togglePaymentStatus, setIsEventModalOpen, setSelectedDateForEvent } = useLegalContext();

  const deadlineBadge = getDeadlineBadgeInfo(legalCase.nextDeadline);
  const statusColor = getStatusBadgeColor(legalCase.status);

  const handleQuickAddEvent = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDateForEvent(legalCase.nextDeadline);
    setSelectedCase(legalCase);
    setIsEventModalOpen(true);
  };

  const handlePaymentToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    togglePaymentStatus(legalCase.id);
  };

  return (
    <div 
      onClick={() => setSelectedCase(legalCase)}
      className="group bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-indigo-300 transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer hover:-translate-y-1 relative"
    >
      {/* Top Banner / Accent Strip depending on urgency */}
      <div 
        className={`h-1.5 w-full ${
          deadlineBadge.urgency === 'critical' || deadlineBadge.urgency === 'today'
            ? 'bg-rose-500'
            : deadlineBadge.urgency === 'tomorrow'
            ? 'bg-amber-500'
            : legalCase.status === 'En juicio'
            ? 'bg-purple-600'
            : 'bg-indigo-600'
        }`}
      />

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        
        {/* Row 1: Expediente Number & Case Status Badge */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
              {legalCase.expedienteNumber}
            </span>
            
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${statusColor} flex items-center gap-1`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
              {legalCase.status}
            </span>
          </div>

          {/* Row 2: Category Pill */}
          <div className="mb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Fuero {legalCase.category}
            </span>
          </div>

          {/* Row 3: Case Title */}
          <h3 className="text-base font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors mb-3">
            {legalCase.title}
          </h3>

          {/* Row 4: Client & Court Metadata */}
          <div className="space-y-1.5 mb-4 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span className="font-semibold text-slate-800 truncate">
                {legalCase.client}
              </span>
              {legalCase.defendant && (
                <span className="text-slate-400 truncate hidden sm:inline">
                  c/ {legalCase.defendant}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span className="text-slate-500 truncate text-[11px]">
                {legalCase.court}
              </span>
            </div>
          </div>
        </div>

        {/* Highlight Section: Next Deadline / Hearing Date (Product Feature highlight) */}
        <div className="mb-4 p-3 bg-slate-50 rounded-xl border border-slate-200/80 group-hover:bg-indigo-50/30 group-hover:border-indigo-100 transition-colors">
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <span className="font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              Próximo Vencimiento
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${deadlineBadge.class}`}>
              {deadlineBadge.label}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${getEventTypeColor(legalCase.deadlineType)}`}>
                {legalCase.deadlineType}
              </span>
              <span className="text-xs font-semibold text-slate-700">
                {formatDate(legalCase.nextDeadline)}
              </span>
              {legalCase.nextDeadlineTime && (
                <span className="text-xs text-slate-400 font-mono">
                  {legalCase.nextDeadlineTime} hs
                </span>
              )}
            </div>

            <button
              onClick={handleQuickAddEvent}
              title="Agendar nuevo hito en calendario"
              className="p-1 text-slate-400 hover:text-indigo-600 rounded-md hover:bg-white transition-colors"
            >
              <CalendarPlus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* E-Commerce Price & Payment Status Block */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          
          {/* Fee display */}
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
              Honorarios Pactados
            </span>
            <span className="text-lg font-black tracking-tight text-slate-900">
              {formatCurrency(legalCase.fee, legalCase.currency)}
            </span>
          </div>

          {/* Interactive Payment Badge (clickable toggle) */}
          <button
            onClick={handlePaymentToggle}
            className={`group/btn px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 shadow-2xs ${
              legalCase.paymentStatus === 'Pagado'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100 ring-1 ring-emerald-500/10'
                : 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100 ring-1 ring-amber-500/10'
            }`}
            title="Clic para cambiar estado de pago"
          >
            {legalCase.paymentStatus === 'Pagado' ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Pagado</span>
              </>
            ) : (
              <>
                <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                <span className="group-hover/btn:underline">Pendiente</span>
              </>
            )}
          </button>

        </div>

      </div>

      {/* Card Footer: Quick details prompt */}
      <div className="bg-slate-50 px-5 py-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 group-hover:bg-indigo-50/40 transition-colors">
        <span className="text-[11px] font-medium text-slate-400">
          Alta: {formatDate(legalCase.createdAt)}
        </span>
        <div className="flex items-center gap-1 font-bold text-indigo-600 group-hover:translate-x-0.5 transition-transform">
          <span>Ver expediente</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>

    </div>
  );
};
