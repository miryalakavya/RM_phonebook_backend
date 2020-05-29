"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const core_1 = require("@overnightjs/core");
const contact_1 = require("../models/contact");
let ContactController = /** @class */ (() => {
    let ContactController = class ContactController {
        constructor() {
        }
        getContacts(req, res) {
            console.log("hit");
            contact_1.Contact.find().then((contacts) => {
                res.send({
                    data: contacts,
                    message: "Contact details retrieved successfully"
                });
            }).catch(err => {
                res.status(err.status).send(err.message);
            });
        }
        creatingANewContact(req, res) {
            const data = {
                name: req.body.name,
                dateOfBirth: req.body.dateOfBirth,
                contactNumber: req.body.contactNumber,
                email: req.body.email,
            };
            contact_1.Contact.create(data).then((data) => {
                res.send({
                    data: data,
                    message: "A new contact is created successfully"
                });
            }).catch((err) => {
                res.send(err);
            });
        }
        updateANewContact(req, res) {
            const data = {
                name: req.body.name,
                dateOfBirth: req.body.dateOfBirth,
                contactNumber: req.body.contactNumber,
                email: req.body.email,
            };
            contact_1.Contact.findByIdAndUpdate(req.body._id, {
                $set: data
            }).then((data) => {
                res.send({
                    data: data,
                    message: "A new contact is created successfully"
                });
            }).catch((err) => {
                res.send(err);
            });
        }
        deleteANewContact(req, res) {
            contact_1.Contact.findByIdAndDelete(req.params.id).then((data) => {
                res.send({
                    data: data,
                    message: "A new contact is created successfully"
                });
            }).catch((err) => {
                res.send(err);
            });
        }
    };
    __decorate([
        core_1.Get('')
    ], ContactController.prototype, "getContacts", null);
    __decorate([
        core_1.Post()
    ], ContactController.prototype, "creatingANewContact", null);
    __decorate([
        core_1.Put()
    ], ContactController.prototype, "updateANewContact", null);
    __decorate([
        core_1.Delete(':id')
    ], ContactController.prototype, "deleteANewContact", null);
    ContactController = __decorate([
        core_1.Controller('contact')
    ], ContactController);
    return ContactController;
})();
exports.ContactController = ContactController;
//# sourceMappingURL=contact.controller.js.map