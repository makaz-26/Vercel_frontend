import React,{useContext} from 'react'
import {UserDataContext} from '../Context/UserContext'

function BalanceCard() {
    const{user}=useContext(UserDataContext);
   
return (
    <div className="flex justify-between items-center p-4 rounded-lg shadow-md mx-4 bg-[#ffffff]">
            <div className="flex items-center space-x-4">
                <div>
                    <h1><img src="..\src\assets\icon\usdtt.png" alt="" /></h1>
                </div>
                <div>
                    <p className="text-gray-500 text-sm ">CURRENT BALANCE</p>
                    <h3 className="text-lg font-semibold">{user.balance} USDT</h3>
                    <p className="text-black text-xs ">{user.miningRate}</p>
                </div>
            </div>
            <div>
                <img className="w-3 h-3" src="..\src\assets\icon\info.png" alt="info icon" />
            </div>
    </div>
)
}

export default BalanceCard