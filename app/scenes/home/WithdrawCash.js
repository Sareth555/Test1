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
import { NavigationActions } from 'react-navigation';
import WithdrawCashApi from '../../api/WithdrawCashApi'
import { ModelIndicator } from '../../components/ModelIndicator'
import { fontLight, fontRegular, fontSemiBold, fontBold } from '../../Fonts/Fonts'

let navigation;
export default class WithdrawCash extends Component {

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
            sourceData: ['Clik Wallet'],
            disable: true,
            isShowReceipient: false,
            selectedIndex: 0,
            receipient: '',
            currency: '$',
            query: '',
            clikUsers: [],
            modalVisible: false,
            withdrawBgColor: '#D0D0D0',
            withdrawTextColor: '#BDBDBD'
        };
    }

    componentWillMount() {
        AsyncStorage.getItem('Balance')
            .then(Balance => {
                if (Balance) {
                    this.setState({
                        sourceData: [`Clik Wallet [$${Balance}]`]
                    })
                }
            }).catch((e) => {
                console.log(e);
            });
    }

    onChangeText(key, text) {
        if (text > 0) {
            this.setState({
                withdrawBgColor: '#A4D8E3',
                withdrawTextColor: 'white',
                disable: false
            })
        }
        else {
            this.setState({
                withdrawBgColor: '#D0D0D0',
                withdrawTextColor: '#BDBDBD',
                disable: true
            })
        }
        this.setState({ [key]: text })
    }

    onSelected = (child) => {
        this.setState({ selectedIndex: child.props.index })
        return true;
    }

    onSegmentSelected = (child) => {
        this.setState({ currency: child.props.value });
    }

    processWithdrawCash() {
        this.setState({ modalVisible: true })
        const params = {
            Amount: this.state.amount,
            CurrencyId: 1
        }
        new WithdrawCashApi().execute(params)
            .then((result) => {
                if (result.status == 200) {
                    console.log(result.data)
                    if (result.data.status == 0) {
                        this.setState({ modalVisible: false })
                        this.withdrawCashSuccess();
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
                console.log(e.response);
                const statusCode = e.response.status;
                if (statusCode == 404) {
                    this.withdrawCashSuccess();
                } else {
                    Alert.alert(
                        'Oops! Something when wrong',
                        `status:${e.response.status}`,
                        [
                            { text: 'OK', onPress: () => this.setState({ modalVisible: false }) },
                        ],
                        { cancelable: false }
                    )
                }


            })
    }

    withdrawCashSuccess() {
        Alert.alert(
            'Your booking have been sent',
            '',
            [
                { text: 'Go back home', onPress: () => this.backHome() },
            ],
            { cancelable: false }
        )
    }

    backHome() {
        this.setState({ modalVisible: false })
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'HomeView' })
            ]
        })
        this.props.navigation.dispatch(resetAction)
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
    isValid() {
        return (this.state.amount != '');
    }
    render() {
        return (<ScrollView
            innerRef={ref => { this.scroll = ref }}>
            <View style={styles.main_container}>
                <HeaderView
                    title="WITHDRAW CASH"
                    message="Please select the amount you would like to withdraw." />
                <View style={styles.container}>
                    <SegmentControl
                        textColor='#97D9E5'
                        height={37}
                        onSelected={this.onSegmentSelected}>
                        <Text selected={this.state.currency == '៛'} value='៛'>៛ KHR</Text>
                        <Text selected={this.state.currency == '$'} value='$'>$ USD</Text>
                    </SegmentControl>
                </View>
                <InputText
                    keyboardType='numeric'
                    prefixText={this.state.amount != '' ? this.state.currency : ''}
                    onChangeText={(text) => this.onChangeText('amount', text)}
                    value={this.state.amount}
                    textHint={I18n.t('amount')} />
                <Selection
                    onSelected={this.onSelected}
                    value={this.state.sourceData[this.state.selectedIndex]}
                    textHint={I18n.t('source')} >
                    <OptionText index={0}>{this.state.sourceData[0]}</OptionText>
                </Selection>

                <View style={styles.foot}>
                    <Button
                        onPress={() => this.goBack()}
                        icon={{ name: 'arrow-back', type: 'MaterialIcons', size: 24, color: 'white' }}
                        buttonStyle={{ margin: 8, backgroundColor: '#D0D0D0', borderRadius: 10, width: 50, height: 50 }}
                    />
                    <Button
                        onPress={() => this.processWithdrawCash()}
                        disable={!this.isValid()}
                        textStyle={{
                            paddingLeft: 0,
                            paddingRight: 0
                        }}
                        buttonStyle={{ margin: 0, backgroundColor: '#97D9E5', borderRadius: 10, width: 180, height: 50 }}
                        text={'Book Withdrawal'}
                    />
                </View>
                <Text style={styles.descriptionText}>
                    {this.isValid() ?
                        'When you proceed, simply scan the QR code at a merchant or ATM and follow the prompts! The request will cancel after 1 hour.'
                        :
                        ''}
                </Text>
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
        marginTop: 30,
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
    },
    headerView: {
        height: 100
    },
    headerText: {
        fontSize: 25,
        fontWeight: '700',
        fontFamily: fontRegular,
        color: 'black'
    },
    headerDescription: {
        fontSize: 20,
        fontWeight: '400',
        fontFamily: fontRegular,
        color: '#666666'
    },
    descriptionText: {
        marginTop: 30,
        marginBottom: 30,
        color: '#555555',
        fontSize: 15,
        fontFamily: fontRegular,
        fontWeight: '400'
    }
});