import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Cart from "../assets/shopping-cart.png";
import axios from "axios";
import NotFound from "../assets/404.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
  const addNotify = (value) => toast(`เพิ่ม${value}]ลงตะกร้าสินค้าแล้วครับ`,{ autoClose: 1500 },{
    icon: "🚀"});


  return (
    <div className="border bg-gradient-to-r from-purple-500  to-pink-400 p-5 flex flex-col gap-3">
      <ToastContainer/>
      <div onClick={() => navigate('/cart')} className="bg-white hover:bg-gradient-to-r from-orange-500  to-yellow-400 rounded p-2 cursor-pointer ml-auto flex justify-between items-center  gap-2 hover:bg-yellow-500 ">
        <div>ตระกร้าสินค้า</div>
        <img onClick={() => navigate('/cart') } className=" w-8" src={Cart} />
      </div>

      <Search search={search} setSearch={setSearch} />

      <div className="ml-24 mt-4 grid grid-cols-3 w-full gap-y-24 ">
        {movies.map((item) => (
          <div className="  hover:opacity-[0.9] ">
          
            <img className=" w-[15rem] h-[80%] rounded" src={item.poster} />
            <div className="  justify-between  w-auto flex pr-14 ">
              <div className="mt-4  overflow-hidden text-ellipsis  break-all w-[60%]">{item.title}</div>
            </div >
            <div  > วันที่ {item.date}</div>
            <div className=" flex gap-3  ">
                <label>ราคา {item.price} BTC</label>
                <label></label>
           
            <button onClick={() => {onAdd(item)
                 addNotify(item.title) 
                }
              } className="bg-yellow-400 rounded px-3">เพิ่มลงตระกร้า</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
