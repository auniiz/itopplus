/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import * as cors from 'cors';
import { Message } from '@itopplus/api-interfaces';
import { DBHelper } from 'libs/helper/src';

import { Contact } from 'libs/data-helper/src/lib/schemas/contact.schema';
import { error } from 'console';

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cors({ origin: 'http://localhost:4200', }))


const greeting: Message = { message: 'Welcome to Express-api!' };

app.get('/api', (req, res) => {
  res.send(greeting);
});

app.post('/addContact', (req, res, next) => {
  Contact.find({ 'name': req.body.name }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      if (data.length == 0) {
        Contact.create(req.body, (error, data) => {
          if (error) {
            return next(error);
          } else {
            res.status(200).json(data)
          }
        })
      } else {
        res.status(400).json({ message: "duplicate" })
      }

    }
  })
})

app.get('/getContacts', (req, res, next) => {
  Contact.find({}, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
    }
  })
})

app.get('/getContact/:id', (req, res, next) => {
  Contact.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
    }
  })
})

app.put('/editContact/:id', (req, res, next) => {
  Contact.find({ 'name': req.body.name }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      if (data.length == 0) {
        Contact.findByIdAndUpdate(req.params.id, {
          $set: req.body
        }, (error, data) => {
          if (error) {
            return next(error);
          } else {
            res.json(data)
          }
        })
      } else {
        res.status(400).json({ message: "duplicate" })
      }

    }
  })

})

app.delete('/deleteContact/:id', (req, res, next) => {
  Contact.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
    }
  })
})

const port = process.env.port || 3334;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

DBHelper.init();
