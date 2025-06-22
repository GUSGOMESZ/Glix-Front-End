import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { useMutation, useQuery } from "@apollo/client";
import { CoversationCard } from "../components/ConversationCard";
import toast from "react-hot-toast";

import { CREATE_POST } from "../graphql/mutations/CreatePost";
import { LIST_POSTS } from "../graphql/queries/ListPosts";
import { LIST_TAGS } from "../graphql/queries/ListTags";
import { GET_USER_TOTAL_POSTS } from "../graphql/queries/GetUserTotalPosts";
import { GET_TRENDINGS } from "../graphql/queries/GetTrendings";
import { GET_FOLLOWERS } from "../graphql/queries/GetFollowers";

import { Navbar } from "../components/Navbar";
import { TrendingBox } from "../components/TrendingBox";
import { UserBox } from "../components/UserBox";
import { GET_FOLLOWINGS } from "../graphql/queries/GetFollowings";

interface Tag {
  id: string;
  description: string;
}

export function Home() {
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const userNavbarData = useMemo(() => {
    const username = localStorage.getItem("userName") || "User";
    const fullname = localStorage.getItem("fullname") || "00";
    const avatar = fullname.slice(0, 2).toUpperCase();

    return {
      avatar,
      fullname,
      username,
    };
  }, []);

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

  const {
    data: data_trending,
    loading: loading_trending,
    error: error_trending,
    refetch: refetch_trendings,
  } = useQuery(GET_TRENDINGS);

  const {
    data: data_user_total_posts,
    loading: loading_user_total_posts,
    error: error_user_total_posts,
    refetch: refetch_user_total_posts,
  } = useQuery(GET_USER_TOTAL_POSTS, {
    variables: { userId: localStorage.getItem("userId") },
  });

  const {
    data: data_get_followers,
    loading: loading_get_followers,
    error: error_get_followers,
    refetch: _refetch_get_followers,
  } = useQuery(GET_FOLLOWERS, {
    variables: { userId: localStorage.getItem("userId") },
  });

  const {
    data: data_get_followings,
    loading: loading_get_followings,
    error: error_get_followings,
    refetch: _refetch_get_followings,
  } = useQuery(GET_FOLLOWINGS, {
    variables: { userId: localStorage.getItem("userId") },
  });

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
      timeAgo: "2h",
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
    },
  ];

  const handleNewPost = async (e: React.FormEvent) => {
    if (!newPostTitle.trim() || !newPostContent.trim() || !selectedTags.length)
      return;

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
      refetch_trendings();
      refetch_user_total_posts();

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

  const handleCloseNewPostModal = () => {
    setShowNewPostModal(false);
    setSelectedTags([]);
    setNewPostContent("");
    setNewPostTitle("");
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar
        setShowNewPostModal={setShowNewPostModal}
        avatar={userNavbarData.avatar}
        username={userNavbarData.username}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 order-2 lg:order-1">
            <UserBox
              avatar={userNavbarData.avatar}
              username={userNavbarData.username}
              fullname={userNavbarData.fullname}
              dataUserTotalPosts={data_user_total_posts}
              loadingTotalPosts={loading_user_total_posts}
              errorTotalPosts={error_user_total_posts}
              dataGetFollowers={data_get_followers}
              loadingGetFollowers={loading_get_followers}
              errorGetFollowers={error_get_followers}
              dataGetFollowings={data_get_followings}
              loadingGetFollowings={loading_get_followings}
              errorGetFollowings={error_get_followings}
            />

            <TrendingBox
              data_trending={data_trending}
              loading_trending={loading_trending}
              error_trending={error_trending}
            />
          </div>

          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="space-y-4">
              {conversations.map((conversation) => (
                <CoversationCard
                  id={conversation.id}
                  avatar={conversation.author.avatar}
                  name={conversation.author.name}
                  username={conversation.author.username}
                  timeago={conversation.timeAgo}
                  title={conversation.title}
                  excerpt={conversation.excerpt}
                  tags={conversation.tags}
                  replies={conversation.replies}
                  likes={conversation.likes}
                />
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
                  onClick={handleCloseNewPostModal}
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
                  Tags (no mínimo 1 e no máximo 3)
                </label>

                {loading_list_tags && (
                  <div className="flex items-center justify-center py-8">
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-500"></div>
                      <span className="text-gray-400 text-sm">
                        Carregando tags...
                      </span>
                    </div>
                  </div>
                )}

                {error_list_tags && (
                  <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <svg
                        className="h-5 w-5 text-red-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-red-400 text-sm">
                        Erro ao carregar tags. Tente novamente.
                      </span>
                    </div>
                  </div>
                )}

                {!loading_list_tags && !error_list_tags && (
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
                )}

                {!loading_list_tags && !error_list_tags && (
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
                )}
              </div>
            </div>

            <div className="p-6 border-t border-gray-800 flex items-center justify-between sticky bottom-0 bg-gray-900">
              <button
                onClick={handleCloseNewPostModal}
                className="px-5 py-2.5 text-gray-300 hover:text-white transition-colors duration-200 border border-gray-700 rounded-lg hover:bg-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={handleNewPost}
                disabled={
                  !newPostTitle.trim() ||
                  !newPostContent.trim() ||
                  !selectedTags.length ||
                  loading_list_tags
                }
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
