import mongoose from 'mongoose';
const connectDb = async () => {
	try {
		const req = await mongoose.connect(process.env.MONGO_URI);
		// const req = await mongoose.connect(process.env.MONGO_ONLINE_URI);
		console.log('MongoDb connected');
	} catch (error) {
		console.log(error);
	}
};

export default connectDb;
