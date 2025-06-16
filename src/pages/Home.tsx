import React, { useState } from "react";
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
  Plus,
  Edit3,
  Filter,
  Bookmark,
  Eye,
} from "lucide-react";
import { useMutation, useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import { CREATE_POST } from "../graphql/mutations/CreatePost";
import { LIST_POSTS } from "../graphql/queries/ListPosts";

export function Home() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const {
    data: data_list_posts,
    loading: loading_list_posts,
    error: error_list_posts,
  } = useQuery(LIST_POSTS);
  const [createPost] = useMutation(CREATE_POST);

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
      views: 156,
      timeAgo: "2h",
      isHot: true,
      isPinned: false,
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
      views: 89,
      timeAgo: "4h",
      isHot: false,
      isPinned: true,
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
      views: 234,
      timeAgo: "6h",
      isHot: true,
      isPinned: false,
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
      views: 112,
      timeAgo: "8h",
      isHot: false,
      isPinned: false,
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
      views: 423,
      timeAgo: "12h",
      isHot: true,
      isPinned: false,
    },
  ];

  const trendingTopics = [
    { name: "React", posts: 342 },
    { name: "TypeScript", posts: 298 },
    { name: "Node.js", posts: 256 },
    { name: "Python", posts: 234 },
    { name: "Next.js", posts: 189 },
  ];

  const availableTags = [
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "JavaScript",
    "CSS",
    "HTML",
    "Vue",
    "Angular",
    "Database",
    "API",
    "Frontend",
    "Backend",
    "DevOps",
    "Mobile",
    "Flutter",
    "React Native",
  ];

  const handleNewPost = async (E: React.FormEvent) => {
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    E.preventDefault();

    // console.log({
    //   title: newPostTitle,
    //   content: newPostContent,
    //   tags: selectedTags,
    // });

    try {
      const { data } = await createPost({
        variables: {
          userId: localStorage.getItem("userId"),
          content: newPostContent,
          title: newPostTitle,
        },
      });

      toast.success("Conversa criada com sucesso.");
    } catch (error) {
      console.error(error);
      toast.error("Falha ao criar conversa.");
    }

    setNewPostTitle("");
    setNewPostContent("");
    setSelectedTags([]);
    setShowNewPostModal(false);
  };

  console.log(data_list_posts.listPosts.results);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg shadow-lg">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Glix
              </h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-8 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar discussões, tecnologias..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowNewPostModal(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105 flex items-center space-x-2 shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:block">Nova Conversa</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-medium">
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
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 mb-6 hover:bg-gray-900/70 transition-all">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                  JD
                </div>
                <div>
                  <h3 className="text-white font-semibold">João Dev</h3>
                  <p className="text-gray-400 text-sm">@joao_dev</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center mb-4">
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
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 rounded-lg transition-all font-medium transform hover:scale-105">
                Ver Perfil
              </button>
            </div>

            {/* Trending Topics */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-orange-400" />
                <h3 className="text-white font-semibold">Trending</h3>
              </div>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between group cursor-pointer"
                  >
                    <span className="text-gray-300 group-hover:text-blue-400 transition-colors">
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
            {/* Conversations Feed */}
            <div className="space-y-4">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:bg-gray-900/70 hover:border-gray-700 transition-all cursor-pointer group"
                >
                  {/* Author Info */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-medium">
                        {conversation.author.avatar}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-white font-medium group-hover:text-blue-400 transition-colors">
                            {conversation.author.name}
                          </h4>
                          <span className="text-gray-400 text-sm">
                            @{conversation.author.username}
                          </span>
                          <span className="text-gray-500 text-sm">•</span>
                          <span className="text-gray-500 text-sm">
                            {conversation.timeAgo}
                          </span>
                          {conversation.isPinned && (
                            <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded-full border border-blue-500/20">
                              Fixado
                            </span>
                          )}
                          {conversation.isHot && (
                            <span className="bg-orange-500/20 text-orange-400 text-xs px-2 py-0.5 rounded-full border border-orange-500/20 animate-pulse">
                              Hot
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Title */}
                  <h2 className="text-white text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
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
                        className="bg-gray-800/50 text-blue-400 text-sm px-3 py-1 rounded-full hover:bg-blue-500/20 cursor-pointer transition-all border border-gray-700 hover:border-blue-500/30"
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
                    <div className="flex items-center space-x-2 text-gray-500 text-sm">
                      <Eye className="w-4 h-4" />
                      <span>{conversation.views}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">
                  Nova Conversa
                </h2>
                <button
                  onClick={() => setShowNewPostModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Título da conversa
                </label>
                <input
                  type="text"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  placeholder="Digite o título da sua conversa..."
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Conteúdo
                </label>
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Compartilhe sua dúvida, experiência ou conhecimento..."
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tags (selecione até 5)
                </label>
                <div className="flex flex-wrap gap-2">
                  {/* {availableTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagToggle(tag)}
                      disabled={
                        selectedTags.length >= 5 && !selectedTags.includes(tag)
                      }
                      className={`px-3 py-1 rounded-full text-sm transition-all ${
                        selectedTags.includes(tag)
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          : "bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700 hover:text-white"
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      #{tag}
                    </button>
                  ))} */}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {selectedTags.length}/5 tags selecionadas
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-800 flex items-center justify-between">
              <button
                onClick={() => setShowNewPostModal(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleNewPost}
                disabled={!newPostTitle.trim() || !newPostContent.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-all transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
              >
                Publicar Conversa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Search Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-sm border-t border-gray-800 p-4">
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
