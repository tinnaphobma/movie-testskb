import React, { useState, useEffect } from "react";
import Car from "../assets/car.png";
import TransactionPopup from "../components/TransactionPopup";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const [movies, setMovies] = useState(cart);
  const [togglePopup, setTogglePopup] = useState(false);
  console.log(movies);
  const discount =
    movies.length >= 3 && movies.length < 5 ? 0.1 : movies.length >= 5 && 0.2;
  const totalPrice = movies.reduce(
    (prev, curr) => parseInt(prev) + parseInt(curr.price),
    0
  );

  console.log(totalPrice);

  return (
    <div className="flex w-full h-full bg-gradient-to-r from-purple-500  to-pink-400">
      <div className="px-14 py-16 gap-8  flex flex-col w-1/2 h-full   ">
        <label className="text-yellow-400 text-3xl">Summery Order</label>

        <div className="flex justify-between items-center">
          <span
            onClick={() => {
              localStorage.clear();
              setMovies([]);
            }}
            className="rounded text-white bg-red-400 hover:bg-red-600 cursor-pointer w-fit flex p-2 "
          >
            Clear
          </span>
          <span
            onClick={() => navigate("../")}
            className="p-2 rounded text-blue-600 hover:bg-gradient-to-r from-orange-500  to-yellow-400 w-fit cursor-pointer"
          >
            เลือกสินค้าเพิ่ม
          </span>
        </div>
        <div className="  w-full flex flex-col px-5 py-10 gap-5 rounded-lg  bg-white">
          {movies?.map((item) => (
            <div className="  w-full flex gap-10  pb-2 border-b-2">
              <img className=" w-44 h-64 object-cover  " src={item.poster} />
              <div className="flex flex-col justify-between w-full py-20 ">
                <div className="  justify-between  w-full flex pr-14">
                  <span className="font-bold  h-12 text-ellipsis    break-all w-[60%] overflow-hidden  ">
                    {item.title}
                  </span>
                  <span className="  ">จำนวน 1 ชิ้น</span>
                </div>
                <span> ราคา {item.price} btc</span>
              </div>
            </div>
          ))}
        </div>
        {discount && (
          <>
            <label>Discount</label>
            <div className="rounded-lg bg-white py-10">
              <div className="pl-[calc(10vw-5rem)]">
                ส่วนลด {movies.length} ชิ้น {discount === 0.1 ? "10%" : "20%"} ={" "}
                {discount * totalPrice} btc
              </div>
            </div>
          </>
        )}
      </div>
      <div className="px-14 py-16 gap-8  flex flex-col w-1/2 h-full">
        <label  className="text-yellow-400 text-3xl">Payment Details</label>
        <div className="  w-full flex flex-col px-5 py-10 gap-5   rounded-md justify-center items-center   bg-white shadow-2xl">
          Total
          <div className="flex border-b-2">
            <label>
              รวมสินค้า <span className="pl-12"> {totalPrice}</span>
            </label>
            <span className="ml-14">btc</span>
          </div>
          <div className="flex border-b-2">
            <label className="pl-4">
              ส่วนลด <span className="pl-14"> {discount * totalPrice} </span>{" "}
            </label>
            <span className="pl-14">btc</span>
          </div>
          <div className="flex border-b-2">
            <label>ช่องทางการชำระเงิน </label>
            <span className="ml-10">QR code</span>
          </div>
          <div
            onClick={() => setTogglePopup(true)}
            className=" cursor-pointer p-2 bg-green-300  rounded"
          >
            {" "}
            ดำเนินการชำระเงิน{" "}
          </div>
        </div>
      </div>
      {togglePopup && <TransactionPopup setPopup={setTogglePopup} />}
    </div>
  );
};

export default Cart;
