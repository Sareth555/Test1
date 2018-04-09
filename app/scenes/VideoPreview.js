import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import Video from 'react-native-video';
// import RNFS from 'react-native-fs';
export default class extends Component {
    componentWillUnmount() {
        const videoURL = this.props.navigation.state.params.videoData;
        var RNFS = require('react-native-fs');
        return RNFS.unlink(videoURL)
            .then(() => {
                //    alert('FILE DELETED');
            })
            // `unlink` will throw an error, if the item to unlink does not exist
            .catch((err) => {
                //    alert(err.message);
            });
    }
    render() {

        return (
            <View style={styles.container}>
                <Video
                    source={{ uri: this.props.navigation.state.params.videoData }}
                    rate={1.0}
                    volume={1.0}
                    muted={false}
                    resizeMode={"cover"}
                    repeat={true}
                    style={styles.video}
                />
            </View>
        );
    }
};

const styles = {
    container: {
        flex: 1
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
}