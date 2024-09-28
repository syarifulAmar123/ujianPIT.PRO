import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const Home = () => {
  const navigation = useNavigation();
  const [dusun, setDusun] = useState([]);

  const pindahHalaman = () => {
    navigation.navigate('Dusun');
  };
  const getDusun = () => {
    AsyncStorage.getItem('rumah')
      .then(value => {
        console.log('token', value);
        return fetch('https://dev-disambi.sandboxindonesia.id/api/dusun/', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        })
          .then(response => response.json())
          .then(json => {
            if (json?.data) {
              setDusun(json?.data);
            }
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getDusun();
  });
  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'red',
          padding: 10,
          margin: 10,
          borderWidth: 1,
          elevation: 2,
        }}>
        <Text
          style={{
            marginLeft: 20,
            color: 'black',
            fontSize: 16,
            fontFamily: 'Roboto-Regular',
          }}>
          {item.name}
        </Text>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          width: '100%',
          height: 40,
          backgroundColor: '#2b518b',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          marginBottom: 20,
        }}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'#2b518b'} />
        <Text
          style={{
            color: '#e04a3f',
            fontWeight: '600',
            fontSize: 30,
            marginTop: -10,
          }}>
          Dusun
        </Text>
      </View>
      <FlatList
        data={dusun}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          marginLeft: 320,
          backgroundColor: 'white',
          width: 50,
          borderRadius: 12,
          marginTop: 710,
          elevation: 2,
        }}
        onPress={() => pindahHalaman()}>
        <Text style={{fontSize: 40, color: 'black'}}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
