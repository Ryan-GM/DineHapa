import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity,Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
      const fetchStoredEmail = async () => {
        try {
          const storedEmail = await AsyncStorage.getItem('email');
          if (storedEmail) {
            setEmail(storedEmail);
          }
        } catch (error) {
          console.error('Failed to fetch stored email', error);
        }
      };

      fetchStoredEmail();
    }, []);
  
    const handleChangePassword = async () => {
      if (!currentPassword || !newPassword || !confirmPassword) {
        Alert.alert("Error", "Please fill out all fields.");
        return;
      }
  
      if (newPassword !== confirmPassword) {
        Alert.alert("Error", "New passwords do not match.");
        return;
      }
  
      
      if (newPassword.length < 6) {
        Alert.alert("Error", "Password should be at least 6 characters long.");
        return;
      }

      Alert.alert("Success", "Your password has been changed.");

      try{
        const response = await fetch('http://192.168.0.100:5000/api/users/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            currentPassword,
            newPassword,
          }),
      });
      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Password changed successfully');
      } else {
        Alert.alert('Error', data.message || 'Failed to change password');
      } 
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };
    
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Change Password</Text>
  
        <Text style={styles.label}>Current Password</Text>
        <TextInput
          style={styles.input}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry
        />
  
        <Text style={styles.label}>New Password</Text>
        <TextInput
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />
  
        <Text style={styles.label}>Confirm New Password</Text>
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
  
        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
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

export default ChangePassword;
