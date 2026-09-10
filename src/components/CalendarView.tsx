import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Plus, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Circle,
  FolderOpen
} from 'lucide-react';

import { useLegalContext } from '../context/LegalContext';
import { CalendarEvent, EventType } from '../types';
import { getEventTypeColor, formatDate } from '../utils/formatters';

export const CalendarView: React.FC = () => {
  const { 
    events, 
    cases, 
    toggleEventCompleted, 
    setIsEventModalOpen, 
    setSelectedDateForEvent,
    setSelectedCase
  } = useLegalContext();

  // Current calendar viewing month (Year 2026, Month September = 8 index)
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 10)); // Default to Sept 10, 2026
  const [selectedDayStr, setSelectedDayStr] = useState<string>('2026-09-10');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Month navigation
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };
  const goToToday = () => {
    const today = new Date(2026, 8, 10);
    setCurrentDate(today);
    setSelectedDayStr('2026-09-10');
  };

  // Month names
  const monthName = currentDate.toLocaleString('es-AR', { month: 'long' });
  const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);

  // Generate days for the grid (Monday to Sunday)
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  
  // Starting day of week: 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  // Let's adjust so Monday is 0: (day + 6) % 7
  const startDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7;

  // Calendar cells
  const daysArray: { dayNumber: number; dateStr: string; isCurrentMonth: boolean }[] = [];

  // Previous month padding
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const d = prevMonthLastDay - i;
    const prevM = month === 0 ? 11 : month - 1;
    const prevY = month === 0 ? year - 1 : year;
    const dateStr = `${prevY}-${String(prevM + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    daysArray.push({ dayNumber: d, dateStr, isCurrentMonth: false });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    daysArray.push({ dayNumber: i, dateStr, isCurrentMonth: true });
  }

  // Next month padding to fill complete weeks (up to 35 or 42)
  const remainingCells = (7 - (daysArray.length % 7)) % 7;
  for (let i = 1; i <= remainingCells; i++) {
    const nextM = month === 11 ? 0 : month + 1;
    const nextY = month === 11 ? year + 1 : year;
    const dateStr = `${nextY}-${String(nextM + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    daysArray.push({ dayNumber: i, dateStr, isCurrentMonth: false });
  }

  const selectedDayEvents = events.filter(e => e.date === selectedDayStr);

  const handleDayClick = (dateStr: string) => {
    setSelectedDayStr(dateStr);
  };

  const handleOpenAddForDay = () => {
    setSelectedDateForEvent(selectedDayStr);
    setIsEventModalOpen(true);
  };

  const handleOpenCase = (caseId: string) => {
    const c = cases.find(item => item.id === caseId);
    if (c) setSelectedCase(c);
  };

  const weekDayLabels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Calendar Top Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-100">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 capitalize">
              {capitalizedMonth} {year}
            </h2>
            <p className="text-xs text-slate-500">
              Agenda de audiencias, pruebas y vencimientos procesales
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={goToToday}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            Hoy (10 Sep)
          </button>

          <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5">
            <button
              onClick={prevMonth}
              className="p-1.5 rounded-md hover:bg-white text-slate-600 transition-colors"
              title="Mes anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextMonth}
              className="p-1.5 rounded-md hover:bg-white text-slate-600 transition-colors"
              title="Mes siguiente"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleOpenAddForDay}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-xs shadow-indigo-200 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Agendar Evento</span>
          </button>
        </div>

      </div>

      {/* Main Grid & Day Details Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Calendar Grid (2 cols on large screen) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
          
          {/* Day Names Header */}
          <div className="grid grid-cols-7 gap-1 text-center mb-2 pb-2 border-b border-slate-100">
            {weekDayLabels.map((lbl, idx) => (
              <span key={lbl} className={`text-xs font-bold ${idx >= 5 ? 'text-slate-400' : 'text-slate-600'}`}>
                {lbl}
              </span>
            ))}
          </div>

          {/* Days Cells Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {daysArray.map((cell, idx) => {
              const dayEvts = events.filter(e => e.date === cell.dateStr);
              const isToday = cell.dateStr === '2026-09-10';
              const isSelected = cell.dateStr === selectedDayStr;

              return (
                <div
                  key={idx}
                  onClick={() => handleDayClick(cell.dateStr)}
                  className={`min-h-[84px] sm:min-h-[96px] p-1.5 sm:p-2 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'ring-2 ring-indigo-600 border-indigo-600 bg-indigo-50/30'
                      : isToday
                      ? 'border-indigo-400 bg-indigo-50/20'
                      : cell.isCurrentMonth
                      ? 'bg-white border-slate-200/70 hover:border-slate-300 hover:bg-slate-50/60'
                      : 'bg-slate-50/50 border-slate-100 opacity-40 hover:opacity-75'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                        isToday
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : isSelected
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'text-slate-800'
                      }`}
                    >
                      {cell.dayNumber}
                    </span>

                    {dayEvts.length > 0 && (
                      <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100/70 px-1.5 rounded-full">
                        {dayEvts.length}
                      </span>
                    )}
                  </div>

                  {/* Event Badges inside cell */}
                  <div className="space-y-1 mt-1 overflow-hidden">
                    {dayEvts.slice(0, 2).map(evt => (
                      <div
                        key={evt.id}
                        className={`text-[9px] sm:text-[10px] font-semibold px-1.5 py-0.5 rounded truncate border ${getEventTypeColor(evt.type)} ${
                          evt.completed ? 'line-through opacity-60' : ''
                        }`}
                        title={`${evt.title} (${evt.time} hs)`}
                      >
                        {evt.time} {evt.title}
                      </div>
                    ))}
                    {dayEvts.length > 2 && (
                      <span className="text-[9px] text-slate-400 font-bold block">
                        +{dayEvts.length - 2} más
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Color Legend */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
            <span className="font-bold text-slate-400 uppercase text-[10px]">Referencias:</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> Audiencia</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Vencimiento de Plazo</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span> Presentación de Pruebas</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Mediación</span>
          </div>

        </div>

        {/* Day Events Detail Drawer (Right side) */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Eventos Vinculados al Día
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {formatDate(selectedDayStr)}
                </h3>
              </div>

              <button
                onClick={handleOpenAddForDay}
                className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold px-3 py-1.5 rounded-lg border border-indigo-200 flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Nuevo</span>
              </button>
            </div>

            {/* List of events for the selected day */}
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {selectedDayEvents.length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <CalendarIcon className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                  <p className="text-xs font-semibold">No hay actos procesales para este día.</p>
                  <button
                    onClick={handleOpenAddForDay}
                    className="mt-3 text-xs text-indigo-600 hover:underline font-bold"
                  >
                    + Agendar vencimiento o audiencia
                  </button>
                </div>
              ) : (
                selectedDayEvents.map(evt => (
                  <div
                    key={evt.id}
                    className={`p-3.5 rounded-xl border transition-all ${
                      evt.completed
                        ? 'bg-slate-50 border-slate-200 opacity-70'
                        : 'bg-white border-slate-200 shadow-2xs hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleEventCompleted(evt.id)}
                          className="text-slate-400 hover:text-emerald-600 transition-colors"
                        >
                          {evt.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-300 hover:text-slate-500" />
                          )}
                        </button>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getEventTypeColor(evt.type)}`}>
                          {evt.type}
                        </span>
                      </div>

                      <span className="text-xs font-mono font-bold text-slate-700 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {evt.time} hs
                      </span>
                    </div>

                    <h4 className={`text-xs sm:text-sm font-bold text-slate-900 ${evt.completed ? 'line-through text-slate-500' : ''}`}>
                      {evt.title}
                    </h4>

                    {evt.description && (
                      <p className="text-xs text-slate-600 mt-1">
                        {evt.description}
                      </p>
                    )}

                    {evt.location && (
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-2">
                        <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{evt.location}</span>
                      </div>
                    )}

                    {/* Linked Case Button */}
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 truncate max-w-[180px]">
                        Caso: {evt.caseTitle}
                      </span>
                      <button
                        onClick={() => handleOpenCase(evt.caseId)}
                        className="text-[11px] font-bold text-indigo-600 hover:underline flex items-center gap-1"
                      >
                        <FolderOpen className="w-3 h-3" />
                        Ver caso
                      </button>
                    </div>

                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <span className="text-[11px] text-slate-400">
              Sincronizado en tiempo real con el expediente
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};
