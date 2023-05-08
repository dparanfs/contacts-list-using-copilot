// Create a component for ContactLists.tsx
import React, { useEffect, useState } from 'react';
import { Contact } from '../types/contact';
import { Link } from 'react-router-dom';
import contactsApi from '../api/contacts-api';

// create a ContactList component
const ContactList = (): React.ReactElement => {
  // create a list of contacts with fields of name, email, phone, and address
  // create a submit button
  // create a button for creating new contact
  // create a react router's Link button for editing contact in the list

  // create a state for contacts
  const [contacts, setContacts] = useState<Contact[]>([]);
  // create a useEffect for fetching contacts with abort controller
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchContacts = async () => {
      const contacts = await contactsApi.getContacts(signal);
      setContacts(contacts);
    };

    fetchContacts();

    return () => {
      abortController.abort();
    };
  }, []);

  // create a delete handler for deleting contact
  const handleDelete = async (id: number) => {
    try {
      await contactsApi.deleteContact(id);

      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact.id !== id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1 className="contact-list-header">Contacts</h1>
      <Link to="create">
        <button className="contact-list-create" type="button">
          Create New Contact
        </button>
      </Link>
      <ul className="contact-list">
        {contacts.map((contact) => (
          <li key={contact.id} className="contact-list-item">
            <Link to={`contact/${contact.id}`}>
              <h2 className="name">{contact.name}</h2>
            </Link>
            <p className="email">{contact.email}</p>
            <p className="phone">{contact.phone}</p>
            <p className="address">{contact.address}</p>
            <br />
            <button
              className="delete"
              type="button"
              onClick={() => handleDelete(contact.id)}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ContactList;
