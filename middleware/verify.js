import mongoose from 'mongoose';
import Employee from '../model/employee.js';

const Authentications = async (req, res, next) => {
	try {
		console.log('inside Authentication');

		const { id } = req.body;
		const employee = await Employee.findOne({ id });
		if (!employee) {
			return res.status(404).json({
				message: 'Employee not found',
			});
		} else {
			req.employee = employee;
			next();
		}
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
