import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, FlatList, View, Image, TouchableOpacity, StyleSheet } from 'react-native';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'Prime Beef - Pizza Beautiful', quantity: 2, price: 20.99, image: 'https://example.com/pizza.jpg' },
    { id: '2', name: 'Double BBQ bacon cheese burger', quantity: 2, price: 15.99, image: 'https://example.com/burger.jpg' },
  ]);
  const [promoCode, setPromoCode] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('pickup');
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    calculateTotals();
  }, [cartItems, deliveryOption]);

  const calculateTotals = () => {
    const newSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setSubtotal(newSubtotal);
    const deliveryFee = deliveryOption === 'delivery' ? 5 : 0;
    setTotal(newSubtotal + deliveryFee);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity >= 0) {
      const updatedItems = cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedItems);
    }
  };

  const CartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text>Price: ${item.price.toFixed(2)}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.quantityButton} onPress={() => updateQuantity(item.id, item.quantity - 1)}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity style={styles.quantityButton} onPress={() => updateQuantity(item.id, item.quantity + 1)}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={<Text>Your Cart</Text>}
      />
      <Text>Subtotal: ${subtotal.toFixed(2)}</Text>
      <Text>Total: ${total.toFixed(2)}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityButton: {
    backgroundColor: '#e0e0e0',
    padding: 5,
    borderRadius: 5,
    width: 30,
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
});

export default CartScreen;
