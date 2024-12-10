// services/api.js
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

export const getDocumentData = async (qrCodeData) => {
  try {
    const token = await getToken();
    const response = await api.get(`/api/students/${ qrCodeData }`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    // console.log('Document data:', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/api/auth/login", { email, password });
    saveToken(response.data.token);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};

export const registerUser = async (name, email, password) => {
  try {
    const response = await api.post("/api/auth/signup", { name, email, password });
    saveToken(response.data.token);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};

export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem('userToken', token);
  } catch (error) {
    console.error('Erro ao salvar o token', error);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    console.log('Token recuperado:', token);
    return token;
  } catch (error) {
    console.error('Erro ao recuperar o token', error);
  }
};
