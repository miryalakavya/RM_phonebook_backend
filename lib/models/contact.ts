import { Schema, Model, model } from 'mongoose';

const contactSchema = new Schema({
    name: { type: String },
    email: [{ type: String }],
    contactNumber: [{ type: Number }],
    dateOfBirth: { type: Date }
});



export interface IContactLog {
    name: string,
    contactDetails: number[],
    email: string[],
}


export const Contact: Model<IContactLog> = model<IContactLog>('contacts', contactSchema);