import Loader from 'components/Loader/Loader';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selecAuthentificated } from 'redux/authReducer';
import {
  addContactThunk,
  deleteContactThunk,
  requestContatsThunk,
  selectContactsError,
  selectContactsIsLoading,
  selectUserContacts,
} from 'redux/contactsReduser';

const ContactsPage = () => {
  const authentificated = useSelector(selecAuthentificated);
  const contacts = useSelector(selectUserContacts);
  const isLoading = useSelector(selectContactsIsLoading);
  const error = useSelector(selectContactsError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authentificated) return;
    dispatch(requestContatsThunk());
  }, [authentificated, dispatch]);

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.elements.contactName.value;
    const number = form.elements.contactNumber.value;

    dispatch(addContactThunk({ name, number }));
  };
  const handleDeleteContact = contactId => {
    console.log(contactId);
    dispatch(deleteContactThunk(contactId))
  };

  const showContacts = Array.isArray(contacts) && contacts.length > 0;
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Name</p>
          <input name="contactName" type="text" required></input>
        </label>
        <label>
          <p>Number</p>
          <input name="contactNumber" type="text" required></input>
        </label>
        <button type="submit">Add contact</button>
      </form>
      <div>
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        {showContacts &&
          contacts.map(contact => {
            return (
              <li key={contact.id}>
                <h3>Name: {contact.name}</h3>
                <p>Number: {contact.number}</p>
                {/* <button type="button" onClick={handleDeleteContact}>Delete contact</button> */}
                <button
                  type="button"
                  onClick={() => handleDeleteContact(contact.id)}
                  aria-label="Delete contact"
                >
                  &times;
                </button>
              </li>
            );
          })}
      </div>
    </section>
  );
};

export default ContactsPage;
