import React,{useState,useEffect} from 'react'
import { RiExchangeDollarFill } from "react-icons/ri";
import { GrUpgrade } from "react-icons/gr";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function InvidiaCard() {
  const navigate=useNavigate()
  const[cardData,setCardData]=useState([]);
  const [loading, setloading] = useState(true)
 
  useEffect(()=>{
    const fetchCardData=async()=>{
      try{
        const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/users/gpu-plans`,{headers:{
          Authorization:`Bearer ${localStorage.getItem("accessToken")}`
        }})
        if(response.status===200){
          console.log("The response data ",response.data);
          setCardData(response.data);
          console.log("carddata",cardData)
          setloading(false)
        }
      }
      catch(error){
        console.error("Error fetching Card Data",error?.message);
      }
    }
    fetchCardData();
  },[])
console.log("carddata",cardData)
  return (
    <div>
      {loading ?(
        <div className='flex justify-center items-center h-screen'>
          <div className='text-2xl font-bold'>Loading...</div>
        </div>
      ):( 
        cardData.map((data,idx)=>(
            <div className='bg-[#EAEBED] rounded-2xl p-2 mt-10 relative' key={idx}>
            <h2 className=' font-semibold text-lg  '>Card {idx+1}</h2>
            <div className='bg-white rounded-2xl my-2 flex justify-center items-center flex-col p-4'>
              <div className='text-gray-500 text-center'>Base Rate MH</div>
              <div className='text-center text-xl font-semibold mt-2'><span className='text-green-500'>{data.baseMH}</span></div>

            </div>
            <div className='flex justify-between'>
              <div className='flex gap-4'>
                <span className='flex items-center text-red-500 font-semibold text-xl'>
                    <RiExchangeDollarFill className='w-7 h-7 text-[#13B8A7]'/>&nbsp; {data.planCost}
                </span>
                <span className='flex items-center text-red-500 font-semibold text-xl'>
                    <GrUpgrade className='w-7 h-7 text-[#13B8A7]'/>&nbsp; {data.upgradeCost}
                </span>
              </div>
              <button 
              onClick={()=>navigate("/profile/deposit1",{ state: { price: data.planCost } })}
               className='bg-[#13B8A7] rounded-xl h-12 w-25 text-gray-500 font-semibold'>Buy</button>
            </div>
            <div className='absolute top-[-3%] left-[45%] transform -translate-y-1/2'>
              <img src="..\src\assets\icon\usdt.png" alt="" />
            </div>
        </div>
        )))}
    </div>
  )
}

export default InvidiaCard