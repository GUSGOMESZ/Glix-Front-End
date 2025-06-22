import { ApolloError } from "@apollo/client/errors";
import { TrendingUp } from "lucide-react";
import { useMemo } from "react";

interface ITrendingData {
  getTrendings?: string;
}

interface TrendingBoxProps {
  data_trending?: ITrendingData;
  loading_trending: boolean;
  error_trending?: ApolloError;
}

interface Topic {
  name: string;
  posts: string;
}

export function TrendingBox({
  data_trending,
  loading_trending,
  error_trending,
}: TrendingBoxProps) {
  const parsedData = useMemo(() => {
    if (!data_trending?.getTrendings) return [];

    try {
      return JSON.parse(data_trending.getTrendings) || [];
    } catch (error) {
      console.error("Error parsing trendings:", error);
      return [];
    }
  }, [data_trending]);

  const trendingTopics: Topic[] = parsedData.map((item: any) => ({
    name: item.tag,
    posts: item.count,
  }));

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
      <div className="flex items-center space-x-2 mb-4">
        <TrendingUp className="w-5 h-5 text-orange-400" />
        <h3 className="text-white font-semibold">Trending</h3>
      </div>

      {loading_trending ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="h-4 bg-gray-700 rounded animate-pulse w-24"></div>
              <div className="h-3 bg-gray-700 rounded animate-pulse w-8"></div>
            </div>
          ))}
        </div>
      ) : error_trending ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="text-red-400 mb-2">⚠️</div>
          <p className="text-gray-400 text-sm mb-1">
            Erro ao carregar trending
          </p>
          {/* Safely access error message */}
          <p className="text-gray-500 text-xs">{error_trending.message}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <div
              key={index}
              className="flex items-center justify-between group cursor-pointer"
            >
              <span className="text-gray-300 group-hover:text-indigo-400 transition-colors">
                {topic.name}
              </span>
              <span className="text-gray-500 text-sm">{topic.posts}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
