// Order utilities for the restaurant
const ORDERS_KEY = 'delicious_orders';

export const getOrders = () => {
  try {
    const orders = localStorage.getItem(ORDERS_KEY);
    return orders ? JSON.parse(orders) : [];
  } catch {
    return [];
  }
};

export const addToOrder = (dish) => {
  const orders = getOrders();
  const existingItem = orders.find(item => item.id === dish.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    orders.push({ ...dish, quantity: 1 });
  }
  
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  return orders;
};

export const removeFromOrder = (dishId) => {
  const orders = getOrders().filter(item => item.id !== dishId);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  return orders;
};

export const updateQuantity = (dishId, quantity) => {
  const orders = getOrders();
  const item = orders.find(item => item.id === dishId);
  if (item) {
    if (quantity <= 0) {
      return removeFromOrder(dishId);
    }
    item.quantity = quantity;
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }
  return orders;
};

export const clearOrders = () => {
  localStorage.removeItem(ORDERS_KEY);
  return [];
};

export const getTotalPrice = () => {
  const orders = getOrders();
  return orders.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const getTotalItems = () => {
  const orders = getOrders();
  return orders.reduce((total, item) => total + item.quantity, 0);
};