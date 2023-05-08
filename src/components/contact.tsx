import contactsApi from '../api/contacts-api';
import { CreateContact } from '../types/contact';
import { UpdateContact } from '../types/contact';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';

// create a ContactForm component
function ContactForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const formRef = useRef<HTMLFormElement>(null);

  // create a form inputs for contact's name, email, phone, and address
  // create a submit button

  // fetch contact if id exists
  useEffect(() => {
    const abortController = new AbortController();
    if (id) {
      const fetchContact = async () => {
        const contact = await contactsApi.getContact(
          Number(id),
          abortController.signal
        );
        // setContact(contact);
        // set the form values
        if (formRef.current) {
          const nameInput = formRef.current.elements.namedItem(
            'name'
          ) as RadioNodeList;
          const emailInput = formRef.current.elements.namedItem(
            'email'
          ) as RadioNodeList;
          const phoneInput = formRef.current.elements.namedItem(
            'phone'
          ) as RadioNodeList;
          const addressInput = formRef.current.elements.namedItem(
            'address'
          ) as RadioNodeList;

          nameInput.value = contact.name;
          emailInput.value = contact.email;
          phoneInput.value = contact.phone;
          addressInput.value = contact.address;
        }
      };
      fetchContact();
    }

    return () => {
      abortController.abort();
    };
  }, [id]);

  // create a submit handler for creating new contact and getting values from form data
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newContact: CreateContact | UpdateContact = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      address: formData.get('address') as string,
    };

    if (id) {
      const res = await contactsApi.updateContact(
        Number(id),
        newContact as UpdateContact
      );

      console.log(res);
      navigate('/');
      return;
    }

    await contactsApi.createContact(newContact);

    navigate('/');
  };

  return (
    <>
      <h1>Contact Form</h1>
      <form ref={formRef} onSubmit={handleSubmit} className="form">
        <label className="form-label">
          Name:
          <input type="text" name="name" />
        </label>
        <br />
        <label className="form-label">
          Email:
          <input type="text" name="email" />
        </label>
        <br />
        <label className="form-label">
          Phone:
          <input type="text" name="phone" />
        </label>
        <br />
        <label className="form-label">
          Address:
          <input type="text" name="address" />
        </label>
        <br />
        <button type="submit" className="form-button">
          Submit
        </button>
      </form>
    </>
  );
}

export default ContactForm;
