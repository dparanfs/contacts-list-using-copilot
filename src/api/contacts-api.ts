import { Contact, CreateContact, UpdateContact } from '../types/contact';
import apiClient from './api-client';

// create contacts api with crud methods
// add types to the crud methods
export const getContacts = async (signal: AbortSignal): Promise<Contact[]> => {
  const response = await apiClient.get('/contacts', { signal });
  return response.data;
};

export const getContact = async (
  id: number,
  signal: AbortSignal
): Promise<Contact> => {
  const response = await apiClient.get(`/contacts/${id}`, { signal });
  return response.data;
};

export const createContact = async (
  contact: CreateContact,
  signal?: AbortSignal
): Promise<Contact> => {
  const response = await apiClient.post('/contacts', contact, { signal });
  return response.data;
};

export const updateContact = async (
  id: number,
  contact: UpdateContact,
  signal?: AbortSignal
): Promise<Contact> => {
  const response = await apiClient.put(`/contacts/${id}`, contact, {
    signal,
  });

  return response.data;
};

export const deleteContact = async (
  id: number,
  signal?: AbortSignal
): Promise<void> => {
  await apiClient.delete(`/contacts/${id}`, { signal });
};

const contactsApi = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};

export default contactsApi;
