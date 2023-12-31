import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {Background, FormInput} from '../components';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

export default function Login({navigation}) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const [loading, setLoading] = useState(false);

  async function submitSignIn(data) {
    // console.log(data);
    setLoading(true);
    try {
      const response = await axios.post(
        'https://todo-api-omega.vercel.app/api/v1/auth/login',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      EncryptedStorage.setItem('user_credential', JSON.stringify(data));
      setLoading(false);
      // console.log(response.data);
      navigation.replace('Home', {token: response.data.user.token});
    } catch (error) {
      setLoading(false);
      console.log(error.response.data);
    }
  }

  return (
    <View style={styles.container}>
      <Background />
      <Text style={styles.textTitle}>Login</Text>

      <View style={{height: 15}} />

      <View style={styles.inputContainer}>
        <View>
          <FormInput
            title={'Email'}
            control={control}
            errors={errors}
            placeholder={'contoh@email.com'}
            name={'email'}
            warning={'isi email dengan benar'}
            iconName={'email'}
          />
        </View>

        <View style={{marginTop: -25}} />

        <View>
          <FormInput
            title={'Password'}
            control={control}
            errors={errors}
            placeholder={'kata sandi...'}
            name={'password'}
            warning={'isi password dengan benar'}
            iconName={'lock'}
          />
        </View>

        <View style={{height: 10}} />

        <View>
          <TouchableNativeFeedback
            useForeground
            onPress={handleSubmit(submitSignIn)}>
            <View style={styles.btnStyle}>
              {loading ? (
                <ActivityIndicator color={'white'} />
              ) : (
                <Text style={styles.textBtn}>Masuk</Text>
              )}
            </View>
          </TouchableNativeFeedback>
        </View>

        <View style={{height: 10}} />

        <View>
          <TouchableNativeFeedback
            useForeground
            onPress={() => navigation.navigate('SignUp')}>
            <View
              style={{
                ...styles.btnStyle,
                width: 130,
                backgroundColor: '#402E6E',
              }}>
              <Text style={styles.textBtn}>Daftar</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 50,
    color: 'white',
    fontWeight: 'bold',
    textShadowRadius: 2,
    textShadowColor: 'black',
    textShadowOffset: {height: 2, width: 2},
  },
  inputContainer: {
    backgroundColor: '#8F8F8Fb3',
    width: '80%',
    // height: '40%',
    borderRadius: 20,
    paddingBottom: 20,
  },
  btnStyle: {
    backgroundColor: '#862772',
    width: 190,
    height: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 190 / 2,
    overflow: 'hidden',
    elevation: 5,
  },
  textBtn: {
    color: 'white',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
    elevation: 5,
  },
});
