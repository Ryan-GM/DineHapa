import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, Modal,SafeAreaView } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data
const allRestaurants = [
  { id: '1', name: 'Subway', rating: 4.5, distance: 0.2, shipping: 'Free shipping', category: 'Sandwich', price: '$$', cuisine: 'American' },
  { id: '2', name: 'Taco Bell', rating: 4.5, distance: 1.5, shipping: 'Free shipping', category: 'Fast', price: '$', cuisine: 'Mexican' },
  { id: '3', name: 'Burger King', rating: 4.8, distance: 2.6, shipping: 'Free shipping', category: 'Burger', price: '$', cuisine: 'American' },
  { id: '4', name: 'KFC', rating: 4.0, distance: 3.0, shipping: 'Free shipping', category: 'Fastfood', price: '$$', cuisine: 'American' },
  { id: '5', name: 'Pizza Hut', rating: 4.2, distance: 1.8, shipping: '$2 delivery', category: 'Pizza', price: '$$', cuisine: 'Italian' },
  { id: '6', name: 'Panda Express', rating: 4.1, distance: 2.2, shipping: 'Free shipping', category: 'Chinese', price: '$$', cuisine: 'Chinese' },
];

const categories = ['All', 'Sandwich', 'Pizza', 'Burgers', 'Chinese', 'Mexican', 'Italian'];
const cuisines = ['All', 'American', 'Mexican', 'Italian', 'Chinese'];
const priceRanges = ['All', '$', '$$', '$$$', '$$$$'];

const RestaurantCard = ({ name, rating, distance, shipping, category, price, cuisine }) => (
  <TouchableOpacity style={styles.card}>
    <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.restaurantImage} />
    <View style={styles.cardContent}>
      <Text style={styles.restaurantName}>{name}</Text>
      <Text>{category} • {cuisine} • {price}</Text>
      <Text>{rating} ⭐️ • {distance} km • {shipping}</Text>
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
  const [restaurants, setRestaurants] = useState(allRestaurants);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', options: [], currentValue: '', onSelect: null });

  useEffect(() => {
    filterRestaurants();
  }, [searchQuery, selectedCategory, selectedCuisine, selectedPrice]);

  const filterRestaurants = () => {
    let filteredRestaurants = allRestaurants;

    if (searchQuery) {
      filteredRestaurants = filteredRestaurants.filter(restaurant => 
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filteredRestaurants = filteredRestaurants.filter(restaurant => restaurant.category === selectedCategory);
    }

    if (selectedCuisine !== 'All') {
      filteredRestaurants = filteredRestaurants.filter(restaurant => restaurant.cuisine === selectedCuisine);
    }

    if (selectedPrice !== 'All') {
      filteredRestaurants = filteredRestaurants.filter(restaurant => restaurant.price === selectedPrice);
    }

    setRestaurants(filteredRestaurants);
  };

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
          data={restaurants.slice(0, 3)}
          renderItem={({ item }) => <RestaurantCard {...item} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <Text style={styles.sectionTitle}>Nearby Restaurants</Text>
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} {...restaurant} />
        ))}

        <TouchableOpacity style={styles.ctaButton}>
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
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdownButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
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
  selectedCategory: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    color: '#000',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 10,
    padding: 15,
  },
  restaurantImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  restaurantName: {
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18
  },
  modalOption: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  selectedModalOption: {
    backgroundColor: '#007AFF',
  },
  modalOptionText: {
    color: '#000',
  },
  selectedModalOptionText: {
    color: '#fff',
  },
  closeButton: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});

export default HomeScreen;