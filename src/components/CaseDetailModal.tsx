import React, { useState } from 'react';
import { 
  X, 
  Scale, 
  User, 
  Building2, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Trash2, 
  Plus, 
  MessageSquare
} from 'lucide-react';

import { useLegalContext } from '../context/LegalContext';
import { 
  formatCurrency, 
  formatDate, 
  getStatusBadgeColor, 
  getDeadlineBadgeInfo,
  getEventTypeColor 
} from '../utils/formatters';

export const CaseDetailModal: React.FC = () => {
  const { 
    selectedCase, 
    setSelectedCase, 
    togglePaymentStatus, 
    deleteCase, 
    updateCase,
    events,
    setIsEventModalOpen,
    setSelectedDateForEvent
  } = useLegalContext();

  const [newNote, setNewNote] = useState('');

  if (!selectedCase) return null;

  const deadlineBadge = getDeadlineBadgeInfo(selectedCase.nextDeadline);
  const statusColor = getStatusBadgeColor(selectedCase.status);
  const caseEvents = events.filter(e => e.caseId === selectedCase.id);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    const currentNotes = selectedCase.notes || [];
    const timestamp = new Date().toLocaleDateString('es-AR') + ' ' + new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
    const updatedNotes = [`[${timestamp}] ${newNote.trim()}`, ...currentNotes];
    updateCase(selectedCase.id, { notes: updatedNotes });
    setNewNote('');
  };

  const handleDelete = () => {
    if (window.confirm(`¿Estás seguro de eliminar el caso "${selectedCase.title}"? Esta acción también removerá sus eventos de calendario asociados.`)) {
      deleteCase(selectedCase.id);
    }
  };

  const handleOpenSchedule = () => {
    setSelectedDateForEvent(selectedCase.nextDeadline);
    setIsEventModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-indigo-300 border border-slate-700">
                  {selectedCase.expedienteNumber}
                </span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${statusColor}`}>
                  {selectedCase.status}
                </span>
              </div>
              <h2 className="text-lg font-bold text-white mt-1 line-clamp-1">
                {selectedCase.title}
              </h2>
            </div>
          </div>

          <button
            onClick={() => setSelectedCase(null)}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[82vh] overflow-y-auto">
          
          {/* Quick Stats Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* Honorarios Card */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Honorarios
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-black text-slate-900">
                  {formatCurrency(selectedCase.fee, selectedCase.currency)}
                </span>
                <button
                  onClick={() => togglePaymentStatus(selectedCase.id)}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border flex items-center gap-1 transition-all ${
                    selectedCase.paymentStatus === 'Pagado'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
                  }`}
                  title="Cambiar estado de pago"
                >
                  {selectedCase.paymentStatus === 'Pagado' ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Pagado</span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>Pendiente</span>
                    </>
                  )}
                </button>
              </div>
              {selectedCase.paymentDate && (
                <p className="text-[10px] text-emerald-700 mt-1 font-medium">
                  Acreditado: {formatDate(selectedCase.paymentDate)}
                </p>
              )}
            </div>

            {/* Próximo Hito Card */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Próximo Vencimiento
              </span>
              <div className="flex items-center gap-1.5">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${deadlineBadge.class}`}>
                  {deadlineBadge.label}
                </span>
                <span className="text-xs font-bold text-slate-800">
                  {formatDate(selectedCase.nextDeadline)}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                {selectedCase.deadlineType} {selectedCase.nextDeadlineTime ? `• ${selectedCase.nextDeadlineTime} hs` : ''}
              </p>
            </div>

            {/* Fuero & Juzgado */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Juzgado & Fuero
              </span>
              <p className="text-xs font-bold text-slate-800 truncate">
                {selectedCase.court}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Materia: {selectedCase.category}
              </p>
            </div>

          </div>

          {/* Partes Intervinientes */}
          <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              Partes Intervinientes
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase">Parte Actora / Cliente</span>
                  <span className="font-bold text-slate-900">{selectedCase.client}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center font-bold">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase">Parte Demandada / Contraparte</span>
                  <span className="font-bold text-slate-900">{selectedCase.defendant || 'No especificada'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Descripción del Caso */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
              Descripción & Estrategia Procesal
            </h4>
            <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {selectedCase.description}
            </div>
          </div>

          {/* Eventos & Audiencias Agendadas */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-indigo-600" />
                Audiencias y Plazos Vinculados ({caseEvents.length})
              </h4>
              <button
                onClick={handleOpenSchedule}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Agendar fecha</span>
              </button>
            </div>

            {caseEvents.length > 0 ? (
              <div className="space-y-2">
                {caseEvents.map(evt => (
                  <div 
                    key={evt.id}
                    className="p-3 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getEventTypeColor(evt.type)}`}>
                        {evt.type}
                      </span>
                      <div>
                        <p className="font-bold text-slate-800">{evt.title}</p>
                        <p className="text-[11px] text-slate-500">
                          {formatDate(evt.date)} a las {evt.time} hs {evt.location ? `• ${evt.location}` : ''}
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] font-medium text-slate-400">
                      {evt.completed ? 'Cumplido' : 'Pendiente'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                No hay eventos adicionales agendados para este caso.
              </p>
            )}
          </div>

          {/* Notas del Caso */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-indigo-600" />
              Bitácora de Movimientos y Notas Internas
            </h4>

            {/* Note input */}
            <form onSubmit={handleAddNote} className="flex gap-2 mb-3">
              <input
                type="text"
                value={newNote}
                onChange={e => setNewNote(e.target.value)}
                placeholder="Añadir nota rápida sobre una notificación o resolución..."
                className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors"
              >
                Agregar
              </button>
            </form>

            {/* Notes list */}
            <div className="space-y-1.5 max-h-40 overflow-y-auto">
              {selectedCase.notes && selectedCase.notes.length > 0 ? (
                selectedCase.notes.map((note, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-700 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0"></span>
                    <span className="flex-1">{note}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 italic">No hay notas registradas.</p>
              )}
            </div>
          </div>

          {/* Danger Zone: Delete Case */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={handleDelete}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-rose-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Eliminar este caso</span>
            </button>

            <button
              onClick={() => setSelectedCase(null)}
              className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
            >
              Cerrar Vista
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
