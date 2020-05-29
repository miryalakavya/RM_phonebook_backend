import { Controller, Post, Put, Delete, Get } from '@overnightjs/core';
import { Contact } from '../models/contact';

@Controller('contact')
export class ContactController {
    constructor() {

    }

    @Get('')
    getContacts(req, res) {
        console.log("hit");
        Contact.find().then((contacts) => {
            res.send({
                data: contacts,
                message: "Contact details retrieved successfully"
            })
        }).catch(err => {
            res.status(err.status).send(err.message);
        });
    }

    @Post()
    creatingANewContact(req, res) {
        const data = {
            name: req.body.name,
            dateOfBirth: req.body.dateOfBirth,
            contactNumber: req.body.contactNumber,
            email: req.body.email,
        }
        Contact.create(data).then((data) => {
            res.send({
                data: data,
                message: "A new contact is created successfully"
            })
        }).catch((err) => {
            res.send(err);
        })
    }

    @Put()
    updateANewContact(req, res) {
        const data = {
            name: req.body.name,
            dateOfBirth: req.body.dateOfBirth,
            contactNumber: req.body.contactNumber,
            email: req.body.email,
        }
        Contact.findByIdAndUpdate(req.body._id,{
            $set:data
        },{new:true}).then((data) => {
            res.send({
                data: data,
                message: "A new contact is created successfully"
            })
        }).catch((err) => {
            res.send(err);
        })
    }

    @Delete(':id')
    deleteANewContact(req, res) {
        Contact.findByIdAndDelete(req.params.id).then((data) => {
            res.send({
                data: data,
                message: "A  contact is deleted successfully"
            })
        }).catch((err) => {
            res.send(err);
        });
    }

}