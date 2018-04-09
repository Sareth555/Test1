/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import { Platform, StyleSheet, TextInput, Text, View, TouchableOpacity, Image, Keyboard, ScrollView } from 'react-native';

import { MIN_COMPOSER_HEIGHT, DEFAULT_PLACEHOLDER } from './Constant';
import Color from './Color';
import Send from './Send';
import GiftedChat from './GiftedChat';
import GridView from "react-native-easy-grid-view";
import  { fontLight, fontRegular, fontSemiBold, fontBold } from '../../Fonts/Fonts';
import EmojiPanel from './Emoji';
var message = [];
var textMessage = '';
const isClickAdd = false;
export default class Composer extends React.Component {
  constructor(props){
    super(props);
    var ds = new GridView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      isAutoFocus: false,
      isClickAdd: false,
      menuHeigth: 0,
    }
    // this.onSend = this.onSend.bind(this);
  }
  renderSend() {
    if (this.props.renderSend) {
      return this.props.renderSend(this.props);
    }
    return <Send {...this.props} />;
  }
  

  onContentSizeChange(e) {
    const { contentSize } = e.nativeEvent;

    // Support earlier versions of React Native on Android.
    if (!contentSize) return;

    if (
      !this.contentSize ||
      this.contentSize.width !== contentSize.width ||
      this.contentSize.height !== contentSize.height
    ) {
      this.contentSize = contentSize;
      this.props.onInputSizeChanged(this.contentSize);
    }
  }
  
  renderCustomButton(){
    return(
      <View style={{backgroundColor: '#EFEFEF', height: this.state.menuHeigth, justifyContent: 'flex-end',marginBottom: 30}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginLeft: 30, marginRight: 30}}>
          <TouchableOpacity
          style={{}}
          // onPress = {()=>this.onChangeText('Hello')}
          >
            <Image source={require('../../images/messageCamera.png')} style={{width: 50, height: 50, backgroundColor:'transparent', resizeMode: 'contain'}} />
            <Text style={{textAlign: 'center', fontSize: 12, fontFamily: fontRegular}}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={{}}
          // onPress = {()=>alert('H')}
          >
            <Image source={require('../../images/messageImage.png')} style={{width: 50, height: 50, backgroundColor:'transparent', resizeMode: 'contain'}} />
            <Text style={{textAlign: 'center', fontSize: 12, fontFamily: fontRegular}}>Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={{}}
          // onPress = {()=>alert('H')}
          >
            <Image source={require('../../images/messageVideo.png')} style={{width: 50, height: 50, backgroundColor:'transparent', resizeMode: 'contain'}} />
            <Text style={{textAlign: 'center', fontSize: 12, fontFamily: fontRegular}}>Clip</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={{}}
          // onPress = {()=>alert('H')}
          >
            <Image source={require('../../images/messageFile.png')} style={{width: 50, height: 50, backgroundColor:'transparent', resizeMode: 'contain'}} />
            <Text style={{textAlign: 'center', fontSize: 12, fontFamily: fontRegular}}>File</Text>
          </TouchableOpacity>

        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginLeft: 30, marginRight: 30, marginTop: 20}}>
          <TouchableOpacity
          style={{}}
          // onPress = {()=>alert('H')}
          >
            <Image source={require('../../images/messageVoice.png')} style={{width: 50, height: 50, backgroundColor:'transparent', resizeMode: 'contain'}} />
            <Text style={{textAlign: 'center', fontSize: 12, fontFamily: fontRegular}}>Voice</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={{}}
          // onPress = {()=>alert('H')}
          >
            <Image source={require('../../images/messageUser.png')} style={{width: 50, height: 50, backgroundColor:'transparent', resizeMode: 'contain'}} />
            <Text style={{textAlign: 'center', fontSize: 12, fontFamily: fontRegular}}>Contact</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={{}}
          // onPress = {()=>alert('H')}
          >
            <Image source={require('../../images/messageLocation.png')} style={{width: 50, height: 50, backgroundColor:'transparent', resizeMode: 'contain'}} />
            <Text style={{textAlign: 'center', fontSize: 12, fontFamily: fontRegular}}>Location</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={{}}
          onPress = {()=>this.setState({menuHeigth:0})}
          >
            <Image source={require('../../images/messageCancel.png')} style={{width: 50, height: 50, backgroundColor:'transparent', resizeMode: 'contain'}} />
            <Text style={{textAlign: 'center', fontSize: 12, fontFamily: fontRegular}}>Cancel</Text>
          </TouchableOpacity>

        </View>

      </View>
    );
    // return(
    //   <EmojiPanel onPick={this.handlePick} />
    // );
  }


  addButtonClicked(){
    Keyboard.dismiss()
    this.setState({menuHeigth: 170})
  }
  onChangeText(text) {
    // this.props.onTextChanged(text);
    textMessage = text
    this.props.onTextChanged(textMessage);
  }
  handlePick(emoji) {
    textMessage = textMessage + emoji
    // this.props.onChangeText(textMessage);
    console.log(textMessage)
    console.log(this)
  }

  render() {
    return (
      <View style={{flex: 1}}>
          <View style={{flexDirection:'row', justifyContent: 'center', alignItems: 'center',  backgroundColor: '#EFEFEF'}}>
          <View style={{flex :1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#EBEBEB', marginLeft: 10, borderRadius :10}}>
              <TouchableOpacity
                style={{width:30, height: 30, justifyContent:'center', alignItems: 'center', marginLeft: 5}}
                onPress = {()=>this.addButtonClicked()}
                >
                  <Image source={require('../../images/messageAdd.png')} style={{width: 30, height: 30, backgroundColor:'transparent', resizeMode: 'contain'}} />
                </TouchableOpacity>
                <TextInput
                  placeholder={this.props.placeholder}
                  placeholderTextColor={this.props.placeholderTextColor}
                  multiline={this.props.multiline}
                  onChange={(e) => this.onContentSizeChange(e)}
                  onContentSizeChange={(e) => this.onContentSizeChange(e)}
                  onChangeText={(text) => this.onChangeText(text)}
                  style={[styles.textInput, this.props.textInputStyle, { height: this.props.composerHeight }]}
                  autoFocus={this.props.textInputAutoFocus}
                  // value={this.props.text}
                  // value = {this.state.textMessage}
                  value = {textMessage}
                  accessibilityLabel={this.props.text || this.props.placeholder}
                  enablesReturnKeyAutomatically
                  underlineColorAndroid="transparent"
                  keyboardAppearance={this.props.keyboardAppearance}
                  {...this.props.textInputProps}
                />
                <TouchableOpacity
                style={{width:30, height: 30, justifyContent:'center', alignItems: 'center', marginRight: 5}}
                onPress = {()=>this.emojiKeyboard()}
                >
                  <Image source={require('../../images/messageSmile.png')} style={{width: 20, height: 20, backgroundColor:'transparent', resizeMode: 'contain'}} />
                </TouchableOpacity>

          </View>
          <View style={{justifyContent: 'center', alignItems: 'center', marginLeft :10, marginRight: 10, marginTop: 5}}>
              {this.renderSend()}
          </View>
      </View>

      <View style={{flex: 1}}>
      {this.state.menuHeigth>0?this.renderCustomButton():null}
      
      </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    lineHeight: 16,
    marginTop: Platform.select({
      ios: 6,
      android: 0,
    }),
    marginBottom: Platform.select({
      ios: 5,
      android: 3,
    }),
  },
});

Composer.defaultProps = {
  composerHeight: MIN_COMPOSER_HEIGHT,
  text: '',
  placeholderTextColor: Color.defaultProps,
  placeholder: DEFAULT_PLACEHOLDER,
  textInputProps: null,
  multiline: true,
  textInputStyle: {},
  textInputAutoFocus: false,
  keyboardAppearance: 'default',
  onTextChanged: () => {},
  onInputSizeChanged: () => {},
};

Composer.propTypes = {
  composerHeight: PropTypes.number,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  textInputProps: PropTypes.object,
  onTextChanged: PropTypes.func,
  onInputSizeChanged: PropTypes.func,
  multiline: PropTypes.bool,
  textInputStyle: TextInput.propTypes.style,
  textInputAutoFocus: PropTypes.bool,
  keyboardAppearance: PropTypes.string,
};
