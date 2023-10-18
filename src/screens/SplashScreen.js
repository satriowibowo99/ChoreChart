import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Background} from '../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SplashScreen({navigation}) {
  function goLogin() {
    setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
  }
  useEffect(() => {
    goLogin();
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
