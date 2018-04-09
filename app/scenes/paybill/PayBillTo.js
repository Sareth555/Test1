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
    Button,
    ModelIndicator
} from '@clik.asia/clik-shared-app';
import ButtonWithLogo from '../../components/ButtonWithLogo';
import { GetMerchants } from '../../api'
import { Styles } from '../../styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
let navigation;
export default class PayBillTo extends Component {

    static navigationOptions = {
        tabBarOnPress: (tab) => {
            tab.jumpToIndex(tab.scene.index)
            navigation.goBack()
        }
    }

    constructor(props) {
        super(props);
        navigation = this.props.navigation;
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: this.ds.cloneWithRows([]),
            modalVisible: true
        }
    }

    componentWillMount() {
        new GetMerchants().execute()
            .then(response => {
                return response.data.filter(merchant => merchant.enablePayBill);
            })
            .then(data => this.setState({ dataSource: this.ds.cloneWithRows(data), modalVisible: false }))
            .catch(error => {
                this.setState({ modalVisible: false })
            });
    }

    onPress = (MerchantId, name, imageUrl) => {
        this.props.navigation.navigate('PayBill', {
            MerchantId,
            partnerProfileUri: imageUrl,
            partnerName: name
        });
    }

    render() {
        
        return (
            <View style={styles.main_container}>
                <HeaderView
                    title="Pay Bills"
                    message="Please choose who you wants to pay." />
                <View style={styles.button_container}>
                    <ListView
                        style={{ paddingTop: 30 }}
                        enableEmptySections
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) => <ButtonWithLogo
                            logo={`data:${rowData.photoContentType};base64,${rowData.photo}`}
                            text={rowData.name}
                            onPress={() => this.onPress(rowData.id, rowData.name, `data:${rowData.photoContentType};base64,${rowData.photo}`)}
                        />}
                    />
                </View>
                <ModelIndicator
                    visible={this.state.modalVisible} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        paddingTop: 90,
        paddingLeft: 36,
        paddingRight: 36
    },
    button_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});