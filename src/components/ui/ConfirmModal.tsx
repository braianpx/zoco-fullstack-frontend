import type { FC } from "react";
import { ModalLayout } from "./ModalLayout";
import { Button } from "./Button";

type ConfirmDeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  subtitle?: string;
  actionText?: string;
  isLoading?: boolean;
};

export const ConfirmModal: FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  subtitle,
  actionText,
  isLoading,
}) => {
  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} maxWidth="max-w-md">
      <div className="text-center space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">{title ?? "Eliminar usuario?"}</h2>

        <p className="text-slate-500">{subtitle ?? "Esta accion no se puede deshacer."}</p>

        <div className="flex justify-center gap-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>

          <Button type="button" disabled={isLoading} variant="primary" onClick={onConfirm}>
            {actionText}
          </Button>
        </div>
      </div>
    </ModalLayout>
  );
};
