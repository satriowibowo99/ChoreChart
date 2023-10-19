import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Background, ModalAddTask, FormInput} from '../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';
import {useForm} from 'react-hook-form';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';

export default function Home({navigation, route}) {
  // console.log(route.params.token);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  const [selectedIndex, setSelectedIndex] = useState(null);

  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);

  const token = route.params.token;

  const [getData, setGetData] = useState([]);
  // console.log(getData);
  async function getTasks() {
    try {
      const response = await axios.get(
        'https://todo-api-omega.vercel.app/api/v1/todos',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // console.log(response.data);
      setGetData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  function confirmLogOut() {
    Alert.alert(
      'Apakah anda ingin LogOut ?',
      'Anda akan keluar dari aplikasi',
      [
        {
          text: 'Batal',
        },
        {
          text: 'Keluar',
          onPress: () => logOut(),
        },
      ],
    );
  }

  async function logOut() {
    try {
      await EncryptedStorage.removeItem('user_credential');
      navigation.replace('Login');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.header}>
        <Icon
          name={'logout'}
          color={'white'}
          size={40}
          style={{transform: [{rotate: '180deg'}]}}
          onPress={() => confirmLogOut()}
        />

        <View style={{marginLeft: 10, flex: 1}}>
          <Text style={styles.txtUsername}>Username</Text>
          <Text style={{color: 'grey'}}>user@email.com</Text>
        </View>

        <Icon name={'account-circle'} size={50} color={'white'} />
      </View>

      <ScrollView>
        {getData.todos?.map((item, index) => {
          return (
            <TouchableOpacity
              key={item._id}
              onPress={() => {
                if (selectedIndex === index) {
                  setSelectedIndex(null);
                } else {
                  setSelectedIndex(index);
                }
              }}>
              <View style={styles.listItem}>
                <CheckBox
                  tintColors={{true: 'white', false: 'white'}}
                  value={false}
                />

                <View style={styles.lines} />

                <View style={{flex: 1, marginLeft: 10}}>
                  <Text style={styles.txtTitle}>{item.title}</Text>
                  {selectedIndex === index && (
                    <Text style={{color: 'white'}}>{item.desc}</Text>
                  )}
                </View>

                <View style={{...styles.lines, height: 40}} />

                <View>
                  <TouchableOpacity style={styles.btnEdit}>
                    <Icon
                      name={'pencil'}
                      size={20}
                      color={'white'}
                      onPress={() => setVisibleEdit(true)}
                    />
                  </TouchableOpacity>
                  <View style={{height: 5}} />
                  <TouchableOpacity
                    style={{...styles.btnEdit, backgroundColor: '#402E6E'}}>
                    <Icon name={'trash-can'} size={20} color={'white'} />
                  </TouchableOpacity>
                </View>

                <Icon
                  name={selectedIndex === index ? 'chevron-up' : 'chevron-down'}
                  color={'white'}
                  size={25}
                  style={styles.iconDesc}
                />
              </View>
            </TouchableOpacity>
          );
        })}
        <View style={{height: 100}} />
      </ScrollView>

      <View style={styles.iconTask}>
        <TouchableOpacity onPress={() => setVisibleAdd(true)}>
          <Icon
            name={'checkbox-marked-circle-plus-outline'}
            color={'white'}
            size={30}
          />
        </TouchableOpacity>
      </View>

      <Modal transparent visible={visibleAdd} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Icon
                name={'checkbox-marked-circle-plus-outline'}
                color={'white'}
                size={25}
              />
              <Text style={{color: 'white'}}>Tambah Tugas</Text>
              <Icon
                name={'close'}
                color={'white'}
                size={25}
                onPress={() => setVisibleAdd(false)}
              />
            </View>
            <View style={styles.modalAddTitle}>
              <FormInput
                title={'Judul Tugas'}
                control={control}
                errors={errors}
                placeholder={'masukkan judul...'}
                name={'title'}
                warning={'isi judul tugas dengan benar'}
                iconName={'pencil'}
              />
              <View style={{marginTop: -20}} />
              <FormInput
                title={'Deskripsi Tugas'}
                control={control}
                errors={errors}
                placeholder={'masukkan deskripsi...'}
                name={'desc'}
                warning={'isi deskripsi tugas dengan benar'}
                iconName={'menu'}
              />
              <TouchableOpacity style={styles.btnAddTask}>
                <Text style={styles.txtBtnAdd}>Tambah</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal transparent visible={visibleEdit} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Icon
                name={'checkbox-marked-circle-plus-outline'}
                color={'white'}
                size={25}
              />
              <Text style={{color: 'white'}}>Edit Tugas</Text>
              <Icon
                name={'close'}
                color={'white'}
                size={25}
                onPress={() => setVisibleEdit(false)}
              />
            </View>
            <View style={styles.modalAddTitle}>
              <FormInput
                title={'Judul Tugas'}
                control={control}
                errors={errors}
                placeholder={'masukkan judul...'}
                name={'title'}
                warning={'isi judul tugas dengan benar'}
                iconName={'pencil'}
              />
              <View style={{marginTop: -20}} />
              <FormInput
                title={'Deskripsi Tugas'}
                control={control}
                errors={errors}
                placeholder={'masukkan deskripsi...'}
                name={'desc'}
                warning={'isi deskripsi tugas dengan benar'}
                iconName={'menu'}
              />
              <TouchableOpacity style={styles.btnAddTask}>
                <Text style={styles.txtBtnAdd}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    margin: 20,
    marginTop: StatusBar.currentHeight + 15,
    alignItems: 'center',
  },
  txtUsername: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  listItem: {
    flex: 1,
    margin: 20,
    padding: 20,
    backgroundColor: '#FFFFFF1a',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
  },
  lines: {
    height: 25,
    width: 2,
    backgroundColor: 'white',
    marginLeft: 10,
  },
  txtTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
  btnEdit: {
    backgroundColor: '#862772',
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 15,
  },
  iconDesc: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    textAlign: 'center',
    marginLeft: 20,
  },
  iconTask: {
    backgroundColor: '#862772',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50 / 2,
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  modalView: {
    backgroundColor: '#402E6E',
    width: '80%',
    borderRadius: 10,
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  btnAddTask: {
    backgroundColor: '#862772',
    width: 150,
    height: 50,
    alignSelf: 'center',
    borderRadius: 100 / 2,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBtnAdd: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
