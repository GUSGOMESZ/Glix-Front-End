import { Code2, LogOut, Plus, Search, Settings, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  setShowNewPostModal: (show: boolean) => void;
  avatar: string;
  username: string;
}

export function Navbar({ setShowNewPostModal, avatar, username }: NavbarProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("fullname");

    navigate("/signin");
  }

  return (
    <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-700 p-2 rounded-lg shadow-lg">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-indigo-400">Glix</h1>
          </div>

          <div className="flex-1 max-w-xl mx-8 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar discussões, tecnologias..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowNewPostModal(true)}
              className="bg-indigo-700 hover:bg-indigo-800 text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:block">Nova Conversa</span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <div className="w-8 h-8 bg-indigo-700 rounded-lg flex items-center justify-center text-white font-medium">
                  {avatar}
                </div>
                <span className="text-white font-medium hidden sm:block">
                  {username}
                </span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
                  <div className="p-4 border-b border-gray-700">
                    <p className="text-white font-medium">{username}</p>
                  </div>
                  <div className="py-2">
                    <a
                      href="#"
                      className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span>Perfil</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Configurações</span>
                    </a>
                    <hr className="border-gray-700 my-2" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-4 py-2 text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors w-full-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sair</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
