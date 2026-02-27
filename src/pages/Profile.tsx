import { useUserDetail } from "../hooks/user"; // Cambiado a useUserDetail
import { ProfileForm } from "../components/forms/ProfileForm";
import { HeaderSection } from "../components/ui/HeaderSection";
import { ProfileStats } from "../components/ProfileStats";
import { LoadingSkeleton } from "../components/ui/LoadingSkeleton";
import { SectionError } from "../components/ui/SectionError";
import { useAuth } from "../context/auth/useAuth";

export const Profile = () => {
  const { user } = useAuth();
  
  // Usamos el hook específico para detalle
  const { data, isLoading, isError } = useUserDetail(user?.id as number);

  if (isLoading) return <LoadingSkeleton messageLoading="Cargando perfil..." />;

  if (isError) return <SectionError message="No pudimos obtener la información de tu perfil." />;

  return (
    <div className="max-w-5xl mx-auto py-10 px-6 animate-in fade-in duration-700">
      <HeaderSection />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          {data && <ProfileForm user={data} />}
        </div>

        <ProfileStats 
          roleName={data?.roleName} 
          createdAt={data?.createdAt} 
        />
      </div>
    </div>
  );
};
