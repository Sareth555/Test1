import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import { fontLight, fontRegular, fontSemiBold, fontBold, khmerBold, khmerRegular } from '../Fonts/Fonts';

export default class SegmentTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.segmentArray || [],
            selectedIndex: this.props.selectedIndex || 0,
            segmentArray: (props.segmentArray && props.segmentArray.length > 1) ? props.segmentArray : ['First', 'Second'],
            selectedBg: props.selectedBgColor || '#fff',
            deSelectedBg: props.deSelectedBgColor || '#ddd',
            textSelected: props.textSelectedColor || '#F06766',
            textDeselected: props.textDeselectedColor || '#999',
            segmentWidth: (props.width >= 150) ? props.width : 150,
            segmentHeight: (props.height >= 30) ? props.height : 30,
            segmentBorderColor: props.borderColor || '#ddd',
            borderRadiusCorner: props.borderRadius || 10,
            textFontSize: props.fontSize || 14,
            fontWeight: props.fontWeight || '500'

        }

    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.selectedIndex != this.props.selectedIndex)
            this.setState({ selectedIndex: nextProps.selectedIndex || 0 })
    }

    selectedFunction = (item, index) => {
        this.setState({ selectedIndex: index });
        if (this.state.data.length > 1 && this.props.onSelectedSegmentIndex) {
            this.props.onSelectedSegmentIndex(index)
        }
    }
    render() {
        return (
            <View style={[styles.segmentContainer, { width: this.state.segmentWidth, height: this.state.segmentHeight, borderColor: this.state.segmentBorderColor, borderRadius: this.state.borderRadiusCorner }]}>
                {this.state.segmentArray.map((item, index) => {
                    const radius = (index == 0) ? [this.state.borderRadiusCorner, 0, this.state.borderRadiusCorner, 0] : ((index == this.state.segmentArray.length - 1) ? [0, this.state.borderRadiusCorner, 0, this.state.borderRadiusCorner] : [0, 0, 0, 0]);
                    const backgroundColor = (index == this.state.selectedIndex) ? this.state.selectedBg : this.state.deSelectedBg;
                    const textColor = (index == this.state.selectedIndex) ? this.state.textSelected : this.state.textDeselected;
                    return (
                        <TouchableOpacity
                            key={item}
                            onPress={this.selectedFunction.bind(this, item, index)}
                            style={[styles.btnSelectedStyle,
                            {
                                backgroundColor: backgroundColor,
                                borderColor: this.state.segmentBorderColor,
                                borderTopLeftRadius: radius[0],
                                borderTopRightRadius: radius[1],
                                borderBottomLeftRadius: radius[2],
                                borderBottomRightRadius: radius[3],
                            }]
                            }>
                            <Text
                                style={{
                                    width: this.state.segmentWidth / this.state.segmentArray - 10,
                                    color: textColor,
                                    fontFamily: fontLight,
                                    backgroundColor: 'transparent',
                                    textAlign: 'center',
                                    fontWeight: this.state.fontWeight,
                                    fontSize: this.state.textFontSize
                                }}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    )
                }
                )}

            </View>
        );
    }
};
const styles = StyleSheet.create({
    segmentContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#000',
    },
    btnSelectedStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        borderWidth: 0.5
    },
});
