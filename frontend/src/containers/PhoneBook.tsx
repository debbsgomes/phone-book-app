import React, { useEffect, useState } from 'react';
import { styled, Box, Icon, Typography, Button, Modal } from "@mui/material"
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import ContactsTable from '../components/ContactsTable';
import axios from 'axios';
import ContactForm from '../components/ContactForm'

const Container = styled(Box)`
  width: 100%;
  margin-top: 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  min-width: 100%;
`;

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const PhoneBook = () => {

  const [contacts, setContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const getContacts = async () => {
    try {
      const res = await axios.get("/contacts");
      console.log("Contacts from backend:", res.data);
      setContacts(res.data.contacts);
      localStorage.setItem('refetch', 'false')
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => { 
  const fetchData = async() => getContacts();
  fetchData()
  }, [])

  return (
    <Container>
      <Box width="100%" display="flex" justifyContent="center" alignItems="center">
        <Icon style={{ transform: 'scale(2)' }}>
          <PermContactCalendarIcon />
        </Icon>
        <Typography variant='h4' sx={{ m: "1.5rem", fontWeight: 'bold' }}>Phone Book App</Typography>
      </Box >
      <Box width="100%" display="flex" justifyContent="space-between" marginTop={3} >
        <Typography variant='h4' sx={{ fontWeight: 'bold' }}>Contacts</Typography>
        <Button variant="contained" onClick={toggleModal}>+ Add Contact</Button>
      </Box>
      <ContactsTable contacts={contacts} fetch={getContacts} />
      <Modal open={showModal}>
        <Box sx={style}
        ><ContactForm closeModal={toggleModal} fetch={getContacts} /></Box>
      </Modal>
    </Container>
  );
}

export default PhoneBook;

