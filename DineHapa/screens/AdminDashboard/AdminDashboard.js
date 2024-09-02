import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import UserManagement from './UserManagement';
import RestaurantManagement from './RestaurantManagement'; 
import OrderManagement from './OrderManagement';
import PushNotificationManagement from './PushNotificationManagement';

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState('');

  const renderContent = () => {
    switch (selectedSection) {
      case 'userManagement':
        return <UserManagement />;
      case 'restaurantManagement':
        return <RestaurantManagement />;
      case 'orderManagement':
        return <OrderManagement />;
      case 'pushNotificationManagement':
        return <PushNotificationManagement />;
      default:
        return <Text style={styles.placeholderText}>Swipe down to select a functionality</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedSection}
          onValueChange={(itemValue) => setSelectedSection(itemValue)}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item label="Swipe down" value="" />
          <Picker.Item label="User Management" value="userManagement" />
          <Picker.Item label="Restaurant Management" value="restaurantManagement" />
          <Picker.Item label="Order Management" value="orderManagement" />
          <Picker.Item label="Push Notification Management" value="pushNotificationManagement" />
        </Picker>
      </View>
      <View style={styles.contentContainer}>
        {renderContent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pickerContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  picker: {
    height: 60,
    width: '100%',
    marginTop: 10,
  },
  pickerItem: {
    fontSize: 16,
    height: 44,
  },
  contentContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  placeholderText: {
    fontSize: 18,
    color: '#888',
    marginTop: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
});

export default AdminDashboard;
