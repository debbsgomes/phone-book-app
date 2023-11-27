import React, { useState } from 'react';
import { styled, Button} from '@mui/material';
import axios from 'axios';

interface ContactFormProps {
  closeModal: any;
  fetch: Function;
}

const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '400px',
  height: '200px',
  marginTop: 'auto',
  padding: theme.spacing(0),
  backgroundColor: theme.palette.background.paper,

  '.form-row': {
    marginBottom: theme.spacing(2),
    margin: theme.spacing(),
    display: 'flex',
    alignItems: 'center',

    '.form-label': {
      minWidth: '80px',
      marginRight: theme.spacing(3),
      fontSize: theme.typography.body1.fontSize,
      display: 'flex',
      alignItems: 'center',
    },

    '.form-input': {
      flex: 1,
      marginTop: theme.spacing(-1),
      padding: theme.spacing(1),
      fontSize: theme.typography.body1.fontSize,
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
    },
  },

  '.btn-container': {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0.9),
    marginTop: theme.spacing(1),
  },

  '.btn': {
    width: '40%',
    padding: theme.spacing(1),
  },
}));



const ContactForm: React.FC<ContactFormProps> = ({fetch, closeModal}) => {
  const [contact, setContact] = useState({ name: '', lastName: '', phoneNumber: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.name || !contact.phoneNumber || !contact.lastName) return;

    try {
      await axios.post('/contacts/', {
        name: contact.name,
        lastName: contact.lastName,
        phoneNumber: contact.phoneNumber,
      });
      closeModal();
      fetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input
          required
          type="text"
          name="name"
          id="name"
          className="form-input"
          value={contact.name}
          onChange={(e) => setContact({ ...contact, name: e.target.value })}
        />
      </div>

      <div className="form-row">
        <label htmlFor="lastName" className="form-label">
          Last Name:
        </label>
        <input
          required
          type="text"
          name="lastName"
          id="lastName"
          className="form-input"
          value={contact.lastName}
          onChange={(e) => setContact({ ...contact, lastName: e.target.value })}
        />
      </div>

      <div className="form-row">
        <label htmlFor="phoneNumber" className="form-label">
          Number:
        </label>
        <input
          required
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          className="form-input"
          value={contact.phoneNumber}
          onChange={(e) => setContact({ ...contact, phoneNumber: e.target.value })}
        />
      </div>
      <div className='btn-container'>
      <Button variant="outlined" className="btn btn-block" onClick={closeModal} type="reset">
        Close
      </Button>
      <Button variant="contained" className="btn btn-block" type="submit">
        Send Contact
      </Button>
      </div>
    </Form>
  );
};

export default ContactForm;
