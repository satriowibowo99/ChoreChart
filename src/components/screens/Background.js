import {StyleSheet, Image} from 'react-native';
import React from 'react';

export default function Background() {
  return (
    <Image
      style={styles.bgSize}
      source={require('../../assets/background.png')}
    />
  );
}

const styles = StyleSheet.create({
  bgSize: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    transform: [{rotate: '180deg'}],
  },
});
