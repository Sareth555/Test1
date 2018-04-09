import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Alert,
    BackHandler,
    StyleSheet
} from 'react-native';
import I18n from '../../i18n';
import { fontLight, fontRegular, fontSemiBold, fontBold } from '../../Fonts/Fonts';

export default class MenuButton extends Component {

    onMunuPress(props) {
        const onMenuPress = this.props.onMenuPress;
        if (onMenuPress)
            onMenuPress(props)
    }

    render() {
        return (<TouchableOpacity
            style={[styles.buttonStyle, { backgroundColor: '#fff' }]}
            onPress={() => this.onMunuPress(this.props)}>
            <View style={[styles.viewContainImage, { backgroundColor: this.props.backgroundColor }]}>
                <Image style={styles.imageStyle} source={this.props.source} />
            </View>
            <View style={styles.menuIconTextView}>
                <Text style={[styles.menuIconText,{fontFamily: fontSemiBold}]}>{this.props.text}</Text>
            </View>
        </TouchableOpacity>)
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        flex: 1,
        margin: 7,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 10
    },
    imageStyle: {
        flex: 1,
        height: '100%',
        tintColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain'
    },
    menuIconText: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 10,
        color: '#999999',
        marginBottom: 5,
        backgroundColor: 'transparent',
    },
    menuIconTextView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewContainImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    }
});