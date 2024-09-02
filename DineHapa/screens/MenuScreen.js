import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useRoute,useNavigation } from '@react-navigation/native';

const MenuScreen = () => {
  const route = useRoute();
  const { selectedCategory, restaurant } = route.params;

  const navigation = useNavigation(); 

  // Find the restaurant's menu items for the selected category
  const menuCategory = restaurant.menuItems.find(item => item.category === selectedCategory);

  const handleAddToCart = (item) => {
    // Add to cart logic here
    console.log(`${item.name} added to cart.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{selectedCategory}</Text>
      {menuCategory ? (
        <FlatList
          data={menuCategory.items}
          renderItem={({ item }) => (
            <View style={styles.menuItem}>
              <Image source={{ uri: item.image || 'https://via.placeholder.com/100' }} style={styles.menuItemImage} />
              <View style={styles.menuItemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => handleAddToCart(item)}
                >
                  <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.name}
        />
      ) : (
        <Text style={styles.noItemsText}>No items available in this category.</Text>
      )}
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => navigation.navigate('CartScreen', { restaurant: restaurant })}
      >
        <Text style={styles.cartButtonText}>Go to Cart</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    elevation: 2,
  },
  menuItemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  menuItemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemDescription: {
    fontSize: 16,
    color: '#666',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e91e63',
    marginTop: 5,
  },
  addButton: {
    marginTop: 10,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
  },
  cartButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    margin: 15,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  cartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  noItemsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
});

export default MenuScreen;
