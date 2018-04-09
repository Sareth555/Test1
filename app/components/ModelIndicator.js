import React, { Component } from 'react';
import {
    StyleSheet,
    Modal,
    Text,
    ActivityIndicator,
    View
} from 'react-native';

class ModelIndicator extends Component {

    static defaultProps = {
        animationType: 'fade',
        transparent: true
    }

    render() {
        return (
            <Modal
                {...this.props} >
                <View style={{ backgroundColor: 'rgba(0,0,0,0.3)', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator
                        style={{ backgroundColor: 'rgba(0,0,0,0.8)', padding: 16, borderRadius: 10 }}
                        size="large" color="white" />
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 }
    },
});

export { ModelIndicator };