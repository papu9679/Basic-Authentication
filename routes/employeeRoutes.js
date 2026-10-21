import express from 'express';
import Employee from '../model/employee.js';
import { Authentications, Authorization } from '../middleware/verify.js';

const router = express.Router();

//create employee single
router.post('/', async (req, res) => {
	try {
		console.log('inside single router');

		const newEmployee = req.body;

		// create this emloyee in db
		const employeeDB = await Employee.create(newEmployee);
		console.log('employee created ', employeeDB);

		res.status(201).json({
			message: 'Employee created',
			employee: employeeDB,
		});
	} catch (error) {
		console.log(error);

		res.status(501).json({
			message: 'server error',
		});
	}
});

//create employee many
router.post('/many', async (req, res) => {
	try {
		console.log('inside many routes');

		const newEmployee = req.body;
		const response = await Employee.insertMany(newEmployee);
		console.log('respose done', response);
	} catch (error) {
		res.status(501).json({
			message: 'server error',
		});
	}
});

//get only employee
router.get('/', Authentications, async (req, res) => {
	console.log('Inside the get method');
	try {
		const { id } = req.body;
		const employee = await Employee.findOne({ id });
		console.log('employee', employee);
		res.status(201).json({
			message: 'Success',
			employee,
		});
	} catch (error) {
		req.status(501).json({
			message: 'server error',
			error,
		});
	}
});

//get all employee
router.get('/all', Authentications, Authorization, async (req, res) => {
	console.log('Inside the get method');
	try {
		const employee = await Employee.find();
		console.log('employee', employee);
		res.status(201).json({
			message: 'Success',
			employee,
		});
	} catch (error) {
		req.status(501).json({
			message: 'server error',
			error,
		});
	}
});

export default router;
