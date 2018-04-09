import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
} from 'react-native';
import relativeDate from 'relative-date';
import Moment from 'moment';
import axios, { request, baseURL } from '../utils';
const chatIndex = 0;
const desID = '';
const myID = '';
const messageToSend = '';
// import {GiftedChat, Actions, Bubble, SystemMessage} from 'react-native-gifted-chat';
import {GiftedChat, Actions, Bubble, SystemMessage} from './Chat';
// import CustomActions from './data/CustomActions';
import CustomView from './data/CustomView';

export default class ChatMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toUserId: this.props.navigation.state.params.data.id,
      messages: [],
      loadEarlier: true,
      typingText: null,
      myID: '',
      isLoadingEarlier: false,
      reactNativeMessages: ['Oui bonjour', "Je m'appelle Sareth, et toi?", 'Je vais bien, et toi?']
    };

    this._isMounted = false;
    this.onSend = this.onSend.bind(this);
    this.onReceive = this.onReceive.bind(this);
    // this.renderCustomActions = this.renderCustomActions.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderSystemMessage = this.renderSystemMessage.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onLoadEarlier = this.onLoadEarlier.bind(this);
    desID = this.props.navigation.state.params.data.id;

    this._isAlright = null;
  }
  getChatFunc(){
    var bodyData = `accountId=${desID}`;
    AsyncStorage.getItem('token')
      .then((token) => {
        if (token) {
          fetch(baseURL + '/messaging-api/messages?accountId='+desID,{
          method: "GET", 
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': 'Bearer ' + token,
          }
        })
          .then((response) => response.json())
          .then((responseData) => {
            this.onReceive(responseData)
            
            
          })
          .done();
        }
        else {
          this.setState({ isChecking: false });
        }
      }).catch((e) => {
        console.log(e);
    });
  }

  componentWillMount() {
    AsyncStorage.getItem('UserId')
    .then((UserId) => {
      if (UserId) {
        myID = UserId
        this.setState({myID: UserId})
      }
    })
    
    var messages = require('./data/messages.js')
    desID = this.props.navigation.state.params.data.id;
    // this.getChatFunc();
    setInterval(() => {
      this.getChatFunc();
    }, 2000)

    this._isMounted = true;
    // this.setState(() => {
    //   return {
    //     messages: require('./data/messages.js'),
    //   };
    // });
  }

  componentWillUnmount() {
   
    this._isMounted = false;
  }

  onLoadEarlier() {
    this.setState((previousState) => {
      return {
        isLoadingEarlier: true,
      };
    });

    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState((previousState) => {
          return {
            messages: GiftedChat.prepend(previousState.messages, require('./data/old_messages.js')),
            loadEarlier: false,
            isLoadingEarlier: false,
          };
        });
      }
    }, 1000); // simulating network
  }

  onSend(messages = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
    // for demo purpose
    // this.answerDemo(messages);
    console.log(messages[0].text)

    messageToSend = messages[0].text;
    var bodyData = `toAccountId=${desID}&message=${messages[0].text}`;
    AsyncStorage.getItem('token')
      .then((token) => {
        if (token) {
          fetch(baseURL + '/messaging-api/send-message',{
          method: "POST", 
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': 'Bearer ' + token,
          },
          body: bodyData
        })
          .then((response) => response.json())
          .then((responseData) => {
            this.saveMessage(responseData.message)
            
          })
          .done();
        }
        else {
          this.setState({ isChecking: false });
        }
      }).catch((e) => {
        console.log(e);
    });
  }

  answerDemo(messages) {
    if (messages.length > 0) {
      if ((messages[0].image || messages[0].location) || !this._isAlright) {
        this.setState((previousState) => {
          return {
            typingText: 'React Native is typing...'
          };
        });
      }
    }

    setTimeout(() => {
      if (this._isMounted === true) {
        if (messages.length > 0) {
          if (messages[0].image) {
            this.onReceive('Nice picture!');
          } else if (messages[0].location) {
            this.onReceive('My favorite place');
          } else {
            if (!this._isAlright) {
              // this._isAlright = true;
              // this.onReceive('Hello Sareth');
              this.onReceive(this.state.reactNativeMessages[chatIndex]!=null?this.state.reactNativeMessages[chatIndex]:'I have no idea');
              chatIndex++;
            }
          }
        }
      }

      this.setState((previousState) => {
        return {
          typingText: null,
        };
      });
    }, 1000);
  }
  onReceive(Data) {
   
    this.setState({
      messages: []
    })
    if(Data.length>0){
      for(var i = 0 ; i<Data.length ; i++){
        let createdAt =  Data[i].created
        const chatDate = Moment.utc(createdAt).utcOffset(+7);
        // const date = relativeDate(new Date(createdAt)) 
        this.setState((previousState) => {
          return {
            messages: null,
            messages: GiftedChat.append(previousState.messages, {
              _id:Math.round(Math.random() * 1000000),
              text: Data[i].message,
              createdAt: chatDate,
              user: {
                _id: Data[i].fromId,
                name: 'Sareth',
                avatar: 'https://media.licdn.com/dms/image/C5603AQEZDbvciyOuzg/profile-displayphoto-shrink_100_100/0?e=1527325200&v=alpha&t=IegRZPYqM0Sn9hQgHanTlRcHGWHNdGDKiOXsHn7dlzY',
              },
              sent: true,
              received: true,
              // location: {
              //   latitude: 104.864601,
              //   longitude: 11.598704
              // },
            }),
          };
        });
        
      }
    }

  }

  renderCustomActions(props) {
    // if (Platform.OS === 'ios') {
    //   return (
    //     <CustomActions
    //       {...props}
    //     />
    //   );
    // }
    const options = {
      'Action 1': (props) => {
        alert('option 1');
      },
      'Action 2': (props) => {
        alert('option 2');
      },
      'Cancel': () => {},
    };
    return (
      <Actions
        {...props}
        options={options}
      />
    );
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          }
        }}
      />
    );
  }

  renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15,
        }}
        textStyle={{
          fontSize: 14,
        }}
      />
    );
  }

  renderCustomView(props) {
    return (
      <CustomView
        {...props}
      />
    );
  }

  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }
  onChatSend(messages=[]){
    messageToSend = messages[0].text;
    var bodyData = `toAccountId=${desID}&message=${messages[0].text}`;
    AsyncStorage.getItem('token')
      .then((token) => {
        if (token) {
          fetch(baseURL + '/messaging-api/send-message',{
          method: "POST", 
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': 'Bearer ' + token,
          },
          body: bodyData
        })
          .then((response) => response.json())
          .then((responseData) => {
            console.log(responseData);
            this.saveMessage(responseData.message)
            
          })
          .done();
        }
        else {
          this.setState({ isChecking: false });
        }
      }).catch((e) => {
        console.log(e);
    });
  }
  saveMessage = function(messages){
  }
  onSaveSend(messages = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
    // for demo purpose
    this.answerDemo(messages);
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        // onSend={this.onChatSend}
        loadEarlier={this.state.loadEarlier}
        onLoadEarlier={this.onLoadEarlier}
        isLoadingEarlier={this.state.isLoadingEarlier}

        user={{
          _id: this.state.myID, // sent messages should have same user._id
        }}

        // renderActions={this.renderCustomActions}
        renderBubble={this.renderBubble}
        renderSystemMessage={this.renderSystemMessage}
        renderCustomView={this.renderCustomView}
        renderFooter={this.renderFooter}
      />
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
});
