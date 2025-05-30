import React,{useState,useEffect} from 'react'
import {FaChevronRight } from 'react-icons/fa';
import { FaKey } from "react-icons/fa6";
import {FaRupeeSign,FaPenFancy } from "react-icons/fa"
import { BsPlusSquareDotted } from "react-icons/bs";
import { IoLogoUsd } from "react-icons/io";
import Logout from '../Logout';
import Btn from '../Btn';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useContext } from 'react';
import { UserDataContext } from '../../Context/UserContext';
const  AddUsdtAccount = () => {
  const [userobj, setuserobj] = useState("")
   const { user } = useContext(UserDataContext);
   const sizeof=Object.keys(user.activeAccounts).length
   console.log("sizeof",sizeof)
   console.log("user account id",user.activeAccounts[sizeof-1])
    const [deposit , setDeposit]=useState("")
    const [usddata, setusddata] = useState([])
    const [password, setpassword] = useState("")
    const numberofdetails=usddata.length
    const data=usddata[numberofdetails-1]
    console.log("size",numberofdetails) 
    const navigate=useNavigate()
    useEffect(() =>{
    const fetchdata= async ()=>{
     try{
      const response= await axios.get(`${import.meta.env.VITE_BASE_URL}/bank/getAllBinance`,{
      headers:{
      Authorization:`Bearer ${localStorage.getItem("accessToken")}`
      }
      })
      console.log("response data",response.data)
      setusddata(response.data.data)
    }catch(err){
      console.log("error in fetching usddetails",err)
      const errorMessage = err.response?.data?.message 
      console.log("errormsg",errorMessage)
      toast.error(errorMessage); 
    }
   }
   fetchdata();
  }, [])

  const handlesubmit=async(e)=>{
    e.preventDefault()
    if(!password &&!deposit){
      return toast.error("Fields can not be null")
    }
    const binancedata={
    "amount":deposit,
     "method":"Binance",
     "bankId":user.activeAccounts[sizeof-1],
    
     "password":password

}
    try{
      const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/transactions/withdraw`,binancedata,{
      headers:{
      Authorization:`Bearer ${localStorage.getItem("accessToken")}`
      }
      })
      console.log("response data",response.data.message)
      const data=response.data.data
      console.log("data",data)
      setDeposit("")
      setpassword("")
      toast.success(response.data.message);
    }catch(err){
      console.log("error in usdtwithdraw",err)
      const errorMessage = err.response?.data?.message 
      console.log("errormsg",errorMessage)
      toast.error(errorMessage);
    }

  }
  return (
    <div className='flex flex-col'>
        <div className='mt-4 flex justify-center'>
            <BsPlusSquareDotted className='w-15 h-15'
            onClick={()=>navigate('/profile/usddetails')}/>
        </div>
        <div className='flex flex-col justify-center items-center'>
            <span>Add Address</span>
            
        </div>
        <div className="bg-white flex flex-col  p-4 rounded-3xl shadow-lg  mt-4" >
           {data &&(
            <div 
                className="flex items-center justify-between rounded-2xl  px-4 py-4 border-b hover:bg-teal-500 hover:text-black transition duration-200 "
                style={{ borderColor: '#e1e1e131' }}
              >
                <div className="flex items-center space-x-4 ">
                  <span className="text-xl font-semibold"><IoLogoUsd /></span>
                  <span className="text-xl">{data.binanceAddress}</span>
                </div>
                <FaChevronRight className="text-gray-400" />
              </div>
           )}
            {/**Withdraw Amount section */}
            <div className='mt-4'>
              <hr className=' border-[#13B8A7]' />
                  {/**manual input */}
                  <div className='mt-4 py-2 flex items-center gap-2'>
                    <FaRupeeSign className='text-emerald-500 w-7 h-7'/>
                    <input type="number" 
                    className='flex bg-transparent outline-none placeholder:text-gray-400 w-xl'
                    placeholder='Please enter the amount'
                    value={deposit}
                    onChange={(e)=>setDeposit(e.target.value)}
                    />
                  </div>
                  <div className='mt-4'>
                    <div>Withdrawable balance <span className='text-emerald-500 font-semibold'>$ 2708085.5 </span></div>
                    <hr className=' border-[#13B8A7] mt-4' />
                  </div>
                  <div className=' mt-4 flex gap-4'>
                  <FaKey className='mt-1 h-10 w-10 text-emerald-500'/>
                  <input type="text" 
                  value={password}
                  onChange={(e)=>setpassword(e.target.value)}
                  className='bg-transparent outline-none placeholder:text-gray-400 w-xl'
                  placeholder='Enter Password'/>
                  </div>
                  <div onClick={handlesubmit}>
                    <Btn title="Withdraw"/>
                  </div>
            </div>
        </div>
        
    </div>
  )
}

export default AddUsdtAccount