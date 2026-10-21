import mongoose from 'mongoose';
const employeeSchema = new mongoose.Schema({
	id: {
		type: Number,
		unique: true,
	},
	name: {
		type: String,
	},
	salary: {
		type: Number,
	},
	dept: {
		type: String,
	},
	password: {			//pass: name123
		type: String,
	},
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
