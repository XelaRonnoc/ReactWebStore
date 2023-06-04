# ReactWebStore (old project)

## Snippets

## Requirements and Purpose

### MVP:

At a minimum your e-shop website should have two pages:

-   Home Page
    -   This will contain:
        -   A Grid of products
        -   Carousel of featured products
-   Product Page (with id parameter) Similar to a product page on another site, allows you to add to cart and select product variants
-   All products should be stored in Firestore:
    -   You should store the following information:
        -   quantity
        -   variants (could be colors, sizes, etc)
        -   price per unit
        -   name
        -   image url
        -   favourited or not (boolean)
            All data should be stored in Firestore and fetched by the frontend, there should be NO static product data in the react application

Using Firestore and react create, a cart system. Create a cart page in your react app Add logic to prevent users from adding items to cart that are no longer in stock. You will have to check the current cart and the product quantity Cart page should have the following:

-   List of products in cart

    -   Ability to change quantity of products in cart
    -   Ability to remove items from cart

### Purpose

The purpose of this project was to improve my skill and reinforce my learning with React and to build my first full-stack (if a very light fullstack) connecting my front-end aplication to a firestore database.

### Stack

This project is a React Project utilising SCSS, REACT.js and Google Firebase. I chose not to use additional css or react libraries in order to allow for greater improvenet in my vanilla react knowledge and to maintain simplicity in the project.

## Design Goals

-   To produce a REACT ecommerce site that was able to interact with a database and allow users to "purchase" items in the store which would effect the database. This meant desinging the project in such a way that all potential race conditons were avoided and database integrity was maintained i.e. was not possible to have negative item quantity in db from a user over purchasing.

To overvcome this challenge I utilised useContext to a large extent allowing me to store much of the information fetched from the datya base in one location that is a single source of truth. Additionally any interaction with the database had to pass through this context. This allowed me to easily prevent race conditions as well as avoid unneccessary db calls.

## Features

-   A cart that allows users to add and remove items both with remove items button and by reducing it's quantity to 0.
-   In the cart if the item quanity exceeds that of the quantity in DB validation is in place to prevent this from happening
-   An infinite Carosel that displays products marked as favourite by the DB. This allows users to click on the currently focused item to go to the items page or click on the out of focus items or directional arrows to bring the next item into focus.
-   A product list that displays the available products in the store allowing users to select the platform they wish to purchase these on and to add them to cart. or to click on the item to go to the item page
-   A product page that displays the current item allows users to select a system and add it to cart. On this page there is also a suggested item section that allows users to click on and go to that items product page.

## Known Issues

-   A high reliance on use state as well as a bloated use context reduces the modularity of the application and makes it harder to upgrade and maintain.

## Future Goals

-   Make improvements to the utilisation of use state to preferentially utilise useRef to help improve modularity and make the site more maintainable.
-   Adding unit and E2E testing
-   fix how add to cart feedback works so it doesn't prevent adding multiple in a row.
-   make it so there is one update cart button for the whole cart not each individual product

## Challenges Faced

-   Being my first React project understanding and managing state and context was a challenge that took me some time to overcome.
-   Additionally I has not dealt with such both POST and GET requests previously or worked with a DB so managing the DB interactions was challenging although also interesting and quite enjoyable.
