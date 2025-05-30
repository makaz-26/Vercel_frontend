import React, { useContext, useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import { FaKey } from "react-icons/fa6";
import { FaRupeeSign } from "react-icons/fa";
import { BsPlusSquareDotted } from "react-icons/bs";
import Logout from "../Logout";
import Btn from "../Btn";
import { useNavigate } from "react-router-dom";
import { BankDataContext } from "../../Context/BankContext";
import axios from "axios";
import {toast}  from 'react-toastify'

const AddAccount = () => {
  const { bank, setBank } = useContext(BankDataContext);
  const navigate = useNavigate();
  const [amount , setamount]=useState("")
  const [password,setPassword]=useState("")

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/bank/getAllBank`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        console.log("response",response)
        console.log("size",response.data.data.length)
        if (response?.data?.data?.length > 0) {
          setBank(response.data.data[response.data.data.length-1]);
        } else {
          console.log("No bank details found");
        }
      } catch (error) {
        console.log(
          "The error is",
          error?.response?.data?.message || error.message
        );
      }
    };

    fetchAccountDetails();
  }, []);

  const handlesubmit= async(e)=>{
    e.preventDefault()
    const data={
     amount: amount,
     method: "bank_transfer",
     accountDetails: bank.accountNumber,
     password:password
     }
    try{
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/transactions/withdraw`,data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(response.data)
      toast.success(response.data.message)
      setamount("")
      setPassword("")
    }catch(err){
      console.log("error in withdraw",err)
       const errorMessage = err.response?.data?.message 
       console.log("errormsg",errorMessage)
       toast.error(errorMessage);
    }
  }

  return (
    <div className="flex flex-col">
      {/* Add Bank Button */}
      <div className="mt-4 flex justify-center">
        <BsPlusSquareDotted
          className="w-15 h-15"
          onClick={() => navigate("/profile/bankdetails")}
        />
      </div>

      {/* Add Bank Account Section */}
      <div className="flex flex-col justify-center items-center">
        <span>Add a Bank Account Number</span>
        <p className="text-sm text-red-500 font-mono p-2 text-center">
          Need to add beneficiary information to be able to withdraw money
        </p>
      </div>

      {/* Display Single Bank Details */}
      <div className="bg-white flex flex-col p-4 rounded-3xl shadow-lg">
        <div
          className="flex items-center justify-between rounded-2xl px-4 py-4 border-b hover:bg-teal-500 hover:text-black transition duration-200"
          style={{ borderColor: "#e1e1e131" }}
        >
          <div className="flex items-center space-x-4">
            <span className="text-xl font-semibold">
              {bank?.bankName || "No Bank Name"}
            </span>
            <span className="text-xl">
              {bank?.accountNumber || "No Account Number"}
            </span>
          </div>
          <FaChevronRight className="text-gray-400" />
        </div>
        {/**Withdraw Amount section */}
            <div className='mt-4'>
              <hr className=' border-[#13B8A7]' />
                  {/**manual input */}
                  <div className='mt-4 py-2 flex items-center gap-2'>
                    <FaRupeeSign className='text-emerald-500 w-7 h-7'/>
                    <input type="number" 
                    className='flex bg-transparent outline-none placeholder:text-gray-400 w-xl'
                    placeholder='Please enter the amount'
                    value={amount}
                    onChange={(e)=>setamount(e.target.value)}
                    />
                  </div>
                  <div className='mt-4'>
                    <div>Withdrawable balance <span className='text-emerald-500 font-semibold'>₹ 2708085.5 </span></div>
                    <div className='flex gap-2 mt-2'>
                    <span>Withdrawal amount received</span>
                    <span className='text-black font-semibold'>₹ 4708085.5</span>
                    </div>
                    <hr className=' border-[#13B8A7] mt-4' />
                  </div>
                  <div className=' mt-4 flex gap-4'>
                  <FaKey className='mt-1 h-10 w-10 text-emerald-500'/>
                  <input
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  type="text" 
                  className='bg-transparent outline-none placeholder:text-gray-400 w-xl'
                  placeholder='Enter Password'/>
                  </div>
                  <div onClick={handlesubmit}>
                    <Btn title="Withdraw"/>
                  </div>
            </div>
      </div>       
    </div>
  );
};

export default AddAccount;
