import { ObjectId } from "mongoose";

export interface Message {
  message: string;
}

export interface Contact {
  _id: string
  name: string;
  address: string;
  phone: string;
  email: string;

}

export interface List_contact {
  list_contract: Contact[]
}