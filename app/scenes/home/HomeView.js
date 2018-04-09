import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Alert,
    BackHandler,
    StyleSheet,
    ActivityIndicator,
    AsyncStorage,
    Modal,
    TouchableHighlight
} from 'react-native';
import I18n from '../../i18n';
import CacheStore from 'react-native-cache-store';
import TopUpWallet from './TopUpWallet'
import SendMoney from './SendMoney'
import MenuButton from './MenuButton'
import MenuRow from './MenuRow'

import LinearGradient from 'react-native-linear-gradient';
import MyProfileApi from '../../api/MyProfileApi';
import TransactionsApi from '../../api/TransactionsApi';
import { fontLight, fontRegular, fontSemiBold, fontBold } from '../../Fonts/Fonts';
import { NavigationActions } from 'react-navigation';
console.disableYellowBox = true;
export default class HomeView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            UserName: '',
            Balance: 0,
            isLoading: true
        }
        BackHandler.addEventListener('hardwareBackPress', () => this.exitApp());
    }

    exitApp() {
        BackHandler.exitApp();
    }

    onMenuPress(menuProps) {
        this.props.navigation.navigate(menuProps.screen)
    }

    componentWillMount() {
        
        AsyncStorage.multiGet(['UserName', 'Balance'])
            .then(([UserName, Balance]) => {
                this.setState({
                    UserName: UserName[1],
                    Balance: Balance[1],
                    isLoading: (!UserName[1] || !Balance[1])
                })
            }).catch((e) => {
                console.log(e);
            });
        this.balanceChecking();
    }

    balanceChecking() {
        new TransactionsApi().execute()
            .then(balance => {
                if (balance.status == 200 && this.state.Balance != balance.data.balance) {
                    AsyncStorage.setItem('Balance', balance.data.balance + "")
                        .then(() => {
                            this.setState({
                                Balance: balance.data.balance,
                                isLoading: false
                            })
                        });
                }
                this.sleep(3000).then(() => {
                    this.balanceChecking();
                });
            }).catch((e) => {
                if (e.response.status == 401) {
                    this.goToSignIn();
                }
            });
    }
    sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    goToSignIn() {
        // const resetAction = NavigationActions.reset({
        //     index: 0,
        //     actions: [
        //         NavigationActions.navigate({ routeName: 'SignIn' })
        //     ]
        // })
        // this.props.navigation.dispatch(resetAction)
    }

    render() {
        if (this.state.isLoading)
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="small" color="#80C2BC" />
                </View>
            );
        return (
            <LinearGradient colors={['#F7F7F7', '#EFEFEF']} style={styles.container}>
                <View style={styles.greatingView}>
                    <Text style={[styles.textStyle,{fontFamily: fontSemiBold}]}>{I18n.t("hello") + " " + this.state.UserName} </Text>
                </View>
                <View style={styles.balanceViewStyle}>
                    <View style={styles.backViewBalance} />
                    <View style={styles.topViewBalance}>
                        <Text style={[styles.yourBalanceTextStyle,{fontFamily: fontBold}]}>{I18n.t("yourBalance")}</Text>
                        <Text style={[styles.banlanceAmountStyle,{fontFamily: fontRegular}]}>${this.state.Balance}</Text>
                    </View>
                </View>
                <Text style={[styles.menuTextStyle,{fontFamily: fontSemiBold,}]}>{I18n.t("menu")}</Text>
                <View style={styles.menuViewStyle}>
                    <MenuRow>
                        <MenuButton backgroundColor='#5a7ca9'
                            screen={'MyWallet'}
                            onMenuPress={(menuProps) => this.onMenuPress(menuProps)}
                            source={require('../../images/wallet_icon.png')}
                            text={I18n.t("myWallet1") + "\n" + I18n.t("myWallet2")} />
                        <MenuButton backgroundColor='#F2D55C'
                            screen={'TopUpWallet'}
                            onMenuPress={(menuProps) => this.onMenuPress(menuProps)}
                            source={require('../../images/top_up_wallet.png')}
                            text={I18n.t("topUpWallet1") + "\n" + I18n.t("topUpWallet2")} />
                        <MenuButton backgroundColor='#E16F6B'
                            screen={'SendMoney'}
                            source={require('../../images/send_money.png')}
                            onMenuPress={(menuProps) => this.onMenuPress(menuProps)}
                            text={I18n.t("sendMoney1") + "\n" + I18n.t("sendMoney2")} />
                        <MenuButton backgroundColor='#ACCD7B'
                            screen={'RequestMoney'}
                            source={require('../../images/request_money.png')}
                            onMenuPress={(menuProps) => this.onMenuPress(menuProps)}
                            text={I18n.t("requestMoney1") + "\n" + I18n.t("requestMoney2")} />
                    </MenuRow>
                    <MenuRow>
                        <MenuButton backgroundColor='#BB89C3'
                            screen={'TopUpPhone'}
                            source={require('../../images/top_up_phone.png')}
                            onMenuPress={(menuProps) => this.onMenuPress(menuProps)}
                            text={I18n.t("topUpPhone1") + "\n" + I18n.t("topUpPhone2")} />
                        <MenuButton backgroundColor='#A4D8E3'
                            screen={'WithdrawCash'}
                            onMenuPress={(menuProps) => this.onMenuPress(menuProps)}
                            source={require('../../images/withdraw_cash.png')}
                            text={I18n.t("withdrawCash1") + "\n" + I18n.t("withdrawCash2")} />
                        <MenuButton backgroundColor='#F6B861'
                            screen={'PayBillTo'}
                            source={require('../../images/pay_bill.png')}
                            onMenuPress={(menuProps) => this.onMenuPress(menuProps)}
                            text={I18n.t("payBill1") + "\n" + I18n.t("payBill2")} />
                        <MenuButton backgroundColor='#EB9EBD'
                            screen={'ClikGive'}
                            onMenuPress={(menuProps) => this.onMenuPress(menuProps)}
                            source={require('../../images/clik_give.png')}
                            text={I18n.t("clikGive1") + "\n" + I18n.t("clikGive2")} />
                    </MenuRow>
                </View>
            </LinearGradient>

        );
    }
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    greatingView: {
        flex: 2,
        marginTop: 20,
        justifyContent: 'flex-end'
    },
    menuViewStyle: {
        flex: 6,
        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        fontSize: 20,
        paddingLeft: 30,
        paddingBottom: 20,
        fontWeight: '400',
    },
    menuTextStyle: {
        paddingLeft: 30,
        paddingTop: 5,
        color: '#BDBDBD',
        fontSize: 14,
        fontFamily: fontSemiBold,
        paddingBottom: 10
    },
    balanceViewStyle: {
        flex: 4,
        justifyContent: 'center'
    },
    backViewBalance: {
        backgroundColor: '#FCFCFC',
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
        marginBottom: 30,
        borderRadius: 10,
    },
    topViewBalance: {
        position: 'absolute',
        left: 35,
        right: 35,
        top: 10,
        bottom: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    yourBalanceTextStyle: {
        fontSize: 10,
        color: '#333333'
    },
    banlanceAmountStyle: {
        fontSize: 50,
        color: '#333333',
    }
});