// User Data 
[
    {
        "name": "Ryan Munge",
        "email": "ryanmunge12@gmail.com",
        "password": "securepassword123",
        "role": "user",
        "profileImage": "https://example.com/images/johndoe.jpg"
      }
      
]

// Menus Data 
[{
    "restaurant": "64b8f9a0c25e4b5d7a6a8fd4",
    "user": "64b8f5b4c25e4b5d7a6a8fbc",
    "items": [
      {
        "name": "Spicy Chicken Wings",
        "price": 8.99,
        "description": "Crispy wings coated in a spicy sauce.",
        "image": "https://example.com/images/spicy-chicken-wings.jpg",
        "available": true
      },
      {
        "name": "Vegetarian Pizza",
        "price": 12.50,
        "description": "A delicious pizza topped with fresh vegetables.",
        "image": "https://example.com/images/vegetarian-pizza.jpg",
        "available": true
      },
      {
        "name": "Chocolate Lava Cake",
        "price": 6.00,
        "description": "Warm chocolate cake with a molten center.",
        "image": "https://example.com/images/chocolate-lava-cake.jpg",
        "available": false
      }
    ],
    "orders": [
      "64b8fa22c25e4b5d7a6a8fd6",
      "64b8fa33c25e4b5d7a6a8fd7"
    ]
  }
]
// Restaurant Data
[
    {
        "name": "Gourmet Palace",
        "description": "A luxurious dining experience with a variety of gourmet dishes.",
        "address": "1234 Fine Dining Blvd",
        "city": "Gastron",
        "ownerId": "64b8f5b4c25e4b5d7a6a8fbc",
        "location": {
          "type": "Point",
          "coordinates": [-74.005974, 40.712776]
        },
        "menuItems": [
          "64b8f7e2c25e4b5d7a6a8fd0",
          "64b8f7f7c25e4b5d7a6a8fd1"
        ]
      }
      
]
// Order data
[
    {
        "userId": "64b8f5b4c25e4b5d7a6a8fbc",
        "restaurantId": "64b8f9a0c25e4b5d7a6a8fd4",
        "items": {
          "menuItemId": "64b8fc22c25e4b5d7a6a8fdb",
          "quantity": 2
        },
        "totalPrice": 17.98,
        "status": "pending",
        "paymentMethod": "card"
      }
      
]