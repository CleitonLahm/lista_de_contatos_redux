import { createStore } from 'redux';

export const ADD_CONTACT = 'ADD_CONTACT';
export const EDIT_CONTACT = 'EDIT_CONTACT';
export const REMOVE_CONTACT = 'REMOVE_CONTACT';

const initialState = { contacts: [] };

function contactReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CONTACT:
      return { contacts: [...state.contacts, action.payload] };
    case EDIT_CONTACT:
      // eslint-disable-next-line no-case-declarations
      const editedContacts = state.contacts.map((contact) =>
        contact.id === action.payload.id ? action.payload : contact
      );
      return { contacts: editedContacts };
    case REMOVE_CONTACT:
      // eslint-disable-next-line no-case-declarations
      const filteredContacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
      return { contacts: filteredContacts };
    default:
      return state;
  }
}

const store = createStore(contactReducer);

export default store;
