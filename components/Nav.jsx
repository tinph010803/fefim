"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Nav({ currentPage }) {
  const [searchContent, setSearch] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu
  const [openPersonal, setOpenPersonal] = useState(false); // State for personal dropdown

  const types = [
    { name: "Trang chủ", link: "/" },
    { name: "Phim Lẻ", link: "/phim-le" },
    { name: "Phim Bộ", link: "/phim-bo" },
    { name: "TV Shows", link: "/tv-shows" },
  ];

  const categories = [
    { name: "Hành Động", link: "/category/hanh-dong" },
    { name: "Phiêu Lưu", link: "/category/phieu-luu" },
    { name: "Hoạt Hình", link: "/category/hoat-hinh" },
    { name: "Hài", link: "/category/hai" },
    { name: "Hình Sự", link: "/category/hinh-su" },
    { name: "Tài Liệu", link: "/category/tai-lieu" },
    { name: "Chính Kịch", link: "/category/chinh-kich" },
    { name: "Gia Đình", link: "/category/gia-dinh" },
    { name: "Giả Tưởng", link: "/category/gia-tuong" },
    { name: "Lịch Sử", link: "/category/lich-su" },
    { name: "Kinh Dị", link: "/category/kinh-di" },
    { name: "Nhạc", link: "/category/nhac" },
    { name: "Bí Ẩn", link: "/category/bi-an" },
    { name: "Lãng Mạn", link: "/category/lang-man" },
    { name: "Khoa Học Viễn Tưởng", link: "/category/khoa-hoc-vien-tuong" },
    { name: "Gây Cấn", link: "/category/gay-can" },
    { name: "Chiến Tranh", link: "/category/chien-tranh" },
    { name: "Tâm Lý", link: "/category/tam-ly" },
    { name: "Tình Cảm", link: "/category/tinh-cam" },
    { name: "Cổ Trang", link: "/category/co-trang" },
    { name: "Miền Tây", link: "/category/mien-tay" },
    { name: "Phim 18+", link: "/category/phim-18" },
  ];

  const navVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <motion.nav
      className="flex justify-between items-center h-16 bg-white text-black sticky top-0 shadow-sm font-mono w-screen z-50 dark:bg-gray-900 dark:text-white px-4"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      {/* Mobile Menu Button */}
      <div className="flex items-center space-x-4">
        <button
          className="md:hidden text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-lg"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>

        {/* Menu Items */}
        <div
          className={`absolute top-16 left-0 bg-white dark:bg-gray-900 shadow-lg rounded-md p-4 md:static md:flex md:items-center md:space-x-4 md:p-0 ${
            menuOpen ? "block" : "hidden md:block"
          }`}
        >
          <ul className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0">
            {types.map((type) => (
              <li key={type.name} className="list-none">
                <a
                  href={type.link}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    currentPage === type.link
                      ? "bg-blue-500 text-white"
                      : "text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {type.name}
                </a>
              </li>
            ))}

            {/* Dropdown for Categories */}
            <div className="relative">
              <button
                className="text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 rounded-lg"
                onClick={() => setOpenDropdown(!openDropdown)}
              >
                Thể loại
              </button>
              {openDropdown && (
                <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg dark:bg-gray-800">
                  <ul className="flex flex-col gap-2 p-2 max-h-[50vh] overflow-y-auto">
                    {categories.map((category) => (
                      <li
                        key={category.name}
                        className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
                      >
                        <a
                          href={category.link}
                          className="block px-4 py-2 text-gray-800 dark:text-gray-200"
                        >
                          {category.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Personal Section */}
            <div className="relative">
              <button
                className="text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 rounded-lg"
                onClick={() => setOpenPersonal(!openPersonal)}
              >
                Cá nhân
              </button>
              {openPersonal && (
                <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg dark:bg-gray-800">
                  <ul className="flex flex-col gap-2 p-2">
                    <li className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
                      <a
                        href="/saved"
                        className="block px-4 py-2 text-gray-800 dark:text-gray-200"
                      >
                        Đã lưu
                      </a>
                    </li>
                    <li className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
                      <a
                        href="/recent"
                        className="block px-4 py-2 text-gray-800 dark:text-gray-200"
                      >
                        Đã xem gần đây
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </ul>
        </div>
      </div>

      {/* Search Bar */}
      <motion.div
        className="relative max-w-lg border border-gray-300 rounded-md flex items-center dark:border-gray-600 bg-white dark:bg-gray-800 shadow-md mr-10"
        whileHover={{ scale: 1.05 }}
      >
        <i className="fas fa-search text-blue-500 dark:text-blue-400 ml-3"></i>
        <input
          type="text"
          className="flex-grow px-3 py-2 border-none focus:outline-none bg-transparent text-gray-800 dark:text-gray-200"
          value={searchContent}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Nhập tên phim"
          onKeyDown={(e) => {
            if (e.key === "Enter" && searchContent.trim()) {
              window.location.href = `/search?kw=${encodeURIComponent(
                searchContent.trim()
              )}`;
            }
          }}
        />
      </motion.div>
    </motion.nav>
  );
}
