import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

export default class MenuRow extends Component {
    render() {
        return (<View style={styles.menuViewRow1}>
            {this.props.children}
        </View>)
    }
}

const styles = StyleSheet.create({
    menuViewRow1: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 15,
    }
});