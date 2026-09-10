import React, { useState } from 'react';
import { 
  X, 
  Scale, 
  User, 
  Building2, 
  DollarSign, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { useLegalContext } from '../context/LegalContext';
import { CaseStatus, PaymentStatus, EventType, Priority } from '../types';

export const CaseFormModal: React.FC = () => {
  const { isAddModalOpen, setIsAddModalOpen, addCase } = useLegalContext();

  // Mandatory fields as requested
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<CaseStatus>('Abierto');
  const [fee, setFee] = useState<string>('');
  const [isPaid, setIsPaid] = useState<boolean>(false);

  // Additional practical fields
  const [client, setClient] = useState('');
  const [defendant, setDefendant] = useState('');
  const [expedienteNumber, setExpedienteNumber] = useState('');
  const [court, setCourt] = useState('');
  const [category, setCategory] = useState<'Laboral' | 'Civil y Comercial' | 'Familia' | 'Penal' | 'Sucesiones' | 'Contencioso Administrativo'>('Civil y Comercial');
  const [nextDeadline, setNextDeadline] = useState(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [nextDeadlineTime, setNextDeadlineTime] = useState('10:00');
  const [deadlineType, setDeadlineType] = useState<EventType>('Vencimiento de Plazo');
  const [priority, setPriority] = useState<Priority>('Media');
  
  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isAddModalOpen) return null;

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!title.trim()) {
      errs.title = 'El título del caso es obligatorio';
    }
    if (!description.trim()) {
      errs.description = 'La descripción detallada es obligatoria';
    }
    if (!status) {
      errs.status = 'Debe seleccionar un estado';
    }
    if (!fee || isNaN(Number(fee)) || Number(fee) < 0) {
      errs.fee = 'Ingrese un monto numérico válido para honorarios';
    }
    if (!client.trim()) {
      errs.client = 'El nombre del cliente es requerido';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const generatedExp = expedienteNumber.trim() 
      ? expedienteNumber.trim() 
      : `EXP-${Math.floor(1000 + Math.random() * 9000)}/${new Date().getFullYear()}`;

    addCase({
      title: title.trim(),
      description: description.trim(),
      status,
      fee: parseFloat(fee),
      currency: '$',
      paymentStatus: isPaid ? 'Pagado' : 'Pendiente',
      paymentDate: isPaid ? new Date().toISOString().split('T')[0] : undefined,
      client: client.trim(),
      defendant: defendant.trim() || 'A determinar',
      court: court.trim() || 'Juzgado a asignar',
      expedienteNumber: generatedExp,
      category,
      nextDeadline,
      nextDeadlineTime,
      deadlineType,
      priority,
      notes: [`Caso creado el ${new Date().toLocaleDateString('es-AR')}`]
    });

    // Reset & Close
    setTitle('');
    setDescription('');
    setStatus('Abierto');
    setFee('');
    setIsPaid(false);
    setClient('');
    setDefendant('');
    setCourt('');
    setExpedienteNumber('');
    setErrors({});
    setIsAddModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">Carga de Nuevo Caso Legal</h3>
              <p className="text-xs text-slate-300">Complete los campos obligatorios del expediente</p>
            </div>
          </div>
          <button
            onClick={() => setIsAddModalOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          
          {/* Section 1: Required Fields Banner */}
          <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-100 flex items-center gap-2 text-xs text-indigo-900">
            <AlertCircle className="w-4 h-4 text-indigo-600 flex-shrink-0" />
            <span>Los campos marcados con <strong className="text-rose-600">*</strong> son obligatorios para la apertura del caso.</span>
          </div>

          {/* Campo Obligatorio 1: Título */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Título del Caso <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Ej. Demanda por Despido Injustificado - Gómez c/ TechCorp SA"
              className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                errors.title ? 'border-rose-400 focus:border-rose-500 bg-rose-50/30' : 'border-slate-200 focus:border-indigo-500'
              }`}
            />
            {errors.title && <p className="text-rose-600 text-[11px] mt-1 font-medium">{errors.title}</p>}
          </div>

          {/* Cliente y Contraparte */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                Cliente / Representado <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={client}
                  onChange={e => setClient(e.target.value)}
                  placeholder="Ej. Marcelo Gómez"
                  className={`w-full pl-9 pr-3 py-2 bg-slate-50 border rounded-xl text-xs sm:text-sm ${
                    errors.client ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-indigo-500'
                  }`}
                />
              </div>
              {errors.client && <p className="text-rose-600 text-[11px] mt-1">{errors.client}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                Demandado / Contraparte
              </label>
              <input
                type="text"
                value={defendant}
                onChange={e => setDefendant(e.target.value)}
                placeholder="Ej. TechCorp Soluciones SA"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Campo Obligatorio 2: Descripción Detallada */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Descripción Detallada <span className="text-rose-600">*</span>
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Describa los hechos principales, fundamentos jurídicos, pretensión y estrategia procesal..."
              className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                errors.description ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-indigo-500'
              }`}
            />
            {errors.description && <p className="text-rose-600 text-[11px] mt-1 font-medium">{errors.description}</p>}
          </div>

          {/* Campo Obligatorio 3: Estado del Caso */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                Estado del Caso <span className="text-rose-600">*</span>
              </label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as CaseStatus)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:border-indigo-500 cursor-pointer"
              >
                <option value="Abierto">Abierto</option>
                <option value="En mediación">En mediación</option>
                <option value="En juicio">En juicio</option>
                <option value="Cerrado">Cerrado</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                Fuero / Materia
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:border-indigo-500 cursor-pointer"
              >
                <option value="Civil y Comercial">Civil y Comercial</option>
                <option value="Laboral">Laboral</option>
                <option value="Familia">Familia</option>
                <option value="Penal">Penal</option>
                <option value="Sucesiones">Sucesiones</option>
                <option value="Contencioso Administrativo">Contencioso Administrativo</option>
              </select>
            </div>
          </div>

          {/* Expediente y Juzgado */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                N° de Expediente
              </label>
              <input
                type="text"
                value={expedienteNumber}
                onChange={e => setExpedienteNumber(e.target.value)}
                placeholder="Ej. EXP-4921/2026 (opcional)"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                Juzgado / Tribunal
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={court}
                  onChange={e => setCourt(e.target.value)}
                  placeholder="Ej. Juzgado Nac. del Trabajo N° 14"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Campo Obligatorio 4: Honorarios & Campo Obligatorio 5: Estado de Pago */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-indigo-600" />
              Condiciones Económicas & Honorarios
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              
              {/* Monto numérico de honorarios */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Honorarios ($ ARS) <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">$</span>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={fee}
                    onChange={e => setFee(e.target.value)}
                    placeholder="1500000"
                    className={`w-full pl-8 pr-3 py-2.5 bg-white border rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none ${
                      errors.fee ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-indigo-500'
                    }`}
                  />
                </div>
                {errors.fee && <p className="text-rose-600 text-[11px] mt-1 font-medium">{errors.fee}</p>}
              </div>

              {/* Checkbox / Toggle para Estado de Pago (Pagado/No Pagado) */}
              <div className="pt-2 sm:pt-4">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Estado de Pago <span className="text-rose-600">*</span>
                </label>
                <div 
                  onClick={() => setIsPaid(!isPaid)}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                    isPaid 
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
                      : 'bg-white border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={isPaid}
                      onChange={() => {}} // handled by parent div
                      className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                    />
                    <span className="text-xs font-bold">
                      {isPaid ? 'Honorarios PAGADOS' : 'Honorarios PENDIENTES de cobro'}
                    </span>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    isPaid ? 'bg-emerald-200 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {isPaid ? 'Al día' : 'Por percibir'}
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Próximo Vencimiento / Audiencia */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-indigo-600" />
              Próximo Hito Procesal / Audiencia
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Tipo de Acto</label>
                <select
                  value={deadlineType}
                  onChange={e => setDeadlineType(e.target.value as EventType)}
                  className="w-full px-2.5 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium"
                >
                  <option value="Audiencia">Audiencia</option>
                  <option value="Vencimiento de Plazo">Vencimiento de Plazo</option>
                  <option value="Presentación de Pruebas">Presentación de Pruebas</option>
                  <option value="Alegatos">Alegatos</option>
                  <option value="Mediación Judicial">Mediación Judicial</option>
                  <option value="Peritaje">Peritaje</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Fecha</label>
                <input
                  type="date"
                  value={nextDeadline}
                  onChange={e => setNextDeadline(e.target.value)}
                  className="w-full px-2.5 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Hora</label>
                <input
                  type="time"
                  value={nextDeadlineTime}
                  onChange={e => setNextDeadlineTime(e.target.value)}
                  className="w-full px-2.5 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium"
                />
              </div>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-bold shadow-md shadow-indigo-200 transition-all"
            >
              Guardar y Dar de Alta Caso
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
