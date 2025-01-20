"use client";

import React, { useState, useEffect } from "react";
import Movie from "@/components/Movie";
import Nav from "@/components/Nav";

const movieCache = {};
const API_URL = "https://phim.nguonc.com";

function MovieDetail({ params }) {
  const { slug } = params;
  const [movie, setMovie] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovieContent() {
      try {
        // Kiểm tra cache trước
        if (movieCache[slug]) {
          setMovie(movieCache[slug].movie);
          setEpisodes(movieCache[slug].episodes);
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_URL}/api/film/${slug}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();

        // Lưu vào cache
        movieCache[slug] = data;

        setMovie(data.movie);
        setEpisodes(data.episodes);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchMovieContent();
  }, [slug]);

  // Metadata cho client-side (sử dụng useEffect)
  useEffect(() => {
    if (movie) {
      document.title = movie.name;

      // Thêm description meta tag
      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      if (metaDescription) {
        metaDescription.setAttribute("content", movie.content);
      } else {
        const meta = document.createElement("meta");
        meta.name = "description";
        meta.content = movie.content;
        document.head.appendChild(meta);
      }
    }
  }, [movie]);

  // Trạng thái loading
  if (loading) {
    return <div>Đang tải...</div>;
  }

  // Trạng thái lỗi
  if (error) {
    return <div>Lỗi: {error}</div>;
  }

  // Không có phim
  if (!movie) {
    return <div>Không tìm thấy phim</div>;
  }

  return (
    <>
      <Nav currentPage={`/watch/${slug}`} />
      <Movie movie={movie} episodes={episodes} />
    </>
  );
}

export default MovieDetail;
