import axios from 'axios';

const apiBaseUrl = 'https://recruiting.verylongdomaintotestwith.ca/api/{kryptorado}';

const api = axios.create({
  baseURL: apiBaseUrl,
});

export const postCharacter = async (newCharacter) => {
  try {
    const response = await api.post('/character', newCharacter);
    return response.data;
  } catch (error) {
    console.error('Error saving character: ', error);
    throw new Error('Error saving character');
  }
};

export const getCharacter = async () => {
  try {
    const response = await api.get('/character');
    return response.data;
  } catch (error) {
    console.error('Error fetching character: ', error);
    throw new Error('Error fetching character');
  }
};
