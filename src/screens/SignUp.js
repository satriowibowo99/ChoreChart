import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {Background, FormInput} from '../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {CommonActions, NavigationRouteContext} from '@react-navigation/native';

export default function SignUp({navigation}) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const [loading, setLoading] = useState(false);

  async function submitSignUp(data) {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://todo-api-omega.vercel.app/api/v1/auth/register',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      setLoading(false);
      // console.log(response.data);
      navigation.dispatch(
        CommonActions.reset({
          routes: [
            // {name: 'Home'},
            {
              name: 'Home',
              params: {token: response.data.user.token},
            },
          ],
          index: 0,
        }),
      );
    } catch (error) {
      setLoading(false);
      console.log(error.response.data);
      ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
    }
  }

  return (
    <View style={styles.container}>
      <Background />
      <Text style={styles.textTitle}>Register</Text>

      <View style={{height: 15}} />

      <View style={styles.inputContainer}>
        <View>
          <FormInput
            title={'Nama'}
            control={control}
            errors={errors}
            placeholder={'Masukkan nama...'}
            name={'username'}
            warning={'isi nama dengan benar'}
            iconName={'account'}
          />
        </View>

        <View style={{marginTop: -25}} />

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

        <View style={{marginTop: -25}} />

        <View>
          <FormInput
            title={'Konfirmasi Password'}
            control={control}
            errors={errors}
            placeholder={'kata sandi...'}
            name={'confirmPassword'}
            warning={'isi password dengan benar'}
            iconName={'lock'}
          />
        </View>

        <View style={{height: 10}} />

        <View>
          <TouchableNativeFeedback
            useForeground
            onPress={handleSubmit(submitSignUp)}>
            <View style={styles.btnStyle}>
              {loading ? (
                <ActivityIndicator color={'white'} />
              ) : (
                <Text style={styles.textBtn}>Daftar</Text>
              )}
            </View>
          </TouchableNativeFeedback>
        </View>

        <View style={{height: 10}} />

        <View>
          <TouchableNativeFeedback
            useForeground
            onPress={() => navigation.goBack()}>
            <View
              style={{
                ...styles.btnStyle,
                width: 130,
                backgroundColor: '#402E6E',
              }}>
              <Text style={styles.textBtn}>Kembali</Text>
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
