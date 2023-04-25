import sendRequest from './sendRequest';

const BASE_URL = '/api/orders';

// Retrieve an unpaid order for the logged in user
export function getCart() {
  return sendRequest(`${BASE_URL}/cart`);
}


export function addItemToCart(specClass) {
  return sendRequest(`${BASE_URL}/cart/classes/`,'POST', specClass);
}

// Updates the order's (cart's) isPaid property to true
export function checkout() {
  // Changing data on the server, so make it a POST request
  return sendRequest(`${BASE_URL}/cart/checkout`, 'POST');
}

// Retrieve a past order history
export function getPastOrders() {
  return sendRequest(`${BASE_URL}/cart/history`);
}
