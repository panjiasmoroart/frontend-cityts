// import type FC dari react
import { type FC } from "react";

// import link from react-router
import { Link } from "react-router";

// import react icons
import { FiBookOpen } from "react-icons/fi";

// import hook untuk mengambil data posts
import { usePostsHome } from "../../../../hooks/web/post/usePostsHome";

// import component CardPost
import CardPost from "../../../../components/Web/Card/CardPost";

// import component Loading
import Loading from "../../../../components/General/Loading";

// import component Error
import Error from "../../../../components/General/Error";

const Post: FC = () => {
  // Ambil data posts dari API menggunakan custom hook
  const { data: posts = [], isLoading, isError } = usePostsHome();

  return (
    <section
      className="w-full py-16 bg-linear-to-b from-white to-white"
      id="posts"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4 px-6 py-2 bg-yellow-100 rounded-full shadow">
            <FiBookOpen className="h-5 w-5 text-yellow-700" />
            <h3 className="text-lg font-semibold text-yellow-800">
              BERITA TERKINI
            </h3>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ikuti perkembangan dan kegiatan terbaru di City Santri
          </p>
        </div>

        {isLoading && <Loading />}
        {isError && <Error />}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {!isLoading &&
            !isError &&
            posts?.map((post, index) => <CardPost key={index} post={post} />)}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/berita"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-yellow-600 hover:bg-yellow-700 transition-colors shadow-sm"
          >
            Lihat Semua Berita
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Post;
