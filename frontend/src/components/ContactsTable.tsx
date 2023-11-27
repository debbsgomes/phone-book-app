import React, { useState, useEffect } from 'react';
import axios from 'axios';


import {
  styled,
  IconButton,
  Typography,
  TableBody as MuiTableBody,
  TableRow as MuiTableRow,
  TableCell as MuiTableCell,
  TableContainer as MuiTableContainer,
} from '@mui/material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import PhoneIcon from '@mui/icons-material/Phone';

interface Contact {
  name: string;
  lastName: string;
  phoneNumber: string;
}

const Table = styled('table')`
  width: 100%;
  background-color: #fff;
  padding: 1px;
  border: 1px solid rgba(169, 169, 169, 0.6); 
  border-radius: 5px;
  margin: 15px auto;
`;

const TableBody = styled(MuiTableBody)`
`;

const TableRow = styled(MuiTableRow)` &:hover {
  background-color: #f5f5f5;
}`;

const TableCell = styled(MuiTableCell)`
&.MuiTableCell-root {
  width: 40%;
padding: 18px;
}

.full-name {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.phone-number {
  display: flex;
  align-items: center;
  color: #808080;
  font-weight: bold;
  
}

.phone-icon {
  margin-right: 4px;
  font-size: 15px;
}
`;

const TableContainer = styled(MuiTableContainer)`
max-width: 800px;
margin-left: auto;
margin-right: auto;`;

interface ContactsTableProps { contacts: Contact[], fetch: Function }

const ContactsTable: React.FC<ContactsTableProps> = ({contacts, fetch}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  

  const handleDelete = async (name: string) => {
    try {
      await axios.delete(`/contacts/${encodeURIComponent(name)}`);
      fetch()
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };



  const filterContact = (contacts: Contact[]) => {
    const filteredContacts = contacts.filter((contact: Contact) =>
      contact.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredContacts;
  }

  return (
    <TableContainer>
      <input
        type="search"
        aria-label="Search"
        placeholder="   🔍︎  Search for a contact by last name..."
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ width: '100%', height: '50px', marginBottom: '30px', marginTop: '20px', fontSize: '16px', border: "1px solid rgba(169, 169, 169, 0.6)", borderRadius: "5px" }}
      />
      <Table>
        <TableBody>

          {contacts.length > 0 && filterContact(contacts).map((contact: Contact, i: any) => (
            <TableRow key={i}>
              <TableCell>
                <div className='full-name' style={{fontWeight: 'bold'}}>
                  <Typography variant="h5">{contact.name}</Typography>
                  <Typography variant="h5" style={{ marginLeft: '5px' }}>{contact.lastName}</Typography>
                </div>
                <div className='phone-number' style={{fontWeight: 'bold'}}>
                  <PhoneIcon className="phone-icon" />
                  <Typography variant="body1">{contact.phoneNumber}</Typography>
                </div>
              </TableCell>
              <TableCell align="center">
                <IconButton
                  onClick={() => handleDelete(contact.name)}
                  sx={{ marginLeft: '480px', border: "2px solid #FF0000 ", borderRadius: "8px", backgroundColor: "#FF0000 ", color: "#fff"}}
                >
                  <DeleteForeverOutlinedIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContactsTable;
