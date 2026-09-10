import React, { useState, useRef, useEffect } from 'react';
import { 
  Scale, 
  Bell, 
  Plus, 
  Calendar as CalendarIcon, 
  LayoutGrid, 
  CheckSquare, 
  RotateCcw,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  DollarSign,
  UserCheck
} from 'lucide-react';
import { useLegalContext } from '../context/LegalContext';

export const Navbar: React.FC = () => {
  const { 
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead, 
    setIsAddModalOpen,
    activeView,
    setActiveView,
    resetToDefaults,
    cases,
    setSelectedCase
  } = useLegalContext();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = (caseId?: string, notifId?: string) => {
    if (notifId) markNotificationAsRead(notifId);
    if (caseId) {
      const foundCase = cases.find(c => c.id === caseId);
      if (foundCase) {
        setSelectedCase(foundCase);
        setActiveView('dashboard');
      }
    }
    setIsNotifOpen(false);
  };

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'urgente':
        return <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />;
      case 'audiencia':
        return <CalendarIcon className="w-4 h-4 text-indigo-600 flex-shrink-0" />;
      case 'vencimiento':
        return <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />;
      case 'pago':
        return <DollarSign className="w-4 h-4 text-emerald-600 flex-shrink-0" />;
      default:
        return <FileText className="w-4 h-4 text-blue-600 flex-shrink-0" />;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 font-sans">
                  Lex<span className="text-indigo-600">Flow</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  LEGAL SUITE
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Gestión Jurídica & Catálogo Procesal
              </p>
            </div>
          </div>

          {/* Navigation View Tabs */}
          <nav className="hidden md:flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveView('dashboard')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeView === 'dashboard'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Casos (Catálogo)</span>
            </button>

            <button
              onClick={() => setActiveView('calendar')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeView === 'calendar'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Calendario & Audiencias</span>
            </button>

            <button
              onClick={() => setActiveView('tasks')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeView === 'tasks'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Tareas del Día</span>
            </button>
          </nav>

          {/* Actions & Profile */}
          <div className="flex items-center gap-2.5">
            
            {/* Reset mock data button */}
            <button
              onClick={() => {
                if (window.confirm('¿Deseas restaurar todos los datos de prueba iniciales? Se reiniciarán casos, calendario y notificaciones.')) {
                  resetToDefaults();
                }
              }}
              title="Restaurar datos de prueba"
              className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors hidden sm:inline-flex"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Notifications Popover */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="relative p-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                aria-label="Ver notificaciones"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Dropdown Menu */}
              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-84 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">Notificaciones Judiciales</span>
                      {unreadCount > 0 && (
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                          {unreadCount} nuevas
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllNotificationsAsRead}
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-medium hover:underline flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Marcar leídas
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="py-8 text-center text-xs text-slate-400">
                        No hay notificaciones pendientes
                      </div>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => handleNotificationClick(n.caseId, n.id)}
                          className={`p-3.5 transition-colors cursor-pointer flex gap-3 items-start ${
                            !n.read ? 'bg-indigo-50/40 hover:bg-indigo-50/70' : 'hover:bg-slate-50'
                          }`}
                        >
                          <div className="mt-0.5 p-1.5 rounded-lg bg-white shadow-xs border border-slate-200">
                            {getNotifIcon(n.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <p className={`text-xs font-semibold truncate ${!n.read ? 'text-indigo-950 font-bold' : 'text-slate-800'}`}>
                                {n.title}
                              </p>
                              {!n.read && (
                                <span className="w-2 h-2 rounded-full bg-indigo-600 flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2">
                              {n.message}
                            </p>
                            {n.caseTitle && (
                              <p className="text-[10px] text-slate-400 font-medium mt-1 truncate">
                                Caso: {n.caseTitle}
                              </p>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="px-4 pt-2 border-t border-slate-100 text-center">
                    <p className="text-[11px] text-slate-400">
                      Alertas automáticas por plazos y audiencias
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Create Case CTA */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-sm shadow-indigo-300 transition-all hover:shadow hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden xs:inline">Nuevo Caso</span>
            </button>

            {/* User Pill / Matrícula */}
            <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-xs">
                <UserCheck className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-800 leading-tight">Dr. M. Valenzuela</p>
                <p className="text-[10px] text-slate-500 leading-tight">T° 84 F° 122 CPACF</p>
              </div>
            </div>

          </div>

        </div>

        {/* Mobile View Switcher */}
        <div className="md:hidden py-2 border-t border-slate-100 flex items-center justify-between gap-1 overflow-x-auto">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold ${
              activeView === 'dashboard' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'text-slate-600'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Casos</span>
          </button>
          <button
            onClick={() => setActiveView('calendar')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold ${
              activeView === 'calendar' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'text-slate-600'
            }`}
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Calendario</span>
          </button>
          <button
            onClick={() => setActiveView('tasks')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold ${
              activeView === 'tasks' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'text-slate-600'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Tareas</span>
          </button>
        </div>

      </div>
    </header>
  );
};
