import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setListMovieAction } from "../../../stores/movie";
import { movieService } from "../../../service/movieService";
import { Card, Empty, Spin, Alert } from "antd";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

const ListMovie = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const listMovie = useSelector((state) => state.movieSlice.listMovie) || [];
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const fetchListMovies = async () => {
    try {
      const res = await movieService.getListMovies();
      console.log("🎬 movies res.data =", res?.data);

      const content = res?.data?.content;
      if (Array.isArray(content)) {
        dispatch(setListMovieAction(content));
      } else if (Array.isArray(res?.data)) {
        dispatch(setListMovieAction(res.data));
      } else {
        dispatch(setListMovieAction([]));
      }
    } catch (err) {
      console.error("Get list movies error:", err);
      setError(err?.response?.data?.content || err?.message || "Lỗi tải phim");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchListMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRedirectMovieDetailPage = (movieId) => {
    navigate(`/detail/${movieId}`);
  };

  if (loading) return <div className="py-10 text-center"><Spin /></div>;
  if (error) return <div className="p-4"><Alert type="error" message={String(error)} /></div>;
  if (!listMovie.length) return <div className="p-6"><Empty description="Không có phim nào" /></div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-12 mt-3">
      {listMovie.map((movie) => (
        <Card
          key={movie.maPhim}  // ✅ key
          onClick={() => handleRedirectMovieDetailPage(movie.maPhim)}
          hoverable
          cover={
            <img
              alt={movie.tenPhim}
              src={movie.hinhAnh}
              className="!h-[400px] object-cover"
            />
          }
        >
          <h3 className="font-bold text-center text-xl">{movie.tenPhim}</h3>
          <p className="font-semibold text-center">
            Ngày khởi chiếu: {movie.ngayKhoiChieu}
          </p>
          <h3 className="font-extralight text-center text-red-500">
            Đánh giá: {movie.danhGia}
          </h3>
        </Card>
      ))}
    </div>
  );
};

export default ListMovie;
