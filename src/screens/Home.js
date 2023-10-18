import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Background} from '../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';

export default function Home({navigation}) {
  const dummyData = {
    status: 'success',
    data: {
      todos: [
        {
          _id: '64ebf54a9402862420577c5c',
          title: 'Kencan sama Ei 11',
          desc: 'Jangan lupa pake pengaman',
          checked: false,
        },
        {
          _id: '64ebf5459402862420577c59',
          title: 'Kencan sama Ei 10',
          desc: 'Jangan lupa pake pengaman',
          checked: false,
        },
        {
          _id: '64ebf5419402862420577c56',
          title: 'Kencan sama Ei 9',
          desc: 'Jangan lupa pake pengaman',
          checked: false,
        },
        {
          _id: '64ebf53a9402862420577c53',
          title: 'Kencan sama Ei 8',
          desc: 'Jangan lupa pake pengaman',
          checked: false,
        },
        {
          _id: '64ebf5369402862420577c50',
          title: 'Kencan sama Ei 7',
          desc: 'Jangan lupa pake pengaman',
          checked: false,
        },
        {
          _id: '64ebf5339402862420577c4d',
          title: 'Kencan sama Ei 6',
          desc: 'Jangan lupa pake pengaman',
          checked: false,
        },
        {
          _id: '64ebf52f9402862420577c4a',
          title: 'Kencan sama Ei 5',
          desc: 'Jangan lupa pake pengaman',
          checked: false,
        },
        {
          _id: '64ebf52b9402862420577c47',
          title: 'Kencan sama Ei 4',
          desc: 'Jangan lupa pake pengaman',
          checked: false,
        },
        {
          _id: '64ebf5279402862420577c44',
          title: 'Kencan sama Ei 3',
          desc: 'Jangan lupa pake pengaman',
          checked: false,
        },
        {
          _id: '64ebf5229402862420577c41',
          title: 'Kencan sama Ei 2',
          desc: 'Jangan lupa pake pengaman',
          checked: false,
        },
      ],
      page: 2,
      total: 11,
    },
  };

  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.header}>
        <Icon
          name={'logout'}
          color={'white'}
          size={40}
          style={{transform: [{rotate: '180deg'}]}}
          onPress={() => navigation.replace('Login')}
        />

        <View style={{marginLeft: 10, flex: 1}}>
          <Text style={styles.txtUsername}>Username</Text>
          <Text style={{color: 'grey'}}>user@email.com</Text>
        </View>

        <Icon name={'account-circle'} size={50} color={'white'} />
      </View>

      <ScrollView>
        {dummyData.data.todos.map((item, index) => {
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
                    <Icon name={'pencil'} size={20} color={'white'} />
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
      </ScrollView>
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
});
