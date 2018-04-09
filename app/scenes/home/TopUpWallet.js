import React, { Component } from 'react';
import I18n from '../../i18n';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    ListView,
    processColor,
    ReactNative,
    TouchableOpacity,
    Alert,
    Linking
} from 'react-native';

import {
    SegmentControl,
    Selection,
    OptionText,
    Autocomplete,
    InputText,
    HeaderView,
    Button
} from '@clik.asia/clik-shared-app';
import Permissions from 'react-native-permissions';
let navigation;
export default class TopUpWallet extends Component {

    static navigationOptions = {
        tabBarOnPress: (tab) => {
            tab.jumpToIndex(tab.scene.index)
            navigation.goBack()
        }
    }

    constructor(props) {
        super(props);
        navigation = this.props.navigation;
    }

    componentDidMount() {
        Permissions.check('camera').then(response => {

        })
    }

    gotoFindMerchant = () => {
        this.props.navigation.navigate('TopUpWalletInputAmout')
    }
    scanBankCard = () => {
        Permissions.check('camera').then(response => {
            if (response != 'denied') {
                this.props.navigation.navigate('ScanBankCard')
            }
            else {
                Alert.alert(
                    'Camera has been denied',
                    'Please go to setting and select ClikPayment app then turn on the camera toggle',
                    [
                        { text: 'Later', onPress: () => null, style: 'cancel' },
                        { text: 'Now', onPress: () => Linking.openURL('app-settings:') },
                    ],
                    { cancelable: false }
                )
            }
        })

    }

    addPaymentCard() {
        this.props.navigation.navigate('PaymentCardScaner')
    }

    render() {
        return (
            <View style={styles.main_container}>
                <HeaderView
                    title="TOP UP WALLET"
                    message="How would you like to top up your Clik Wallet?" />
                <Button
                    textColor='#B7B7B7'
                    buttonStyle={{
                        marginTop: 100,
                        backgroundColor: '#FFFFFF',
                        width: 220,
                        height: 50
                    }}
                    text={'Add a Bank Card'}
                    onPress={() => this.scanBankCard()}
                />
                <Button
                    onPress={this.gotoFindMerchant}
                    textColor='#B7B7B7'
                    buttonStyle={{
                        marginTop: 20,
                        backgroundColor: '#FFFFFF',
                        width: 220,
                        height: 50
                    }}
                    text={'Find a Merchant'}
                />
            </View>

        );
    }
};
const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        paddingTop: 90,
        paddingLeft: 36,
        paddingRight: 36
    },

});