import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Image,
    BackHandler,
    Alert,
    TextInput
} from 'react-native';
import {
    HeaderView,
    InputText,
    Button,
    SegmentControl,
    ModelIndicator
} from '@clik.asia/clik-shared-app';
import { fontLight, fontRegular, fontSemiBold, fontBold, khmerBold, khmerRegular } from '../../Fonts/Fonts';

import {
    MoneyChooser,
} from '../../components';

import { Color } from '../../styles';
import I18n from '../../i18n';
import { TopupPhoneApi } from '../../api';
let navigation;
class TopUpPhone extends Component {
    static navigationOptions = {
        tabBarOnPress: (tab) => {
            tab.jumpToIndex(tab.scene.index)
            navigation.goBack()
        }
    }

    constructor(props) {
        super(props);
        navigation = this.props.navigation;
        this.userPhoneNumber = '086912258';
        this.state = {
            topUpOther: false,
            topUpAmount: 0,
            topUpTo: 'your',
            phoneNumber: this.userPhoneNumber,
            modalVisible: false
        }
    }

    isValid() {
        if (this.state.topUpAmount > 0 && this.state.phoneNumber != '')
            return true;
        else
            return false;
    }

    onChangeText(key, text) {
        this.setState({ [key]: text })
    }

    onSegmentSelected = (child) => {
        this.setState({ topUpTo: child.props.value, phoneNumber: child.props.phoneNumber });
    }

    processTopUp() {
        this.props.navigation.navigate('ConfirmPin', {
            confirmTitle: 'TOP UP PHONE',
            message: `Enter your PIN to top up $${this.state.topUpAmount} to ${this.state.phoneNumber}`,
            color: '#C584C7',
            onPinChange: (value) => this.onPinChange(value)
        })
    }

    onPinChange(value) {
        if (value.length == 6) {
            this.setState({ modalVisible: true })
            new TopupPhoneApi().execute({
                Amount: this.state.topUpAmount,
                pin: value,
                phoneNumber: this.state.phoneNumber,
                MerchantId: ''
            }).then(response => {
                this.setState({ modalVisible: false })
                if (response.status == 200 && response.data != 'INVALID_LOGIN_ATTEMPT')
                    return response.data;
                else {
                    const msg = (response.status == 200) ? response.data : 'Cannot top up with this phonenumber ' + this.state.phoneNumber;
                    Alert.alert(
                        'Somthing wrong',
                        msg,
                        [
                            { text: 'OK', onPress: () => this.setState({ modalVisible: false }) },
                        ],
                        { cancelable: false }
                    )
                }
            }).then(responce => {
                this.onTopupSuccess()
            }).catch(e => {
                const msg = 'Cannot top up with this phone number ' + this.state.phoneNumber;
                Alert.alert(
                    'Somthing wrong',
                    msg,
                    [
                        { text: 'OK', onPress: () => this.setState({ modalVisible: false }) },
                    ],
                    { cancelable: false }
                )
                console.log(e);
            })
        }
    }

    onTopupSuccess() {
        this.props.navigation.goBack();
        this.props.navigation.navigate('ViewReceiptScreen', {
            color: '#C584C7',
            tranTitle: 'MOBILE TOPPED UP',
            message: 'YOU TOPPED UP',
            partnerName: `To Phone Number\n ${this.state.phoneNumber}`,
            displayAmout: `$${(this.state.topUpAmount).toLocaleString('gb-GB', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}`,
            details: [
                {
                    label: 'TARGET',
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
                    label: 'OPERATOR',
                    value: 'Smart'
                },
                {
                    label: 'TRANSACTION #',
                    value: '12354326789'
                }
            ]
        });
    }

    render() {
        return (
            <KeyboardAwareScrollView style={styles.container}>
                <HeaderView
                    style={{ paddingLeft: 36 }}
                    title={I18n.t("topUpPhone")}
                    message={I18n.t("topUpPhoneSub")}
                />
                <View style={
                    {
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 60,
                        marginBottom: 40
                    }
                } >
                    <SegmentControl
                        width={100}
                        height={37}
                        textColor='#C584C7'
                        onSelected={this.onSegmentSelected}>
                        <Text selected={this.state.topUpTo == 'your'} value='your' phoneNumber={this.userPhoneNumber}>Your Number</Text>
                        <Text selected={this.state.topUpTo == 'other'} value='other' phoneNumber=''>Other Number</Text>
                    </SegmentControl>
                </View>
                <View style={{ paddingRight: 36, paddingLeft: 36, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <View style={{ justifyContent: 'flex-end', paddingBottom: 6 }}>
                        <Text style={{ width: 60, fontSize: 12, fontFamily: fontRegular }}>{I18n.t("phoneNumber")}</Text>
                    </View>
                    <TextInput
                        style={{ height: 30, borderColor: 'gray', flex: 1, marginTop: 8, fontSize: 20, fontFamily: fontRegular }}
                        onChangeText={(text) => this.onChangeText('phoneNumber', text)}
                        underlineColorAndroid='transparent'
                        value={this.state.phoneNumber}
                    />
                </View>
                <View style={{ flex: 1, height: 1.5, backgroundColor: '#6BC4BC', marginLeft: 36, marginRight: 36, marginBottom: 30 }}></View>
                <MoneyChooser
                    onChangeText={(text) => this.onChangeText('topUpAmount', text)}
                    value={this.state.topUpAmount > 0 ? this.state.topUpAmount + '' : ''}
                    prefixText={this.state.topUpAmount > 0 ? '$' : ''}
                    style={{
                        flex: 1,
                    }}
                    onSelected={(child) => {
                        this.setState({ topUpAmount: child.props.value, topUpOther: (child.props.value == 0) });
                    }}
                >
                    <Text selected={this.state.topUpAmount == 1 & this.state.topUpOther == false} value={1}>$1</Text>
                    <Text selected={this.state.topUpAmount == 2 & this.state.topUpOther == false} value={2}>$2</Text>
                    <Text selected={this.state.topUpAmount == 5 & this.state.topUpOther == false} value={5}>$5</Text>
                    <Text selected={this.state.topUpAmount == 10 & this.state.topUpOther == false} value={10}>$10</Text>
                    <Text selected={this.state.topUpAmount == 20 & this.state.topUpOther == false} value={20}>$20</Text>
                    <Text selected={this.state.topUpOther == true} value={0}>Other</Text>
                </MoneyChooser>

                <View style={{ marginTop: 30, marginBottom: 100, marginRight: 36, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Button
                        disable={!this.isValid()}
                        text={I18n.t("topUpPhone")}
                        buttonStyle={{ margin: 0, backgroundColor: '#C584C7', borderRadius: 10, height: 50 }}
                        onPress={() => this.processTopUp()}
                    />
                </View>
                <ModelIndicator
                    visible={this.state.modalVisible} />
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 90
    },
    controlContainer: {
        flex: 4,
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20
    },
    moneyChooserStyle: {
        flex: 1,
        justifyContent: 'flex-start'
    }
});

// function mapStateToProps(state) {
//     return {
//         localeReducer: state.localeReducer,
//         createAccountReducer: state.createAccountReducer,
//         ProfileReducer: state.ProfileReducer,
//     }
// }

// function mapDisatchToProps(dispatch) {
//     return {
//         updateText: bindActionCreators(updateText, dispatch)
//     }
// }

// export default connect(mapStateToProps, {})(TopUpPhone);

export default TopUpPhone;