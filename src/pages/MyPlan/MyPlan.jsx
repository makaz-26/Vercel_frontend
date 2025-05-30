import React,{useState,useEffect} from 'react'
import { RiExchangeDollarFill } from "react-icons/ri";
import { GrUpgrade } from "react-icons/gr";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function MyPlan() {
  const [data, setdata] = useState([])
  const cardData=[
  {
    "name": "Card A",
    "hashRate": "50 MH/s",
    "price": 299.99
  },
  {
    "name": "Card B",
    "hashRate": "75 MH/s",
    "price": 449.99
  },
  {
    "name": "Card C",
    "hashRate": "100 MH/s",
    "price": 599.99
  },
  {
    "name": "Card D",
    "hashRate": "150 MH/s",
    "price": 799.99
  },
  {
    "name": "Card E",
    "hashRate": "200 MH/s",
    "price": 999.99
  }
]
useEffect(() => {
  const fetchData= async ()=>{
  try{
    const response =await axios.get(`${import.meta.env.VITE_BASE_URL}/gpuCard/allGpuUser`,{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("accessToken")}`
      }
    })
    const {data}=response.data
    setdata(data)
    console.log("card data",data)
  }catch(err){
    console.log("error in fetching card data",err)
  }
  
}
fetchData()
}, [])

  return (
    <div>
        <div className='flex justify-center items-center bg-[#13B8A7] p-4 text-[15px] text-gray-700 font-semibold'>
        My Plans
      </div>
    <div className="bg-white flex flex-col  p-4 rounded-3xl mt-4 shadow-lg">
      <div>
              {data?.map((data,idx)=>(
                  <div className='bg-[#EAEBED] rounded-2xl p-2 mt-10 relative' key={idx}>
                  <h2 className=' font-semibold text-lg  '>{data.name}</h2>
                  <div className='bg-white rounded-2xl my-2 flex justify-center items-center flex-col p-4'>
                    <div className='text-gray-500 text-center'>Base Rate MH</div>
                    <div className='text-center text-xl font-semibold mt-2'><span className='text-green-500'>{data.baseRateMH}</span></div>
      
                  </div>
                  <div className='flex justify-between'>
                    <div className='flex gap-4'>
                      <span className='flex items-center text-red-500 font-semibold text-xl'>
                          <RiExchangeDollarFill className='w-7 h-7 text-[#13B8A7]'/>&nbsp; {data.price}
                      </span>
                      <span className='flex items-center text-red-500 font-semibold text-xl'>
                          <GrUpgrade className='w-7 h-7 text-[#13B8A7]'/>&nbsp; {data.upgradeCost}
                      </span>
                    </div>
                    
                  </div>
                  <div className='absolute top-[-3%] left-[45%] transform -translate-y-1/2'>
                    <img src="..\src\assets\icon\usdt.png" alt="" />
                  </div>
              </div>
              ))}
          </div>
    </div>
    </div>
  )
}

export default MyPlan