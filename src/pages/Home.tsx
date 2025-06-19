import React, { useState } from "react";
import {
  Code2,
  Search,
  User,
  MessageCircle,
  Heart,
  Share2,
  MoreHorizontal,
  TrendingUp,
  Settings,
  LogOut,
  Plus,
  Eye,
} from "lucide-react";
import { useMutation, useQuery } from "@apollo/client";
import toast from "react-hot-toast";

import { CREATE_POST } from "../graphql/mutations/CreatePost";
import { LIST_POSTS } from "../graphql/queries/ListPosts";
import { LIST_TAGS } from "../graphql/queries/ListTags";

interface Tag {
  id: string;
  description: string;
}

export function Home() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [listTags, setListTags] = useState({});

  const {
    data: data_list_posts,
    loading: loading_list_posts,
    error: error_list_posts,
    refetch: refetch_list_posts,
  } = useQuery(LIST_POSTS);

  const {
    data: data_list_tags,
    loading: loading_list_tags,
    error: error_list_tags,
  } = useQuery(LIST_TAGS);

  const [createPost] = useMutation(CREATE_POST);

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

  const handleNewPost = async (e: React.FormEvent) => {
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    e.preventDefault();

    const tagsObject = selectedTags.map((tech) => ({
      tag: tech,
    }));

    try {
      const input = {
        userId: localStorage.getItem("userId"),
        content: newPostContent,
        title: newPostTitle,
        postTag: tagsObject,
      };

      await createPost({
        variables: {
          input: input,
        },
      });

      refetch_list_posts();

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

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      } else if (prev.length < 3) {
        return [...prev, tag];
      }
      return prev;
    });
  };

  // console.log(data_list_posts?.listPosts?.results);
  // console.log(data_list_tags?.listTags?.results);
  // console.log(selectedTags);

  return (
    <div className="min-h-screen bg-gray-950">
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
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 mb-6 hover:bg-gray-900/70 transition-all">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-indigo-700 rounded-xl flex items-center justify-center text-white font-bold text-lg">
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
              <button className="w-full bg-indigo-700 hover:bg-indigo-800 text-white py-2 px-4 rounded-lg transition-all font-medium">
                Ver Perfil
              </button>
            </div>

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
                    <span className="text-gray-300 group-hover:text-indigo-400 transition-colors">
                      #{topic.name}
                    </span>
                    <span className="text-gray-500 text-sm">{topic.posts}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="space-y-4">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:bg-gray-900/70 hover:border-gray-700 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-indigo-700 rounded-lg flex items-center justify-center text-white font-medium">
                        {conversation.author.avatar}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-white font-medium group-hover:text-indigo-400 transition-colors">
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

                  <h2 className="text-white text-lg font-semibold mb-2 group-hover:text-indigo-400 transition-colors">
                    {conversation.title}
                  </h2>

                  <p className="text-gray-300 mb-4 line-clamp-2">
                    {conversation.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {conversation.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-800/50 text-indigo-400 text-sm px-3 py-1 rounded-full hover:bg-indigo-500/20 cursor-pointer transition-all border border-gray-700 hover:border-indigo-500/30"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <button className="flex items-center space-x-2 text-gray-400 hover:text-indigo-400 transition-colors">
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

      {showNewPostModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl shadow-black/50">
            <div className="p-6 border-b border-gray-800 sticky top-0 bg-gray-900 z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Nova Conversa
                </h2>
                <button
                  onClick={() => {
                    setShowNewPostModal(false);
                    setSelectedTags([]);
                  }}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label="Fechar"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Título da conversa
                </label>
                <input
                  type="text"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  placeholder="Digite o título da sua conversa..."
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                />
                <div className="text-xs text-gray-500 mt-1 text-right">
                  {newPostTitle.length}/100 caracteres
                </div>
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
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none transition-all duration-200"
                />
                <div className="text-xs text-gray-500 mt-1 text-right">
                  {newPostContent.length}/3000 caracteres
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tags (selecione até 3)
                </label>
                <div className="flex flex-wrap gap-2">
                  {data_list_tags?.listTags?.results?.map((tag: Tag) => (
                    <button
                      key={tag.id}
                      onClick={() => handleTagToggle(tag.description)}
                      className={`
                  px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-75
                  ${
                    selectedTags.includes(tag.description)
                      ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                      : "bg-gray-800 text-gray-400 border border-gray-700"
                  }
                  ${
                    selectedTags.length >= 3 &&
                    !selectedTags.includes(tag.description)
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-700 hover:text-white cursor-pointer"
                  }
                `}
                      disabled={
                        selectedTags.length >= 3 &&
                        !selectedTags.includes(tag.description)
                      }
                      aria-pressed={selectedTags.includes(tag.description)}
                    >
                      {tag.description}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-500">
                    {selectedTags.length}/3 tags selecionadas
                  </p>
                  {selectedTags.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setSelectedTags([])}
                      className="text-xs text-red-400 hover:text-red-300 transition-colors duration-150"
                    >
                      Limpar seleção
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-800 flex items-center justify-between sticky bottom-0 bg-gray-900">
              <button
                onClick={() => setShowNewPostModal(false)}
                className="px-5 py-2.5 text-gray-300 hover:text-white transition-colors duration-200 border border-gray-700 rounded-lg hover:bg-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={handleNewPost}
                disabled={!newPostTitle.trim() || !newPostContent.trim()}
                className="bg-indigo-700 hover:bg-indigo-800 disabled:bg-gray-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200"
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
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}
