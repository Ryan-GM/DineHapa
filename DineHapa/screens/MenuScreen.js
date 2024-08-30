import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';

const MenuScreen = () => {
  const route = useRoute();
  const { restaurantId, selectedCategory, allRestaurants } = route.params;

  // Debugging logs
  console.log('Received restaurantId:', restaurantId);
  console.log('Selected category:', selectedCategory);
  console.log('All restaurants:', allRestaurants);

  // Find the restaurant
  const restaurant = allRestaurants.find(r => r.id === restaurantId);

  // Debugging logs
  console.log('Found restaurant:', restaurant);

  // Check if restaurant and menu are defined
  if (!restaurant) {
    return <Text>Restaurant not found</Text>;
  }

  if (!restaurant.menu) {
    return <Text>Menu not available</Text>;
  }

  // Find the menu section
  const menuSection = restaurant.menu.find(section => section.category === selectedCategory);

  // Debugging logs
  console.log('Menu section:', menuSection);

  if (!menuSection) {
    return <Text>Category not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{selectedCategory}</Text>
      <FlatList
        data={menuSection.items}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.menuItemName}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>{item.price}</Text>
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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  menuItem: {
    marginBottom: 10,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MenuScreen;
