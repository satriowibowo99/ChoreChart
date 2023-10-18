import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableNativeFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {Controller} from 'react-hook-form';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FormInput({
  title,
  control,
  errors,
  placeholder,
  name,
  warning,
  iconName,
}) {
  const isPassword = name === 'password' || name === 'confirmPassword';
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.titleContainer}>{title}</Text>

      <View style={{height: 10}} />

      <View style={styles.inputContainer}>
        <Icon name={iconName} color={'black'} size={25} style={styles.icon} />
        <Controller
          control={control}
          rules={{
            required: true,
            pattern:
              name === 'email'
                ? /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                : null,
          }}
          render={({field: {onChange, value}}) => {
            return (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextInput
                  placeholder={placeholder}
                  onChangeText={onChange}
                  value={value}
                  style={styles.textInput}
                  secureTextEntry={isPassword ? !isPasswordVisible : false}
                />
                {isPassword && (
                  <TouchableNativeFeedback
                    useForeground
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                    <View style={styles.iconContainer}>
                      <Icon
                        name={isPasswordVisible ? 'eye-off' : 'eye'}
                        color={'black'}
                        size={25}
                      />
                    </View>
                  </TouchableNativeFeedback>
                )}
              </View>
            );
          }}
          name={name}
        />
      </View>
      {errors[name] && <Text style={styles.txtError}>{warning}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginTop: 25,
  },
  titleContainer: {
    color: 'white',
    fontWeight: 'bold',
    textShadowRadius: 2,
    textShadowColor: 'black',
    textShadowOffset: {height: 1 / 2, width: 1 / 2},
    paddingHorizontal: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    paddingHorizontal: 10,
    borderRadius: 50,
    alignSelf: 'center',
    width: '90%',
    elevation: 5,
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
  },
  iconContainer: {
    width: 30,
    height: 30,
    right: 40,
    overflow: 'hidden',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtError: {
    color: 'red',
    textAlign: 'right',
  },
});
