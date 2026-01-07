// import type FC
import type { FC } from "react";

// import icon dari react-icons
import { FiUser, FiCalendar, FiArrowRight } from "react-icons/fi";

// import Link dari react-router
import { Link } from "react-router";

// import interface Post
import type { Post } from "../../../types/post";

// type PostCard
interface PostCardProps {
  post: Post;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  return (
    <article className="bg-white rounded-xl shadow overflow-hidden hover:shadow-xl transition-all duration-300 group">
      {/* Gambar sampul */}
      <div className="relative overflow-hidden h-48">
        <img
          src={`${import.meta.env.VITE_BASE_URL}/uploads/posts/${post.image}`}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
      </div>

      {/* Konten */}
      <div className="p-6">
        {/* Meta: penulis & tanggal */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <FiUser className="h-4 w-4" />
            <span>{post.user.name}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <FiCalendar className="h-4 w-4" />
            <span>
              {new Date(post.created_at).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Judul */}
        <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2">
          <Link
            to={`/posts/${post.slug}`}
            className="hover:text-yellow-600 transition-colors"
            aria-label={`Buka detail: ${post.title}`}
          >
            {post.title}
          </Link>
        </h3>

        {/* Cuplikan konten (HTML) */}
        <div
          className="text-gray-600 mb-5 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* CTA: Baca selengkapnya */}
        <Link
          to={`/posts/${post.slug}`}
          className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium transition-colors"
        >
          Baca selengkapnya
          <FiArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </article>
  );
};

export default PostCard;
