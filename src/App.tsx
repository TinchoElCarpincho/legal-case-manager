import React from 'react';
import { LegalProvider, useLegalContext } from './context/LegalContext';
import { Navbar } from './components/Navbar';
import { StatsHeader } from './components/StatsHeader';
import { FiltersBar } from './components/FiltersBar';
import { CaseGrid } from './components/CaseGrid';
import { CalendarView } from './components/CalendarView';
import { DailyTasksPanel } from './components/DailyTasksPanel';
import { CaseFormModal } from './components/CaseFormModal';
import { CaseDetailModal } from './components/CaseDetailModal';
import { EventFormModal } from './components/EventFormModal';
import { Scale, ShieldCheck } from 'lucide-react';


const DashboardContent: React.FC = () => {
  const { activeView } = useLegalContext();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      
      {/* Top Fixed / Sticky Navigation */}
      <Navbar />

      {/* Main App Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* KPI Summary Cards */}
        <StatsHeader />

        {/* Dynamic View Rendering */}
        {activeView === 'dashboard' && (
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
            {/* Left 3 columns: E-Commerce Grid of Cases with Search & Filters */}
            <div className="xl:col-span-3 space-y-4">
              <FiltersBar />
              <CaseGrid />
            </div>

            {/* Right 1 column: Daily Tasks & Today's Court Events Sidebar */}
            <div className="xl:col-span-1 space-y-6 sticky top-20">
              <DailyTasksPanel />
            </div>
          </div>
        )}

        {activeView === 'calendar' && (
          <CalendarView />
        )}

        {activeView === 'tasks' && (
          <div className="max-w-3xl mx-auto">
            <DailyTasksPanel />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-slate-200/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-indigo-600" />
            <span className="font-bold text-slate-700">LexFlow</span>
            <span>— Sistema Integral de Gestión Procesal & Honorarios</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Datos protegidos localmente
            </span>
            <span>v2.4 Pro</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <CaseFormModal />
      <CaseDetailModal />
      <EventFormModal />

    </div>
  );
};

export default function App() {
  return (
    <LegalProvider>
      <DashboardContent />
    </LegalProvider>
  );
}
