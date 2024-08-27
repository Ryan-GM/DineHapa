import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const SignInScreen = ({ route, navigation }) => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Simulate fetching the user's name
    const fetchUserName = async () => {
      // Replace with your actual logic to get the user's name
      const name = await fetchUserNameFromStorage();
      setUserName(name);
    };

    fetchUserName();
  }, []);

  const fetchUserNameFromStorage = async () => {
    // Replace with your actual logic to retrieve user data (e.g., AsyncStorage or API)
    // Here, I'm hardcoding it for demonstration purposes
    return 'Jos'; // Assume this is the name retrieved
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subTitle}>Hello {userName}, sign in to continue!</Text>
      <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
        <Text style={styles.createAccount}>Or Create new account</Text>
      </TouchableOpacity>
      <TextInput
        placeholder="Username or Email"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity>
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
