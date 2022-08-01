import * as mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema(
   {
      name: {
         type: String,
      },
      address: {
         type: String,
      },
      phone: {
         type: String,
      },
      email: {
         type: String,
      },
   },
   { collection: 'contacts', timestamps: true },
);
// module.exports = mongoose.model('Contact', ContactSchema);

export const Contact = mongoose.model('Contact', ContactSchema);

// export interface ILocation extends mongoose.Document {
//    _id: string;
//    LocationName: string;
//    LocationCode: string;
//    isPickable: boolean;
//    TemplateID: string;
// }

//used for the server

// export interface ILocationModel extends mongoose.Model<ILocation> {}

// export const LocationSchema = mongoose.model('location', _LocationSchema);

// export const Location: ILocationModel = <ILocationModel>mongoose.model<ILocation>('Location', LocationSchema);