import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

const TambahDusun = () => {
  const navigation = useNavigation();
  const [input, setInput] = useState();
  const pindahYuuk = () => {
    tambah();
    navigation.goBack('');
  };
  const tambah = () => {
    AsyncStorage.getItem('token')
      .then(value => {
        return fetch('https://dev-disambi.sandboxindonesia.id/api/dusun/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
          body: JSON.stringify({
            name: input,
          }),
        })
          .then(response => response.json())
          .catch(error => {
            console.error(error);
          });
      })
      .catch(err => console.error(err));
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: 'black', fontSize: 21}}>Tambah Dusun</Text>
      <View
        style={{
          borderWidth: 1,
          backgroundColor: 'white',
          width: 270,
          elevation: 3,
          marginTop: 20,
        }}>
        <TextInput
          value={input}
          onChangeText={text => setInput(text)}
          placeholder="Masukan Dusun yang inginkan"
          style={{marginLeft: 10}}
        />
      </View>
      <TouchableOpacity
        style={{
          width: 180,
          height: 45,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#007cd1',
          marginTop: 20,
          borderRadius: 10,
        }}
        activeOpacity={0.7}
        onPress={() => pindahYuuk()}>
        <Text style={{color: 'white', fontSize: 18}}>Kirim</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TambahDusun;
