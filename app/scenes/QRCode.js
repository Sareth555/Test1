import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Alert,
    AsyncStorage
} from 'react-native';

import {
    ImageRound,
    CardView,
    Icon
} from '@clik.asia/clik-shared-app';

import IconMenuQRCode from '../images/svgs/IconMenuQRCode';
import { MyQRCodeAPI } from '../api';
import axios, { request, baseURL } from '../utils';
import { fontLight, fontRegular, fontSemiBold, fontBold } from '../Fonts/Fonts';
var SaveAssetLibrary = require('react-native-save-asset-library');

export default class QRCode extends Component {

    static navigationOptions = {
        tabBarLabel: 'QR Code',
        tabBarIcon: ({ tintColor }) => (
            <Icon
                width={24} height={24}
                svg={IconMenuQRCode}
                fill={tintColor} />
        )
    }
    constructor(props) {
        super(props);
        this.state = {
            UserName: '',
            token: '',
            qrCodeImage: ''
        }
    }

    componentWillMount() {
        AsyncStorage.multiGet(['UserName', 'token'])
        .then(([UserName, token ]) =>  {
                if (UserName) {
                    this.setState({
                        UserName:UserName[1]
                    })
                    fetch(baseURL + '/shared-api/my-qr-code', {
                        method: 'GET',
                        headers: {
                          'Accept': 'application/json',
                          'Authorization': 'Bearer ' + token[1],
                        }
                      })
                    .then(response => {
                        var base64Data = response._bodyText;
                        var base64Data = base64Data.slice(1, -1);
                        this.setState({
                            qrCodeImage: base64Data
                        })
                    })
                    .catch((e) => {
                        console.log(e);
                    })
                }
            }).catch((e) => {
                console.log(e);
            });
    }

    onPinChange(value) {
        if (value.length == 6) {
            this.props.navigation.goBack();
            this.props.navigation.navigate('ViewReceiptScreen', {
                color: '#F5D63D',
                tranTitle: 'WALLET TOPPED UP',
                message: 'YOU TOPPED UP AT',
                partnerName: 'Khéma Pasteur KHE001',
                partnerProfileUri: 'https://www.khema-restaurant.com/images/khema_logo.png',
                displayAmout: '$40',
                details: [
                    {
                        label: 'SERVED BY',
                        value: 'Mr Samnang L’Or'
                    },
                    {
                        label: 'SOURCE',
                        value: 'Clik Wallet'
                    },
                    {
                        label: 'COMMISSION',
                        value: '$0.00'
                    },
                    {
                        label: 'DATE',
                        value: '03 December 2017'
                    },
                    {
                        label: 'TIME',
                        value: '19:20:56'
                    },
                    {
                        label: 'NOTE',
                        value: 'Top Up at Merchant'
                    },
                    {
                        label: 'TRANSACTION #',
                        value: '12354326789'
                    }
                ]
            });
        }
    }
    navigateToScanQR() {
        this.props.navigation.navigate('ScanQRCodeView',{
            scanQRTitle: 'SCAN QR CODE',
            scanQRTitleTextColor: 'white',
            scanQRDes:'Scan QR code from the device you would like to pay',
            scanQRDesTextColor: '#999',
            buttonTitle: 'View My QR Code',
            isShowButton: true,
            goToScreenWhenSuccess: ''
        })
    }

    render() {
        console.log(this.state.qrCodeImage)
        return (
            <View style={styles.container}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row'
                }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 24 }} >
                            <CardView style={{ flex: 1, marginLeft: 16, marginRight: 16, marginTop: 24 }} >
                                <Text style={styles.title}>MY QR CODE</Text>
                                <View style={{ flexDirection: 'row', flex: 1, padding: 16 }}>
                                    <Image resizeMode='contain' style={styles.qrCode} source={{uri:`data:image/gif;base64,${this.state.qrCodeImage}`}} />
                                </View>
                            </CardView>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={{ flexDirection: 'row' }}
                    onPress={() => this.navigateToScanQR()}>
                    <CardView style={{ flex: 1, margin: 16 }} >
                        <Text style={styles.button}>Scan a QR</Text>
                    </CardView>
                </TouchableOpacity>
                <View style={{
                    flexDirection: 'row',
                    backgroundColor: '#333333'
                }}>
                    <View style={{
                        flex: 1, flexDirection: 'row'
                    }}>
                        <ImageRound size={70} style={{ alignSelf: 'center', margin: 16 }}
                            source={{ uri: 'https://www.valleybusinessreport.com/wp-content/uploads/2017/07/default-avatar-tech-guy.png' }} />
                        <View style={{ flex:1, marginRight: 3, justifyContent: 'center' }} >
                            <Text style={{ color: 'white', fontSize: 18, fontFamily: fontBold }}>{this.state.UserName}</Text>
                            <Text style={{ color: 'white', fontFamily: fontRegular }}>{`username: ${this.state.UserName}`}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        paddingBottom: 8,
        paddingTop: 8,
        fontFamily: fontBold
    },
    button: {
        textAlign: 'center',
        fontSize: 20,
        padding: 8,
        fontFamily: fontSemiBold
    },
    qrCode: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        flex: 1
    }
});