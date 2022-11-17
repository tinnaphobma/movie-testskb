import React, { useEffect, useState } from 'react'
import Qrcode from '../assets/QR.png'



const TransactionPopup = ({setPopup }) => {
    const [count, setCount] = useState(60);
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount);
        }, 1000); 
        if(count === 0 ){
            setPopup(false)
            alert('หมดเวลาแล้วเธอคงต้องไป')
        }
        return ()=>clearInterval(interval)
       
    }, [count, ]);
  return (
    <div className='gap-5 flex flex-col top-1/2 left-1/2 
    -translate-x-1/2  items-center -translate-y-1/2 fixed 
    h-[70vh] w-[70vh] bg-blue-200'>
     <div className='mt-20' >transaction</div>
     <img className='w-[50%] h-[50]' src={Qrcode} />
     <div>เลขบัญชี 738-393-983-2</div>
     <div>โปรดชำระก่อน {count} วินาที</div>
    </div>
  )
}

export default TransactionPopup