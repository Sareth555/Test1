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
    Picker,
    TouchableHighlight,
    AsyncStorage
} from 'react-native';

import {
    SegmentControl,
    Selection,
    OptionText,
    InputText,
    HeaderView,
    Button,
    ImageRound
} from '@clik.asia/clik-shared-app';
import { fontLight, fontRegular, fontSemiBold, fontBold, khmerBold, khmerRegular } from '../../Fonts/Fonts';
import IconMenuHome from '../../images/svgs/IconMenuHome';
import { ModelIndicator } from '../../components/ModelIndicator'
import Autocomplete from '../../components/Autocomplete';

import { Styles } from '../../styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SendMoneyApi from '../../api/SendMoneyApi'
import GetAllUser from '../../api/GetAllUser'

let navigation;
export default class SendMoney extends Component {

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
            sourceData: ['Clik Wallet'],
            visible: false,
            isShowReceipient: false,
            selectedIndex: 0,
            receipient: '',
            currency: '$',
            query: '',
            clikUsers: [],
            modalVisible: false,
            parames: {
                Amount: ''
            }
        };
    }

    componentWillMount() {
        AsyncStorage.getItem('Balance')
            .then(Balance => {
                if (Balance) {
                    this.setState({
                        sourceData: [`Clik Wallet ($${Balance})`]
                    })
                }
            }).catch((e) => {
                console.log(e);
            });
        this.getAllUser();
    }

    onChangeText(key, text) {
        this.setState({
            parames: {
                ...this.state.parames,
                [key]: text
            }
        })
    }

    onSelected = (child) => {
        this.setState({ selectedIndex: child.props.index })
        return true;
    }

    onSegmentSelected = (child) => {
        this.setState({ currency: child.props.value });
    }

    isValid() {
        if (this.state.amount != "" && this.state.receipient != '')
            return true;
        else return false;
    }

    processSendMoney(pin) {
        this.setState({ modalVisible: true })
        new SendMoneyApi()
            .execute({
                ...this.state.parames,
                pin,
                AccountId: this.state.receipient.id,
                CurrencyId: 1
            })
            .then((result) => {
                if (result.status == 200) {
                    if (result.data.status == 0) {
                        this.setState({ modalVisible: false })
                        this.sendMoneySuccess(result.data);
                    } else {
                        Alert.alert(
                            'Somthing wrong',
                            result.data.note,
                            [
                                { text: 'OK', onPress: () => this.setState({ modalVisible: false }) },
                            ],
                            { cancelable: false }
                        )
                    }
                }
            }).catch((e) => {
                console.log(e.config);
                alert('Oops! Something when wrong')
            })
    }

    confirmPin() {
        this.props.navigation.navigate('ConfirmPin', {
            title: 'SEND MONEY',
            confirmTitle: 'CONFIRM SENDING',
            message: 'Enter PIN to confirm transaction.',
            partnerName: this.state.receipient.normalizedUserName,
            partnerProfileUri: 'https://www.valleybusinessreport.com/wp-content/uploads/2017/07/default-avatar-tech-guy.png',
            displayAmout: `${this.state.currency}${this.state.parames.Amount}`,
            color: '#F06766',
            onPinChange: (value) => this.onPinChange(value)
        })
    }

    sendMoneySuccess(result) {
        this.props.navigation.goBack();
        this.props.navigation.navigate('ViewReceiptScreen', {
            color: '#F06766',
            tranTitle: 'SEND MONEY',
            message: 'YOU SENT MONEY TO',
            partnerName: `010663636 \n ${this.state.receipient.normalizedUserName}`,
            partnerProfileUri: 'https://www.valleybusinessreport.com/wp-content/uploads/2017/07/default-avatar-tech-guy.png',
            displayAmout: `${this.state.currency}${this.state.parames.Amount}`,
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
                    value: this.state.parames.Note
                },
                {
                    label: 'TRANSACTION #',
                    value: '12354326789'
                }
            ]
        });
    }

    onPinChange(value) {
        if (value.length == 6) {
            this.processSendMoney(value)
        }
    }

    getAllUser() {
        new GetAllUser().execute()
            .then(function (response) {
                if (response.status == 200)
                    return response.data;
            })
            .then((response) => {
                this.clikUsers = response;
            })
            .catch(function (error) {
                console.log(error);
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

    onQuery(text) {
        this.setState({ query: text });
    }

    getFoundUser() {
        if (this.state.query === '' || !this.clikUsers) {
            return [];
        }
        const regex = new RegExp(`${this.state.query.trim()}`, 'i');
        return this.clikUsers.filter(user => user.normalizedUserName.search(regex) >= 0);
    }

    render() {
        return (<ScrollView
            innerRef={ref => { this.scroll = ref }}>
            <View style={styles.main_container}>
                <HeaderView
                    title="Send Money"
                    message="Fill in your information below." />
                <View style={styles.container}>
                    <SegmentControl
                        textColor='#F06766'
                        height={37}
                        onSelected={this.onSegmentSelected}>
                        <Text selected={this.state.currency == '៛'} value='៛'>៛ KHR</Text>
                        <Text selected={this.state.currency == '$'} value='$'>$ USD</Text>
                    </SegmentControl>
                </View>
                <InputText
                    keyboardType='numeric'
                    prefixText={this.state.parames.Amount != '' ? this.state.currency : ''}
                    onChangeText={(text) => this.onChangeText('Amount', text)}
                    value={this.state.parames.Amount}
                    textHint={I18n.t('amount')} />
                <Selection
                    onSelected={this.onSelected}
                    value={this.state.sourceData[this.state.selectedIndex]}
                    textHint={I18n.t('source')} >
                    <OptionText index={0}>{this.state.sourceData[0]}</OptionText>
                </Selection>
                <Autocomplete
                    underlineColorAndroid={'transparent'}
                    data={this.getFoundUser()}
                    textHint='Receipient'
                    autoCorrect={false}
                    defaultValue={this.state.receipient.normalizedUserName}
                    onChangeText={text => this.onQuery(text)}
                    renderItem={item => (
                        <TouchableOpacity onPress={() => this.setState({ query: '', receipient: item })}>
                            <View style={{ flexDirection: 'row', paddingLeft: 8, paddingTop: 8, alignItems: 'center' }}>
                                <ImageRound
                                    size={36}
                                    source={{ uri: 'https://www.valleybusinessreport.com/wp-content/uploads/2017/07/default-avatar-tech-guy.png' }} />
                                <Text style={{
                                    fontSize: 20,
                                    paddingLeft: 8,
                                    fontFamily: fontRegular,
                                }}>{item.normalizedUserName}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
                <View style={{ height: 30 }} />
                <InputText
                    onChangeText={(text) => this.onChangeText('Note', text)}
                    value={this.state.parames.Note}
                    textHint={I18n.t('note')} />
                <View style={styles.foot}>
                    <Button
                        onPress={() => this.goBack()}
                        icon={{ name: 'arrow-back', type: 'MaterialIcons', size: 24, color: 'white' }}
                        buttonStyle={{ margin: 8, backgroundColor: '#D0D0D0', borderRadius: 10, width: 50, height: 50 }}
                    />
                    <Button
                        onPress={() => this.confirmPin()}
                        disable={!this.isValid()}
                        buttonStyle={{ margin: 0, backgroundColor: '#F06766', borderRadius: 10, width: 150, height: 50 }}
                        text={'Send'}
                    />
                </View>
                <ModelIndicator
                    visible={this.state.modalVisible} />
            </View>
        </ScrollView>);
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