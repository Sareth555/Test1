import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import { fontLight, fontRegular, fontSemiBold, fontBold, khmerBold, khmerRegular } from '../Fonts/Fonts';

export default class ButtonWithLogo extends Component {

    render() {
        return(
            <TouchableOpacity
                style={styles.button}
                onPress={this.props.onPress}> 

                <View style={styles.logo}>
                    <Image 
                        style={{
                            flex:1,
                            resizeMode: 'contain',                            
                            width: undefined,
                            height: undefined,                                                        
                        }}
                        source={{uri:this.props.logo}}/>     
                </View>                      
                <Text
                    style={styles.text}>
                    {this.props.text}
                </Text>
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignSelf: 'center',
        paddingTop: 4,
        paddingBottom: 4,
        width: 200,
        height: 48,
        paddingLeft: 10,
        paddingRight: 24,
        borderRadius: 8,
        marginBottom: 8
    },
    logo: {
        flex: 2,
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        // justifyContent: 'center',  
        padding: 4,      
        marginLeft: 12,              
    },
    text: {
        flex: 4,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        alignSelf: 'center',
        marginLeft: 12,
        fontFamily: fontRegular
    }
});