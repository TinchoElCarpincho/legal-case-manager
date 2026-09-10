import React, { createContext, useContext, useState, useEffect } from 'react';
import { LegalCase, CalendarEvent, NotificationItem, DailyTask, FilterState, PaymentStatus } from '../types';
import { INITIAL_CASES, INITIAL_EVENTS, INITIAL_NOTIFICATIONS, INITIAL_TASKS } from '../data/mockData';

interface LegalContextType {
  cases: LegalCase[];
  events: CalendarEvent[];
  notifications: NotificationItem[];
  tasks: DailyTask[];
  filters: FilterState;
  selectedCase: LegalCase | null;
  isAddModalOpen: boolean;
  isEventModalOpen: boolean;
  selectedDateForEvent?: string;
  activeView: 'dashboard' | 'calendar' | 'tasks';
  setSelectedCase: (c: LegalCase | null) => void;
  setIsAddModalOpen: (open: boolean) => void;
  setIsEventModalOpen: (open: boolean) => void;
  setSelectedDateForEvent: (dateStr?: string) => void;
  setActiveView: (view: 'dashboard' | 'calendar' | 'tasks') => void;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  addCase: (caseData: Omit<LegalCase, 'id' | 'createdAt'>) => LegalCase;
  updateCase: (id: string, caseData: Partial<LegalCase>) => void;
  deleteCase: (id: string) => void;
  togglePaymentStatus: (id: string) => void;
  addEvent: (eventData: Omit<CalendarEvent, 'id'>) => void;
  toggleEventCompleted: (id: string) => void;
  deleteEvent: (id: string) => void;
  addTask: (taskData: Omit<DailyTask, 'id'>) => void;
  toggleTaskCompleted: (id: string) => void;
  deleteTask: (id: string) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  resetToDefaults: () => void;
}

const STORAGE_KEYS = {
  CASES: 'lexflow_cases_v1',
  EVENTS: 'lexflow_events_v1',
  NOTIFICATIONS: 'lexflow_notifications_v1',
  TASKS: 'lexflow_tasks_v1',
};

const initialFilterState: FilterState = {
  searchTerm: '',
  statusFilter: 'Todos',
  paymentFilter: 'Todos',
  categoryFilter: 'Todos',
  sortBy: 'deadline-asc',
  dateRange: 'all',
};

const LegalContext = createContext<LegalContextType | undefined>(undefined);

export const LegalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cases, setCases] = useState<LegalCase[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CASES);
      return saved ? JSON.parse(saved) : INITIAL_CASES;
    } catch {
      return INITIAL_CASES;
    }
  });

  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EVENTS);
      return saved ? JSON.parse(saved) : INITIAL_EVENTS;
    } catch {
      return INITIAL_EVENTS;
    }
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  const [tasks, setTasks] = useState<DailyTask[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TASKS);
      return saved ? JSON.parse(saved) : INITIAL_TASKS;
    } catch {
      return INITIAL_TASKS;
    }
  });

  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [selectedCase, setSelectedCase] = useState<LegalCase | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedDateForEvent, setSelectedDateForEvent] = useState<string | undefined>(undefined);
  const [activeView, setActiveView] = useState<'dashboard' | 'calendar' | 'tasks'>('dashboard');

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CASES, JSON.stringify(cases));
  }, [cases]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  }, [tasks]);

  const addCase = (caseData: Omit<LegalCase, 'id' | 'createdAt'>) => {
    const newCase: LegalCase = {
      ...caseData,
      id: `case-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      notes: caseData.notes || []
    };
    setCases(prev => [newCase, ...prev]);

    // Also auto-generate a calendar event if deadline was set
    if (newCase.nextDeadline) {
      const newEvt: CalendarEvent = {
        id: `evt-${Date.now()}`,
        caseId: newCase.id,
        caseTitle: newCase.title,
        title: `${newCase.deadlineType}: ${newCase.client}`,
        date: newCase.nextDeadline,
        time: newCase.nextDeadlineTime || '10:00',
        type: newCase.deadlineType,
        location: newCase.court,
        description: `Acto procesal programado para el caso ${newCase.expedienteNumber}`,
        completed: false
      };
      setEvents(prev => [...prev, newEvt]);
    }

    // Auto notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      caseId: newCase.id,
      caseTitle: newCase.title,
      title: 'Nuevo Caso Registrado',
      message: `Se ha creado el expediente "${newCase.title}" (${newCase.expedienteNumber}) asignado a ${newCase.client}.`,
      type: 'info',
      date: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);

    return newCase;
  };

  const updateCase = (id: string, caseData: Partial<LegalCase>) => {
    setCases(prev => prev.map(c => c.id === id ? { ...c, ...caseData } : c));
    if (selectedCase && selectedCase.id === id) {
      setSelectedCase(prev => prev ? { ...prev, ...caseData } : null);
    }
  };

  const deleteCase = (id: string) => {
    setCases(prev => prev.filter(c => c.id !== id));
    setEvents(prev => prev.filter(e => e.caseId !== id));
    setTasks(prev => prev.filter(t => t.caseId !== id));
    if (selectedCase && selectedCase.id === id) {
      setSelectedCase(null);
    }
  };

  const togglePaymentStatus = (id: string) => {
    setCases(prev => prev.map(c => {
      if (c.id === id) {
        const nextStatus: PaymentStatus = c.paymentStatus === 'Pagado' ? 'Pendiente' : 'Pagado';
        const updated = {
          ...c,
          paymentStatus: nextStatus,
          paymentDate: nextStatus === 'Pagado' ? new Date().toISOString().split('T')[0] : undefined
        };
        if (selectedCase && selectedCase.id === id) {
          setSelectedCase(updated);
        }
        return updated;
      }
      return c;
    }));
  };

  const addEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
    const newEvt: CalendarEvent = {
      ...eventData,
      id: `evt-${Date.now()}`
    };
    setEvents(prev => [...prev, newEvt]);
  };

  const toggleEventCompleted = (id: string) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, completed: !e.completed } : e));
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const addTask = (taskData: Omit<DailyTask, 'id'>) => {
    const newTask: DailyTask = {
      ...taskData,
      id: `task-${Date.now()}`
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTaskCompleted = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const resetToDefaults = () => {
    setCases(INITIAL_CASES);
    setEvents(INITIAL_EVENTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setTasks(INITIAL_TASKS);
    localStorage.removeItem(STORAGE_KEYS.CASES);
    localStorage.removeItem(STORAGE_KEYS.EVENTS);
    localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
    localStorage.removeItem(STORAGE_KEYS.TASKS);
  };

  return (
    <LegalContext.Provider
      value={{
        cases,
        events,
        notifications,
        tasks,
        filters,
        selectedCase,
        isAddModalOpen,
        isEventModalOpen,
        selectedDateForEvent,
        activeView,
        setSelectedCase,
        setIsAddModalOpen,
        setIsEventModalOpen,
        setSelectedDateForEvent,
        setActiveView,
        setFilters,
        addCase,
        updateCase,
        deleteCase,
        togglePaymentStatus,
        addEvent,
        toggleEventCompleted,
        deleteEvent,
        addTask,
        toggleTaskCompleted,
        deleteTask,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        resetToDefaults,
      }}
    >
      {children}
    </LegalContext.Provider>
  );
};

export const useLegalContext = () => {
  const context = useContext(LegalContext);
  if (!context) {
    throw new Error('useLegalContext must be used within a LegalProvider');
  }
  return context;
};
