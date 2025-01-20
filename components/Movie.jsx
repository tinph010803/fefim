"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import {
  PlayCircleIcon,
  InformationCircleIcon,
  ServerIcon,
} from "@heroicons/react/24/solid";

export default function Movie({ movie }) {
  const [currentMedia, setCurrentMedia] = useState({
    src: null,
    type: null,
    episode: null,
    server: null,
  });

  // Memoized server and episode selection
  const serverOptions = useMemo(
    () => movie.episodes.map((server) => server.server_name),
    [movie.episodes]
  );

  // Xử lý chọn tập phim
  const handleEpisodeSelect = (episode, server) => {
    setCurrentMedia({
      src: episode.embed,
      type: "embed",
      episode: episode.name,
      server: server.server_name,
    });
  };

  // Component hiển thị thông tin phim
  const MovieInfoItem = ({ label, value, className = "" }) => {
    if (!value) return null;
    return (
      <div className={`text-sm text-gray-700 dark:text-gray-300 ${className}`}>
        <span className="font-semibold text-gray-900 dark:text-white">
          {label}:{" "}
        </span>
        {value}
      </div>
    );
  };

  // Nút tương tác
  const InteractiveButton = ({
    icon: Icon,
    label,
    onClick,
    className = "",
  }) => (
    <motion.button
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg 
        bg-blue-500 text-white hover:bg-blue-600 
        transition-all duration-300 ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {label}
    </motion.button>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Poster & Media Section */}
        <div className="md:col-span-1">
          <motion.div
            className="sticky top-8 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AnimatePresence mode="wait">
              {currentMedia.src ? (
                currentMedia.type === "video" ? (
                  <motion.video
                    key="video"
                    controls
                    className="w-full rounded-xl shadow-lg"
                    src={currentMedia.src}
                  />
                ) : (
                  <motion.iframe
                    key="iframe"
                    className="w-full aspect-video rounded-xl"
                    src={currentMedia.src}
                    allowFullScreen
                  />
                )
              ) : (
                <motion.img
                  key="poster"
                  src={movie.poster_url}
                  alt={movie.name}
                  className="w-full rounded-xl shadow-lg object-cover"
                />
              )}
            </AnimatePresence>

            {/* Thông tin nhanh */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {movie.quality}
                  </span>
                  <span className="text-sm font-medium bg-green-100 text-green-800 px-2 py-1 rounded">
                    {movie.language}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {movie.category[3]?.list[0]?.name}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Thông tin phim */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {movie.name}
            </h1>
            {currentMedia.episode && (
              <p className="text-gray-600 dark:text-gray-300">
                Đang xem: Tập {currentMedia.episode}
                {currentMedia.server && ` - ${currentMedia.server}`}
              </p>
            )}
          </div>

          {/* Nút điều khiển */}
          <div className="flex gap-4">
            <InteractiveButton
              icon={PlayCircleIcon}
              label="Xem ngay"
              onClick={() => {
                const firstEpisode = movie.episodes[0]?.items[0];
                handleEpisodeSelect(firstEpisode, movie.episodes[0]);
              }}
            />
            <InteractiveButton
              icon={InformationCircleIcon}
              label="Chi tiết"
              className="bg-gray-200 text-gray-800 hover:bg-gray-300"
            />
          </div>

          {/* Mô tả */}
          <p className="text-gray-600 dark:text-gray-300">
            {movie.description}
          </p>

          {/* Thông tin chi tiết */}
          <div className="grid md:grid-cols-2 gap-4">
            <MovieInfoItem label="Tên gốc" value={movie.original_name} />
            <MovieInfoItem
              label="Quốc gia"
              value={movie.category[4]?.list[0]?.name}
            />
            <MovieInfoItem
              label="Thể loại"
              value={movie.category[2]?.list?.map((cat) => cat.name).join(", ")}
            />
          </div>

          {/* Danh sách tập */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Danh sách tập
            </h2>
            {movie.episodes.map((server, serverIndex) => (
              <div key={serverIndex} className="mb-6">
                <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                  <ServerIcon className="w-5 h-5 text-blue-500" />
                  {server.server_name}
                </h3>
                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                  {server.items.map((episode, episodeIndex) => (
                    <motion.button
                      key={episodeIndex}
                      className={`
                        px-3 py-1 rounded-md text-sm transition-all
                        ${
                          currentMedia.episode === episode.name
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 dark:bg-gray-700 hover:bg-blue-100"
                        }
                      `}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEpisodeSelect(episode, server)}
                    >
                      Tập {episode.name}
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
