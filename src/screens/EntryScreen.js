import React, {useState} from 'react';
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
} from 'react-native';
import {getInitialInfo} from '../services/thunkApi';
import {useDispatch} from 'react-redux';
import {setAdminInfo} from '../redux/slices/initSlice';

const EntryScreen = ({navigation, route}) => {
  // State hooks for email and unique ID
  const [email, setEmail] = useState('giannisfragoulis21@gmail.com');
  const [uniqueId, setUniqueId] = useState('prosbash_se_arxeia33');
  // Submit Handler
  const dispatch = useDispatch();
  const handleSubmit = () => {
    if (!email || !uniqueId) {
      Alert.alert('Προσοχή', 'Συμπλήρωσε όλα τα στοιχεία!');
      return;
    }
    const params = {
      email,
      groupId: uniqueId,
    };
    dispatch(getInitialInfo({params}))
      .unwrap()
      .then(response => {
        dispatch(setAdminInfo(response.adminInfo));
        console.log('Initial Info:', response);

        navigation.navigate('HomeScreen');
      })
      .catch(error => {
        console.error('Error fetching initial info:', error);
        Alert.alert('Error', error || 'Something went wrong!');
      });
    console.log('Email:', email);
    console.log('Unique ID:', uniqueId);
  };
  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <Image
          style={{width: '100%'}}
          source={require('../../assets/images/ai.jpeg')}
          resizeMode="stretch"
        />
        <View style={styles.box}>
          {/* Email Input */}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              start: '10%',
              paddingBottom: 10,
            }}>
            <Image
              style={{width: 260, height: 100}}
              source={require('../../assets/images/argon-react.png')}
              resizeMode="contain"
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Πληκτρολόγηση το email σου.."
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Unique ID Input */}
          <TextInput
            style={styles.input}
            placeholder="Πληκτρολόγησε το id της εταιρίας.."
            value={uniqueId}
            onChangeText={setUniqueId}
            keyboardType="default"
          />
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
              }}>
              Πάμε
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EntryScreen;

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
    borderColor: 'rgba(0, 0, 0, 0.1)',
    height: '60%',
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
    justifyContent: 'center',
    alignItems: 'center',
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
