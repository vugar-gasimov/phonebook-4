import React from 'react';
import {
  PhoneBookInputContainer,
  PhoneBookContactList,
  ListItemContainer,
  DeleteButton,
} from '../PhoneBookStyled';

import { ContactListItem } from './ContactListItem';

import { useDispatch, useSelector } from 'react-redux';
import {
  selectContacts,
  selectFilter,
  selectLoading,
} from 'Redux/PhoneBook/selectors';
import { toast } from 'react-toastify';
import { deleteContactThunk } from 'Redux/PhoneBook/operations';

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  const handleDeleteContact = id => {
    dispatch(deleteContactThunk(id));
    toast.info('You have deleted a contact');
  };

  const getFilteredData = () => {
    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase().trim()) ||
        contact.number.includes(filter.trim())
    );
  };

  const filteredData = getFilteredData();

  return (
    <PhoneBookInputContainer>
      Contact List
      {loading && <h1>Loading...</h1>}
      <PhoneBookContactList>
        {filteredData.map(contact => (
          <ListItemContainer key={contact.id}>
            <ContactListItem contact={contact} />
            <DeleteButton
              onClick={() => dispatch(handleDeleteContact(contact.id))}
            >
              Delete
            </DeleteButton>
          </ListItemContainer>
        ))}
      </PhoneBookContactList>
    </PhoneBookInputContainer>
  );
};

export default ContactList;
