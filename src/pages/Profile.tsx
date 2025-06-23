import React, { useState, useMemo } from "react";
import {
  Search,
  Settings,
  Calendar,
  Edit3,
  Users,
  MessageSquare,
  Heart,
  Bookmark,
} from "lucide-react";
import { useMutation, useQuery } from "@apollo/client";
import { CoversationCard } from "../components/ConversationCard";
import toast from "react-hot-toast";

import { CREATE_POST } from "../graphql/mutations/CreatePost";
import { LIST_POSTS } from "../graphql/queries/ListPosts";
import { LIST_TAGS } from "../graphql/queries/ListTags";
import { GET_USER_TOTAL_POSTS } from "../graphql/queries/GetUserTotalPosts";
import { GET_TRENDINGS } from "../graphql/queries/GetTrendings";

import { Navbar } from "../components/Navbar";
import { TrendingBox } from "../components/TrendingBox";
import { useParams } from "react-router-dom";
import { useGetTotalFollowers } from "../hooks/useGetTotalFollowers";
import { useGetTrendings } from "../hooks/useGetTrendings";
import { useGetTotalFollowing } from "../hooks/useGetTotalFollowing";

interface Tag {
  id: string;
  description: string;
}

interface ProfileData {
  id: string;
  username: string;
  fullname: string;
  bio: string;
  location: string;
  website: string;
  joinDate: string;
  followers: number;
  following: number;
  avatar: string;
}

export function Profile() {
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [activeTab, setActiveTab] = useState<"posts" | "likes" | "bookmarks">(
    "posts"
  );

  const { username } = useParams();

  console.log(username);

  const profileData: ProfileData = useMemo(() => {
    const username = localStorage.getItem("userName") || "User";
    const fullname = localStorage.getItem("fullname") || "Usuário";
    const avatar = fullname.slice(0, 2).toUpperCase();

    return {
      id: localStorage.getItem("userId") || "1",
      username,
      fullname,
      bio: "Desenvolvedor Full Stack apaixonado por tecnologia e código limpo. Sempre em busca de novos desafios e aprendizado contínuo.",
      location: "São Paulo, Brasil",
      website: "https://github.com/usuario",
      joinDate: "Janeiro 2023",
      followers: 1247,
      following: 532,
      avatar,
    };
  }, []);

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

  const { data_trending, loading_trending, error_trending, refetch_trendings } =
    useGetTrendings();

  const { data_get_followers, loading_get_followers, error_get_followers } =
    useGetTotalFollowers();

  const { data_get_followings, loading_get_followings, error_get_followings } =
    useGetTotalFollowing();

  const {
    data: data_user_total_posts,
    loading: loading_user_total_posts,
    error: error_user_total_posts,
    refetch: refetch_user_total_posts,
  } = useQuery(GET_USER_TOTAL_POSTS, {
    variables: { userId: localStorage.getItem("userId") },
  });

  const [createPost] = useMutation(CREATE_POST);

  const userPosts = [
    {
      id: 1,
      author: {
        name: profileData.fullname,
        username: profileData.username,
        avatar: profileData.avatar,
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
        name: profileData.fullname,
        username: profileData.username,
        avatar: profileData.avatar,
      },
      title: "Melhores práticas para CSS Grid vs Flexbox",
      excerpt:
        "Quando vocês preferem usar CSS Grid ao invés de Flexbox? Estou refatorando um layout e não sei qual escolher...",
      tags: ["CSS", "Grid", "Flexbox", "Frontend"],
      replies: 20,
      likes: 45,
      timeAgo: "6h",
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

  const renderTabContent = () => {
    switch (activeTab) {
      case "posts":
        return (
          <div className="space-y-4">
            {userPosts.map((post) => (
              <CoversationCard
                key={post.id}
                id={post.id}
                avatar={post.author.avatar}
                name={post.author.name}
                username={post.author.username}
                timeago={post.timeAgo}
                title={post.title}
                excerpt={post.excerpt}
                tags={post.tags}
                replies={post.replies}
                likes={post.likes}
              />
            ))}
          </div>
        );
      case "likes":
        return (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-300 mb-2">
              Nenhuma curtida ainda
            </h3>
            <p className="text-gray-500">
              Os posts que você curtir aparecerão aqui.
            </p>
          </div>
        );
      case "bookmarks":
        return (
          <div className="text-center py-12">
            <Bookmark className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-300 mb-2">
              Nenhum item salvo
            </h3>
            <p className="text-gray-500">
              Os posts que você salvar aparecerão aqui.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar
        setShowNewPostModal={setShowNewPostModal}
        avatar={userNavbarData.avatar}
        username={userNavbarData.username}
        fullname={userNavbarData.fullname}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 order-2 lg:order-1">
            <TrendingBox
              data_trending={data_trending}
              loading_trending={loading_trending}
              error_trending={error_trending}
            />
          </div>

          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
              <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg mb-4"></div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold -mt-8 border-4 border-gray-900">
                    {profileData.avatar}
                  </div>

                  <div>
                    <h1 className="text-2xl font-bold text-white">
                      {profileData.fullname}
                    </h1>
                    <p className="text-gray-400">@{profileData.username}</p>
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowEditProfile(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
                  >
                    <Edit3 className="w-4 h-4" />
                    Editar Perfil
                  </button>
                  <button className="p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <p className="text-gray-300">{profileData.bio}</p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-white font-semibold">
                      {profileData.following.toLocaleString()}
                    </span>
                    <span className="text-gray-400">seguindo</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-white font-semibold">
                      {profileData.followers.toLocaleString()}
                    </span>
                    <span className="text-gray-400">seguidores</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Ingressou em {profileData.joinDate}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden mb-6">
              <div className="flex border-b border-gray-800">
                <button
                  onClick={() => setActiveTab("posts")}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                    activeTab === "posts"
                      ? "text-indigo-400 border-b-2 border-indigo-500 bg-gray-800/50"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/30"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Posts
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("likes")}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                    activeTab === "likes"
                      ? "text-indigo-400 border-b-2 border-indigo-500 bg-gray-800/50"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/30"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Heart className="w-4 h-4" />
                    Curtidas
                  </div>
                </button>
              </div>
            </div>

            {renderTabContent()}
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
