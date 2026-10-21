import mongoose from 'mongoose';
import Employee from '../model/employeeModel.js';
import { compare } from 'bcrypt';

const Authentications = async (req, res, next) => {
	try {
		console.log('inside Authentication');

		const { id, password } = req.body;
		const employee = await Employee.findOne({ id });
		if (!employee) {
			return res.status(404).json({
				message: 'Employee not found',
			});
		}

		//check the password is matched
		const result =  compare(password, employee.password);
		console.log('result', result);

		if (!result) {
			return res.status(403).json({
				message: 'Password not match',
			});
		}
		req.employee = employee;
		next();
	} catch (error) {
		res.status(404).json({
			message: 'Server Error',
			error,
		});
	}
};

const Authorization = async (req, res, next) => {
	try {
		const employee = req.employee;

		if (employee.dept == 'HR') {
			next();
		} else {
			return res.status(405).json({
				message: 'Access denied',
			});
		}
	} catch (error) {
		res.status(404).json({
			message: 'Server Error',
		});
	}
};

export { Authentications, Authorization };
