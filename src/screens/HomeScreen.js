import React, {useCallback, useState} from 'react';
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
  BackHandler,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getInitialInfo} from '../services/thunkApi';
import {BASE_URL} from '../utils/Constants';
import {useFocusEffect} from '@react-navigation/native';

const HomeScreen = ({navigation, route}) => {
  // State hooks for email and unique ID
  const [email, setEmail] = useState('');
  const [uniqueId, setUniqueId] = useState('');
  const {
    adminInfo: {adminAvatar, adminName, adminSurname},
  } = useSelector(state => state.initReducer);

  // Submit Handler
  const dispatch = useDispatch();
  const handleSubmit = () => {
    navigation.navigate('ChatScreen');
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', () => true);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', () => true);
    }, []),
  );

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <Image
          style={{width: '100%'}}
          source={require('../../assets/images/ai.jpeg')}
          resizeMode="stretch"
        />

        <View style={styles.box}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              marginStart: 10,
              color: '#3A4750',
            }}>
            Εργοδότης
          </Text>
          <View
            style={{
              backgroundColor: '#DDDDDD',
              height: 1,
              marginTop: 5,
              marginBottom: 20,
            }}
          />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',

              paddingBottom: 10,
            }}>
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                marginBottom: 20,
                overflow: 'hidden',
              }}
              source={{uri: `${BASE_URL}${adminAvatar}`}}
              resizeMode="cover"
            />
          </View>
          <View style={{padding: 13}}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                color: '#bcc2c1',
              }}>
              {'Όνομα'}
            </Text>
            <Text
              style={{
                fontSize: 17,
                fontWeight: 'bold',
                marginBottom: 15,
              }}>
              {adminName}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                color: '#bcc2c1',
              }}>
              {'Επώνυμο'}
            </Text>
            <Text
              style={{
                fontSize: 17,
                fontWeight: 'bold',
              }}>
              {adminSurname}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Text
              onPress={handleSubmit}
              style={{
                borderRadius: 10,
                overflow: 'hidden',
                color: 'white',
                textAlign: 'center',
                width: '100%',
                padding: 10,
                alignSelf: 'center',
                backgroundColor: '#007BFF',
                alignSelf: 'center',
                start: '5.5%',
              }}>
              Ξεκίνα να τσατάρεις
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
    width: '90%',
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
