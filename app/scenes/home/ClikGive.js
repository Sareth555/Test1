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
    ModelIndicator,
    Button
} from '@clik.asia/clik-shared-app';

import IconMenuHome from '../../images/svgs/IconMenuHome';
import { MyProfileApi, GetMerchants } from '../../api'
import { Styles } from '../../styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ClikGiveApi from '../../api/ClikGiveApi';

let navigation;
export default class ClikGive extends Component {

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
            charityData: [],
            charity: 0,
            message: '',
            disabled: false,
            selectedIndex: 0,
            currency: '$',
            buttonBackground: '#D0D0D0',
            UserId: null,
            modalVisible: false
        };
    }
    componentWillMount() {
        AsyncStorage.multiGet(['Balance', 'UserId'])
            .then(([Balance, UserId]) => {
                this.setState({ UserId: UserId[1], sourceData: [`Clik Wallet ($${Balance[1]})`] });
            }).catch((e) => {
                console.log(e);
            });
        this.setState({ modalVisible: true })
        new GetMerchants().execute()
            .then(response => {
                console.log(response)
                return response.data.filter(merchant => merchant.enableGive);
            })
            .then(data => this.setState({ charityData: data, modalVisible: false }))
            .catch(error => {
                console.log(error);
                this.setState({ modalVisible: false })
            });
    }

    onChangeText(key, text) {
        this.setState({ [key]: text })
        if (text != "") {
            this.setState({
                disabled: true,
                buttonBackground: '#F799BE'
            })
        }
        else {
            this.setState({
                disabled: false,
                buttonBackground: '#D0D0D0'
            })
        }
    }

    componentDidMount() {
        this.setState({ source: this.state.sourceData[0], charity: 0 })
    }

    onSelected = (child) => {
        this.setState({ selectedIndex: child.props.index })
        return true;
    }
    onCharitySelected = (child) => {
        this.setState({ charity: child.props.index })
        return true;
    }
    onMessageSelected = (child) => {
        this.setState({ message: child.props.children })
        return true;
    }

    onSegmentSelected = (child) => {
        this.setState({ currency: child.props.value });
    }

    isValid() {
        if (this.state.amount != "" && this.state.charityData.length > 0)
            return true;
        else return false;
    }

    processGiveMoney(pin, navigation) {
        this.setState({ modalVisible: true })
        new ClikGiveApi().execute({
            MerchantId: this.state.charityData[this.state.charity].id,
            AccountId: this.state.UserId,
            Amount: this.state.amount,
            CurrencyId: 1,
            Note: this.state.message,
            Module: 8,
            pin
        }).then(result => {
            console.log(result);
            if (result.status == 200) {
                if (result.data.hasErrors == false) {
                    this.setState({ modalVisible: false })
                    this.giveMoneySuccess(result.data);
                } else {
                    this.showErrorAlert(navigation);
                }
            }
        }).catch(e => {
            console.log(e);
            console.log(e.config);
            this.showErrorAlert(navigation);
            // this.giveMoneySuccess();
        })
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

    giveMoneySuccess(result) {
        this.props.navigation.goBack();
        this.props.navigation.navigate('ViewReceiptScreen', {
            color: '#F799BE',
            tranTitle: 'MONEY RECEIVED',
            message: 'YOU DONATED TO',
            partnerName: this.state.charityData[this.state.charity].name,
            partnerProfileUri: 'https://www.valleybusinessreport.com/wp-content/uploads/2017/07/default-avatar-tech-guy.png',
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
                    value: this.state.message
                },
                {
                    label: 'TRANSACTION #',
                    value: '12354326789'
                }
            ]
        });
    }

    confirmPin() {
        this.props.navigation.navigate('ConfirmPin', {
            title: 'DONATION',
            confirmTitle: 'CONFIRM DONATION',
            message: 'Enter PIN to confirm transaction.',
            partnerName: this.state.charityData[this.state.charity].name,
            partnerProfileUri: 'https://www.valleybusinessreport.com/wp-content/uploads/2017/07/default-avatar-tech-guy.png',
            displayAmout: `${this.state.currency}${this.state.amount}`,
            color: '#F799BE',
            onPinChange: (value, navigation) => this.onPinChange(value, navigation)
        })
    }

    onPinChange(value, navigation) {
        if (value.length == 6) {
            this.processGiveMoney(value, navigation)
        }
    }

    goBack() {
        const onBackPress = this.props.onBackPress
        if (onBackPress)
            onBackPress()
        else if (this.props.navigation) {
            this.props.navigation.goBack()
        }
    }

    renderCharityItem() {
        return this.state.charityData.map((item, index) => {
            return (<OptionText key={index + ''} index={index}>{item.name}</OptionText>);
        });
    }

    render() {
        const charityData = this.state.charityData[this.state.charity];
        const charity = (charityData) ? charityData.name : '';
        return (<KeyboardAwareScrollView
            innerRef={ref => { this.scroll = ref }}>
            <View style={styles.main_container}>
                <HeaderView
                    title="CLIK GIVE"
                    message="Send some love and care" />
                <Image
                    style={styles.imageStyle}
                    source={require('../../images/clik_give_background.jpg')}
                />
                <View style={styles.textFieldContainer}>
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
                    <Selection
                        onSelected={this.onCharitySelected}
                        value={charity}
                        textHint={I18n.t('charity')} >
                        {this.renderCharityItem()}
                    </Selection>
                    <InputText
                        onChangeText={(text) => this.onChangeText('message', text)}
                        value={this.state.message}
                        textHint={I18n.t('message')} />
                    <View style={styles.foot}>
                        <Button
                            onPress={() => this.goBack()}
                            icon={{ name: 'arrow-back', type: 'MaterialIcons', size: 24, color: 'white' }}
                            buttonStyle={{ margin: 8, backgroundColor: '#D0D0D0', borderRadius: 10, width: 50, height: 50 }}
                        />
                        <Button
                            onPress={() => this.confirmPin()}
                            disable={!this.isValid()}
                            buttonStyle={{ margin: 0, backgroundColor: '#F799BE', borderRadius: 10, width: 150, height: 50 }}
                            text={'Donate'}
                        />
                    </View>

                </View>
            </View>
            <ModelIndicator
                visible={this.state.modalVisible} />
        </KeyboardAwareScrollView>);
    }
};
const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        paddingTop: 60,
        paddingLeft: 16,
        paddingRight: 16
    },
    textFieldContainer: {
        flex: 1,
        padding: 20
    },
    foot: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    imageStyle: {
        marginTop: 16,
        height: 168,
        borderRadius: 16,
        width: '100%',
        resizeMode: 'cover'
    }
});