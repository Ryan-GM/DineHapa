import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';

const MenuScreen = () => {
  const route = useRoute();
  const { selectedCategory, restaurant, allRestaurants } = route.params;

  // Find the restaurant's menu items for the selected category
  const menuCategory = restaurant.menuItems.find(item => item.category === selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{selectedCategory}</Text>
      <FlatList
        data={menuCategory ? menuCategory.items : []}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
          </View>
        )}
        keyExtractor={(item) => item.name}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  menuItem: {
    marginBottom: 20,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 16,
    color: '#666',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default MenuScreen;