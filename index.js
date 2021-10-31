const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middlewire
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.smfjp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


// // function

async function run(){

	try{
		await client.connect();
		const database = client.db("tourism");
		const bookingsCollection = database.collection('bookings');

		// get api
		app.get('/bookings', async(req, res) =>{
			const cursor = bookingsCollection.find({});
			const bookings = await cursor.toArray();
			res.send(bookings);
		})

		// getting single bookings
		app.get('/booking/:id', async(req, res) =>{
			const id = req.params.id;
			console.log(id);
			const query = {_id: ObjectId(id)};
			const booking = await bookingsCollection.findOne(query);
			res.json(booking);
		})

// getting shipping 
app.get('/shipping/:id', async(req, res) =>{
	const id = req.params.id;
	console.log(id);
	const query = {_id: ObjectId(id)};
	const shipping = await bookingsCollection.findOne(query);
	res.json(shipping);
})


		// delete api

		app.delete('/shipping/:id', async (req, res) => {
			const id = req.params.id;
			console.log(id)
			const query = {_id: ObjectId(id)};
			const result = await servicesCollection.deleteOne(query);
			res.json(result);
		})
	}

	finally{
		// await client.close();
	}

}

run().catch(console.dir);


app.get('/', (req, res) => {
	res.send('Running Tourism website server for Assignment 11 [--Programming Hero--]');
});

app.listen(port, () =>{
	console.log('Running Genius Server on port', port);
})










