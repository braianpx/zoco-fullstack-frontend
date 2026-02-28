import { useUserDetail } from "../hooks/user";
import { ProfileForm } from "../components/forms/ProfileForm";
import { HeaderSection } from "../components/ui/HeaderSection";
import { ProfileStats } from "../components/ProfileStats";
import { useAuth } from "../context/auth/useAuth";
import { AsyncBoundary } from "../components/ui/AsyncBoundary";

export const Profile = () => {
  const { user } = useAuth();
  const userId = user?.id as number;

  const { data, isLoading, isError } = useUserDetail(userId);

  return (
    <div className="max-w-5xl mx-auto py-10 px-6 animate-in fade-in duration-700">
      <HeaderSection
        title="Ajustes de Perfil"
        subtitle="Gestiona tu informacion personal y los datos de tu cuenta."
        className="mb-10 pb-0 border-b-0 gap-3"
        titleClassName="text-3xl font-extrabold"
        subtitleClassName="mt-2 text-lg"
      />

      <AsyncBoundary
        isLoading={isLoading}
        isError={!!isError}
        data={data}
        loadingMessage="Cargando perfil..."
        errorMessage={isError ?? "No pudimos obtener la informacion de tu perfil."}
        emptyMessage="Todavia no hay datos disponibles."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">{data && <ProfileForm user={data} />}</div>

        <ProfileStats roleName={data?.roleName} createdAt={data?.createdAt} />
      </div>
    </div>
  );
};
