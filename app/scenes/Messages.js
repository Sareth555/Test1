import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions
} from 'react-native';
import SegmentTab from '../components/SegmentTab';
import AnimatedTabs from 'react-native-animated-tabs';
import MessagesView from './MessagesView';
import NotificationView from './NotificationView';
const width = Dimensions.get('window').width
const getDeviceHeight = () => Dimensions.get('window').height;
const getDeviceWidth = () => Dimensions.get('window').width;
const getPanelWidth = () => getDeviceWidth();
export default class Messages extends Component {
    static navigationOptions = {
        tabBarLabel: 'Messages',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../images/messages.png')}
                style={{ width: 26, height: 26, tintColor: tintColor }}>
            </Image>
        )
    }
    constructor(props) {
        super(props);
        this.state = ({
            segmentData: ['Messages', 'Notifications'],
            activePanel: 0,
            tabSelectedIndex: 0
        })
    }

    onSelectedSegmentIndex(index) {
        if (index == 0) {
            this.setState({
                activePanel: 0
            })
        }
        else {
            this.setState({
                activePanel: 1
            })
        }
    }
    render() {
        return (
            <View style={styles.mainView}>
                <View style={styles.segmentContainer}>
                    <SegmentTab
                        onSelectedSegmentIndex={this.onSelectedSegmentIndex.bind(this)}
                        segmentArray={this.state.segmentData}
                        textSelectedColor='#6BC4BC'
                        width={width - 40}
                        height={37}
                        selectedIndex={this.state.tabSelectedIndex}
                        fontWeight='500'

                    />
                </View>
                <View style={styles.container}>
                    <AnimatedTabs
                        panelWidth={getPanelWidth()}
                        activePanel={this.state.activePanel}
                        onAnimateFinish={(index) => this.setState({ tabSelectedIndex: index, activePanel: index })}
                    >
                        <MessagesView navigation={this.props.navigation}/>
                        <NotificationView />
                    </AnimatedTabs>
                </View>
            </View>
        );
    }
};
const styles = {
    mainView: {
        flex: 1,
        backgroundColor: '#eee'
    },
    segmentContainer: {
        height: 50,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        marginTop: 10,
        backgroundColor: 'transparent'
    }
};