import { createSelector } from '@reduxjs/toolkit';

const selectContacts = state => state.contacts.contacts;
const selectFilter = state => state.contacts.filter;

export const selectVisibleContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    if (!filter) {
      return contacts; // Повернути всі контакти, якщо фільтр не вибраний
    }
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);
