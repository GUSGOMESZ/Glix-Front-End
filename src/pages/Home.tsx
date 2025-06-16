import { useState } from "react";
import {
  Code2,
  Search,
  Bell,
  User,
  MessageCircle,
  Heart,
  Share2,
  MoreHorizontal,
  TrendingUp,
  Calendar,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

export function Home() {
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Mock data para as conversas
  const conversations = [
    {
      id: 1,
      author: {
        name: "Ana Silva",
        username: "ana_dev",
        avatar: "AS",
      },
      title: "Como implementar autenticação JWT no React?",
      excerpt:
        "Estou tentando implementar autenticação JWT no meu projeto React e estou enfrentando alguns problemas com o refresh token...",
      tags: ["React", "JWT", "Autenticação"],
      replies: 12,
      likes: 28,
      timeAgo: "2h",
      isHot: true,
    },
    {
      id: 2,
      author: {
        name: "Carlos Mendes",
        username: "carlos_backend",
        avatar: "CM",
      },
      title: "Otimização de queries no PostgreSQL",
      excerpt:
        "Pessoal, alguém tem dicas para otimizar queries complexas no PostgreSQL? Tenho uma consulta que está demorando muito...",
      tags: ["PostgreSQL", "Performance", "Database"],
      replies: 8,
      likes: 15,
      timeAgo: "4h",
      isHot: false,
    },
    {
      id: 3,
      author: {
        name: "Mariana Costa",
        username: "mari_frontend",
        avatar: "MC",
      },
      title: "Melhores práticas para CSS Grid vs Flexbox",
      excerpt:
        "Quando vocês preferem usar CSS Grid ao invés de Flexbox? Estou refatorando um layout e não sei qual escolher...",
      tags: ["CSS", "Grid", "Flexbox", "Frontend"],
      replies: 20,
      likes: 45,
      timeAgo: "6h",
      isHot: true,
    },
    {
      id: 4,
      author: {
        name: "Pedro Santos",
        username: "pedro_devops",
        avatar: "PS",
      },
      title: "Deploy automatizado com GitHub Actions",
      excerpt:
        "Configurei um pipeline de CI/CD com GitHub Actions para deploy automático. Vou compartilhar o que aprendi...",
      tags: ["DevOps", "GitHub Actions", "CI/CD"],
      replies: 6,
      likes: 22,
      timeAgo: "8h",
      isHot: false,
    },
    {
      id: 5,
      author: {
        name: "Julia Oliveira",
        username: "julia_mobile",
        avatar: "JO",
      },
      title: "React Native vs Flutter em 2025",
      excerpt:
        "Análise comparativa entre React Native e Flutter baseada na minha experiência com ambos em projetos reais...",
      tags: ["React Native", "Flutter", "Mobile"],
      replies: 35,
      likes: 78,
      timeAgo: "12h",
      isHot: true,
    },
  ];

  const trendingTopics = [
    { name: "React", posts: 342 },
    { name: "TypeScript", posts: 298 },
    { name: "Node.js", posts: 256 },
    { name: "Python", posts: 234 },
    { name: "Next.js", posts: 189 },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">Glix</h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-8 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar discussões, tecnologias..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-white transition-colors relative">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-medium">
                    JD
                  </div>
                  <span className="text-white font-medium hidden sm:block">
                    João Dev
                  </span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
                    <div className="p-4 border-b border-gray-700">
                      <p className="text-white font-medium">João Dev</p>
                      <p className="text-gray-400 text-sm">@joao_dev</p>
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
                      <a
                        href="#"
                        className="flex items-center space-x-2 px-4 py-2 text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sair</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Esquerda */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            {/* Profile Card */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                  JD
                </div>
                <div>
                  <h3 className="text-white font-semibold">João Dev</h3>
                  <p className="text-gray-400 text-sm">@joao_dev</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-white font-semibold">142</p>
                  <p className="text-gray-400 text-xs">Posts</p>
                </div>
                <div>
                  <p className="text-white font-semibold">1.2k</p>
                  <p className="text-gray-400 text-xs">Seguidores</p>
                </div>
                <div>
                  <p className="text-white font-semibold">284</p>
                  <p className="text-gray-400 text-xs">Seguindo</p>
                </div>
              </div>
              <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors font-medium">
                Ver Perfil
              </button>
            </div>

            {/* Trending Topics */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <h3 className="text-white font-semibold">Trending</h3>
              </div>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="text-gray-300 hover:text-blue-400 cursor-pointer transition-colors">
                      #{topic.name}
                    </span>
                    <span className="text-gray-500 text-sm">{topic.posts}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            {/* New Post Button */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 mb-6">
              <button className="w-full text-left px-4 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-gray-400 transition-colors">
                No que você está pensando hoje?
              </button>
            </div>

            {/* Conversations Feed */}
            <div className="space-y-4">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:bg-gray-900/70 transition-colors cursor-pointer"
                >
                  {/* Author Info */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-medium">
                        {conversation.author.avatar}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-white font-medium">
                            {conversation.author.name}
                          </h4>
                          <span className="text-gray-400 text-sm">
                            @{conversation.author.username}
                          </span>
                          <span className="text-gray-500 text-sm">•</span>
                          <span className="text-gray-500 text-sm">
                            {conversation.timeAgo}
                          </span>
                          {conversation.isHot && (
                            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                              Hot
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Title */}
                  <h2 className="text-white text-lg font-semibold mb-2 hover:text-blue-400 transition-colors">
                    {conversation.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-300 mb-4 line-clamp-2">
                    {conversation.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {conversation.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-800 text-blue-400 text-sm px-3 py-1 rounded-full hover:bg-gray-700 cursor-pointer transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm">{conversation.replies}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors">
                        <Heart className="w-5 h-5" />
                        <span className="text-sm">{conversation.likes}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors">
                        <Share2 className="w-5 h-5" />
                        <span className="text-sm">Compartilhar</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-8">
              <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors border border-gray-700">
                Carregar mais discussões
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
