import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ListView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewPropTypes as RNViewPropTypes
} from 'react-native';
import { fontLight, fontRegular, fontSemiBold, fontBold, khmerBold, khmerRegular } from '../Fonts/Fonts';

const ViewPropTypes = RNViewPropTypes || View.propTypes;

class Autocomplete extends Component {
  static propTypes = {
    ...TextInput.propTypes,
    /**
     * These styles will be applied to the container which
     * surrounds the autocomplete component.
     */
    containerStyle: ViewPropTypes.style,
    /**
     * Assign an array of data objects which should be
     * rendered in respect to the entered text.
     */
    data: PropTypes.array,
    /**
     * Set to `true` to hide the suggestion list.
     */
    hideResults: PropTypes.bool,
    /*
     * These styles will be applied to the container which surrounds
     * the textInput component.
     */
    inputContainerStyle: ViewPropTypes.style,
    /*
     * Set `keyboardShouldPersistTaps` to true if RN version is <= 0.39.
     */
    keyboardShouldPersistTaps: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    /*
     * These styles will be applied to the container which surrounds
     * the result list.
     */
    listContainerStyle: ViewPropTypes.style,
    /**
     * These style will be applied to the result list.
     */
    listStyle: ListView.propTypes.style,
    /**
     * `onShowResults` will be called when list is going to
     * show/hide results.
     */
    onShowResults: PropTypes.func,
    /**
     * method for intercepting swipe on ListView. Used for ScrollView support on Android
     */
    onStartShouldSetResponderCapture: PropTypes.func,
    /**
     * `renderItem` will be called to render the data objects
     * which will be displayed in the result view below the
     * text input.
     */
    renderItem: PropTypes.func,
    /**
     * `renderSeparator` will be called to render the list separators
     * which will be displayed between the list elements in the result view
     * below the text input.
     */
    renderSeparator: PropTypes.func,
    /**
     * renders custom TextInput. All props passed to this function.
     */
    renderTextInput: PropTypes.func
  };

  static defaultProps = {
    data: [],
    defaultValue: '',
    keyboardShouldPersistTaps: 'always',
    onStartShouldSetResponderCapture: () => false,
    renderItem: rowData => <Text>{rowData}</Text>,
    renderSeparator: null,
    renderTextInput: props => <TextInput {...props} />,
    tintColor: '#6BC4BC'
  };

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(props.data),
      query: this.props.defaultValue
    };
    this.resultList = null;
  }

  componentWillReceiveProps({ data }) {
    const dataSource = this.state.dataSource.cloneWithRows(data);
    this.setState({ dataSource });
  }

  /**
   * Proxy `blur()` to autocomplete's text input.
   */
  blur() {
    const { textInput } = this;
    textInput && textInput.blur();
    console.log(this.state.query);
    this.setState({ focus: !(!this.state.query | this.state.query === '') })
  }

  /**
   * Proxy `focus()` to autocomplete's text input.
   */
  focus() {
    const { textInput } = this;
    textInput && textInput.focus();
    this.setState({ focus: true })
  }



  renderResultList() {
    const { dataSource } = this.state;
    const {
      listStyle,
      renderItem,
      renderSeparator,
      keyboardShouldPersistTaps,
      onEndReached,
      onEndReachedThreshold
    } = this.props;

    return (
      <ListView
        ref={(resultList) => { this.resultList = resultList; }}
        dataSource={dataSource}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        renderRow={renderItem}
        renderSeparator={renderSeparator}
        onEndReached={onEndReached}
        onEndReachedThreshold={onEndReachedThreshold}
        style={[styles.list, listStyle]}
      />
    );
  }

  renderTextInput() {
    const { onEndEditing, renderTextInput, style } = this.props;
    const inputFlex = this.state.focus ? 3 : 1;
    const props = {
      style: [styles.input, style, {
        flex: inputFlex, fontSize: 20,
        fontFamily: fontRegular
      }],
      onFocus: () => this.focus(),
      onBlur: () => this.blur(),
      ref: ref => (this.textInput = ref),
      onEndEditing: e => onEndEditing && onEndEditing(e),
      ...this.props,
      onChangeText: (text) => { this.onChangeText(text) }
    };
    return renderTextInput(props);
  }

  onChangeText(text) {
    this.setState({ query: text })
    const onChangeText = this.props.onChangeText;
    if (onChangeText) {
      onChangeText(text)
    }
  }

  render() {
    const { dataSource } = this.state;
    const {
      containerStyle,
      hideResults,
      inputContainerStyle,
      listContainerStyle,
      onShowResults,
      onStartShouldSetResponderCapture
    } = this.props;
    const showResults = dataSource.getRowCount() > 0;

    // Notify listener if the suggestion will be shown.
    onShowResults && onShowResults(showResults);
    const hintSize = this.state.focus ? 12 : 18;
    const hintFlex = this.state.focus ? 1 : 0;

    return (
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.inputContainer, inputContainerStyle, { alignItems: 'center', flexDirection: 'row', flex: 1 }]}>
          <Text style={{
            fontFamily: fontRegular,
            color: '#535353',
            backgroundColor: 'transparent',
            fontSize: hintSize,
            flex: hintFlex
          }}>{this.props.textHint}</Text>
          {this.renderTextInput()}
        </View>
        <View style={{
          height: 1,
          backgroundColor: this.props.tintColor || '#ddd'
        }} />
        {!hideResults && (
          <View
            style={listContainerStyle}
            onStartShouldSetResponderCapture={onStartShouldSetResponderCapture}
          >
            {showResults && this.renderResultList()}
          </View>
        )}
      </View>
    );
  }
}

const androidStyles = {
  container: {
    flex: 1
  },
  inputContainer: {
    marginBottom: 0,
    flexDirection: 'row'
  },
  list: {
    backgroundColor: 'white',
    borderTopWidth: 0,
    margin: 10,
    marginTop: 0,
  }
};

const iosStyles = {
  container: {
    zIndex: 1
  },
  inputContainer: {
  },
  input: {
    height: 40,
    paddingLeft: 3
  },
  list: {
    backgroundColor: 'white',
    borderTopWidth: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  }
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    paddingLeft: 3
  },
  ...Platform.select({
    android: { ...androidStyles },
    ios: { ...iosStyles }
  })
});

export default Autocomplete;
