import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    SectionList,
    Image,
    Dimensions
} from 'react-native';
import { fontLight, fontRegular, fontSemiBold, fontBold, khmerBold, khmerRegular } from '../Fonts/Fonts';

const getDeviceHeight = () => Dimensions.get('window').height;
const getDeviceWidth = () => Dimensions.get('window').width;
const getPanelWidth = () => getDeviceWidth();

export default class BalanceCard extends Component {
    render() {
        return (
            <View style={{
                width: getPanelWidth() - 50,
                flex: 1,
                marginBottom: 10,
            }}>
                <View style={styles.backViewBalance}>

                </View>
                <View style={styles.topViewBalance}>
                    <View style={styles.topView}>
                        <View style={styles.imageView}>
                            <Image style={styles.image} source={this.props.image} resizeMode='stretch' />
                        </View>
                        <Text style={styles.title}>{this.props.title}</Text>
                    </View>

                    <View style={styles.bodyView}>
                        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                            <Text style={{ marginTop: 20, backgroundColor: 'transparent', justifyContent: 'center', fontFamily: fontRegular, alignContent: 'center', textAlign: 'center', fontSize: 12, fontWeight: '600', color: 'black' }}>{this.props.clikBalanceText}</Text>
                            <Text style={{ marginTop: -5, backgroundColor: 'transparent', justifyContent: 'center', fontFamily: fontRegular, alignContent: 'center', textAlign: 'center', fontSize: 28, fontWeight: '400', color: 'black' }}>{this.props.clikBalanceValue}</Text>
                        </View>

                        <View style={{ marginTop: 25, flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                            <Text style={{ backgroundColor: 'transparent', justifyContent: 'center', fontFamily: fontRegular, alignContent: 'center', textAlign: 'center', fontSize: 10, fontWeight: '600', color: '#666' }}>{this.props.avalaibleBalanceText}</Text>
                            <Text style={{ backgroundColor: 'transparent', justifyContent: 'center', fontFamily: fontRegular, alignContent: 'center', textAlign: 'center', fontSize: 25, fontWeight: '400', color: '#666' }}>{this.props.avalaibleBalanceValue}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    backViewBalance: {
        backgroundColor: '#fbfbfb',
        flex: 1,
        marginTop: 30,
        marginBottom: 30,
        borderRadius: 10,
    },
    topViewBalance: {
        position: 'absolute',
        left: 15,
        right: 15,
        top: 10,
        bottom: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',

        shadowColor: '#ddd',
        shadowOpacity: 1,
        elevation: 0,
        shadowOffset: {
            height: 3,
            width: 0
        },
    },
    topView: {
        height: 40,
        width: getPanelWidth() - 80,
        backgroundColor: '#537CAD',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    imageView: {
        marginLeft: 10,
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bodyView: {
        flex: 1,
        marginTop: 5,
        marginBottom: 5
    },
    image: {
        width: 30,
        height: 30,
        tintColor: 'white'
    },
    title: {
        alignItems: 'flex-end',
        marginRight: 10,
        fontSize: 12,
        fontWeight: '700',
        color: 'white',
        fontFamily: fontRegular,
    }

})