import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// CartItem Component: Represents a single item in the cart
// Props: 
// - item: The cart item data (name, price, quantity, image)
// - onUpdateQuantity: Function to update the item quantity
const CartItem = ({ item, onUpdateQuantity }) => {
  return (
    <View style={styles.cartItem}>
      {/* Product Image */}
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.itemDetails}>
        {/* Product Name */}
        <Text style={styles.itemName}>{item.name}</Text>
        {/* Product Price */}
        <Text>Price: ${item.price.toFixed(2)}</Text>
        {/* Quantity Control */}
        <View style={styles.quantityContainer}>
          {/* Decrease Quantity Button */}
          <TouchableOpacity onPress={() => onUpdateQuantity(item.id, item.quantity - 1)} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          {/* Display Quantity */}
          <Text style={styles.quantityText}>{item.quantity}</Text>
          {/* Increase Quantity Button */}
          <TouchableOpacity onPress={() => onUpdateQuantity(item.id, item.quantity + 1)} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// CartScreen Component: Displays the user's shopping cart with items, promo code input, and checkout option
const CartScreen = () => {
  // State: Array of cart items
  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'Prime Beef - Pizza Beautiful', quantity: 2, price: 20.99, image: 'https://example.com/pizza.jpg' },
    { id: '2', name: 'Double BBQ bacon cheese burger', quantity: 2, price: 15.99, image: 'https://example.com/burger.jpg' },
  ]);
  
  // State: Promo code entered by the user
  const [promoCode, setPromoCode] = useState('');
  
  // State: Delivery option selected by the user ('pickup' or 'delivery')
  const [deliveryOption, setDeliveryOption] = useState('pickup');
  
  // State: Calculated subtotal of the cart
  const [subtotal, setSubtotal] = useState(0);
  
  // State: Calculated total including any delivery fees
  const [total, setTotal] = useState(0);

  // useEffect Hook: Recalculate totals whenever cart items or delivery option changes
  useEffect(() => {
    calculateTotals();
  }, [cartItems, deliveryOption]);

  // Function: Calculate the subtotal and total, including delivery fees if applicable
  const calculateTotals = () => {
    const newSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setSubtotal(newSubtotal);
    const deliveryFee = deliveryOption === 'delivery' ? 5 : 0;
    setTotal(newSubtotal + deliveryFee);
  };

  // Function: Update the quantity of a specific item in the cart
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity >= 0) {
      const updatedItems = cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedItems);
    }
  };

  // Function: Toggle between 'pickup' and 'delivery' options
  const toggleDeliveryOption = (option) => {
    setDeliveryOption(option);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Display the list of cart items */}
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartItem item={item} onUpdateQuantity={updateQuantity} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={<Text style={styles.title}>Your Cart</Text>}
        ListFooterComponent={
          <View>
            {/* Display the subtotal */}
            <Text style={styles.subtotal}>Subtotal: ${subtotal.toFixed(2)}</Text>
            {/* Delivery Options */}
            <View style={styles.deliveryOptions}>
              <Text>Delivery Options:</Text>
              {/* Delivery Option Button */}
              <TouchableOpacity
                style={[styles.option, deliveryOption === 'delivery' && styles.selectedOption]}
                onPress={() => toggleDeliveryOption('delivery')}
              >
                <Text>Delivery (+$5.00)</Text>
              </TouchableOpacity>
              {/* Pickup Option Button */}
              <TouchableOpacity
                style={[styles.option, deliveryOption === 'pickup' && styles.selectedOption]}
                onPress={() => toggleDeliveryOption('pickup')}
              >
                <Text>Pickup (Free)</Text>
              </TouchableOpacity>
            </View>
            {/* Promo Code Input and Apply Button */}
            <View style={styles.promoContainer}>
              <TextInput
                style={styles.promoInput}
                placeholder="Enter promo code"
                value={promoCode}
                onChangeText={setPromoCode}
              />
              <TouchableOpacity style={styles.applyButton}>
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
            {/* Display the total price */}
            <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
            {/* Checkout Button */}
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
  },
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
  subtotal: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
  },
  deliveryOptions: {
    margin: 10,
  },
  option: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 5,
  },
  selectedOption: {
    backgroundColor: '#e0e0e0',
  },
  promoContainer: {
    flexDirection: 'row',
    margin: 10,
  },
  promoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  applyButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  checkoutButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;
