import DeleteConfirmationModal from 'components/ConfirmationModal/ConfirmationModal';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { FormAddContacts } from 'components/FormAddContacts/FormAddContacts';
import Loader from 'components/Loader/Loader';
import React, { useEffect, useState } from 'react';
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

  //--------для модалки---
  const [contactToDelete, setContactToDelete] = useState(null);

  const handleDeleteContact = contactId => {
    setContactToDelete(contactId); // Зберігаємо ID контакту для видалення
  };

  const confirmDelete = () => {
    if (contactToDelete !== null) {
      dispatch(deleteContactThunk(contactToDelete));
      setContactToDelete(null); // Очищаємо ID після видалення
    }
  };
  //--------------

  // const handleDeleteContact =  contactId => {
  //   console.log(contactId);

  //   dispatch(deleteContactThunk(contactId));
  // };

  const showContacts = Array.isArray(contacts) && contacts.length > 0;
  return (
    <section>
      {/* Модальне вікно для підтвердження видалення */}
      <DeleteConfirmationModal
        isOpen={contactToDelete !== null}
        onRequestClose={() => setContactToDelete(null)}
        onDelete={confirmDelete}
      />

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
