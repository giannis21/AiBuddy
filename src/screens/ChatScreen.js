import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  Alert,
  Button,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import 'react-native-gesture-handler';
import {BASE_URL} from '../utils/Constants';
import {Composer, GiftedChat, Send, isSameDay} from 'react-native-gifted-chat';
import {addMessage} from '../redux/slices/initSlice';
import moment from 'moment';
import 'moment/locale/el';
import {useSocket} from '../sockets/SocketProvider';
import {Flow} from 'react-native-animated-spinkit';

const ChatScreen = ({navigation, route}) => {
  moment.locale('el');
  const {
    chatMessages,
    staffEmail: email,
    groupId,
    adminInfo: {adminAvatar, adminName, adminSurname},
  } = useSelector(state => state.initReducer);

  const socket = useSocket();
  const dispatch = useDispatch();

  const [showFooter, setShowFooter] = useState();

  useEffect(() => {
    return () => {
      Keyboard.dismiss();
    };
  });

  const onSend = useCallback(
    (newMessage = []) => {
      setShowFooter(true);

      dispatch(addMessage(newMessage));
      socket.emit(
        'message-chat',
        {
          question: newMessage[0].text,
          staffEmail: email,
          groupId,
        },
        response => {
          const {text} = response;
          const serverMessage = {
            _id: 1,
            text: text,
            createdAt: new Date(),
            user: {
              _id: 2,
            },
          };

          dispatch(addMessage([serverMessage]));
          setShowFooter(false);
        },
      );
    },
    [dispatch],
  );

  const renderSend = useMemo(
    () => props =>
      (
        <Send
          containerStyle={{
            alignSelf: 'center',

            justifyContent: 'center',
          }}
          {...props}>
          <View style={styles.sendButton}>
            <Image
              style={{width: 20, height: 20, start: 1}}
              source={require('../../assets/images/send-message.png')}
              resizeMode="contain"
            />
          </View>
        </Send>
      ),
    [],
  );

  const renderTime = useCallback(props => {
    const {currentMessage} = props;

    return (
      <Text
        style={[
          styles.timeText,
          currentMessage?.user._id !== 1 && {color: 'grey', marginLeft: 7},
        ]}>
        {moment(currentMessage.createdAt).format('HH:mm')}{' '}
        {/* Example: 15:30 */}
      </Text>
    );
  }, []);
  const renderDay = useCallback(props => {
    const {currentMessage, previousMessage} = props;

    // Only render the day if the current message is not on the same day as the previous message
    if (!previousMessage || !isSameDay(currentMessage, previousMessage)) {
      return (
        <View style={styles.dayContainer}>
          <Text style={styles.dayText}>
            {moment(currentMessage.createdAt).format('ddd, D MMM YYYY')}{' '}
          </Text>
        </View>
      );
    }
    return null; // Don't render the day header for messages on the same day
  }, []);

  const renderChatFooter = () => (
    <View style={styles.footerContainer}>
      <Flow size={48} color="#4242D3" />
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 14,
          paddingStart: 10,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={{width: 30, height: 30}}
            source={require('../../assets/images/back_arrow.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Image
          style={{
            width: 200,
            height: 100,
            alignSelf: 'center',
            start: '33%',

            position: 'absolute',
          }}
          source={require('../../assets/images/argon-react.png')}
          resizeMode="contain"
        />
      </View>
      <View
        style={{
          backgroundColor: '#DDDDDD',
          height: 1,
          marginTop: 10,
          marginBottom: 10,
        }}
      />
      <GiftedChat
        renderTime={renderTime} // Custom message time
        renderDay={renderDay} // Custom day header
        messages={chatMessages}
        renderAvatar={null}
        renderSend={renderSend}
        renderChatFooter={showFooter ? renderChatFooter : undefined}
        onSend={messages => onSend(messages)}
        // renderChatFooter={() => <View style={{height: 10}} />}
        alwaysShowSend={true}
        user={{
          _id: 1,
        }}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  timeText: {
    fontSize: 12,
    color: 'white',
    textAlign: 'right',
    marginRight: 5,
    marginBottom: 2,
  },
  buttonContainer: {
    marginTop: 20,
    width: '90%',
  },
  sendButton: {
    marginRight: 5,
    //  backgroundColor: '#37BEAF',
    height: 34,
    width: 34,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerContainer: {
    padding: 14,
    alignSelf: 'flex-start',
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    borderRadius: 10,
    borderTopColor: '#e0e0e0',
  },
  footerText: {
    fontSize: 14,
    color: '#555',
  },
  box: {
    borderRadius: 10,
    paddingVertical: 20,
    marginHorizontal: 15,
    top: -80,
    borderColor: 'rgba(0, 0, 0, 0.01)',
    height: '70%',

    shadowColor: 'rgba(0, 0, 0, 0.5)', // Shadow color
    shadowOpacity: 1, // Shadow opacity
    shadowRadius: 1, // Shadow blur radius
    shadowOffset: {
      width: 0, // Shadow horizontal offset
      height: 0.1, // Shadow vertical offset
    },
    backgroundColor: 'white',
    borderWidth: 0.5,
    elevation: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  composerContainer: {
    flex: 1,
    // paddingBottom: 10,
    justifyContent: 'center',
    height: Platform.OS == 'ios' ? 67 : 60, // Increased height for the composer
    paddingVertical: 5,
    backgroundColor: 'white',
  },
  input: {
    height: 50,
    width: '90%',
    backgroundColor: '#F4F4F4',

    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  dayContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B6B6B',
  },
});
