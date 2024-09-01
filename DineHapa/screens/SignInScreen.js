import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try{
        const storedUserName = await AsyncStorage.getItem('userName');
        if(storedUserName){
          setUserName(storedUserName);
        }
      } catch(error){
        console.error('Failed to fetch stored user data', error);
      }
    };
    fetchUserName();
  }, []);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please provide both email/username and password.');
      return;
    }

    try {
      const response = await fetch('http://192.168.100.2:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if(data.name !== null && data.name !== undefined){
          await AsyncStorage.setItem('username', data.name);
        } else{
          console.warn('Username is null or undefined, skipping storage');
        }
        
        Alert.alert('Success', 'Signed in successfully');
        navigation.navigate('LocationScreen');
      } else {
        const data = await response.json();
        Alert.alert('Error', data.message || 'Failed to sign in');
      }
    } catch (error) {
      console.error('Error logging in:', error);

      if (error.response && error.response.status === 401){
        Alert.alert('Error', 'Invalid email/username or password');
      } else if(error.response && error.response.status === 500){
        Alert.alert('Error', 'Server error. Please try again later.');
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      {userName ? <Text style={styles.userName}>Hello, {userName}, sign in to continue!</Text> : null}
      <Text style={styles.subTitle}>Sign in to continue!</Text>
      <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
        <Text style={styles.createAccount}>Or Create new account</Text>
      </TouchableOpacity>
      <TextInput
        placeholder="Username or Email"
        style={styles.input}
        value={email}
        onChangeText={setEmailOrUsername}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')} >
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <View style={styles.socialButtons}>
        <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#3b5998' }]}>
          <Text style={styles.socialButtonText}>Connect with Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#db4437' }]}>
          <Text style={styles.socialButtonText}>Connect with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    color: '#888',
    marginBottom: 20,
  },
  createAccount: {
    color: '#f5a623',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#f5a623',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  forgotPassword: {
    color: '#888',
    marginBottom: 20,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  socialButton: {
    width: '48%',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  socialButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default SignInScreen;
