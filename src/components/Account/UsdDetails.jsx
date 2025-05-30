import React from 'react'
import { IoWallet } from "react-icons/io5";
import Btn from '../Btn';
import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const UsdDetails = () => {
  const [address, setaddress] = useState()
  const handlesubmit=async(e)=>{
    e.preventDefault()
    try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/bank/addBinance`,{
    "binanceAddress":address
    },{
       headers:{
       Authorization:`Bearer ${localStorage.getItem("accessToken")}`
       }
     })
     console.log("response data",response.data.message)
     const data=response.data.data
     console.log("data",data)
     toast.success(response.data.message);
    }catch(err){
      console.log("error in adding Usdt Detaild",err)
      const errorMessage = err.response?.data?.message 
      console.log("errormsg",errorMessage)
      toast.error(errorMessage);
    }
  }
  return (
    <div>
        <div className='flex bg-white flex-col  p-4 rounded-3xl  mt-4 shadow-lg mx-4 '>
            {/**Name section */}
            <div className='mt-4'>
                <div className='flex  gap-2'>
                    <IoWallet className=' text-[#13B8A7] text-2xl' />
                    <label htmlFor="" className='text-sm font-semibold mb-2 flex items-center'>
                    Add USDT Address
                    </label>
                </div>
                <div className='font-semibold mb-3'>
                Binance Address(TRC20)
                </div>
                <input type="text" 
                value={address}
                onChange={(e)=>setaddress(e.target.value)}
                placeholder="TRC 20 Address"
                className='w-full rounded-lg bg-[#13B8A7] p-3'/>
            </div>
            <div onClick={handlesubmit}>
              <Btn title="Add Address"/>
            </div>

        </div>
    </div>
  )
}

export default UsdDetails