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
    AsyncStorage
} from 'react-native';

import {
    SegmentControl,
    Selection,
    OptionText,
    Autocomplete,
    InputText,
    HeaderView,
    Button,
    ModelIndicator
} from '@clik.asia/clik-shared-app';

import { Styles } from '../../styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { PayBillApi } from '../../api';
let navigation;
export default class PayBill extends Component {

    static navigationOptions = {
        tabBarOnPress: (tab) => {
            tab.jumpToIndex(tab.scene.index)
            navigation.goBack()
        }
    }

    constructor(props) {
        super(props)
        navigation = this.props.navigation;
        this.state = {
            amount: '',
            sourceData: ['Loading...'],
            selectedIndex: 0,
            invoiceNumber: '',
            currency: '$',
            modalVisible: false
        };
    }

    componentWillMount() {
        AsyncStorage.getItem('Balance').then((result) => {
            if (result) {
                this.setState({ sourceData: [`Clik Wallet [$${result}]`] });
            }
        }).catch((e) => {
            console.log(e);
        });
    }

    onChangeText(key, text) {
        this.setState({ [key]: text })
    }
    componentDidMount() {
        this.setState({ source: this.state.sourceData[0] })
    }

    onSelected = (child) => {
        this.setState({ selectedIndex: child.props.index })
        return true;
    }

    onSegmentSelected = (child) => {
        this.setState({ currency: child.props.value });
    }

    onRecPress(receipient) {
        this.setState({ isShowReceipient: false, receipient })
    }

    isValid() {
        if (this.state.amount != "" && this.state.dataSource != '')
            return true;
        else return false;

    }

    processSendMoney() {
        const {
            partnerName,
            partnerProfileUri,
        } = this.props.navigation.state.params;
        this.props.navigation.navigate('ConfirmPin', {
            title: 'PAY BILL',
            confirmTitle: `PAY BILL\n#${this.state.invoiceNumber}`,
            message: 'Enter PIN to confirm transaction.',
            partnerName,
            partnerProfileUri,
            displayAmout: `${this.state.currency}${this.state.amount}`,
            color: '#FFB64D',
            onPinChange: (value, navigation) => this.onPinChange(value, navigation)
        })
    }

    onPinChange(value, navigation) {
        if (value.length == 6) {
            const params = {
                pin: value,
                InvoiceNumber: this.state.invoiceNumber,
                Amount: this.state.amount,
                MerchantId: this.props.navigation.state.params.MerchantId
            }
            this.setState({ modalVisible: true })
            new PayBillApi().execute(params)
                .then(responce => {
                    console.log(responce)
                    this.setState({ modalVisible: false })
                    this.onPaySuccess();
                })
                .catch(e => {
                    this.showErrorAlert(navigation)
                    console.log(e)
                    console.log(e.config)
                })
        }
    }

    showErrorAlert(navigation) {
        Alert.alert(
            'Somthing wrong',
            '',
            [
                {
                    text: 'OK', onPress: () => {
                        navigation.goBack();
                        this.setState({ modalVisible: false })
                    }
                },
            ],
            { cancelable: false }
        )
    }

    onPaySuccess() {
        const {
            partnerName,
            partnerProfileUri,
        } = this.props.navigation.state.params;
        this.props.navigation.goBack();
        this.props.navigation.navigate('ViewReceiptScreen', {
            color: '#FFB64D',
            tranTitle: 'PAY BILL',
            message: 'YOU PAID',
            partnerName,
            partnerProfileUri,
            displayAmout: `${this.state.currency}${this.state.amount}`,
            details: [
                {
                    label: 'SOURCE',
                    value: this.state.sourceData[this.state.selectedIndex]
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
                    value: 'Electricity Bill'
                },
                {
                    label: 'TRANSACTION #',
                    value: '12354326789'
                }
            ]
        });
    }

    goBack() {
        const onBackPress = this.props.onBackPress
        if (onBackPress)
            onBackPress()
        else if (this.props.navigation) {
            this.props.navigation.goBack()
        }
    }

    render() {
        return (<KeyboardAwareScrollView
            innerRef={ref => { this.scroll = ref }}>
            <View style={styles.main_container}>
                <HeaderView
                    title="Pay Bills"
                    message="Please fill in your infomation." />
                <View style={styles.container}>
                    <SegmentControl
                        textColor='#FFB64D'
                        height={37}
                        onSelected={this.onSegmentSelected}>
                        <Text selected={this.state.currency == '៛'} value='៛'>៛ KHR</Text>
                        <Text selected={this.state.currency == '$'} value='$'>$ USD</Text>
                    </SegmentControl>
                </View>
                <InputText
                    keyboardType='numeric'
                    onChangeText={(text) => this.onChangeText('invoiceNumber', text)}
                    value={this.state.invoiceNumber}
                    textHint={I18n.t('invoiceNumber')} />
                <Selection
                    onSelected={this.onSelected}
                    value={this.state.sourceData[this.state.selectedIndex]}
                    textHint={I18n.t('source')} >
                    <OptionText index={0}>{this.state.sourceData[0]}</OptionText>
                </Selection>
                <InputText
                    keyboardType='numeric'
                    prefixText={this.state.amount != '' ? this.state.currency : ''}
                    onChangeText={(text) => this.onChangeText('amount', text)}
                    value={this.state.amount}
                    textHint={I18n.t('amount')} />
                <View style={styles.foot}>
                    <Button
                        onPress={() => this.goBack()}
                        icon={{ name: 'arrow-back', type: 'MaterialIcons', size: 24, color: 'white' }}
                        buttonStyle={{ margin: 8, backgroundColor: '#D0D0D0', borderRadius: 10, width: 50, height: 50 }}
                    />
                    <Button
                        onPress={() => this.processSendMoney()}
                        disable={!this.isValid()}
                        textStyle={{
                            paddingLeft: 10,
                            paddingRight: 10
                        }}
                        buttonStyle={{ margin: 0, backgroundColor: '#FFB64D', borderRadius: 10, width: 150, height: 50 }}
                        text={'Pay Now'}
                    />
                </View>
                <ModelIndicator
                    visible={this.state.modalVisible} />
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
    container: {
        marginTop: 40,
        marginBottom: 40,
        alignItems: 'center'
    },
    foot: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 30
    },
    inputContainerStyle: {
        backgroundColor: 'transparent'
    }
});