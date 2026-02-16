import { useState, type FC } from "react";
import { LoginForm } from "./forms/LoginForm";
import { RegisterForm } from "./forms/RegisterForm";

export const AuthPanel: FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const handleToggle = (): void => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className="w-full max-w-md bg-white border border-[#E5E7EB] rounded-2xl shadow-sm p-8 transition-all duration-300">
      
      <div className="mb-6 text-center">
        <h2 className="text-4xl font-bold text-[#111827]">
          {isLogin ? "Bienvenido" : "Crear cuenta"}
        </h2>

        <p className="text-sm text-[#6B7280] mt-1">
          {isLogin
            ? "Ingresa tus credenciales para continuar"
            : "Completa los datos para registrarte"}
        </p>
      </div>

      {isLogin ? <LoginForm /> : <RegisterForm />}

      <div className="mt-6 text-center text-sm text-[#6B7280]">
        <span>
          {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
        </span>

        <button
          type="button"
          onClick={handleToggle}
          className="ml-2 text-[#6366F1] hover:underline font-medium"
        >
          {isLogin ? "Crear una" : "Iniciar sesión"}
        </button>
      </div>
    </div>
  );
};
