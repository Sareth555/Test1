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
    Alert
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
let navigation;
export default class RequestMoney extends Component {

    static navigationOptions = {
        tabBarOnPress: (tab) => {
            tab.jumpToIndex(tab.scene.index)
            navigation.goBack()
        }
    }
    
    constructor(props){
        super(props);
        navigation = this.props.navigation;
    }

    gotoSendRequestMoney = (type) => {
        this.props.navigation.navigate('SendRequestMoney', {
            type
        })
    }

    render() {
        return (
            <View style={styles.main_container}>
                <HeaderView
                    title="REQUEST MONEY"
                    message="What would you like to do?" />
                <Button
                    textColor='#333333'
                    buttonStyle={{
                        marginTop: 100,
                        backgroundColor: '#FFFFFF',
                        width: 300,
                        height: 50
                    }}
                    text={'Request Money in Person'}
                    onPress={() => this.gotoSendRequestMoney(1)}
                />
                <Button
                    onPress={() => this.gotoSendRequestMoney(2)}
                    textColor='#333333'
                    buttonStyle={{
                        marginTop: 20,
                        backgroundColor: '#FFFFFF',
                        width: 300,
                        height: 50
                    }}
                    text={'Request Money'}
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