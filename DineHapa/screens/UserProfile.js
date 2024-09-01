import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';


const UserProfileScreen = ({ navigation }) => {
  const userProfile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(123) 456-7890',
    address: '123 Main St, City, State, ZIP',
    paymentMethods: ['Credit Card', 'Mpesa'],
    orderHistory: [
      { orderId: '123456', date: 'August 25, 2024', total: '$22', status: 'Delivered' },
      { orderId: '123457', date: 'August 22, 2024', total: '$18', status: 'Delivered' },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image 
          style={styles.profileImage} 
          source={{ uri: 'https://via.placeholder.com/100' }} 
        />
        <Text style={styles.profileName}>{userProfile.name}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General</Text>

        <TouchableOpacity style={styles.settingItem} onPress={()=>navigation.navigate('AccountInfo')}>
          <Text style={styles.settingText}>Account information</Text>
          <Text style={styles.settingDescription}>{userProfile.email}</Text>
          <Text style={styles.settingDescription}>{userProfile.phone}</Text>
          <Text style={styles.settingDescription}>{userProfile.address}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={()=>navigation.navigate('ChangePassword')}>
          <Text style={styles.settingText}>Password</Text>
          <Text style={styles.settingDescription}>Change your Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Payment Methods</Text>
          {userProfile.paymentMethods.map((method, index) => (
            <Text key={index} style={styles.settingDescription}>{method}</Text>
          ))}
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Order History</Text>
          {userProfile.orderHistory.map((order, index) => (
            <View key={index} style={styles.orderRow}>
              <Text>Order #{order.orderId}</Text>
              <Text>{order.date}</Text>
              <Text>Total: {order.total}</Text>
              <Text>Status: {order.status}</Text>
              <TouchableOpacity style={styles.reorderButton}>
                <Text style={styles.reorderButtonText}>Re-order</Text>
              </TouchableOpacity>
            </View>
          ))}
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Notifications Settings</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  profileHeader: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  settingItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  settingDescription: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  orderRow: {
    marginTop: 10,
  },
  reorderButton: {
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  reorderButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default UserProfileScreen;
