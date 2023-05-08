// create a type for contact with fields of id, name, email, address and phone
export interface Contact {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
}

// createa a CreateContact type with fields of name, email, address and phone
export type CreateContact = Omit<Contact, 'id'>;

export type RequireField<T, Key extends keyof T> = Partial<T> &
  Required<Pick<T, Key>>;

// create a type for UpdateContact
export type UpdateContact = RequireField<Contact, 'id'>;
