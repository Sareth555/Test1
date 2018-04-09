import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View
} from 'react-native';

class TopUpAmountButton extends Component {
    render() {
        return(
            <View style = {styles.container}>
                <Text>$1</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
        elevation: 4,
        shadowColor: 'black',
        shadowOffset:{width: 0, height:4}
    },
});

export { TopUpAmountButton };