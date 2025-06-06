import React from 'react'

function WithdrawCard() {
  return (
    <div>
        <div className="flex  bg-white justify-center items-center  rounded-lg mx-4 w-40 gap-1 p-2 cursor-pointer">
        // onClick={()=>navigate('/profile/deposithistory')}
            <img src="..\src\assets\icon\deposit.png" alt="deposit" className='w-10 h-10' />
            <h3 className='text-[15px] text-gray-700 font-semibold'>Deposit History</h3>
        </div>
    </div>
  )
}

export default WithdrawCard