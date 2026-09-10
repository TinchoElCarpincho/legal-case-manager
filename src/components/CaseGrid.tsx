import React, { useMemo } from 'react';
import { CaseCard } from './CaseCard';
import { useLegalContext } from '../context/LegalContext';
import { getDaysRemaining } from '../utils/formatters';
import { SearchX, Plus } from 'lucide-react';

export const CaseGrid: React.FC = () => {
  const { cases, filters, setIsAddModalOpen } = useLegalContext();

  const filteredCases = useMemo(() => {
    return cases.filter(c => {
      // 1. Text Search
      if (filters.searchTerm) {
        const query = filters.searchTerm.toLowerCase();
        const matchesTitle = c.title.toLowerCase().includes(query);
        const matchesClient = c.client.toLowerCase().includes(query);
        const matchesDefendant = c.defendant.toLowerCase().includes(query);
        const matchesExp = c.expedienteNumber.toLowerCase().includes(query);
        const matchesCourt = c.court.toLowerCase().includes(query);
        if (!matchesTitle && !matchesClient && !matchesDefendant && !matchesExp && !matchesCourt) {
          return false;
        }
      }

      // 2. Status Filter
      if (filters.statusFilter !== 'Todos') {
        if (c.status !== filters.statusFilter) return false;
      }

      // 3. Payment Filter
      if (filters.paymentFilter !== 'Todos') {
        if (c.paymentStatus !== filters.paymentFilter) return false;
      }

      // 4. Date Range Filter
      if (filters.dateRange !== 'all') {
        const days = getDaysRemaining(c.nextDeadline);
        if (filters.dateRange === 'today') {
          if (days !== 0) return false;
        } else if (filters.dateRange === 'this-week') {
          if (days < 0 || days > 7) return false;
        } else if (filters.dateRange === 'this-month') {
          if (days < 0 || days > 30) return false;
        } else if (filters.dateRange === 'overdue') {
          if (days >= 0) return false;
        }
      }

      return true;
    }).sort((a, b) => {
      // Sorting
      if (filters.sortBy === 'deadline-asc') {
        return a.nextDeadline.localeCompare(b.nextDeadline);
      }
      if (filters.sortBy === 'deadline-desc') {
        return b.nextDeadline.localeCompare(a.nextDeadline);
      }
      if (filters.sortBy === 'fee-desc') {
        return (b.fee || 0) - (a.fee || 0);
      }
      if (filters.sortBy === 'fee-asc') {
        return (a.fee || 0) - (b.fee || 0);
      }
      if (filters.sortBy === 'title-asc') {
        return a.title.localeCompare(b.title);
      }
      if (filters.sortBy === 'created-desc') {
        return (b.createdAt || '').localeCompare(a.createdAt || '');
      }
      return 0;
    });
  }, [cases, filters]);

  return (
    <div>
      {/* Results Header Count */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-slate-900">
            Catálogo de Casos Legales
          </h2>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            {filteredCases.length} {filteredCases.length === 1 ? 'caso' : 'casos'}
          </span>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 hover:underline"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Registrar nuevo expediente</span>
        </button>
      </div>

      {/* Grid of Cards */}
      {filteredCases.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {filteredCases.map(c => (
            <CaseCard key={c.id} legalCase={c} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center my-6">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <SearchX className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1">
            No se encontraron casos con los filtros aplicados
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-5">
            Intenta cambiar los términos de búsqueda, los filtros de estado o la fecha de vencimiento seleccionada.
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm shadow-indigo-200"
          >
            <Plus className="w-4 h-4" />
            <span>Crear un nuevo caso legal</span>
          </button>
        </div>
      )}
    </div>
  );
};
