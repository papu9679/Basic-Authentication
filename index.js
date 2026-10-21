import express from 'express';
import 'dotenv/config';
import connectDb from './config/db.js';
import router from './routes/employeeRoutes.js';

const app = express();

connectDb();

//to accept the json data we will use it
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Sayan');
});

app.use('/employee', router);

const port = process.env.PORT;

app.listen(port, () => {
	console.log('Running...');
});
