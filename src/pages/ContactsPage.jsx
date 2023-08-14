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

//   const handleAddContact = event => {
//     event.preventDefault();
//     const form = event.currentTarget;
//     const name = form.elements.contactName.value;
//     const number = form.elements.contactNumber.value;
//     if (contacts.some(contact => contact.name === name))
//       return alert(`Contact with name ${name} already exists `);
//     dispatch(addContactThunk({ name, number }));
//     form.reset();
//   };
  const handleDeleteContact =  contactId => {
    console.log(contactId);
    dispatch(deleteContactThunk(contactId));
  };

  const showContacts = Array.isArray(contacts) && contacts.length > 0;
  return (
    <section>
      {/* <form onSubmit={handleAddContact}>
        <label>
          <p>Name</p>
          <input name="contactName" type="text" required></input>
        </label>
        <label>
          <p>Number</p>
          <input name="contactNumber" type="text" required></input>
        </label>
        <button type="submit">Add contact</button>
      </form> */}
      <FormAddContacts />
      <div>
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}

        <h2>Find contacts by name</h2>
        <Filter valueFilter={filter} />

        <h2>Contacts</h2>

        {showContacts &&
          (filter === '' ? (
            <ContactList
              contacts={contacts}
              onRemoveContacts={contactId => handleDeleteContact(contactId)}
            />
          ) : (
            <ContactList contacts={filteredContacts} />
          ))}

        {/* {showContacts &&
          contacts.map(contact => {
            return (
              <li key={contact.id}>
                <h3>Name: {contact.name}</h3>
                <p>Number: {contact.number}</p>
                <button
                  type="button"
                  onClick={() => handleDeleteContact(contact.id)}
                  aria-label="Delete contact"
                >
                  &times;
                </button>
              </li>
            );
          })} */}
      </div>
    </section>
  );
};

export default ContactsPage;
