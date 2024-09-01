import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity ,Alert} from 'react-native';

const AccountInfo = () => {
    const [fullName, setFullName] = useState('John Doe');
    const [email, setEmail] = useState('john.doe@example.com');
    const [phoneNumber, setPhoneNumber] = useState('(123) 456-7890');
  
    const handleSaveSettings = () => {
      if (!fullName || !email || !phoneNumber) {
        Alert.alert("Error", "Please fill out all fields.");
        return;
      }

      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
        Alert.alert("Error", "Please enter a valid email address.");
        return;
      }

      Alert.alert("Success", "Your account information has been updated.");
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Account Information</Text>
  
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
        />
  
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
  
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
  
        <TouchableOpacity style={styles.button} onPress={handleSaveSettings}>
          <Text style={styles.buttonText}>Change settings</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
    marginTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    color: '#555',
  },
  button: {
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AccountInfo;
