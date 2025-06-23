import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";

interface ConversationCardData {
  id: number;
  avatar: string;
  name: string;
  username: string;
  timeago: string;
  title: string;
  excerpt: string;
  tags: string[];
  replies: number;
  likes: number;
}

export function CoversationCard({
  id,
  avatar,
  name,
  username,
  timeago,
  title,
  excerpt,
  tags,
  replies,
  likes,
}: ConversationCardData) {
  return (
    <div
      key={id}
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:bg-gray-900/70 hover:border-gray-700 transition-all cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-700 rounded-lg flex items-center justify-center text-white font-medium">
            {avatar}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="text-white font-medium group-hover:text-indigo-400 transition-colors">
                {name}
              </h4>
              <span className="text-gray-400 text-sm">@{username}</span>
              <span className="text-gray-500 text-sm">•</span>
              <span className="text-gray-500 text-sm">{timeago}</span>
            </div>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <h2 className="text-white text-lg font-semibold mb-2 group-hover:text-indigo-400 transition-colors">
        {title}
      </h2>

      <p className="text-gray-300 mb-4 line-clamp-2">{excerpt}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-800/50 text-indigo-400 text-sm px-3 py-1 rounded-full hover:bg-indigo-500/20 cursor-pointer transition-all border border-gray-700 hover:border-indigo-500/30"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <button className="flex items-center space-x-2 text-gray-400 hover:text-indigo-400 transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm">{replies}</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors">
            <Heart className="w-5 h-5" />
            <span className="text-sm">{likes}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
