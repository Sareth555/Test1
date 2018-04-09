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
let navigation;
export default class TopUpWalletInputAmout extends Component {

    static navigationOptions = {
        tabBarOnPress: (tab) => {
            tab.jumpToIndex(tab.scene.index)
            navigation.goBack()
        }
    }

    constructor(props) {
        super(props);
        navigation = this.props.navigation;
        this.state = {
            currency: '$',
            amount: '',
            source: 'At a merchant'
        }
    }

    processTopUp() {
        this.props.navigation.navigate('FindMerchantMap');
    }

    onSegmentSelected = (child) => {
        this.setState({ currency: child.props.value });
    }

    isValid() {
        if (this.state.amount != "" && this.state.source != '')
            return true;
        else
            return false;
    }

    goBack() {
        this.props.navigation.goBack();
    }

    onChangeText(key, text) {
        this.setState({ [key]: text })
    }

    onSelected = (child) => {
        this.setState({ source: child.props.children })
        return true;
    }

    render() {
        return (
            <KeyboardAwareScrollView style={styles.main_container}>
                <HeaderView
                    style={{ marginBottom: 30 }}
                    title="TOP UP WALLET"
                    message="Please select the amount you would like to add to your wallet." />
                <SegmentControl
                    style={{ marginBottom: 30 }}
                    textColor='#F5D63D'
                    onSelected={this.onSegmentSelected}>
                    <Text selected={this.state.currency == '៛'} value='៛'>៛ KHR</Text>
                    <Text selected={this.state.currency == '$'} value='$'>$ USD</Text>
                </SegmentControl>
                <View style={styles.container}>
                    <InputText
                        keyboardType='numeric'
                        prefixText={this.state.amount != '' ? this.state.currency : ''}
                        onChangeText={(text) => this.onChangeText('amount', text)}
                        value={this.state.amount}
                        textHint={I18n.t('amount')} />
                    <Selection
                        onSelected={this.onSelected}
                        value={this.state.source}
                        textHint={I18n.t('source')} >
                        <OptionText key={'1'}>At a merchant</OptionText>
                        <OptionText key={'2'}>Card</OptionText>
                    </Selection>
                </View>
                <View style={styles.foot}>
                    <Button
                        onPress={() => this.goBack()}
                        icon={{ name: 'arrow-back', type: 'MaterialIcons', size: 24, color: 'white' }}
                        buttonStyle={{ margin: 8, backgroundColor: '#D0D0D0', borderRadius: 10, width: 50, height: 50 }}
                    />
                    <Button
                        textColor='black'
                        onPress={() => this.processTopUp()}
                        disable={!this.isValid()}
                        buttonStyle={{ margin: 0, backgroundColor: '#F5D63D', borderRadius: 10, height: 50 }}
                        text={'Find Merchant'}
                    />
                </View>
                <Text style={{ fontFamily: 'AvenirNext-Regular', marginBottom: 130 }}>When you proceed, simply have the merchant scan your QR code and follow the prompts! The request will cancel after 1 hour.</Text>
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
        marginBottom: 30
    },
    container: {
        marginTop: 55,
        marginBottom: 20
    },
});