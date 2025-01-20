"use client";

import { useState, useEffect } from "react";
import Nav from "@/components/Nav";
import Container from "@/components/Container";
import Card from "@/components/Card";
import { motion } from "framer-motion";

const API_URL = "https://phim.nguonc.com";

async function getMovies(category, pageIndex = 1) {
  try {
    const req = await fetch(
      `${API_URL}/api/films/danh-sach/${category}?page=${pageIndex}`
    );
    const data = await req.json();
    return {
      count: data.paginate.items_per_page,
      movies: data.items,
      total_movies: data.paginate.total_items,
    };
  } catch (error) {
    console.error("Lỗi tải phim:", error);
    return { count: 0, movies: [], total_movies: 0 };
  }
}

export default function Types({ params }) {
  const { category } = params;
  const [pageIndex, setPageIndex] = useState(1);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreMovies = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const data = await getMovies(category, pageIndex);

      if (data.movies.length > 0) {
        setMovies((prevMovies) => {
          const movieSlugs = new Set(prevMovies.map((movie) => movie.slug));
          const uniqueNewMovies = data.movies.filter(
            (movie) => !movieSlugs.has(movie.slug)
          );
          return [...prevMovies, ...uniqueNewMovies];
        });
        setPageIndex((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Lỗi tải thêm phim:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Kiểm tra nếu đã cuộn gần đến cuối trang
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.offsetHeight
      ) {
        loadMoreMovies();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pageIndex]);

  useEffect(() => {
    loadMoreMovies();
  }, []);

  return (
    <>
      <Nav />
      <Container className="dark:bg-gray-800">
        {movies.map((movie, index) => (
          <Card key={movie.id || index} movie={movie} />
        ))}

        {isLoading && (
          <motion.div
            className="text-center w-full py-4 dark:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Đang tải...
          </motion.div>
        )}
      </Container>
    </>
  );
}
