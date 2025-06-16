import React, { useState } from "react";
import { Eye, EyeOff, Code2, Mail } from "lucide-react";
import { SIGN_IN } from "../graphql/queries/SignIn";
import { useLazyQuery } from "@apollo/client";
import { useToken } from "../hooks/useToken";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, _setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { setToken } = useToken();

  const [signIn] = useLazyQuery(SIGN_IN, {
    onCompleted: (data) => {
      if (data?.signIn?.token) {
        setToken(data.signIn.token);
        localStorage.setItem("userEmail", data.signIn.email);
        localStorage.setItem("userId", data.signIn.id);
        localStorage.setItem("userName", data.signIn.name);

        navigate("/home");
      } else {
        setErrorMessage("Credenciais inválidas. Verifique e tente novamente.");
      }
    },
    onError: () => {
      setErrorMessage("Credenciais inválidas...");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage("");

    signIn({ variables: { email, password } });
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>

      <div className="relative w-full max-w-md">
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2.5 rounded-xl">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Glix</h1>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="seu@email.com"
                  required
                />
                <Mail className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-12"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded animate-shake dark:bg-red-900/30 dark:text-red-200">
                <p className="text-red-700 text-sm font-medium dark:text-red-200">
                  {errorMessage}
                </p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Entrar"
              )}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Não tem uma conta?{" "}
              <a
                href="signup"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Cadastre-se
              </a>
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            © 2025 Glix. Feito para desenvolvedores, por desenvolvedores.
          </p>
        </div>
      </div>
    </div>
  );
}
