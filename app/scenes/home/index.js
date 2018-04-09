import { StackNavigator } from 'react-navigation';
import HomeView from './HomeView';
import TopUpWallet from './TopUpWallet'
import SendMoney from './SendMoney'
import TopUpWalletInputAmout from './TopUpWalletInputAmout'
import MyWallet from '../MyWallet'
import TopUpPhone from './TopUpPhone'
import FindMerchantMap from '../../scenes/FindMerchantMap'
import ClikGive from './ClikGive'
import PayBillTo from '../paybill/PayBillTo'
import PayBill from '../paybill/PayBill'
import RequestMoney from './RequestMoney'
import SendRequestMoney from './SendRequestMoney'
import PaymentCardScaner from './PaymentCardScaner'
import InputPaymentCardInfo from './InputPaymentCardInfo'
import WithdrawCash from './WithdrawCash'
import ScanBankCard from '../../scenes/ScanBankCard'
const HomeNavigator = StackNavigator(
    {
        HomeView: {
            screen: HomeView
        },
        TopUpWallet: {
            screen: TopUpWallet
        },
        SendMoney: {
            screen: SendMoney
        },
        TopUpWalletInputAmout: {
            screen: TopUpWalletInputAmout
        },
        MyWallet: {
            screen: MyWallet
        },
        TopUpPhone: {
            screen: TopUpPhone
        },
        FindMerchantMap: {
            screen: FindMerchantMap
        },
        ClikGive: {
            screen: ClikGive
        },
        PayBillTo: {
            screen: PayBillTo
        },
        PayBill: {
            screen: PayBill
        },
        RequestMoney: {
            screen: RequestMoney
        },
        SendRequestMoney: {
            screen: SendRequestMoney
        },
        PaymentCardScaner: {
            screen: PaymentCardScaner
        },
        InputPaymentCardInfo: {
            screen: InputPaymentCardInfo
        },
        WithdrawCash: {
            screen: WithdrawCash
        },
        ScanBankCard: {
            screen: ScanBankCard
        }
    },
    {
        headerMode: 'none'
    }
);

export default HomeNavigator;