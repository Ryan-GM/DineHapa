import React, { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const AdminDashboard = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelection = (value) => {
    setSelectedOption(value);
  };

  const createUser = () => {
    console.log("Create User");
    // Implement user creation logic here
  };

  const editUser = () => {
    console.log("Edit User");
    // Implement user editing logic here
  };

  const deleteUser = () => {
    console.log("Delete User");
    // Implement user deletion logic here
  };

  const approveRestaurant = () => {
    console.log("Approve Restaurant");
    // Implement restaurant approval logic here
  };

  const rejectRestaurant = () => {
    console.log("Reject Restaurant");
    // Implement restaurant rejection logic here
  };

  const manageCategories = () => {
    console.log("Manage Categories");
    // Implement category management logic here
  };

  const trackOrder = () => {
    console.log("Track Order");
    // Implement order tracking logic here
  };

  const manageOrder = () => {
    console.log("Manage Order");
    // Implement order management logic here
  };

  const refundOrder = () => {
    console.log("Refund Order");
    // Implement order refund logic here
  };

  const sendPushNotification = () => {
    console.log("Send Push Notification");
    // Implement push notification logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Admin Dashboard</Text>
      <RNPickerSelect
        onValueChange={handleSelection}
        items={[
          { label: 'User Management', value: 'user_management' },
          { label: 'Restaurant Management', value: 'restaurant_management' },
          { label: 'Order Management', value: 'order_management' },
          { label: 'Push Notification Management', value: 'push_notification_management' },
        ]}
        style={pickerSelectStyles}
        placeholder={{ label: "Select an option", value: null }}
      />

      {selectedOption === 'user_management' && (
        <View>
          <Text style={styles.sectionTitle}>User Management</Text>
          <Button title="Create User" onPress={createUser} />
          <Button title="Edit User" onPress={editUser} />
          <Button title="Delete User" onPress={deleteUser} />
        </View>
      )}

      {selectedOption === 'restaurant_management' && (
        <View>
          <Text style={styles.sectionTitle}>Restaurant Management</Text>
          <Button title="Approve Restaurant" onPress={approveRestaurant} />
          <Button title="Reject Restaurant" onPress={rejectRestaurant} />
          <Button title="Manage Categories" onPress={manageCategories} />
        </View>
      )}

      {selectedOption === 'order_management' && (
        <View>
          <Text style={styles.sectionTitle}>Order Management</Text>
          <Button title="Track Order" onPress={trackOrder} />
          <Button title="Manage Order" onPress={manageOrder} />
          <Button title="Refund Order" onPress={refundOrder} />
        </View>
      )}

      {selectedOption === 'push_notification_management' && (
        <View>
          <Text style={styles.sectionTitle}>Push Notification Management</Text>
          <Button title="Send Push Notification" onPress={sendPushNotification} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
});

export default AdminDashboard;
