import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';


const restaurantDetails = {
  id: '1',
  name: 'Subway',
  logo: 'https://via.placeholder.com/100',
  rating: 4.5,
  address: '123 Main St, City, Country',
  phone: '(123) 456-7890',
  hours: 'Mon-Fri: 9 AM - 10 PM, Sat-Sun: 10 AM - 11 PM',
  cuisine: 'American',
  tags: ['Family-Friendly', 'Vegan Options'],
  menuCategories: [
    { id: '1', name: 'Appetizers' },
    { id: '2', name: 'Main Courses' },
    { id: '3', name: 'Desserts' },
    { id: '4', name: 'Drinks' },
  ],
  dishes: [
    { id: '1', name: 'Classic Sandwich', description: 'A tasty classic.', price: '$5.99', image: 'https://via.placeholder.com/100', addOns: 'Cheese, Extra Meat' },
    { id: '2', name: 'Veggie Delight', description: 'Fresh and healthy.', price: '$4.99', image: 'https://via.placeholder.com/100', addOns: 'Avocado, Extra Veggies' },
  ],
  reviews: [
    { id: '1', user: 'John Doe', rating: 5, avatar: 'https://via.placeholder.com/50', comment: 'Great food!' },
    { id: '2', user: 'Jane Smith', rating: 4, avatar: 'https://via.placeholder.com/50', comment: 'Good service.' },
  ],
};

const RestaurantDetailScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Restaurant Info */}
        <View style={styles.restaurantInfo}>
          <Image source={{ uri: restaurantDetails.logo }} style={styles.restaurantLogo} />
          <View style={styles.restaurantDetails}>
            <Text style={styles.restaurantName}>{restaurantDetails.name}</Text>
            <Text style={styles.restaurantRating}>{restaurantDetails.rating} ⭐️</Text>
            <Text style={styles.restaurantAddress}>{restaurantDetails.address}</Text>
            <Text style={styles.restaurantPhone}>{restaurantDetails.phone}</Text>
            <Text style={styles.restaurantHours}>{restaurantDetails.hours}</Text>
            <Text style={styles.restaurantCuisine}>{restaurantDetails.cuisine}</Text>
            <View style={styles.tagsContainer}>
              {restaurantDetails.tags.map((tag, index) => (
                <Text key={index} style={styles.tag}>
                  {tag}
                </Text>
              ))}
            </View>
          </View>
        </View>

        {/* Menu Categories */}
        <Text style={styles.sectionTitle}>Menu Categories</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={restaurantDetails.menuCategories}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.categoryItem}>
              <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.categoryContainer}
        />

        {/* Dish Details */}
        <Text style={styles.sectionTitle}>Dishes</Text>
        {restaurantDetails.dishes.map((dish) => (
          <View key={dish.id} style={styles.dishCard}>
            <Image source={{ uri: dish.image }} style={styles.dishImage} />
            <View style={styles.dishContent}>
              <Text style={styles.dishName}>{dish.name}</Text>
              <Text>{dish.description}</Text>
              <Text style={styles.dishPrice}>{dish.price}</Text>
              <Text style={styles.dishAddOns}>{dish.addOns}</Text>
            </View>
          </View>
        ))}

        {/* Customer Reviews */}
        <Text style={styles.sectionTitle}>Customer Reviews</Text>
        {restaurantDetails.reviews.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <Image source={{ uri: review.avatar }} style={styles.reviewAvatar} />
            <View style={styles.reviewContent}>
              <Text style={styles.reviewUser}>{review.user}</Text>
              <Text>{review.rating} ⭐️</Text>
              <Text>{review.comment}</Text>
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
