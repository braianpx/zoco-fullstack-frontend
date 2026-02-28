import { User as UserIcon } from "lucide-react";
import { ModalLayout } from "../ui/ModalLayout";
import { UserForm, type UserFormType } from "../forms/UserForm";
import type { UserResponse } from "../../types/user.types";
import { AsyncBoundary } from "../ui/AsyncBoundary";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormType) => void;
  isLoading: boolean;
  isEditing: boolean;
  isLoadingDetail: boolean;
  detailedUser?: UserResponse;
}

export const UserDetailModal = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  isEditing,
  isLoadingDetail,
  detailedUser,
}: UserModalProps) => {
  return (
    <ModalLayout isOpen={isOpen} onClose={onClose}>
      {/* HEADER */}
      <div className="flex sm:justify-between justify-center items-start mb-8">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="p-4 bg-indigo-600 text-white rounded-3xl shadow-lg">
            <UserIcon size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900">
              {isEditing ? "Editar Usuario" : "Nuevo Usuario"}
            </h2>
            <p className="text-slate-400 font-medium">
              Información detallada del usuario.
            </p>
          </div>
        </div>
      </div>

      {/* Manejador de estados de datos */}
      <AsyncBoundary
        isLoading={isEditing && isLoadingDetail}
        data={detailedUser}
        loadingMessage="Cargando usuario..."
        emptyMessage="No se encontro el usuario."
      >
      {/* BODY */}
        <UserForm
          onSubmit={onSubmit}
          isLoading={isLoading}
          isEditing={isEditing}
          defaultValues={detailedUser ?? undefined}
        />
      </AsyncBoundary>
    </ModalLayout>
  );
};
