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
import {Composer, GiftedChat, Send} from 'react-native-gifted-chat';
const ChatScreen = ({navigation, route}) => {
  // State hooks for email and unique ID
  const [messages, setMessages] = useState([]);
  const {
    adminInfo: {adminAvatar, adminName, adminSurname},
  } = useSelector(state => state.initReducer);

  // Submit Handler
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      Keyboard.dismiss();
    };
  });
  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ]);
  // }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

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
            {/* <CustomIcon
              style={{transform: [{rotate: '90deg'}]}}
              name="arrowBack"
              size={18}
              color={'white'}
            /> */}
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

  const renderComposer = useMemo(
    () => props =>
      (
        <View style={styles.composerContainer}>
          <Composer
            {...props}
            textInputStyle={[styles.input]} // Ensure the styles are applied
          />
        </View>
      ),
    [],
  );

  console.log(`${BASE_URL}${adminAvatar}`);
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
        messages={messages}
        renderAvatar={null}
        renderSend={renderSend}
        onSend={messages => onSend(messages)}
        renderChatFooter={() => <View style={{height: 10}} />}
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
  buttonContainer: {
    marginTop: 20,
    width: '90%',
  },
  sendButton: {
    marginRight: 5,
    backgroundColor: '#37BEAF',
    height: 34,
    width: 34,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
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
});
