import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const OrderConfirmation = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Order Confirmation</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Delivery Details */}
        <View style={styles.deliverySection}>
          <View style={styles.deliveryRow}>
            <Image
              source={{ uri: 'https://img.icons8.com/color/48/000000/place-marker.png' }}
              style={styles.icon}
            />
            <View>
              <Text style={styles.text}>(323) 238-0678</Text>
              <Text style={styles.text}>909-1/2 E 46th St</Text>
              <Text style={styles.text}>Los Angeles, CA 90011</Text>
              <Text style={styles.text}>1.5 km</Text>
            </View>
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.orderSummarySection}>
          <Text style={styles.restaurantName}>Burger King</Text>
          <View style={styles.itemRow}>
            <Image
              source={{ uri: 'https://link-to-prime-beef-image.png' }}
              style={styles.itemImage}
            />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>Prime Beef - Pizza Beautiful</Text>
              <Text style={styles.itemPrice}>$20.99</Text>
            </View>
            <Text style={styles.quantity}>2</Text>
          </View>
          <View style={styles.itemRow}>
            <Image
              source={{ uri: 'https://link-to-double-bbq-image.png' }}
              style={styles.itemImage}
            />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>Double BBQ Bacon Cheeseburger</Text>
              <Text style={styles.itemPrice}>$15.99</Text>
            </View>
            <Text style={styles.quantity}>1</Text>
          </View>
          <View style={styles.subtotalRow}>
            <Text style={styles.subtotalText}>Subtotal (2 items)</Text>
            <Text style={styles.subtotalText}>$36.98</Text>
          </View>
          <View style={styles.subtotalRow}>
            <Text style={styles.subtotalText}>Delivery</Text>
            <Text style={styles.subtotalText}>$0.00</Text>
          </View>
          <View style={styles.subtotalRow}>
            <Text style={styles.subtotalText}>Voucher</Text>
            <Text style={styles.subtotalText}>$0.00</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalText}>$36.98</Text>
          </View>
        </View>

        {/* Add Voucher Section */}
        <View style={styles.voucherSection}>
          <Text style={styles.voucherText}>Add Voucher</Text>
          <TouchableOpacity>
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Payment confirmation */}
      <View style={styles.confirmationBox}>
        <FontAwesome name="check-circle" size={40} color="green" />
        <Text style={styles.confirmationText}>
          You ordered successfully!
        </Text>
        <Text style={styles.text}>
          Your order is confirmed and will be delivered soon.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  headerTitle: {
    marginLeft: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  content: {
    padding: 15,
  },
  deliverySection: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  orderSummarySection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  itemPrice: {
    fontSize: 14,
    color: '#999',
  },
  quantity: {
    fontSize: 14,
    color: '#333',
  },
  subtotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  subtotalText: {
    fontSize: 14,
    color: '#333',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  voucherSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  voucherText: {
    fontSize: 14,
    color: '#333',
  },
  addText: {
    fontSize: 14,
    color: '#ff7f50',
  },
  confirmationBox: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#e0ffe5',
    borderRadius: 10,
    margin: 15,
  },
  confirmationText: {
    fontSize: 18,
    color: 'green',
    marginTop: 10,
  },
});

export default OrderConfirmation;
