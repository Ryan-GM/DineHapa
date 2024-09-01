import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, Modal, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

// Mock data
const allRestaurants = [
  {
    id: '1',
    name: 'Subway',
    rating: 4.5,
    distance: 0.2,
    shipping: 'Free shipping',
    category: 'Sandwich',
    price: '$$',
    cuisine: 'American',
    menu: [
      {
        category: 'Appetizers',
        items: [
          { id: '1-1-1', name: 'Mini Subs', description: 'Assorted mini sandwiches', price: '$4.99', addOns: ['Extra Meat', 'Cheese'] },
          { id: '1-1-2', name: 'Subs', description: 'Assorted sandwiches', price: '$4.99', addOns: ['Extra Meat', 'Cheese'] },
          { id: '1-1-3', name: 'Subs', description: 'Assorted sandwiches', price: '$4.99', addOns: ['Extra Meat', 'Cheese'] }
        ]
      },
      {
        category: 'Main Courses',
        items: [
          { id: '1-2-1', name: 'Turkey Sandwich', description: 'Turkey sandwich with lettuce and tomato', price: '$5.99', addOns: ['Extra Meat', 'Cheese'] },
          { id: '1-2-2', name: 'BLT', description: 'Bacon, lettuce, and tomato', price: '$5.99', addOns: ['Extra Meat', 'Cheese'] },
          { id: '1-2-3', name: 'BLT', description: 'Bacon, lettuce, and tomato', price: '$5.99', addOns: ['Extra Meat', 'Cheese'] }
        ]
      },
      {
        category: 'Desserts',
        items: [
          { id: '1-3-1', name: 'Cookie Platter', description: 'Assorted fresh cookies', price: '$3.99', addOns: ['Extra Chocolate', 'Nuts'] },
          { id: '1-3-2', name: 'Cookie Platter', description: 'Assorted fresh cookies', price: '$3.99', addOns: ['Extra Chocolate', 'Nuts'] },

        ]
      },
      {
        category: 'Drinks',
        items: [
          { id: '1-4', name: 'Fountain Drink', description: 'Unlimited refills', price: '$1.99', addOns: ['Lemon', 'Ice'] },

        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Taco Bell',
    rating: 4.5,
    distance: 1.5,
    shipping: 'Free shipping',
    category: 'Fast',
    price: '$',
    cuisine: 'Mexican',
    menu: [
      {
        category: 'Appetizers',
        items: [
          { id: '2-1-1', name: 'Chips and Salsa', description: 'Tortilla chips with salsa', price: '$3.49', addOns: ['Extra Salsa', 'Guacamole'] },
          { id: '2-1-2', name: 'Chips and Salsa', description: 'Tortilla chips with salsa', price: '$3.49', addOns: ['Extra Salsa', 'Guacamole'] },
        ]
      },
      {
        category: 'Main Courses',
        items: [
          { id: '2-2-1', name: 'Taco', description: 'Ground beef taco with lettuce and cheese', price: '$1.99', addOns: ['Extra Meat', 'Cheese'] },
          { id: '2-2-2', name: 'Taco', description: 'Ground beef taco with lettuce and cheese', price: '$1.99', addOns: ['Extra Meat', 'Cheese'] },
        ]
      },
      {
        category: 'Desserts',
        items: [
          { id: '2-3', name: 'Cinnamon Twists', description: 'Cinnamon and sugar twists', price: '$2.49', addOns: ['Extra Sugar'] }
        ]
      },
      {
        category: 'Drinks',
        items: [
          { id: '2-4', name: 'Soft Drink', description: 'Choice of soda', price: '$1.49', addOns: ['Ice', 'Lemon'] }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Burger King',
    rating: 4.8,
    distance: 2.6,
    shipping: 'Free shipping',
    category: 'Burger',
    price: '$',
    cuisine: 'American',
    menu: [
      {
        category: 'Appetizers',
        items: [
          { id: '3-1', name: 'Onion Rings', description: 'Crispy onion rings', price: '$3.99', addOns: ['Extra Sauce'] }
        ]
      },
      {
        category: 'Main Courses',
        items: [
          { id: '3-2', name: 'Whopper', description: 'Flame-grilled beef patty with lettuce, tomato, and pickles', price: '$6.49', addOns: ['Extra Cheese', 'Bacon'] }
        ]
      },
      {
        category: 'Desserts',
        items: [
          { id: '3-3', name: 'Apple Pie', description: 'Warm apple pie with a flaky crust', price: '$1.99', addOns: [] }
        ]
      },
      {
        category: 'Drinks',
        items: [
          { id: '3-4', name: 'Soft Drink', description: 'Choice of soda', price: '$1.49', addOns: ['Ice', 'Lemon'] }
        ]
      }
    ]
  },
  {
    id: '4',
    name: 'KFC',
    rating: 4.0,
    distance: 3.0,
    shipping: 'Free shipping',
    category: 'Fastfood',
    price: '$$',
    cuisine: 'American',
    menu: [
      {
        category: 'Appetizers',
        items: [
          { id: '4-1', name: 'Chicken Tenders', description: 'Crispy chicken tenders with dipping sauce', price: '$4.99', addOns: ['Extra Sauce'] }
        ]
      },
      {
        category: 'Main Courses',
        items: [
          { id: '4-2', name: 'Fried Chicken', description: 'Classic fried chicken with a crispy coating', price: '$7.99', addOns: ['Extra Biscuits', 'Mashed Potatoes'] }
        ]
      },
      {
        category: 'Desserts',
        items: [
          { id: '4-3', name: 'Chocolate Cake', description: 'Rich chocolate cake', price: '$2.99', addOns: ['Ice Cream'] }
        ]
      },
      {
        category: 'Drinks',
        items: [
          { id: '4-4', name: 'Soft Drink', description: 'Choice of soda', price: '$1.49', addOns: ['Ice', 'Lemon'] }
        ]
      }
    ]
  },
  {
    id: '5',
    name: 'Pizza Hut',
    rating: 4.2,
    distance: 1.8,
    shipping: '$2 delivery',
    category: 'Pizza',
    price: '$$',
    cuisine: 'Italian',
    menu: [
      {
        category: 'Appetizers',
        items: [
          { id: '5-1', name: 'Breadsticks', description: 'Garlic breadsticks with marinara sauce', price: '$4.49', addOns: ['Extra Cheese'] }
        ]
      },
      {
        category: 'Main Courses',
        items: [
          { id: '5-2', name: 'Pepperoni Pizza', description: 'Classic pepperoni pizza with mozzarella cheese', price: '$9.99', addOns: ['Extra Toppings'] }
        ]
      },
      {
        category: 'Desserts',
        items: [
          { id: '5-3', name: 'Cinnamon Rolls', description: 'Cinnamon rolls with icing', price: '$3.99', addOns: ['Extra Icing'] }
        ]
      },
      {
        category: 'Drinks',
        items: [
          { id: '5-4', name: 'Soft Drink', description: 'Choice of soda', price: '$1.49', addOns: ['Ice', 'Lemon'] }
        ]
      }
    ]
  },
  {
    id: '6',
    name: 'Panda Express',
    rating: 4.1,
    distance: 2.2,
    shipping: 'Free shipping',
    category: 'Chinese',
    price: '$$',
    cuisine: 'Chinese',
    menu: [
      {
        category: 'Appetizers',
        items: [
          { id: '6-1', name: 'Egg Rolls', description: 'Crispy egg rolls with dipping sauce', price: '$3.99', addOns: ['Extra Sauce'] }
        ]
      },
      {
        category: 'Main Courses',
        items: [
          { id: '6-2', name: 'Orange Chicken', description: 'Sweet and tangy orange chicken', price: '$6.49', addOns: ['Extra Rice', 'Extra Chicken'] }
        ]
      },
      {
        category: 'Desserts',
        items: [
          { id: '6-3', name: 'Fortune Cookies', description: 'Crispy fortune cookies', price: '$1.49', addOns: [] }
        ]
      },
      {
        category: 'Drinks',
        items: [
          { id: '6-4', name: 'Soft Drink', description: 'Choice of soda', price: '$1.49', addOns: ['Ice', 'Lemon'] }
        ]
      }
    ]
  }
]
;

const categories = ['All', 'Sandwich', 'Pizza', 'Burgers', 'Chinese', 'Mexican', 'Italian'];
const cuisines = ['All', 'American', 'Mexican', 'Italian', 'Chinese'];
const priceRanges = ['All', '$', '$$', '$$$', '$$$$'];

const RestaurantCard = ({ restaurant, navigation }) => (
  <TouchableOpacity 
    style={styles.card} 
    onPress={() => navigation.navigate('RestaurantDetailScreen', { restaurantId: restaurant.id, allRestaurants })}
  >
    <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.restaurantImage} />
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
  const [restaurants, setRestaurants] = useState(allRestaurants);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', options: [], currentValue: '', onSelect: null });

  const navigation = useNavigation(); // Access the navigation prop

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
          renderItem={({ item }) => <RestaurantCard restaurant={item} navigation={navigation} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <Text style={styles.sectionTitle}>Nearby Restaurants</Text>
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} navigation={navigation} />
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
    backgroundColor: '#f8f8f8',
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdownButton: {
    flex: 1,
    marginRight: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  categoryContainer: {
    padding: 15,
    backgroundColor: '#fff',
  },
  categoryItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#f8f8f8',
  },
  selectedCategory: {
    backgroundColor: '#ff6347',
  },
  categoryText: {
    fontSize: 16,
  },
  selectedCategoryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 15,
    backgroundColor: '#fff',
  },
  card: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  restaurantImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  cardContent: {
    justifyContent: 'center',
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ctaButton: {
    margin: 15,
    paddingVertical: 15,
    backgroundColor: '#ff6347',
    borderRadius: 25,
    alignItems: 'center',
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalOption: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  selectedModalOption: {
    backgroundColor: '#ff6347',
  },
  modalOptionText: {
    fontSize: 16,
  },
  selectedModalOptionText: {
    color: '#fff',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ff6347',
    borderRadius: 20,
  },
  closeButtonText: {
    color: '#fff',
  },
});

export default HomeScreen;
