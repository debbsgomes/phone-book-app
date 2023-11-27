import { contacts } from './../db/mock-data.js';
import { Request, Response } from 'express';


const getContacts = (req: Request, res: Response) => {
    res.status(200).send({ contacts })
}

const postContacts = (req: Request, res: Response) => {

    const { name, lastName, phoneNumber } = req.body;
    if (!(name && lastName && phoneNumber)) {
        return res.status(400).send("Please register a name and phone number!!")
    }
    contacts.push({ name, lastName, phoneNumber })
    res.status(200).send("Contact added to phone book!!")
}

const updateContacts = (req: Request, res: Response) => {

    const contact = contacts.find(contact =>
        contact.name === req.params.name)

    if (!contact) {
        return res.status(400).send("Please write a valid name and/or phone number!!")
    }
    contact.name = req.body.name || contact.name
    contact.lastName = req.body.lastName || contact.lastName
    contact.phoneNumber = req.body.phoneNumber || contact.phoneNumber

    res.status(200).json({
        message: "Contact information updated!!"
    })
}

const deleteContacts = (req: Request, res: Response) => {
    const contactIndex = contacts.findIndex(contact =>
        contact.name.toLowerCase() === req.params.name.toLowerCase()
    );

    if (contactIndex === -1) {
        return res.status(404).send("Invalid contact!!");
    }

    const deletedContact = contacts.splice(contactIndex, 1);

    res.status(200).json({
        message: "User deleted successfully",
        deletedContact,
    });
};




export { getContacts, postContacts, updateContacts, deleteContacts };