import React from 'react';
import { Briefcase, AlertCircle, DollarSign, CalendarCheck, TrendingUp } from 'lucide-react';
import { useLegalContext } from '../context/LegalContext';
import { formatCurrency, getDaysRemaining } from '../utils/formatters';

export const StatsHeader: React.FC = () => {
  const { cases, events } = useLegalContext();

  const totalCases = cases.length;
  const activeCases = cases.filter(c => c.status !== 'Cerrado').length;
  
  const totalFees = cases.reduce((acc, c) => acc + (c.fee || 0), 0);
  const paidFees = cases.filter(c => c.paymentStatus === 'Pagado').reduce((acc, c) => acc + (c.fee || 0), 0);
  const pendingFees = totalFees - paidFees;
  const collectionPercentage = totalFees > 0 ? Math.round((paidFees / totalFees) * 100) : 0;

  // Urgent deadlines in <= 2 days
  const urgentCount = cases.filter(c => {
    const days = getDaysRemaining(c.nextDeadline);
    return c.status !== 'Cerrado' && days >= 0 && days <= 2;
  }).length;

  // Events in the current month (Sept 2026)
  const monthEventsCount = events.length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      
      {/* Metric 1: Total Casos Activos */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Casos en Cartera</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-slate-900">{activeCases}</span>
              <span className="text-xs text-slate-500">activos de {totalCases}</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 group-hover:scale-105 transition-transform">
            <Briefcase className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
          <span>{cases.filter(c => c.status === 'En juicio').length} en juicio</span>
          <span className="text-slate-300">•</span>
          <span>{cases.filter(c => c.status === 'En mediación').length} en mediación</span>
        </div>
      </div>

      {/* Metric 2: Plazos Críticos */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Vencimientos Críticos</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-rose-600">{urgentCount}</span>
              <span className="text-xs text-rose-600 font-medium">próximas 48hs</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100 group-hover:scale-105 transition-transform">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3 text-xs text-slate-500 truncate">
          Atención prioritaria para audiencias y respuestas procesales
        </div>
      </div>

      {/* Metric 3: Honorarios Cobrados vs Pendientes */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Honorarios Totales</p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-slate-900">{formatCurrency(totalFees)}</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 group-hover:scale-105 transition-transform">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-3">
          <div className="flex justify-between text-[11px] text-slate-500 mb-1">
            <span className="text-emerald-700 font-semibold">{collectionPercentage}% Cobrado</span>
            <span className="text-amber-700 font-semibold">{formatCurrency(pendingFees)} pend.</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${collectionPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Metric 4: Audiencias & Eventos */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Agenda Judicial</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-slate-900">{monthEventsCount}</span>
              <span className="text-xs text-indigo-600 font-medium">hitos procesales</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 group-hover:scale-105 transition-transform">
            <CalendarCheck className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
          <span>Sincronizado con calendario y tareas</span>
        </div>
      </div>

    </div>
  );
};
