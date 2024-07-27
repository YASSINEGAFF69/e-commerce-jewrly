import { createClient, groq } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  title: "artshop",
  apiVersion: "2023-11-21",
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
  useCdn: true,
});

// Function to get orders by email and sort by the latest
export async function getOrdersByEmail(email) {
  try {
    const orders = await client.fetch(
      `*[_type == 'order' && email == $email] | order(createdAt desc)`,
      { email }
    );
    return orders;
  } catch (error) {
    console.error('Error getting orders:', error.message);
    throw new Error('Failed to get orders');
  }
}

// Function to create orders
export async function createOrder(email, cart) {
  try {
    const orderCreationPromises = [];

    cart.forEach((orderData) => {
      const { name, quantity, price } = orderData;

      const orderCreationPromise = client.create({
        _type: 'order',
        name,
        qty: quantity,
        price,
        paid: true,
        delivered: false,
        email: email,
        createdAt: new Date().toISOString(),
      });

      orderCreationPromises.push(orderCreationPromise);
    });

    const createdOrders = await Promise.all(orderCreationPromises);
    return createdOrders;
  } catch (error) {
    console.error('Error creating order:', error.message);
    throw new Error('Failed to create order');
  }
}

// Function to get product by slug
export async function getProductBySlug(slug) {
  return client.fetch(
    groq`*[_type == "product" && slug.current == $slug]{
      _id,
      createdAt,
      name,
      slug,
      description,
      price,
      "images": image[].asset->url,
      "slug": slug.current,
    }`,
    { slug }
  );
}

// Function to get all products
export async function getProducts() {
  return client.fetch(
    groq`*[_type == "product"]{
      _id,
      createdAt,
      name,
      slug,
      description,
      price,
      "images": image[].asset->url,
      "slug": slug.current,
    }`
  );
}

// Function to get all users
export async function getUsers() {
  return client.fetch(
    groq`*[_type == "user"]{
      _id,
      createdAt,
      name,
      email
    }`
  );
}

// Function to get user by email
export async function getUserByEmail(email) {
  return client.fetch(
    groq`*[_type == "user" && email == $email]{
      _id,
      createdAt,
      name,
      email
    }`,
    { email }
  );
}

// Function to create a new user
export async function createUser(userData) {
  const { name, email } = userData;
  const newUser = await client.create({
    _type: "user",
    name,
    email,
    createdAt: new Date().toISOString(),
  });
  return newUser;
}
