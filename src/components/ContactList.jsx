
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_CONTACT, EDIT_CONTACT, REMOVE_CONTACT } from '../reducers/contatos';
import {
  ListContainer,
  ContactItem,
  ButtonContainer,
  AddButton,
  EditButton,
  RemoveButton,
} from '../styles/ContactListStyles';

const ContactList = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const contacts = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsFormValid(!!name && !!email);
  }, [name, email]);

  const addContact = () => {
    if (isFormValid) {
      dispatch({ type: ADD_CONTACT, payload: { id: Date.now(), name, phone, email } });
      setName('');
      setPhone('');
      setEmail('');
    }
  };

  const editContact = (contact) => {
    setName(contact.name);
    setPhone(contact.phone);
    setEmail(contact.email);
    setEditingId(contact.id);
  };

  const saveContact = () => {
    if (isFormValid) {
      dispatch({
        type: EDIT_CONTACT,
        payload: { id: editingId, name, phone, email },
      });
      setName('');
      setPhone('');
      setEmail('');
      setEditingId(null);
    }
  };

  const removeContact = (id) => {
    dispatch({ type: REMOVE_CONTACT, payload: id });
  };

  return (
    <ListContainer>
      <h1>Lista de Contatos</h1>
      <div>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Telefone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {editingId ? (
          <ButtonContainer>
            <EditButton onClick={saveContact}>Salvar</EditButton>
            <RemoveButton onClick={() => setEditingId(null)}>Cancelar</RemoveButton>
          </ButtonContainer>
        ) : (
          <AddButton onClick={addContact} disabled={!isFormValid}>
            Adicionar
          </AddButton>
        )}
      </div>
      <ul>
        {contacts.map((contact) => (
          <ContactItem key={contact.id}>
            <div>
              {contact.name} - {contact.phone} - {contact.email}
            </div>
            <ButtonContainer>
              <EditButton onClick={() => editContact(contact)}>Editar</EditButton>
              <RemoveButton onClick={() => removeContact(contact.id)}>Remover</RemoveButton>
            </ButtonContainer>
          </ContactItem>
        ))}
      </ul>
    </ListContainer>
  );
};

export default ContactList;
