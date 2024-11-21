import AsyncStorage from '@react-native-async-storage/async-storage';
export const setValue = async (key, val) => {
  try {
    await AsyncStorage.setItem(key, val);
  } catch (e) {
    console.log('yparxei kapoio problima:', {e});
  }
};

export const getValue = async key => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data !== null) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const removeItemValue = async key => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
};
export const keyNames = {
  email: 'email',
  groupId: 'groupId',
};
export const filterKeys = {
  gymCategory: 'gymCategory',
  gymReviewsRange: 'gymReviewsRange',
  gymFacilities: 'gymFacilities',
  gymServices: 'gymServices',
};
