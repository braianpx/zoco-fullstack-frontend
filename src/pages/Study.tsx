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
console.log(studies)
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Estudios</h1>
          <p className="text-slate-500 mt-1">Gestiona tu formación académica y certificaciones.</p>
        </div>
        <Button 
          variant={isAdding || editingStudy ? "ghost" : "primary"}
          onClick={() => (isAdding || editingStudy ? closeForm() : setIsAdding(true))}
          className="flex items-center gap-2"
        >
          {isAdding || editingStudy ? <X size={20} /> : <Plus size={20} />}
          {isAdding || editingStudy ? "Cancelar" : "Agregar Estudio"}
        </Button>
      </div>

      {/* Form Section */}
      {(isAdding || editingStudy) && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-300">
          <Card title={editingStudy ? "Actualizar Información" : "Registrar nuevo estudio"}>
            <StudyForm 
              onSubmit={handleSubmit}
              isLoading={createStudyMutation.isPending || updateStudyMutation.isPending}
              isEditing={!!editingStudy}
              defaultValues={editingStudy ? {
                degree: editingStudy.degree,
                institution: editingStudy.institution,
                startDate: new Date(editingStudy.startDate).toISOString().split('T')[0],
                endDate: editingStudy.endDate ? new Date(editingStudy.endDate).toISOString().split('T')[0] : null
              } : undefined}
            />
          </Card>
        </div>
      )}

      {/* Grid de Estudios */}
      <div className="grid gap-6 md:grid-cols-2">
        {studies.map((study) => (
          <div key={study.id} className="group relative bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:border-indigo-100 transition-all duration-300">      
            <div className="flex justify-between items-start">
              <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                <GraduationCap size={24} />
              </div>
                {isAdmin && (
                <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full uppercase tracking-tighter">
                  user: {study.userName}
                </span>
                )}
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => setEditingStudy(study)}
                  className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                >
                  <Edit3 size={18} />
                </button>
                <button 
                  onClick={() => confirm("¿Deseas eliminar este estudio?") && deleteStudyMutation.mutate(study.id)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-xl font-bold text-slate-800 leading-tight">{study.degree}</h3>
              <p className="text-indigo-600 font-medium mt-1">{study.institution}</p>
            </div>

            <div className="mt-6 flex items-center gap-4 text-sm text-slate-500 bg-slate-50 p-3 rounded-lg">
              <div className="flex items-center gap-1.5">
                <Calendar size={14} />
                <span>{new Date(study.startDate).getFullYear()}</span>
              </div>
              <span>—</span>
              <span>{study.endDate ? new Date(study.endDate).getFullYear() : "Actualidad"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
