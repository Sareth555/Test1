/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewPropTypes, Image } from 'react-native';
import Color from './Color';

export default function Send({ text, containerStyle, onSend, children, textStyle, label }) {
  // if (text.trim().length > 0) {
  //   return (
  //     <TouchableOpacity
  //       style={[styles.container, containerStyle]}
  //       onPress={() => {
  //         onSend({ text: text.trim() }, true);
  //       }}
  //       accessibilityTraits="button"
  //     >
  //       {/* <View>{children || <Text style={[styles.text, textStyle ]}>{label}</Text>}</View> */}
  //       <Image source={require('../../images/messageSend.png')} style={{width: 45, height: 45, backgroundColor:'transparent', resizeMode: 'contain'}} />
  //     </TouchableOpacity>
  //   );
  // }
  // return <View />;

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={() => {
        if (text.trim().length > 0) {
          onSend({ text: text.trim() }, true);
        }
      }}
      accessibilityTraits="button"
    >
      {/* <View>{children || <Text style={[styles.text, textStyle ]}>{label}</Text>}</View> */}
      <Image source={require('../../images/messageSend.png')} style={{width: 45, height: 45, backgroundColor:'transparent', resizeMode: 'contain'}} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  
  container: {
    // height: 44,
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#efefef',
    marginLeft: 10,
    paddingBottom: 8
  },
  text: {
    color: Color.defaultBlue,
    fontWeight: '600',
    fontSize: 17,
    backgroundColor: Color.backgroundTransparent,
    marginBottom: 12,
    marginLeft: 10,
    marginRight: 10,
  },
});

Send.defaultProps = {
  text: '',
  onSend: () => {},
  label: 'Send',
  containerStyle: {},
  textStyle: {},
  children: null,
};

Send.propTypes = {
  text: PropTypes.string,
  onSend: PropTypes.func,
  label: PropTypes.string,
  containerStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  children: PropTypes.element,
};
