import React, { useState, useEffect } from "react";

const arr = ["", "", ""];
const cart = JSON.parse(localStorage.getItem("cart")) || [];

const Cart = () => {
  const [movies, setMovies] = useState(cart);
 console.log(movies);


  return (
    <div>
      <div className="border border-black flex items-center justify-center  gap-[30rem]">
        <div className="grid grid-cols-1 border border-black  ">
          <label>รายการสินค้า</label>
        </div>
        <div className=" border border-black ">สรุปราคา</div>
      </div>

      <div></div>
    </div>
  );
};

export default Cart;
