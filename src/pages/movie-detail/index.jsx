import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { movieService } from "../../service/movieService";
import { Spin, Alert, Card } from "antd";

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovieDetail = async () => {
    try {
      const res = await movieService.getMovieDetail(movieId);
      console.log("responseMovieDetail: ", res?.data);
      setMovie(res?.data?.content || null); // Cybersoft thường trả {content: {...}}
    } catch (err) {
      console.error("error:", err);
      setError(err?.response?.data?.content || err?.message || "Lỗi tải chi tiết phim");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  if (loading) return <div className="p-10 text-center"><Spin /></div>;
  if (error) return <div className="p-10"><Alert type="error" message={error} /></div>;
  if (!movie) return <div className="p-10">Không tìm thấy phim.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card
        cover={
          <img
            alt={movie.tenPhim}
            src={movie.hinhAnh}
            className="!h-[500px] object-cover"
          />
        }
      >
        <h1 className="text-3xl font-bold mb-4">{movie.tenPhim}</h1>
        <p className="mb-2"><strong>Mô tả:</strong> {movie.moTa}</p>
        <p className="mb-2"><strong>Ngày khởi chiếu:</strong> {movie.ngayKhoiChieu}</p>
        <p className="mb-2"><strong>Đánh giá:</strong> {movie.danhGia}</p>
      </Card>
    </div>
  );
};

export default MovieDetailPage;
