import { useState } from "react";
import { useStudyGetters } from "../hooks/useStudyGetters";
import { useStudyMutations } from "../hooks/useStudyMutations";
import { StudyForm } from "../components/forms/StudyForm";
import { Card } from "../components/ui/Card"; 
import { Button } from "../components/ui/Button";
import { Trash2, Edit3, Plus, X, GraduationCap, Calendar } from "lucide-react"; 
import type { StudyResponse, StudyCreate } from "../types/study.types";

export const Study = ({ userId, isAdmin }: { userId: number | null, isAdmin: boolean }) => {
  const [editingStudy, setEditingStudy] = useState<StudyResponse | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  const { studies, isLoading } = useStudyGetters(userId, isAdmin);
  const { createStudyMutation, updateStudyMutation, deleteStudyMutation } = useStudyMutations();

  // Definición de displayUserName para evitar el error "Cannot find name"
  const displayUserName = studies.length > 0 ? studies[0].userName : "Mi Perfil";

  const closeForm = () => {
    setIsAdding(false);
    setEditingStudy(null);
  };

  const handleSubmit = async (data: StudyCreate) => {
    const payload = { ...data, endDate: data.endDate === "" ? null : data.endDate };
    if (editingStudy) {
      await updateStudyMutation.mutateAsync({ data: payload, studyId: editingStudy.id });
    } else {
      await createStudyMutation.mutateAsync(payload);
    }
    closeForm();
  };

  if (isLoading) return <div className="p-20 text-center animate-pulse text-slate-400 font-bold">Cargando estudios...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10 animate-in fade-in duration-700">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-100 pb-8 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full mb-3 border border-indigo-100">
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
            <span className="text-xs font-bold uppercase tracking-[0.15em]">{displayUserName}</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Estudios</h1>
          <p className="text-slate-500 mt-1">Tu trayectoria académica y formación profesional.</p>
        </div>
        <Button 
          variant={isAdding || editingStudy ? "ghost" : "primary"}
          onClick={() => (isAdding || editingStudy ? closeForm() : setIsAdding(true))}
          className="w-full md:w-auto shadow-xl shadow-indigo-100"
        >
          {isAdding || editingStudy ? <X size={20} /> : <Plus size={20} />}
          {isAdding || editingStudy ? "Cancelar" : "Nuevo Estudio"}
        </Button>
      </header>

      {/* Form Section */}
      {(isAdding || editingStudy) && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500">
          <Card title={editingStudy ? "Editar Información" : "Registrar Estudio"}>
            <StudyForm 
            onSubmit={handleSubmit}
            isLoading={createStudyMutation.isPending || updateStudyMutation.isPending}
            isEditing={!!editingStudy}
            defaultValues={editingStudy ? {
              ...editingStudy,
              // Convertimos a string ISO y cortamos para obtener solo YYYY-MM-DD
              startDate: new Date(editingStudy.startDate).toISOString().split('T')[0],
              endDate: editingStudy.endDate 
                ? new Date(editingStudy.endDate).toISOString().split('T')[0] 
                : null,
              userName: displayUserName
            } : { userName: displayUserName }} 
            />
          </Card>
        </div>
      )}

      {/* Grid de Estudios */}
      <div className="grid gap-6 md:grid-cols-2">
        {studies.map((study) => (
          <div key={study.id} className="group relative bg-white border border-slate-200 rounded-[2.5rem] p-8 hover:shadow-2xl hover:border-indigo-100 transition-all duration-500">      
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                <GraduationCap size={28} />
              </div>
              
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button onClick={() => setEditingStudy(study)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                  <Edit3 size={20} />
                </button>
                <button onClick={() => confirm("¿Eliminar?") && deleteStudyMutation.mutate(study.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">{study.degree}</h3>
              <p className="text-indigo-600 font-semibold">{study.institution}</p>
            </div>

            <div className="mt-8 flex items-center gap-4 text-xs font-bold text-slate-400 bg-slate-50 px-4 py-2 rounded-xl w-fit border border-slate-100">
              <Calendar size={14} />
              <span>{new Date(study.startDate).getFullYear()} — {study.endDate ? new Date(study.endDate).getFullYear() : "Actualidad"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
