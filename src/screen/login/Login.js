import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const [Password, setPassword] = useState('');
  const [ceklis, setCeklis] = useState(false);
  const [hidden, setHidden] = useState(false);

  const kirimDusun = () => {};

  const handlerHidden = () => {
    setHidden(!hidden);
  };
  const handlerCeklis = () => {
    setCeklis(!ceklis);
  };

  const login = () => {
    fetch('https://dev-disambi.sandboxindonesia.id/api/auth/login/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: value,
        password: Password,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json?.data) {
          AsyncStorage.setItem('Dusun', json.data.access_token);
          setTimeout(() => {
            Alert.alert('Anda berhasil login');
            setValue('');
            setPassword('');
            navigation.replace('Home');
          }, 2000);
        } else {
          setTimeout(() => {
            Alert.alert(json?.message);
            setValue('');
            setPassword('');
          }, 3000);
        }
      });
    setTimeout(() => {
      navigation.navigate('Home');
    }, 2000);
  };
  return (
    <View style={{flex: 1, backgroundColor: '#hsl(0, 0%, 46%)'}}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'#hsl(0, 0%, 46%)'}
      />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 200,
          elevation: 3,
        }}>
        <Image
          source={require('../../assets/Sisambi.png')}
          style={{height: 130, width: 130, marginBottom: 20, marginTop: -30}}
        />
        <Text style={{color: 'black', fontSize: 30}}>Disambi</Text>
      </View>
      <View style={{marginHorizontal: 40, marginTop: 30}}>
        <Text
          style={{
            color: 'black',
            fontWeight: '400',
            fontFamily: 'Roboto-Medium',
          }}>
          Username
        </Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'grey',
            elevation: 3,
            backgroundColor: 'white',
            justifyContent: 'center',
            borderRadius: 5,
          }}>
          <TextInput
            value={value}
            onChangeText={text => setValue(text)}
            placeholder="Masukan Username"
            style={{marginLeft: 20}}
          />
        </View>
      </View>
      <View style={{marginHorizontal: 40, marginTop: 10}}>
        <Text
          style={{
            color: 'black',
            fontWeight: '400',
            fontFamily: 'Roboto-Medium',
          }}>
          Password
        </Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'grey',
            elevation: 3,
            backgroundColor: 'white',
            justifyContent: 'center',
            borderRadius: 5,
          }}>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              value={Password}
              onChangeText={text => setPassword(text)}
              placeholder="Masukan Password"
              style={{marginLeft: 20}}
              secureTextEntry={hidden}
            />
            <TouchableOpacity
              style={{marginTop: 12, marginLeft: 280, position: 'absolute'}}
              onPress={() => handlerHidden()}>
              <Image
                source={
                  hidden
                    ? require('../../assets/eye.png')
                    : require('../../assets/hidden.png')
                }
                style={{width: 20, height: 20}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{
              width: 25,
              height: 25,
              borderRadius: 10,
              backgroundColor: 'white',
              elevation: 3,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}
            onPress={() => handlerCeklis()}>
            {ceklis ? (
              <Image
                source={require('../../assets/check.png')}
                style={{width: 20, height: 20}}
              />
            ) : (
              <View
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 10,
                  backgroundColor: 'white',
                }}></View>
            )}
          </TouchableOpacity>
          <Text
            style={{
              color: '#222',
              fontSize: 15,
              marginTop: 12,
              marginLeft: 10,
            }}>
            Ingatkan Saya
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          width: 280,
          height: 55,
          backgroundColor: '#007cd1',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 60,
          marginTop: 30,
          borderRadius: 10,
        }}
        onPress={login}>
        <Text style={{color: 'white', fontSize: 18, fontWeight: '400'}}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
