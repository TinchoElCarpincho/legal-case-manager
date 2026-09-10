import React from 'react';
import { Search, Filter, X, ArrowUpDown, Calendar, CheckCircle2, Clock } from 'lucide-react';
import { useLegalContext } from '../context/LegalContext';
import { CaseStatus, PaymentStatus } from '../types';

export const FiltersBar: React.FC = () => {
  const { filters, setFilters } = useLegalContext();


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchTerm: e.target.value }));
  };

  const handleStatusChange = (status: string) => {
    setFilters(prev => ({ ...prev, statusFilter: status }));
  };

  const handlePaymentChange = (payment: string) => {
    setFilters(prev => ({ ...prev, paymentFilter: payment }));
  };

  const handleDateRangeChange = (range: any) => {
    setFilters(prev => ({ ...prev, dateRange: range }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, sortBy: e.target.value as any }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      statusFilter: 'Todos',
      paymentFilter: 'Todos',
      categoryFilter: 'Todos',
      sortBy: 'deadline-asc',
      dateRange: 'all'
    });
  };

  const isFiltered = filters.searchTerm !== '' || 
    filters.statusFilter !== 'Todos' || 
    filters.paymentFilter !== 'Todos' || 
    filters.dateRange !== 'all';

  const statusOptions: ('Todos' | CaseStatus)[] = ['Todos', 'Abierto', 'En mediación', 'En juicio', 'Cerrado'];
  const paymentOptions: ('Todos' | PaymentStatus)[] = ['Todos', 'Pagado', 'Pendiente'];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 mb-6 shadow-xs space-y-3.5">
      
      {/* Top row: Search input + Sorting select + Clear Button */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        
        {/* Search input with clean design */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={filters.searchTerm}
            onChange={handleSearchChange}
            placeholder="Buscar por carátula, cliente, demandado o N° de expediente..."
            className="w-full pl-10 pr-9 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
          {filters.searchTerm && (
            <button
              onClick={() => setFilters(prev => ({ ...prev, searchTerm: '' }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="text-xs text-slate-500 hidden sm:inline">Ordenar:</span>
            <select
              value={filters.sortBy}
              onChange={handleSortChange}
              className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer pr-2"
            >
              <option value="deadline-asc">Próximo vencimiento (urgente)</option>
              <option value="deadline-desc">Vencimiento más lejano</option>
              <option value="fee-desc">Mayor honorario</option>
              <option value="fee-asc">Menor honorario</option>
              <option value="title-asc">Título (A-Z)</option>
              <option value="created-desc">Fecha de alta reciente</option>
            </select>
          </div>

          {isFiltered && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-2 rounded-xl transition-colors font-semibold"
              title="Restablecer todos los filtros"
            >
              <X className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Limpiar filtros</span>
            </button>
          )}
        </div>

      </div>

      {/* Bottom row: Filter Pills for Status, Payment & Date Range */}
      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-3 justify-between">
        
        {/* Status filters */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Estado:
          </span>
          {statusOptions.map(st => (
            <button
              key={st}
              onClick={() => handleStatusChange(st)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                filters.statusFilter === st
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Payment filters */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1">
            Pago:
          </span>
          {paymentOptions.map(p => (
            <button
              key={p}
              onClick={() => handlePaymentChange(p)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                filters.paymentFilter === p
                  ? p === 'Pagado'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : p === 'Pendiente'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-slate-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              {p === 'Pagado' && <CheckCircle2 className="w-3 h-3" />}
              {p === 'Pendiente' && <Clock className="w-3 h-3" />}
              <span>{p}</span>
            </button>
          ))}
        </div>

        {/* Date Range filter */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
            <Calendar className="w-3 h-3" /> Vencimiento:
          </span>
          <div className="inline-flex rounded-lg p-0.5 bg-slate-100 border border-slate-200">
            <button
              onClick={() => handleDateRangeChange('all')}
              className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition-all ${
                filters.dateRange === 'all' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => handleDateRangeChange('today')}
              className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition-all ${
                filters.dateRange === 'today' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-500'
              }`}
            >
              Hoy
            </button>
            <button
              onClick={() => handleDateRangeChange('this-week')}
              className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition-all ${
                filters.dateRange === 'this-week' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-500'
              }`}
            >
              7 días
            </button>
            <button
              onClick={() => handleDateRangeChange('this-month')}
              className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition-all ${
                filters.dateRange === 'this-month' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500'
              }`}
            >
              Este mes
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
