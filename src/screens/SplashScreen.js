import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Background} from '../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';

export default function SplashScreen({navigation}) {
  async function refreshToken() {
    try {
      const credential = await EncryptedStorage.getItem('user_credential');
      // console.log(credential);
      if (credential == null) {
        navigation.replace('Login');
      } else {
        const response = await axios.post(
          'https://todo-api-omega.vercel.app/api/v1/auth/login',
          JSON.parse(credential),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        // console.log(response.data);
        navigation.replace('Home', {token: response.data.user.token});
      }
    } catch (error) {
      console.log(error);
      navigation.replace('Login');
    }
  }

  useEffect(() => {
    // goLogin();
    setTimeout(() => {
      refreshToken();
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Background />
      <Icon
        name={'checkbox-marked-circle-plus-outline'}
        color={'white'}
        size={100}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
