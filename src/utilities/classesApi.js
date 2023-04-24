// API modules are where the code lives to communicate
// with the server via AJAX
import sendRequest from './sendRequest';
const BASE_URL = '/api/classes';

export function getAll() {
  return sendRequest(BASE_URL);
}

export function getAllOfUser() {
  return sendRequest(`${BASE_URL}/user`);
}

export function getById(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}

export function makeClass(newClass) {
    return sendRequest(`${BASE_URL}/create`,'POST', newClass);
  }

export function updateClass(id, classChanges) {
    return sendRequest(`${BASE_URL}/${id}/update`,'PUT', classChanges);
}

export function deleteClass(id) {
  return sendRequest(`${BASE_URL}/${id}`,'DELETE');
}


