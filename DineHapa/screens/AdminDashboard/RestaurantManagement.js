import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const RestaurantManagement = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchRestaurants();
    fetchCategories();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch('http://192.168.100.42:5000/api/restaurants');
      const data = await response.json();
      setRestaurants(data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://192.168.100.42:5000/api/restaurants/category');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  

  const handleApproval = async (restaurantId, status) => {
    try {
      const response = await fetch(`http://192.168.100.42:5000/api/restaurants/${restaurantId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        fetchRestaurants(); // Refresh the list after approval/rejection
      } else {
        console.error('Failed to update restaurant status');
      }
    } catch (error) {
      console.error('Error approving/rejecting restaurant:', error);
    }
  };

  const handleCategoryChange = async (restaurantId, categoryId) => {
    try {
      const response = await fetch(`http://192.168.100.42:5000/api/restaurants/${restaurantId}/category`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoryId }),
      });
      if (response.ok) {
        fetchRestaurants(); // Refresh the list after category change
      } else {
        console.error('Failed to update restaurant category');
      }
    } catch (error) {
      console.error('Error changing restaurant category:', error);
    }
  };

  const renderRestaurant = ({ item }) => (
    <View style={styles.restaurantContainer}>
      <Text style={styles.restaurantName}>{item.name}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.approveButton}
          onPress={() => handleApproval(item.id, 'approved')}
        >
          <Text style={styles.buttonText}>Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rejectButton}
          onPress={() => handleApproval(item.id, 'rejected')}
        >
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
        <View style={styles.categoryPicker}>
          <Picker
            selectedValue={item.categoryId}
            onValueChange={(value) => handleCategoryChange(item.id, value)}
          >
            {categories.map((category) => (
              <Picker.Item key={category.id} label={category.name} value={category.id} />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restaurant Management</Text>
      <FlatList
        data={restaurants}
        renderItem={renderRestaurant}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
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
  listContainer: {
    paddingBottom: 20,
  },
  restaurantContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  approveButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  rejectButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
  categoryPicker: {
    flex: 1,
    marginLeft: 10,
  },
});

export default RestaurantManagement;
