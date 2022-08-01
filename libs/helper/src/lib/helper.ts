// export function helper(): string {
//   return 'helper';
// }

import * as mongoose from 'mongoose';
const dbName = 'itopplus'
const uri = 'mongodb+srv://ittichot:test1234@cluster0.0apsl.mongodb.net/' + dbName + '?retryWrites=true&w=majority'

export class DBHelper {
  static init(): void {
    mongoose.connect(uri)
      .then(() => console.log('Connection to mongoDB successful!'))
      .catch((e: Error) => console.log(`Could not connect to mongo.\n\n${e}`));
  }
}



