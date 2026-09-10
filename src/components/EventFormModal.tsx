import React, { useState } from 'react';
import { X, Calendar, MapPin } from 'lucide-react';
import { useLegalContext } from '../context/LegalContext';
import { EventType } from '../types';

export const EventFormModal: React.FC = () => {
  const { 
    isEventModalOpen, 
    setIsEventModalOpen, 
    selectedDateForEvent, 
    addEvent, 
    cases, 
    selectedCase 
  } = useLegalContext();

  const [title, setTitle] = useState('');
  const [caseId, setCaseId] = useState(selectedCase?.id || (cases[0]?.id || ''));
  const [date, setDate] = useState(selectedDateForEvent || '2026-09-10');
  const [time, setTime] = useState('10:00');
  const [type, setType] = useState<EventType>('Audiencia');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  if (!isEventModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const linkedCase = cases.find(c => c.id === caseId);

    addEvent({
      caseId,
      caseTitle: linkedCase ? linkedCase.title : 'Causa General',
      title: title.trim(),
      date,
      time,
      type,
      location: location.trim() || undefined,
      description: description.trim() || undefined,
      completed: false
    });

    setTitle('');
    setLocation('');
    setDescription('');
    setIsEventModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold">Agendar Evento / Audiencia Judicial</h3>
              <p className="text-[11px] text-slate-400">Vinculado a la agenda y al expediente</p>
            </div>
          </div>
          <button
            onClick={() => setIsEventModalOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
              Título del Acto Procesal *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Ej. Audiencia Testimonial / Presentación de Escrito"
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
              Caso Vinculado *
            </label>
            <select
              value={caseId}
              onChange={e => setCaseId(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:border-indigo-500"
            >
              {cases.map(c => (
                <option key={c.id} value={c.id}>
                  {c.expedienteNumber} — {c.client} ({c.title})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                Tipo
              </label>
              <select
                value={type}
                onChange={e => setType(e.target.value as EventType)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:border-indigo-500"
              >
                <option value="Audiencia">Audiencia</option>
                <option value="Vencimiento de Plazo">Vencimiento</option>
                <option value="Presentación de Pruebas">Pruebas</option>
                <option value="Alegatos">Alegatos</option>
                <option value="Mediación Judicial">Mediación</option>
                <option value="Peritaje">Peritaje</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                Fecha
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                Hora
              </label>
              <input
                type="time"
                required
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
              Lugar / Sala / Plataforma
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="Ej. Juzgado Civil N° 7 / Zoom Sala 2"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
              Notas adicionales / Instrucciones
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Instrucciones para el procurador, testigos o documentación a llevar..."
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEventModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
            >
              Confirmar Evento
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
