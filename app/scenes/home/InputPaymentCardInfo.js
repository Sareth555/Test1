import React, { Component } from 'react';
import I18n from '../../i18n';
import { NavigationActions } from 'react-navigation';
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
    Alert
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    SegmentControl,
    Selection,
    OptionText,
    Autocomplete,
    InputText,
    HeaderView,
    Button
} from '@clik.asia/clik-shared-app';

import AddPaymentCardApi from '../../api/AddPaymentCardApi'
import { ModelIndicator } from '../../components/ModelIndicator';
import { fontLight, fontRegular, fontSemiBold, fontBold } from '../../Fonts/Fonts';

let navigation;
export default class InputPaymentCardInfo extends Component {

    static navigationOptions = {
        tabBarOnPress: (tab) => {
            tab.jumpToIndex(tab.scene.index)
            navigation.goBack()
        }
    }

    hints = {
        NameHint: 'Please enter a card name so you can recognise this card!',
        IssuerHint: 'Please enter the name of the bank that issued your card!',
        CardholderHint: 'Please enter a name on your card!',
        CardNumberHint: 'Please enter your card number!',
        ExpiresHint: 'Please enter your card expiry date!',
        CvvHint: 'Please enter the 3-digit code on the back of your card!'
    }

    constructor(props) {
        super(props);
        console.log(this.props.navigation.state.params);
        navigation = this.props.navigation;
        const params = {
            Name,
            Issuer,
            Cardholder,
            CardNumber,
            Expires,
            Cvv
        } = this.props.navigation.state.params || {};
        this.state = {
            params,
            modalVisible: false
        }
    }

    submitData() {
        this.setState({ modalVisible: true })
        new AddPaymentCardApi()
            .execute(this.state.params)
            .then(responce => {
                console.log(responce)
                this.setState({ modalVisible: false })
                if (responce.status == 200) {
                    this.addPaymentCardResult();
                }
            }).catch(error => {
                this.setState({ modalVisible: false })
                console.log(error)
                console.log(error.config)
            });
    }

    addPaymentCardResult() {
        this.props.navigation.navigate('ActionResult',
            {
                title: 'CARD ADDED!',
                buttonBgColor: '#80C2BC',
                buttonTextColor: 'white',
                buttonTitle: 'Top Up Clik Wallet',
                image: require('../../images/ticked_icon.png'),
                bodyContain: <View style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ margin: 36, fontFamily: fontRegular, textAlign: 'center' }} >Great! Your card has been added.</Text>
                        <Text style={{ marginLeft: 36, marginRight: 36, fontFamily: fontRegular, textAlign: 'center' }} >You can now select “Main Debit Card” to top up your Clik wallet!</Text>
                    </View>
                    <Button
                        onPress={() => { this.props.navigation.navigate('ScanBankCard') }}
                        styleText={{ paddingLeft: 50, paddingRight: 50 }}
                        text='Add Another Card'
                        textColor='#6BC4BC'
                        buttonStyle={{ marginBottom: 24, backgroundColor: 'transparent', borderColor: '#6BC4BC', borderWidth: 2 }}
                        height={50} />
                </View>,
                onButtonPress: () => { this.props.navigation.navigate('TopUpWalletInputAmout') },
            }
        );
    }

    isValid() {
        const { Name,
            Issuer,
            Cardholder,
            CardNumber,
            Expires,
            Cvv } = this.state.params;
        return (Name != ""
            && Issuer != ''
            && Cardholder != ''
            && CardNumber != ''
            && Expires != ''
            && Cvv != ''
        )
    }

    goBack() {
        this.props.navigation.goBack();
    }

    onChangeText(key, text) {
        this.setState({
            params: {
                ...this.state.params,
                [key]: text
            }
        })
    }

    getHintByKey(key) {
        const hintKey = [key] + 'Hint';
        return (this.state.params[key] && this.state.params[key] != '') ? '' : this.hints[hintKey];
    }

    onSelected = (child) => {
        this.setState({ source: child.props.children })
        return true;
    }

    render() {
        return (
            <KeyboardAwareScrollView style={styles.main_container}>
                <HeaderView
                    title="CARD DETAILS"
                    message={'Please complete and confirm your card details.'} />
                <View style={styles.container}>
                    <InputText
                        tintColor='#FFB74D'
                        textMessage={this.getHintByKey('Name')}
                        onChangeText={(text) => this.onChangeText('Name', text)}
                        value={this.state.params.Name}
                        textHint={I18n.t('cardName')} />
                    <InputText
                        tintColor='#FFB74D'
                        textMessage={this.getHintByKey('Issuer')}
                        onChangeText={(text) => this.onChangeText('Issuer', text)}
                        value={this.state.params.Issuer}
                        textHint={I18n.t('cardIssuer')} />
                    <InputText
                        tintColor='#FFB74D'
                        textMessage={this.getHintByKey('Cardholder')}
                        onChangeText={(text) => this.onChangeText('Cardholder', text)}
                        value={this.state.params.Cardholder}
                        textHint={I18n.t('nameOnCard')} />
                    <InputText
                        tintColor='#FFB74D'
                        keyboardType='number-pad'
                        textMessage={this.getHintByKey('CardNumber')}
                        onChangeText={(text) => this.onChangeText('CardNumber', text)}
                        value={this.state.params.CardNumber}
                        textHint={I18n.t('cardNumber')} />
                    <InputText
                        tintColor='#FFB74D'
                        keyboardType='numbers-and-punctuation'
                        textMessage={this.getHintByKey('Expires')}
                        onChangeText={(text) =>
                            this.onChangeText('Expires', text)
                        }
                        value={this.state.params.Expires}
                        textHint={I18n.t('expiryDate')} />
                    <InputText
                        tintColor='#FFB74D'
                        keyboardType='number-pad'
                        secureTextEntry
                        textMessage={this.getHintByKey('Cvv')}
                        onChangeText={(text) => {
                            if (text.length < 4)
                                this.onChangeText('Cvv', text)
                        }}
                        value={this.state.params.Cvv}
                        textHint={I18n.t('cvv')} />
                </View>
                <View style={styles.foot}>
                    <Button
                        onPress={() => this.goBack()}
                        icon={{ name: 'arrow-back', type: 'MaterialIcons', size: 24, color: 'white' }}
                        buttonStyle={{ margin: 8, backgroundColor: '#D0D0D0', borderRadius: 10, width: 50, height: 50 }}
                    />
                    <Button
                        onPress={() => this.submitData()}
                        disable={!this.isValid()}
                        buttonStyle={{ margin: 0, borderRadius: 10, height: 50 }}
                        text={'Continue'}
                    />
                </View>
                <ModelIndicator
                    visible={this.state.modalVisible} />
            </KeyboardAwareScrollView>);
    }
};
const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        paddingTop: 90,
        paddingLeft: 36,
        paddingRight: 36
    },
    foot: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 100
    },
    container: {
        marginTop: 36,
        marginBottom: 20
    },
});