import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, FlatList, SafeAreaView, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Review from './ReviewScreen'; // Import the AddReviewForm component

const RestaurantDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const { restaurantId, allRestaurants = [] } = route.params; // Use an empty array as a fallback

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await fetch(`http://192.168.100.2:5000/api/restaurants/${restaurantId}`);
        const result = await response.json();
        if (result.status === 'success') {
          setRestaurant(result.data.restaurant);
        } else {
          throw new Error('Failed to fetch restaurant details');
        }
      } catch (error) {
        console.error('Error fetching restaurant:', error);
        setRestaurant(null); // or set an error state
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://192.168.100.2:5000/api/reviews/${restaurantId}`);
        const result = await response.json();
        if (result.status === 'success') {
          setReviews(result.data);
        } else {
          throw new Error('Failed to fetch reviews');
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchRestaurantDetails();
    fetchReviews();
  }, [restaurantId]);

  const handleCategorySelect = (category) => {
    navigation.navigate('MenuScreen', {
      selectedCategory: category,
      restaurant: restaurant, // Pass the full restaurant object
      allRestaurants: allRestaurants,
    });
  };

  const handleReviewSubmit = async () => {
    try {
      // Fetch the updated reviews after submitting a new review
      const response = await fetch(`http://192.168.100.2:5000/api/reviews/${restaurantId}`);
      const result = await response.json();
      if (result.status === 'success') {
        setReviews(result.data);
        setModalVisible(false); // Close the modal on successful submission
        // Optionally show a success message
      } else {
        throw new Error('Failed to fetch updated reviews');
      }
    } catch (error) {
      console.error('Error fetching updated reviews:', error);
    }
  };

  if (!restaurant) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
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
            <TouchableOpacity
              style={styles.categoryItem}
              onPress={() => handleCategorySelect(item)}
            >
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
        {reviews.length === 0 ? (
          <Text>No reviews yet. Be the first to review!</Text>
        ) : (
          reviews.map((review, index) => (
            <View key={index} style={styles.reviewCard}>
              <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.reviewAvatar} />
              <View style={styles.reviewContent}>
                <Text style={styles.reviewUser}>{review.user}</Text>
                <Text>{review.rating} ⭐️</Text>
                <Text>{review.comment}</Text>
              </View>
            </View>
          ))
        )}

        {/* Add Review Button */}
        <TouchableOpacity style={styles.addReviewButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addReviewButtonText}>Add Review</Text>
        </TouchableOpacity>

        {/* Modal for Add Review Form */}
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Review restaurantId={restaurantId} onReviewAdded={handleReviewSubmit} />
              <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalCloseButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

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
    color: '#007AFF',
    marginTop: 5,
  },
  reviewCard: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  reviewAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  reviewContent: {
    flex: 1,
  },
  reviewUser: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  addReviewButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    margin: 15,
    alignItems: 'center',
  },
  addReviewButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RestaurantDetailScreen;
