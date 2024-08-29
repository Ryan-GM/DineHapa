import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { allRestaurants } from './HomeScreen'; // Adjust the import path as needed

const RestaurantDetailScreen = ({ route }) => {
  const { restaurantId, allRestaurants } = route.params;
  const restaurant = allRestaurants.find(r => r.id === restaurantId);

  if (!restaurant) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Restaurant not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Restaurant Info */}
        <View style={styles.restaurantInfo}>
          <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.restaurantLogo} />
          <View style={styles.restaurantDetails}>
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
            <Text style={styles.restaurantRating}>{restaurant.rating} ⭐️</Text>
            <Text style={styles.restaurantAddress}>{restaurant.distance} km away</Text>
            <Text style={styles.restaurantPhone}>{restaurant.shipping}</Text>
            <Text style={styles.restaurantCuisine}>{restaurant.cuisine}</Text>
            <View style={styles.tagsContainer}>
              <Text style={styles.tag}>{restaurant.category}</Text>
              <Text style={styles.tag}>{restaurant.price}</Text>
            </View>
          </View>
        </View>

        {/* Menu Categories */}
        <Text style={styles.sectionTitle}>Menu Categories</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={['Appetizers', 'Main Courses', 'Desserts', 'Drinks']}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.categoryItem}>
              <Text style={styles.categoryText}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.categoryContainer}
        />

        {/* Dish Details */}
        <Text style={styles.sectionTitle}>Popular Dishes</Text>
        {['Dish 1', 'Dish 2'].map((dish, index) => (
          <View key={index} style={styles.dishCard}>
            <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.dishImage} />
            <View style={styles.dishContent}>
              <Text style={styles.dishName}>{dish}</Text>
              <Text>Description of {dish}</Text>
              <Text style={styles.dishPrice}>$9.99</Text>
              <Text style={styles.dishAddOns}>Add-ons available</Text>
            </View>
          </View>
        ))}

        {/* Customer Reviews */}
        <Text style={styles.sectionTitle}>Customer Reviews</Text>
        {['Review 1', 'Review 2'].map((review, index) => (
          <View key={index} style={styles.reviewCard}>
            <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.reviewAvatar} />
            <View style={styles.reviewContent}>
              <Text style={styles.reviewUser}>User {index + 1}</Text>
              <Text>4.5 ⭐️</Text>
              <Text>Great experience at {restaurant.name}!</Text>
            </View>
          </View>
        ))}

        {/* Order Now Button */}
        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>Order Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingTop: 20,
  },
  restaurantInfo: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  restaurantLogo: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  restaurantDetails: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  restaurantRating: {
    fontSize: 16,
    marginTop: 5,
  },
  restaurantAddress: {
    fontSize: 14,
    marginTop: 5,
  },
  restaurantPhone: {
    fontSize: 14,
    marginTop: 5,
  },
  restaurantHours: {
    fontSize: 14,
    marginTop: 5,
  },
  restaurantCuisine: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: 'bold',
  },
  tagsContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  tag: {
    backgroundColor: '#007AFF',
    color: '#fff',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 15,
  },
  categoryContainer: {
    paddingLeft: 15,
  },
  categoryItem: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  categoryText: {
    color: '#000',
  },
  dishCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 10,
    padding: 15,
  },
  dishImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  dishContent: {
    flex: 1,
  },
  dishName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  dishPrice: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
  },
  dishAddOns: {
    fontSize: 14,
    marginTop: 5,
  },
  reviewCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 10,
    padding: 15,
  },
  reviewAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  reviewContent: {
    flex: 1,
  },
  reviewUser: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  ctaButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    margin: 15,
    alignItems: 'center',
  },
  ctaButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default RestaurantDetailScreen;
