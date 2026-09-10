import React, { useState } from 'react';
import { 
  CheckSquare, 
  Square, 
  Plus, 
  Clock, 
  AlertCircle, 
  CheckCircle2,
  Trash2
} from 'lucide-react';
import { useLegalContext } from '../context/LegalContext';
import { Priority } from '../types';
import { getPriorityBadgeColor } from '../utils/formatters';

export const DailyTasksPanel: React.FC = () => {
  const { tasks, toggleTaskCompleted, addTask, deleteTask, events, cases, setSelectedCase } = useLegalContext();

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<Priority>('Media');
  const [selectedCaseId, setSelectedCaseId] = useState<string>('');

  // Today's events (10 Sept 2026)
  const todayEvents = events.filter(e => e.date === '2026-09-10');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const linkedCase = cases.find(c => c.id === selectedCaseId);

    addTask({
      title: newTaskTitle.trim(),
      date: '2026-09-10',
      time: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
      priority: newTaskPriority,
      completed: false,
      type: 'plazo',
      caseId: selectedCaseId || undefined,
      caseTitle: linkedCase?.title
    });

    setNewTaskTitle('');
    setSelectedCaseId('');
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 flex flex-col justify-between">
      
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
              <CheckSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Casos del Día & Acciones Pendientes
              </h3>
              <p className="text-[11px] text-slate-500">
                Jueves, 10 de Septiembre de 2026
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-black text-indigo-600">{progress}%</span>
            <span className="text-[10px] text-slate-400 block">{completedCount}/{tasks.length} completas</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-4">
          <div 
            className="bg-indigo-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Section A: Today's Court Events from Calendar */}
        {todayEvents.length > 0 && (
          <div className="mb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 block mb-2 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 text-rose-500 animate-pulse" />
              Audiencias & Plazos Procesales de Hoy
            </span>

            <div className="space-y-2">
              {todayEvents.map(evt => (
                <div 
                  key={evt.id}
                  className="p-2.5 bg-rose-50/50 rounded-xl border border-rose-200 text-xs flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 font-bold text-rose-950">
                      <Clock className="w-3 h-3 text-rose-600 flex-shrink-0" />
                      <span className="truncate">{evt.time} hs — {evt.title}</span>
                    </div>
                    <p className="text-[10px] text-slate-600 truncate mt-0.5">
                      {evt.caseTitle} {evt.location ? `• ${evt.location}` : ''}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const c = cases.find(i => i.id === evt.caseId);
                      if (c) setSelectedCase(c);
                    }}
                    className="text-[10px] font-bold text-rose-700 hover:underline flex-shrink-0"
                  >
                    Ver caso
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section B: Daily Checklist */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Checklist de Tareas del Abogado
          </span>

          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {tasks.map(task => (
              <div 
                key={task.id}
                onClick={() => toggleTaskCompleted(task.id)}
                className={`p-2.5 rounded-xl border text-xs flex items-start gap-2.5 transition-all cursor-pointer ${
                  task.completed 
                    ? 'bg-slate-50 border-slate-200 text-slate-400' 
                    : 'bg-white border-slate-200 hover:border-indigo-300 shadow-2xs'
                }`}
              >
                <button
                  type="button"
                  className="mt-0.5 flex-shrink-0 text-slate-400 hover:text-indigo-600"
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-300 hover:text-slate-500" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <p className={`font-semibold leading-tight ${task.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${getPriorityBadgeColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    {task.time && (
                      <span className="text-[10px] text-slate-400 font-mono">
                        {task.time} hs
                      </span>
                    )}
                    {task.caseTitle && (
                      <span className="text-[10px] text-slate-400 truncate max-w-[120px]">
                        • {task.caseTitle}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTask(task.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 hover:opacity-100 text-slate-300 hover:text-rose-500 p-1 transition-opacity"
                  title="Eliminar tarea"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

            ))}
          </div>
        </div>

      </div>

      {/* Quick Add Task Input */}
      <form onSubmit={handleAddTask} className="mt-4 pt-3 border-t border-slate-100 space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTaskTitle}
            onChange={e => setNewTaskTitle(e.target.value)}
            placeholder="Añadir pendiente para hoy..."
            className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1">
            <span>Prioridad:</span>
            <select
              value={newTaskPriority}
              onChange={e => setNewTaskPriority(e.target.value as Priority)}
              className="bg-transparent font-semibold text-slate-700 cursor-pointer"
            >
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <span>Caso:</span>
            <select
              value={selectedCaseId}
              onChange={e => setSelectedCaseId(e.target.value)}
              className="bg-transparent font-semibold text-slate-700 cursor-pointer max-w-[110px] truncate"
            >
              <option value="">General</option>
              {cases.map(c => (
                <option key={c.id} value={c.id}>
                  {c.client} ({c.expedienteNumber})
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>

    </div>
  );
};
