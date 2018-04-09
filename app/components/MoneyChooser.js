import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { InputText } from '@clik.asia/clik-shared-app';
import I18n from '../i18n';

class MoneyChooser extends Component {

    static defaultProps = {
        borderRadius: 10,
        textColor: '#333333',
        selectedColor: '#C584C7',
        fontSize: 14,
        width: 36,
        fontFamily: 'AvenirNext-Medium'
    }

    state = {
        other: false,
    };

    onOtherPressed = () => {
        this.setState({ other: true });
    }

    onAmountPressed = (amount) => {
        this.setState({ other: false });
    }

    renderOtherAmount = () => {
        if (this.state.other) return (
            <View style={{ paddingRight: 36, paddingLeft: 36 }}>
                <InputText
                    prefixText={this.props.prefixText}
                    onChangeText={this.props.onChangeText}
                    value={this.props.value}
                    textHint={I18n.t("amount")}
                    keyboardType='numeric' />
            </View>
        );
    }

    selectedFunction = (child) => {
        if (child.props.value == 0) {
            this.setState({ other: true })
        } else {
            this.setState({ other: false })
        }
        if (this.props.onSelected) {
            this.props.onSelected(child)
        }
    }

    renderChild = (parentDimensions) => {
        const {
            fontFamily,
            fontSize,
            textColor,
            selectedColor,
            width
        } = this.props;
        const childCount = this.props.children.length;
        const { btAmountDimensions } = this.state;
        const mWidth = (parentDimensions) ? parentDimensions.width / childCount : width;
        const height = btAmountDimensions ? btAmountDimensions.width : mWidth;
        const topUpBt = React.Children.map(this.props.children, (child, index) => {
            const backgroundColor = (child.props.selected) ? selectedColor : 'white';
            const color = (child.props.selected) ? 'white' : textColor;
            return (
                <TouchableOpacity
                    style={[
                        buttonStyles.container,
                        {
                            width: 40,
                            height: 40,
                            borderRadius: 10,
                            margin: 5,
                            backgroundColor,
                        }
                    ]}
                    onPress={this.selectedFunction.bind(this, child)}
                    onLayout={(event) => {
                        if (this.state.dimensions) return // layout was already called
                        let { width, height } = event.nativeEvent.layout
                        this.setState({ btAmountDimensions: { width, height } })
                    }}
                >
                    <Text style={{
                        color,
                        fontFamily,
                        fontSize: (index == childCount - 1) ? fontSize - 2 : fontSize,
                    }}>
                        {child}
                    </Text>
                </TouchableOpacity>
            )
        });
        return topUpBt;
    }

    render() {
        return (
            <View style={[styles.container, { ...this.props.style }]}>
                <View
                    style={[styles.buttonContainer, {}]}
                    onLayout={(event) => {
                        const { width, height } = event.nativeEvent.layout;
                        this.setState({ btContainerDimensions: { width, height } })
                    }}
                >
                    {this.renderChild(this.state.btContainerDimensions)}
                </View>
                <View style={{ marginTop: 16 }}>
                    {this.renderOtherAmount()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
    },
    buttonContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
    }
});

const buttonStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1,
        shadowColor: 'black',
        shadowOffset: {
            width: 10,
            height: 10
        }
    }
});

export { MoneyChooser }