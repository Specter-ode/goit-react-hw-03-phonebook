import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Container from './Container/Container';
import Section from './Section/Section';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
class App extends Component {
  static defaultProps = {
    initialValue: 0,
  };
  state = {
    contacts: [
      {
        id: nanoid(),
        username: 'Margaret Thatcher',
        number: '063-459-12-56',
        gender: 'female',
      },
      {
        id: nanoid(),
        username: 'Albert Einstein',
        number: '067-443-89-12',
        gender: 'male',
      },
      {
        id: nanoid(),
        username: 'Isaac Newton',
        number: '050-645-17-79',
        gender: 'male',
      },
      {
        id: nanoid(),
        username: 'Maria Sklodowska-Curie',
        number: '093-555-12-22',
        gender: 'female',
      },
      {
        id: nanoid(),
        username: 'William Shakespeare',
        number: '063-227-91-26',
        gender: 'male',
      },
    ],
    fieldFilter: '',
  };
  addNewContact = newContactData => {
    const { username } = newContactData;
    const { contacts } = this.state;
    if (
      contacts.find(
        contactFromBook =>
          contactFromBook.username.toLowerCase() === username.toLowerCase()
      )
    ) {
      alert(`${username} is already in contacts`);
      return;
    } else if (username === '') {
      alert('Please enter your name');
      return;
    }
    const contact = { ...newContactData, id: nanoid() };
    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };
  deleteContact = contactId => {
    console.log(contactId);
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  getVisibleContacts = () => {
    const { fieldFilter, contacts } = this.state;
    const normalizedFilter = fieldFilter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.username.toLowerCase().includes(normalizedFilter)
    );
  };
  changeFilter = e => {
    this.setState({ fieldFilter: e.target.value });
  };

  render() {
    const { fieldFilter, contacts } = this.state;
    return (
      <div>
        <Container>
          <Section title="Phonebook">
            <ContactForm catchSubmitInfo={this.addNewContact} />
          </Section>
          <Section title="Contacts">
            {contacts.length > 0 ? (
              <>
                <Filter
                  valueFromFilter={fieldFilter}
                  catchFilterInfo={this.changeFilter}
                />
                <ContactList
                  contacts={this.getVisibleContacts()}
                  onDelete={this.deleteContact}
                />
              </>
            ) : (
              <p>No contacts in phonebook</p>
            )}
          </Section>
        </Container>
      </div>
    );
  }
}

export default App;
