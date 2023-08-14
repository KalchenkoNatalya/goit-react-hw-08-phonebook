import css from './FormAddContacts.module.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addContactThunk,  selectUserContacts } from 'redux/contactsReduser';


export const FormAddContacts = () => {
  const contacts = useSelector(selectUserContacts);
  const dispatch = useDispatch();


  const handleAddContact = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.elements.contactName.value;
    const number = form.elements.contactNumber.value;
    if (contacts.some(contact => contact.name === name))
      return alert(`Contact with name ${name} already exists `);
    dispatch(addContactThunk({ name, number }));
    form.reset();
  };

  return (
    <form onSubmit={handleAddContact}>
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
  );
};

FormAddContacts.propTypes = {
  state: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
  handleAddContact: PropTypes.func,
};

