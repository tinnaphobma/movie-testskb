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
    h-[80vh] w-[90vh] bg-gray-300 rounded-lg shadow-sm'>
     <div className='mt-4 text-xl' >ชำระเงิน</div>
     <img className='w-[50%] h-[50] ' src={Qrcode} />
     <div>OR e-Wallet ID  738-393-983-2</div>
     <div>Ref 1 : 318348013</div>
     <div>Ref 2 : 232313</div>
     <div>โปรดชำระก่อน {count} วินาที</div>
    </div>
  )
}

export default TransactionPopup