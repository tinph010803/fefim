"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Card({ movie }) {
  const [isClicked, setIsClicked] = useState(false);
  let poster_url = movie.poster_url;

  const handleClick = (e) => {
    e.preventDefault();
    setIsClicked(true);
    setTimeout(() => {
      window.location.href = `/watch/${movie.slug}`;
    }, 300);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={isClicked ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <a href={`/watch/${movie.slug}`} onClick={handleClick}>
        <motion.div
          key={movie._id}
          className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg hover:cursor-pointer overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <motion.img
              src={poster_url}
              alt={movie.name}
              className="w-full h-64 object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4 text-white">
              <div className="flex justify-between items-end mb-2">
                <div className="flex flex-col">
                  <motion.h2
                    className="text-lg font-bold line-clamp-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {movie.name}
                  </motion.h2>
                  <motion.p
                    className="text-sm opacity-80 line-clamp-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    {movie.original_name}
                  </motion.p>
                </div>
                <div className="flex flex-col items-end">
                  {movie.quality && (
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded mb-1">
                      {movie.quality}
                    </span>
                  )}
                  <div className="flex items-center">
                    {movie.current_episode && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-l">
                        {movie.current_episode}
                      </span>
                    )}
                    {movie.total_episodes && (
                      <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded-r">
                        {movie.total_episodes}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </a>
    </motion.div>
  );
}
