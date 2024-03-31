import express from "express"
import passwords from "./passwordschema.js"
import cors from "cors"
import bodyParser from "body-parser";
import mongoose from 'mongoose';
const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.text());
mongoose.connect('mongodb://localhost/password-manager')
  .then(() => console.log('Connected!'));


app.get('/', async (req, res) => {
  const data = await passwords.find()
  res.json(data);
})
app.post('/add', async (req, res) => {
  const fetched = JSON.parse(req.body);
  try {
    const data = await passwords.create(fetched); 
    res.json(data);
  } catch (error) {
    console.error('Error inserting data:', error);
   
  }
});
app.post('/delete', async (req, res) => {
  const fetched = JSON.parse(req.body)
  const data = await passwords.deleteOne({ID:fetched.ID})
  res.json(data);
  



})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})