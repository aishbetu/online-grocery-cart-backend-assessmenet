# Grocery Cart Online Backend


[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Grocery Cart Online is a Backend system build using Node.JS, mobile-ready, web-ready that contains rest api,


## Features

- User/Admin Login with JWT token.
- User/Admin Singup with JWT token.
- Password Update
- Get Profile
- Delete Account/Profile.
- Add Products(admins only).
- Update Product(admins only).
- Delete Product(admins only).
- Get All Products
- Get Single Product


## Tech

Grocery Cart Online uses a number of open source libraries to work properly. Majority of them are:

- [Node.js] - open source server runtime environment!
- [Express] - fast node.js network app framework
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Markdown parser done right. Fast and easy to extend.
- [Mongoose](https://www.npmjs.com/package/mongoose) - great UI boilerplate for modern web apps
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - open source server runtime environment!
- [Multer](https://www.npmjs.com/package/multer) - fast node.js network app framework [@tjholowaychuk]


And of course Grocery Cart Online itself is open source with a [public repository](https://github.com/aishbetu/online-grocery-cart-backend-assessmenet)
on GitHub.

## Requirements & Installation Guide

Grocery Cart Online requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

Make Sure NodeJS and MongoDB is installed in the local machine.
To check run follwoing commands:
```sh
node -v
npm -v
mongo -version
```

To setup this project, first download this project by git commands or simply download button then run the following commands:

```sh
cd online-grocery-cart-backend-assessmenet
npm i
npm start
```


## Routes for rest api

To test this project, I would suggest you to use PostMan. That's a great tool to test rest api's.

Open the postman, then run these routes for test the project

To test this project follow the screenshots guidline below:

1) Create Admin Account
   **Note: Post successfull registration, you would have recieved an jwt token in body please copy it and follow along with me.**
   ![Admin Login](https://github.com/aishbetu/grocery-cart-screenshots/blob/main/Images/Signup%20Admin.PNG?raw=true)

2) Add a Product:
   **Step (a): First add your copied jwt token in the header in order to add a product** See screenshot below:
   ![Header](https://github.com/aishbetu/grocery-cart-screenshots/blob/main/Images/add%20product%20header.PNG?raw=true)
   **Step (b): fill the form-data in body something like this**
   ![Add Product](https://github.com/aishbetu/grocery-cart-screenshots/blob/main/Images/Add%20Product.PNG?raw=true)
   **Note: Only these categories available as of now: ['vegetable & fruit', 'dairy', 'snacks', 'beverage', 'grain & oil', 'baby care', 'personal care', 'kitchen', 'household']**

3) Add few more products by follwoing step 2:

4) Get all Products:
   **Step (a): Again First add your copied jwt token in the header in order to fetch all product** See screenshot below:
   ![Header](https://github.com/aishbetu/grocery-cart-screenshots/blob/main/Images/get%20all%20products.PNG?raw=true)
   **Step (b): then follow this get url**
   ![Get all products](https://github.com/aishbetu/grocery-cart-screenshots/blob/main/Images/get%20all%20products%20url.PNG?raw=true)

5) Get single Product:
   **Step (a): Again First add your copied jwt token in the header in order to fetch all product** See screenshot below:
   ![Header](https://github.com/aishbetu/grocery-cart-screenshots/blob/main/Images/get%20single%20product%20header.PNG?raw=true)
   **Step (b): then add any prooduct _id to the url in place of <_id>**
   ![Get Single Product](https://github.com/aishbetu/grocery-cart-screenshots/blob/main/Images/get%20single%20product.PNG?raw=true)

6) Update Product:
   **Step (a): Again First add your copied jwt token in the header in order to fetch all product** See screenshot below:
   ![Header](https://github.com/aishbetu/grocery-cart-screenshots/blob/main/Images/update%20product%20header.PNG?raw=true)
   **Step (b): then add any prooduct _id to the url in place of <_id> and to update the field add it in body with field name and new value** See example below:
   ![Update Product](https://github.com/aishbetu/grocery-cart-screenshots/blob/main/Images/update%20product.PNG?raw=true)

7) Delete Product:
   **Step (a): Again First add your copied jwt token in the header in order to fetch all product** See screenshot below:
   ![Header](https://github.com/aishbetu/grocery-cart-screenshots/blob/main/Images/delete%20product%20header.PNG?raw=true)
   **Step (b): then add any prooduct _id to the url in place of <_id>**
   ![Delete Product](https://github.com/aishbetu/grocery-cart-screenshots/blob/main/Images/delete%20product%20url.PNG?raw=true)

This what you can do, if you had signup as an admin.

To check products and add to cart signup again with details something like this:

1) Create User Account
   **Note: Make sure is_admin is false. Post successfull registration, you would have recieved an jwt token in body please copy it and follow along with me.**
   ![Signup user](https://github.com/aishbetu/grocery-cart-screenshots/blob/main/Images/signup%20user.PNG?raw=true)

2) View all products:
   **Step (a): Again First add your copied jwt token in the header in order to fetch all product** See screenshot below:
   ![Header](https://github.com/aishbetu/grocery-cart-screenshots/blob/main/Images/get%20all%20products.PNG?raw=true)
   **Step (b): then follow this get url**
   ![Get all products](https://github.com/aishbetu/grocery-cart-screenshots/blob/main/Images/get%20all%20products%20url.PNG?raw=true)

3) View single Product:
   **Step (a): Again First add your copied jwt token in the header in order to fetch all product** See screenshot below:
   ![Header](https://github.com/aishbetu/grocery-cart-screenshots/blob/main/Images/get%20single%20product%20header.PNG?raw=true)
   **Step (b): then add any prooduct _id to the url in place of <_id>**
   ![Get Single Product](https://github.com/aishbetu/grocery-cart-screenshots/blob/main/Images/get%20single%20product.PNG?raw=true)

4) Add Product to cart:
   **Step (a): Again First add your copied jwt token in the header in order to add product to your cart** See screenshot below:
   ![Header](https://github.com/aishbetu/grocery-cart-screenshots/blob/main/Images/add%20to%20cart%20header.PNG?raw=true)
   **Step (b): then add any prooduct _id to the url in place of <_id> to add in your cart**
   ![Add to Cart](https://github.com/aishbetu/grocery-cart-screenshots/blob/main/Images/add%20to%20cart%20url.PNG?raw=true)

5) Remove a Product from cart:
   **Step (a): Again First add your copied jwt token in the header in order to remove product from cart** See screenshot below:
   ![Header](https://github.com/aishbetu/grocery-cart-screenshots/blob/main/Images/remove%20From%20Cart.PNG?raw=true)
   **Step (b): then add any prooduct _id to the url in place of <_id> to remove from your cart**
   ![Remove Product] (https://github.com/aishbetu/grocery-cart-screenshots/blob/main/Images/remove%20From%20Cart%20url.PNG?raw=true)

Bonus Api's:
1) Update your password:
   **Step (a): Again First add your copied jwt token in the header** See screenshot below:
   ![Header](https://github.com/aishbetu/grocery-cart-screenshots/blob/main/Images/update%20password%20header.PNG?raw=true)
   **Step (b): then pass your current and new password in the body to updating it**
   ![Update Password](https://github.com/aishbetu/grocery-cart-screenshots/blob/main/Images/update%20password.PNG?raw=true)

2) My Profile:
   **Step (a): Again First add your copied jwt token in the header to view your profile and put the same url** See screenshot below:
   ![Header](https://github.com/aishbetu/grocery-cart-screenshots/blob/main/Images/profile.PNG?raw=true)

3) Delete Account:
   **Step (a): Again First add your copied jwt token in the header to delete your profile and put the the same url** See screenshot below:
   ![Header](https://github.com/aishbetu/grocery-cart-screenshots/blob/main/Images/delete%20Account.PNG?raw=true)

3) Login User/Admin:
   **Step (a): Add the same url and pass your credetnials. It'll also give you jwt token to perform further operations**
   ![Login](https://github.com/aishbetu/grocery-cart-screenshots/blob/main/Images/login.PNG?raw=true)

## License

MIT


[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

[node.js]: <http://nodejs.org>
[express]: <http://expressjs.com>
