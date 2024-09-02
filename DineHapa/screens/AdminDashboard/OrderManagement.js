import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://192.168.100.42:5000/api/orders'); // Replace with your API endpoint
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleManageOrder = async (orderId, status) => {
    try {
      const response = await fetch(`http://192.168.100.42:5000/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        fetchOrders(); // Refresh the list after updating the order status
      } else {
        console.error('Failed to update order status');
      }
    } catch (error) {
      console.error('Error managing order:', error);
    }
  };

  const handleRefundOrder = async (orderId) => {
    try {
      const response = await fetch(`http://192.168.100.42:5000/api/orders/${orderId}/refund`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        fetchOrders(); // Refresh the list after refunding the order
      } else {
        console.error('Failed to refund order');
      }
    } catch (error) {
      console.error('Error refunding order:', error);
    }
  };

  const renderOrder = ({ item }) => (
    <View style={styles.orderContainer}>
      <Text style={styles.orderInfo}>Order ID: {item.id}</Text>
      <Text style={styles.orderInfo}>Customer: {item.customerName}</Text>
      <Text style={styles.orderInfo}>Total: ${item.total}</Text>
      <Text style={styles.orderInfo}>Status: {item.status}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.manageButton}
          onPress={() => handleManageOrder(item.id, 'completed')}
        >
          <Text style={styles.buttonText}>Mark as Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.refundButton}
          onPress={() => handleRefundOrder(item.id)}
        >
          <Text style={styles.buttonText}>Refund</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Management</Text>
      <FlatList
        data={orders}
        renderItem={renderOrder}
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
  orderContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  orderInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  manageButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  refundButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
});

export default OrderManagement;
