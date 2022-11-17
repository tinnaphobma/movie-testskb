import React, { useState, useEffect } from "react";
import Car from "../assets/car.png";
import TransactionPopup from "../components/TransactionPopup";




const Cart = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const [movies, setMovies] = useState(cart);
  const [togglePopup, setTogglePopup] = useState(false)
  console.log(movies);
  const discount = movies.length >= 3 && movies.length < 5 ? 0.1 : movies.length >= 5 && 0.2
  const totalPrice = movies.reduce((  prev , curr )=> parseInt(prev)+ parseInt(curr.price) ,0) 


  
  
  console.log(totalPrice);

  return (
    <div className="flex w-full h-full ">
      
      <div className="px-14 py-16 gap-8  flex flex-col border border-black w-1/2 h-full   ">
        <label>Summery Order</label>
      <div onClick={() =>{ 
        localStorage.clear()
        setMovies([])
      } } className="rounded text-red-600 cursor-pointer bg-slate-300 w-fit">Clear</div>
        <div className="  w-full flex flex-col px-5 py-10 gap-5 border border-black">
         
             { movies?.map( (item)=> (
               <div className="  w-full flex gap-10 ">
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
    {discount &&  (<><label>Discount</label>
      <div className="border border-black py-10">
        <div className="pl-[calc(10vw-5rem)]">
          ส่วนลด  {movies.length } ชิ้น  {discount=== 0.1 ? '10%':'20%' } = { discount*totalPrice } บาท 
        </div>
      </div></>)}
    </div>
      <div className="px-14 py-16 gap-8  flex flex-col border border-black w-1/2 h-full   ">
        <label>Payment Details</label>
        <div className="  w-full flex flex-col px-5 py-10 gap-5 border border-black justify-center items-center" >
        <div className="flex"><label>รวมสินค้า <span className="pl-6"> {totalPrice}</span></label><span className="ml-20">บาท</span></div>
        <div className="flex"><label>ส่วนลด  <span className="pl-9"> { discount*totalPrice } </span>  </label><span className="ml-24">บาท</span></div>
        <div className="flex "><label>ช่องทางการชำระเงิน  </label><span className="ml-10">QR code</span></div>
        <div onClick={() => setTogglePopup(true)}  className=" cursor-pointer p-2 bg-slate-400 rounded"> ดำเนินการชำระเงิน </div>

        </div>
      </div>
                {togglePopup && <TransactionPopup setPopup={setTogglePopup}/>}

    </div>
  );
};

export default Cart;








