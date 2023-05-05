import sendRequest from "./sendRequest";
const BASE_URL = '/api/users'


export function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}

export function updateUser(userUpdate) {
  return sendRequest(`${BASE_URL}/update`, 'POST', userUpdate)
}

export function deleteUser() {
  return sendRequest(`${BASE_URL}/delete`, 'DELETE')
}

export function makeConnection(data) {
  return sendRequest(BASE_URL+"/makeConnection", 'POST', data)
}

export function getConnections() {
  return sendRequest(BASE_URL+"/getConnections")
}

export function getMessages(body) {
  return sendRequest(BASE_URL+`/getMessages/${body.conversationId}`)
}

export function sendMessage(data) {
  return sendRequest(BASE_URL+`/newMessage`, 'POST', data)
}