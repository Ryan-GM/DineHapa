import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, Modal, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const categories = ['All', 'Sandwich', 'Pizza', 'Burgers', 'Chinese', 'Mexican', 'Italian'];
const cuisines = ['All', 'American', 'Mexican', 'Italian', 'Chinese'];
const priceRanges = ['All', '$', '$$', '$$$', '$$$$'];

const RestaurantCard = ({ restaurant, navigation }) => (
  <TouchableOpacity 
    style={styles.card} 
    onPress={() => navigation.navigate('RestaurantDetailScreen', { restaurantId: restaurant._id })}
  >
    <Image source={{ uri: restaurant.logo || 'https://via.placeholder.com/50' }} style={styles.restaurantImage} />
    <View style={styles.cardContent}>
      <Text style={styles.restaurantName}>{restaurant.name}</Text>
      <Text>{restaurant.category} • {restaurant.cuisine} • {restaurant.price}</Text>
      <Text>{restaurant.rating} ⭐️ • {restaurant.distance} km • {restaurant.shipping}</Text>
    </View>
  </TouchableOpacity>
);

const DropdownPicker = ({ options, selectedValue, onValueChange, title }) => (
  <TouchableOpacity style={styles.dropdownButton} onPress={() => onValueChange(title)}>
    <Text>{title}: {selectedValue}</Text>
  </TouchableOpacity>
);

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', options: [], currentValue: '', onSelect: null });

  const navigation = useNavigation();

  const fetchRestaurants = async () => {
    try {
      const response = await fetch('http://192.168.100.2:5000/api/restaurants');
      const result = await response.json();
      console.log('Fetched result:', result); // Log the entire result object
      if (result.status === 'success' && Array.isArray(result.data.restaurants)) {
        setRestaurants(result.data.restaurants); // Set the restaurants state to the data array
      } else {
        Alert.alert('Error', 'Data format is incorrect.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  const filterRestaurants = () => {
    let filtered = restaurants;

    // Search query filter
    if (searchQuery) {
      filtered = filtered.filter(restaurant => 
        (restaurant.name && restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (restaurant.category && restaurant.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (restaurant.cuisine && restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(restaurant => restaurant.tags.includes(selectedCategory));
    }

    // Cuisine filter
    if (selectedCuisine !== 'All') {
      filtered = filtered.filter(restaurant => 
        restaurant.cuisine && restaurant.cuisine.toLowerCase() === selectedCuisine.toLowerCase()
      );
    }

    // Price range filter
    if (selectedPrice !== 'All') {
      filtered = filtered.filter(restaurant => restaurant.price === selectedPrice);
    }

    setFilteredRestaurants(filtered);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {
    filterRestaurants();
  }, [searchQuery, selectedCategory, selectedCuisine, selectedPrice, restaurants]);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const openModal = (title, options, currentValue, onSelect) => {
    setModalContent({ title, options, currentValue, onSelect });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* <Text style={styles.headerText}>DineHapa</Text> */}
        {/* <Text>Santa Nella, CA 95322</Text> */}
      </View>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for restaurants, cuisines..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <View style={styles.dropdownContainer}>
          <DropdownPicker
            options={cuisines}
            selectedValue={selectedCuisine}
            onValueChange={() => openModal('Cuisine', cuisines, selectedCuisine, setSelectedCuisine)}
            title="Cuisine"
          />
          <DropdownPicker
            options={priceRanges}
            selectedValue={selectedPrice}
            onValueChange={() => openModal('Price', priceRanges, selectedPrice, setSelectedPrice)}
            title="Price"
          />
        </View>
      </View>

      <ScrollView>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
          {categories.map((category, index) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.categoryItem, 
                selectedCategory === category && styles.selectedCategory
              ]}
              onPress={() => handleCategorySelect(category)}
            >
              <Text style={selectedCategory === category ? styles.selectedCategoryText : styles.categoryText}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Featured Restaurants</Text>
        <FlatList
          data={filteredRestaurants.slice(0, 3)} // Use filteredRestaurants here
          renderItem={({ item }) => <RestaurantCard restaurant={item} navigation={navigation} />}
          keyExtractor={(item) => item._id} // Updated to use _id
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <Text style={styles.sectionTitle}>Nearby Restaurants</Text>
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant._id} restaurant={restaurant} navigation={navigation} />
          ))
        ) : (
          <Text style={styles.noDataText}>No restaurants found</Text>
        )}

        <TouchableOpacity style={styles.ctaButton} onPress={() => navigation.navigate('CartScreen')}>
          <Text style={styles.ctaButtonText}>Explore More</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{modalContent.title}</Text>
          {modalContent.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.modalOption,
                modalContent.currentValue === option && styles.selectedModalOption
              ]}
              onPress={() => {
                modalContent.onSelect(option);
                closeModal();
              }}
            >
              <Text style={modalContent.currentValue === option ? styles.selectedModalOptionText : styles.modalOptionText}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchContainer: {
    padding: 15,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 40,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 15,
    marginBottom: 10,
    backgroundColor: '#f8f8f8',
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdownButton: {
    flex: 1,
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  restaurantImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    paddingLeft: 10,
  },
  categoryItem: {
    padding: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedCategory: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    color: '#555',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  noDataText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
  ctaButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
  },
  ctaButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalView: {
    marginTop: 'auto',
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  selectedModalOption: {
    backgroundColor: '#007AFF',
  },
  modalOptionText: {
    fontSize: 16,
  },
  selectedModalOptionText: {
    color: '#fff',
  },
  closeButton: {
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;
