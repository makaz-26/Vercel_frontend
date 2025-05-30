import React from 'react'
import Btn from '../../components/Btn'
import { useState } from 'react'
import {toast}  from 'react-toastify'
import axios from 'axios'
function ChangePassword() {
    const [loginPassword,setLoginPassword]=useState("")
    const [newPassword, setnewPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    

    const submithandler= async(e)=>{
        e.preventDefault()
        if(!loginPassword || !newPassword || !confirmPassword){
            toast.error("All Fields are required")
            return
        }
        if(newPassword !== confirmPassword){
            toast.error("New Password and Confirm Password do not match")
            return
        }
        try{
        const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/users/change-password`,{
        "oldPassword":loginPassword,
        "newPassword":newPassword
        },{
        headers:{
        Authorization:`Bearer ${localStorage.getItem("accessToken")}`
        }
        })
        if(response.status===200){
            toast.success("Password changed successfully");
            setLoginPassword("")
            setnewPassword("")
            setconfirmPassword("")
        }
        }catch(err){
            console.log("error in changing password")
            toast.error( err?.message || "Failed to change password")
        }

    }
  return (
    <div>
        <div className='flex justify-center items-center bg-[#13B8A7] p-4 text-[15px] text-gray-700 font-semibold'>
        Change Password
      </div>
    <div className="bg-white flex flex-col  p-4 rounded-3xl mt-4 shadow-lg">
        <div className='flex flex-col'>
            <span className='font-semibold '>Login Pasword</span>
            <input
            value={loginPassword}
            onChange={(e)=>setLoginPassword(e.target.value)}
            
             type="text"
            className='bg-[#EAEBED] outline-0 flex justify-center items-center rounded-xl p-2 mt-2'
            placeholder='Plese Enter Login Password' />
        </div>
        <div className='flex flex-col mt-2'>
            <span className='font-semibold '>New Login Pasword</span>
            <input
            value={newPassword}
            onChange={(e)=>setnewPassword(e.target.value)}
             type="text"
            className='bg-[#EAEBED] outline-0 flex justify-center items-center rounded-xl p-2 mt-2'
            placeholder='Enter New Login Password' />
        </div>
        <div className='flex flex-col mt-2'>
            <span className='font-semibold '>Confirm new Pasword</span>
            <input 
            value={confirmPassword}
            onChange={(e)=>setconfirmPassword(e.target.value)}
            type="text"
            className='bg-[#EAEBED] outline-0 flex justify-center items-center rounded-xl p-2 mt-2'
            placeholder='Confirm New Password' />
        </div>
        <div onClick={submithandler}>
            <Btn title="Submit"/>
        </div>
    </div>
    </div>
  )
}

export default ChangePassword