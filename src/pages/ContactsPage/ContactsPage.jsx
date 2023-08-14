import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { FormAddContacts } from 'components/FormAddContacts/FormAddContacts';
import Loader from 'components/Loader/Loader';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selecAuthentificated } from 'redux/authReducer';
import {
  deleteContactThunk,
  requestContatsThunk,
  selectContactsError,
  selectContactsIsLoading,
  selectFilterContacts,
  selectUserContacts,
} from 'redux/contactsReduser';
import { selectVisibleContacts } from 'redux/selectors';
// import Modal from 'react-modal';



const ContactsPage = () => {
  const authentificated = useSelector(selecAuthentificated);
  const contacts = useSelector(selectUserContacts);
  const isLoading = useSelector(selectContactsIsLoading);
  const error = useSelector(selectContactsError);
  const filter = useSelector(selectFilterContacts);
  const filteredContacts = useSelector(selectVisibleContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authentificated) return;
    dispatch(requestContatsThunk());
  }, [authentificated, dispatch]);


  const handleDeleteContact =  contactId => {
    console.log(contactId);
    
    dispatch(deleteContactThunk(contactId));
  };

  const showContacts = Array.isArray(contacts) && contacts.length > 0;
  return (
    <section>
  
      <FormAddContacts />
      <div>
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}

        <h2>Find contacts by name</h2>
        <Filter valueFilter={filter} />

        <h2>Your contacts list</h2>

        {showContacts &&
          (filter === '' ? (
            <ContactList
              contacts={contacts}
              onRemoveContacts={contactId => handleDeleteContact(contactId)}
            />
          ) : (
            <ContactList contacts={filteredContacts} />
          ))}
      </div>
    </section>
  );
};

export default ContactsPage;
