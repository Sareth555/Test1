import React, { Component } from 'react';
import I18n from '../../i18n';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native';

import {
    SegmentControl,
    InputText,
    HeaderView,
    Button,
    ImageRound
} from '@clik.asia/clik-shared-app';
import { NavigationActions } from 'react-navigation';
import IconMenuHome from '../../images/svgs/IconMenuHome';
import { ModelIndicator } from '../../components/ModelIndicator'
import Autocomplete from '../../components/Autocomplete';
import { GetAllUser, RequestMonetApi } from '../../api';
import { Styles } from '../../styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { fontLight, fontRegular, fontSemiBold, fontBold, khmerBold, khmerRegular } from '../../Fonts/Fonts';
let navigation;
export default class SendRequestMoney extends Component {

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
            visible: false,
            isShowReceipient: false,
            selectedIndex: 0,
            receipient: '',
            currency: '$',
            query: '',
            clikUsers: [],
            modalVisible: false,
            requestMoneyType: navigation.state.params.type
        };
    }

    componentWillMount() {
        if (this.state.requestMoneyType === 2)
            this.getAllUser();
    }

    onChangeText(key, text) {
        this.setState({ [key]: text })
    }

    onSelected = (child) => {
        this.setState({ selectedIndex: child.props.index })
        return true;
    }

    onSegmentSelected = (child) => {
        this.setState({ currency: child.props.value });
    }

    isValid() {
        if (this.state.requestMoneyType === 1) {
            if (this.state.amount != '')
                return true;
            else return false;
        } else if (this.state.requestMoneyType === 2) {
            if (this.state.amount != '' && this.state.receipient != '')
                return true;
            else return false;
        }
    }

    getAllUser() {
        new GetAllUser().execute()
            .then(response => {
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

    renderSenders() {
        if (this.state.requestMoneyType === 2)
            return (
                <Autocomplete
                    underlineColorAndroid={'transparent'}
                    data={this.getFoundUser()}
                    textHint='Customer'
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
            )
    }

    sendRequestMoney() {
        Alert.alert(
            'Request success',
            '',
            [
                { text: 'Go back home', onPress: () => this.backHome() },
            ],
            { cancelable: false }
        )
    }

    backHome() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'HomeView' })
            ]
        })
        this.props.navigation.dispatch(resetAction)
    }

    render() {
        return (<ScrollView
            innerRef={ref => { this.scroll = ref }}>
            <View style={styles.main_container}>
                <HeaderView
                    title="Request Money"
                    message="Fill in your information below." />
                <View style={styles.container}>
                    <SegmentControl
                        textColor='#A2D06F'
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
                {this.renderSenders()}
                <View style={{ height: 30 }} />
                <InputText
                    onChangeText={(text) => this.onChangeText('note', text)}
                    value={this.state.note}
                    textHint={'Note (optional)'} />
                <View style={styles.foot}>
                    <Button
                        onPress={() => this.goBack()}
                        icon={{ name: 'arrow-back', type: 'MaterialIcons', size: 24, color: 'white' }}
                        buttonStyle={{ margin: 8, backgroundColor: '#D0D0D0', borderRadius: 10, width: 50, height: 50 }}
                    />
                    <Button
                        onPress={() => this.sendRequestMoney()}
                        disable={!this.isValid()}
                        buttonStyle={{ margin: 0, backgroundColor: '#A2D06F', borderRadius: 10, width: 150, height: 50 }}
                        text={'Request'}
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