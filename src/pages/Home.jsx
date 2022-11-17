import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Cart from "../assets/shopping-cart.png";
import axios from "axios";
import NotFound from "../assets/404.png";
import { useNavigate } from "react-router-dom";

// const cart  =  localStorage.getItem('cart')

const Home = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const getMovies = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=5c292a95925b9fe155613c4be051826a&query=${search}`
      );
      const mvObj = response.data.results.slice(0, 6).map((item) => {
        return {
          id: item.id,
          title: item.title,
          date: item.release_date,
          poster: item.poster_path
            ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
            : NotFound,
          price: 500,
        };
      });

      setMovies(mvObj);
    };
    if (search) {
      getMovies();
    } else {
      setMovies([]);
    }
  }, [search]);

  const onAdd = (movie) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const checkDuplicate = cart.some((item) => item.id === movie.id);

    if (!checkDuplicate) {
      cart?.push(movie);

      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  return (
    <div className="border bg-slate-400 border-black  p-5 flex flex-col gap-3">
      <div className=" bg-slate-500 p-2 cursor-pointer ml-auto flex justify-between items-center  gap-2 ">
        <label>ตระกร้าสินค้า</label>
        <img onClick={() => navigate('/cart') } className=" w-8" src={Cart} />
      </div>

      <Search search={search} setSearch={setSearch} />

      <div className=" grid grid-cols-3 w-full  justify-  gap-y-9 bg-red-400">
        {movies.map((item) => (
          <div className="  hover:opacity-[0.9]">
            <img className=" w-[24rem] h-full" src={item.poster} />
            <div className="flex ">
              <label>ราคา {item.price} BTC</label>
              <label></label>
              <button onClick={() => onAdd(item)}>เพิ่ม</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
