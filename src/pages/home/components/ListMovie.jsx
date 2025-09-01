import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setListMovieAction } from "../../../stores/movie";
import { axiosCustom } from "../../../service/config";
import { movieService } from "../../../service/movieService";
import { Card } from 'antd';
import { useNavigate } from "react-router-dom";

const { Meta } = Card;
const ListMovie = () => {
  const dispatch = useDispatch();

  const listMovie = useSelector((state) => state.movieSlice.listMovie);
  console.log("listMovie: store ", listMovie);

  const navigate = useNavigate();

  const fetchListMovies = async () => {
    try {
            
            const responseListMovies = await movieService.getListMovies();

            dispatch(setListMovieAction(responseListMovies.data.content));
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    fetchListMovies();
  }, []);

  const handleRedirectMovieDetailPage = (movieId)=>{
        
        navigate(`/detail/${movieId}`);
    }

  return (

    
    <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-12 mt-3">
      {listMovie.map((movie, index) => {
        return (
          <Card 
                onClick={()=> {handleRedirectMovieDetailPage(movie.maPhim);}}
                hoverable
                cover={
                <img
                    alt="example"
                    src={movie.hinhAnh}
                    className="!h-[400px]"
                />
                }
          >
            <h3 className="font-bold text-center text-xl" >{movie.tenPhim}</h3>
            <p className="font-semibold text-center text-l ">Ngày khởi chiếu : {movie.ngayKhoiChieu}</p>
            <h3 className="font-extralight text-center text-l text-red-500" >Đánh giá: {movie.danhGia}</h3>
            
          </Card>
        );
      })}
    </div>
  );
};

export default ListMovie;

