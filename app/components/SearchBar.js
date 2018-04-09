import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput
} from 'react-native';
import SearchIcon from '../images/svgs/SearchIcon'
import IconMenuHome from '../images/svgs/IconMenuHome';
import { fontLight, fontRegular, fontSemiBold, fontBold, khmerBold, khmerRegular } from '../Fonts/Fonts';
export default class SearchBar extends Component {

    onChangeText(text) {
        const onChangeText = this.props.onChangeText;
        if (onChangeText) {
            onChangeText(text);
        }
    }

    render() {
        return (
            <View style={[styles.container, { ...this.props.style }]}>
                <TextInput style={styles.textStyle}
                    onChangeText={(text) => { this.onChangeText(text) }}
                    placeholder='Search'
                    underlineColorAndroid={'transparent'} />
                <Image
                    source={require('../images/SearchIcon.png')}
                    resizeMode='contain'
                    style={{ width: 24, height: 24, margin: 8, tintColor: '#BDBDBD' }}>
                </Image>
            </View>
        );
    }
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        paddingTop: 10,
        flex: 1,
        paddingBottom: 10,
        paddingLeft: 16,
        fontSize: 16,
        fontFamily: fontRegular,
    }
});