import React,{useState} from 'react'
import BalanceCard from '../../components/BalanceCard'
import DepositAmount from '../../components/DepositAmount'
import Logout from '../../components/Logout'
import Instructions from '../../components/Instructions'
import ImageUploader from '../../components/ImageUploader'
import QrCard from '../../components/QrCard'
import DepositType from '../../components/DepositType'
import AddUsdtDeposit from '../../components/Account/AddUsdtDeposit'
import UpiDeposit from '../../components/QrRequest/UpiDeposit'
import UsdtDeposit from '../../components/QrRequest/UsdtDeposit'
import { useLocation } from 'react-router-dom';
function Deposit1() {
    const location = useLocation();
    const price = location.state?.price;
    const [usdtAmount,setusdtAmount] = useState(price)
  return (
    <div className='mt-4'>
        <BalanceCard/>
        <UsdtDeposit usdamount={usdtAmount}/>
        <Instructions/>
    </div>
  )
}

export default Deposit1