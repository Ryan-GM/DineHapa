import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

const MenuScreen = () => {
  const route = useRoute();
  const { restaurantId, selectedCategory, allRestaurants } = route.params;

  // Find the restaurant
  const restaurant = allRestaurants.find(r => r.id === restaurantId);

  if (!restaurant) {
    return <Text style={styles.errorText}>Restaurant not found</Text>;
  }

  // Check if menu exists and is not empty
  if (!restaurant.menu || restaurant.menu.length === 0) {
    return <Text style={styles.errorText}>Menu not available</Text>;
  }

  // Find the menu section
  const menuSection = restaurant.menu.find(section => section.category === selectedCategory);

  if (!menuSection) {
    return <Text style={styles.errorText}>Category not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{selectedCategory}</Text>
      <FlatList
        data={menuSection.items}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            {item.image && <Image source={{ uri: item.image }} style={styles.menuItemImage} />}
            <View style={styles.menuItemDetails}>
              <Text style={styles.menuItemName}>{item.name}</Text>
              <Text style={styles.menuItemDescription}>{item.description}</Text>
              <Text style={styles.menuItemPrice}>{item.price}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
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
