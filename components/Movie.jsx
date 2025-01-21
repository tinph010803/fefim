"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import {
  PlayCircleIcon,
  InformationCircleIcon,
  ServerIcon,
  BookmarkIcon,
} from "@heroicons/react/24/solid";

export default function Movie({ movie }) {
  const [currentMedia, setCurrentMedia] = useState({
    src: null,
    type: null,
    episode: null,
    server: null,
  });
  const [showNotification, setShowNotification] = useState(false);

  const serverOptions = useMemo(
    () => movie.episodes.map((server) => server.server_name),
    [movie.episodes]
  );

  const handleEpisodeSelect = (episode, server) => {
    setCurrentMedia({
      src: episode.embed,
      type: "embed",
      episode: episode.name,
      server: server.server_name,
    });
  };

  const handleSaveMovie = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000); // Thông báo sẽ ẩn sau 3 giây
  };

  const MovieInfoItem = ({ label, value, className = "" }) => {
    if (!value) return null;
    return (
      <div className={`text-sm text-gray-700 dark:text-gray-300 ${className}`}>
        <span className="font-semibold text-gray-900 dark:text-white">
          {label}: {" "}
        </span>
        {value}
      </div>
    );
  };

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
      <AnimatePresence>
        {showNotification && (
          <motion.div
            className="fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm font-medium">Chức năng đang được phát triển !!!</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-center space-y-8">
        {/* Poster & Media Section */}
        <div className="w-full max-w-4xl">
          <motion.div
            className="space-y-4"
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
          </motion.div>
        </div>

        {/* Movie Info */}
        <div className="w-full max-w-4xl bg-gray-100 dark:bg-gray-800 p-6 rounded-lg space-y-6">
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
              icon={BookmarkIcon}
              label="Lưu phim"
              onClick={handleSaveMovie}
              className="bg-red-500 text-white hover:bg-red-600"
            />
          </div>

          <p className="text-gray-600 dark:text-gray-300">{movie.description}</p>

          <div className="grid md:grid-row-2 gap-4">
            <MovieInfoItem label="Tên gốc" value={movie.original_name} />
            <MovieInfoItem label="Đạo diễn" value={movie.director} />
            <MovieInfoItem label="Diễn viên" value={movie.casts} />
            <MovieInfoItem label="Quốc gia" value={movie.category[4]?.list[0]?.name} />
            <MovieInfoItem label="Khởi chiếu" value={movie.category[3]?.list[0]?.name} />
            <MovieInfoItem label="Thể loại" value={movie.category[2]?.list?.map((cat) => cat.name).join(", ")} />
          </div>

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
                        ${currentMedia.episode === episode.name
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
