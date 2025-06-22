import type { ApolloError } from "@apollo/client";

interface IUserTotalPostsData {
  getUserTotalPosts?: number;
}

interface IUserFollowers {
  getFollowers?: number;
}

interface IUserFollowings {
  getFollowings?: number;
}

interface UserBoxProps {
  avatar: string;
  username: string;
  fullname: string;

  dataUserTotalPosts?: IUserTotalPostsData;
  loadingTotalPosts: boolean;
  errorTotalPosts?: ApolloError;

  dataGetFollowers?: IUserFollowers;
  loadingGetFollowers: boolean;
  errorGetFollowers?: ApolloError;

  dataGetFollowings?: IUserFollowings;
  loadingGetFollowings: boolean;
  errorGetFollowings?: ApolloError;
}

const StatDisplay = ({
  loading,
  error,
  value,
  label,
}: {
  loading: boolean;
  error?: ApolloError;
  value?: number;
  label: string;
}) => {
  if (loading) {
    return (
      <div>
        <div className="text-white font-semibold">
          <div className="w-8 h-4 bg-gray-700 rounded animate-pulse"></div>
        </div>
        <p className="text-gray-400 text-xs">{label}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p className="text-red-400 font-semibold text-sm">Erro</p>
        <p className="text-gray-400 text-xs">{label}</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-white font-semibold">{value ?? 0}</p>
      <p className="text-gray-400 text-xs">{label}</p>
    </div>
  );
};

export function UserBox({
  avatar,
  username,
  fullname,
  dataUserTotalPosts,
  loadingTotalPosts,
  errorTotalPosts,
  dataGetFollowers,
  loadingGetFollowers,
  errorGetFollowers,
  dataGetFollowings,
  loadingGetFollowings,
  errorGetFollowings,
}: UserBoxProps) {
  const hasErrors = errorTotalPosts || errorGetFollowers || errorGetFollowings;

  const isLoading =
    loadingTotalPosts || loadingGetFollowers || loadingGetFollowings;

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 mb-6 hover:bg-gray-900/70 transition-all">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-indigo-700 rounded-xl flex items-center justify-center text-white font-bold text-lg">
          {avatar}
        </div>
        <div>
          <h3 className="text-white font-semibold">{fullname}</h3>
          <p className="text-indigo-400 font-medium text-sm tracking-tight">
            @{username}
          </p>
          {isLoading && (
            <p className="text-gray-400 text-xs">Carregando dados...</p>
          )}
        </div>
      </div>

      {hasErrors && (
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-3 mb-4">
          <p className="text-red-400 text-sm font-medium">
            Alguns dados não puderam ser carregados
          </p>
          <div className="mt-1 text-xs text-red-300">
            {errorTotalPosts && (
              <p>• Erro ao carregar posts: {errorTotalPosts.message}</p>
            )}
            {errorGetFollowers && (
              <p>• Erro ao carregar seguidores: {errorGetFollowers.message}</p>
            )}
            {errorGetFollowings && (
              <p>• Erro ao carregar seguindo: {errorGetFollowings.message}</p>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 text-center mb-4">
        <StatDisplay
          loading={loadingTotalPosts}
          error={errorTotalPosts}
          value={dataUserTotalPosts?.getUserTotalPosts}
          label="Posts"
        />
        <StatDisplay
          loading={loadingGetFollowers}
          error={errorGetFollowers}
          value={dataGetFollowers?.getFollowers}
          label="Seguidores"
        />
        <StatDisplay
          loading={loadingGetFollowings}
          error={errorGetFollowings}
          value={dataGetFollowings?.getFollowings}
          label="Seguindo"
        />
      </div>

      <button
        className={`w-full py-2 px-4 rounded-lg transition-all font-medium ${
          isLoading
            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
            : "bg-indigo-700 hover:bg-indigo-800 text-white"
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Carregando..." : "Ver Perfil"}
      </button>
    </div>
  );
}
