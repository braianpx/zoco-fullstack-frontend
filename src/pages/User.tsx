import { useState } from "react";
import { useUserDetail, useUserGetters, useUserMutations } from "../hooks/user";
import { useAuth } from "../context/auth/useAuth";
import { type UserFormType } from "../components/forms/UserForm";
import { Button } from "../components/ui/Button";
import { Plus } from "lucide-react";
import type { UserResponse, UserCreate, UserUpdate } from "../types/user.types";
import { AsyncBoundary } from "../components/ui/AsyncBoundary";
import { UsersGrid } from "../components/UsersGrid";
import { HeaderSection } from "../components/ui/HeaderSection";
import { UserDetailModal } from "../components/modals/UserDetailModal";
import { ConfirmModal } from "../components/ui/ConfirmModal";

export const User = () => {
  const { user } = useAuth();
  const { users, isLoading: isLoadingList, isError: isGettersError } = useUserGetters(user);
  const {
    createUserMutation,
    updateUserMutation,
    deleteUserMutation,
    isPending,
    isError: isMutationError,
  } = useUserMutations();

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmEditOpen, setIsConfirmEditOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [pendingUpdateData, setPendingUpdateData] = useState<UserFormType | null>(null);

  const { data: detailedUser, isLoading: isLoadingDetail } = useUserDetail(selectedUserId);

  const isError = isGettersError ?? isMutationError;

  const handleAction = async (data: UserFormType) => {
    if (selectedUserId) {
      setPendingUpdateData(data);
      setIsConfirmEditOpen(true);
      return;
    }

    await createUserMutation.mutateAsync(data as UserCreate);
    closeModal();
  };

  const handleConfirmEdit = async (data: UserFormType | null) => {
    if (!selectedUserId || !data) return;

    const userId = selectedUserId;
    const payload = data as UserUpdate;

    // Close detail/query context first so no userDetail refetch is triggered.
    setIsConfirmEditOpen(false);
    setPendingUpdateData(null);
    setIsModalOpen(false);
    setSelectedUserId(null);

    await updateUserMutation.mutateAsync({
      data: payload,
      userId,
    });
  };

  const handleConfirmDelete = async () => {
    if (!selectedUserId) return;
    await deleteUserMutation.mutateAsync(selectedUserId);
    setIsConfirmDeleteOpen(false);
    closeModal();
  }

  const openCreate = () => {
    setSelectedUserId(null);
    setIsModalOpen(true);
  };

  const openEdit = (targetUser: UserResponse) => {
    setSelectedUserId(targetUser.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUserId(null);
    setPendingUpdateData(null);
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10">
      <HeaderSection
        title="Directorio"
        subtitle="Gestion de perfiles y formacion academica."
        className="sm:flex-row items-center sm:items-end"
        actions={
          <Button onClick={openCreate} className="rounded-full shadow-lg">
            <Plus size={20} className="mr-2" /> Nuevo Usuario
          </Button>
        }
      />

      <AsyncBoundary
        isLoading={isLoadingList}
        isError={!!isError}
        data={users}
        loadingMessage="Cargando usuarios..."
        errorMessage={isError ?? "No pudimos obtener la informacion de los usuarios."}
        emptyMessage="Todavia no hay usuarios registrados."
      />

      <UserDetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleAction}
        isLoadingDetail={isLoadingDetail}
        isLoading={isPending}
        isEditing={!!selectedUserId}
        detailedUser={detailedUser ?? undefined}
      />

      <UsersGrid
        users={users}
        onEdit={openEdit}
        onDelete={(id) => {
          setSelectedUserId(id);
          setIsConfirmDeleteOpen(true);
        }}
      />

      {/* Modal eliminar */}
      <ConfirmModal
        isOpen={isConfirmDeleteOpen}
        onClose={() => {
          setIsConfirmDeleteOpen(false);
          setSelectedUserId(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Eliminar usuario"
        subtitle="Estas seguro de que quieres eliminar este usuario?"
        actionText="Eliminar"
        isLoading={isPending}
      />

      {/* Modal actualizar */}
      <ConfirmModal
        isOpen={isConfirmEditOpen}
        onClose={() => {
          setIsConfirmEditOpen(false);
          setPendingUpdateData(null);
          setSelectedUserId(null);
        }}
        onConfirm={() => handleConfirmEdit(pendingUpdateData)}
        title="Actualizar usuario"
        subtitle="Estas seguro de que quieres actualizar este usuario?"
        actionText="Actualizar"
        isLoading={isPending}
      />
    </div>
  );
};
