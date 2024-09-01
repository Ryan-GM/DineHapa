import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const MenuScreen = () => {
  const route = useRoute();
  const navigation = useNavigation(); // Access the navigation prop
  const { restaurantId, selectedCategory, allRestaurants } = route.params;

  const [cart, setCart] = useState([]);

  const restaurant = allRestaurants.find(r => r.id === restaurantId);
  const menuSection = restaurant?.menu?.find(section => section.category === selectedCategory);

  const handleAddToCart = (item) => {
    setCart([...cart, { ...item, quantity: 1 }]);
    Alert.alert('Added to Cart', `${item.name} has been added to your cart.`);
  };

  const navigateToCart = () => {
    navigation.navigate('CartScreen', { cartItems: cart }); // Pass the cart items to CartScreen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{selectedCategory}</Text>
      <FlatList
        data={menuSection?.items || []}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.menuItemName}>{item.name}</Text>
            <Text>{item.price}</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleAddToCart(item)}
            >
              <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity
        style={styles.cartButton}
        onPress={navigateToCart} // Navigate to CartScreen
      >
        <Text style={styles.cartButtonText}>Go to Cart ({cart.length} items)</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  menuItem: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    elevation: 2,
  },
  menuItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  menuItemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  menuItemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e91e63',
  },
  errorText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 18,
    color: '#e91e63',
  },
});

export default MenuScreen;