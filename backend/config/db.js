const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI, {
            
//             useUnifiedTopology: true,
//         });
//         console.log('MongoDB connected successfully');
//     } catch (error) {
//         console.error(error.message);
//         process.exit(1);
//     }
// };

module.exports = connectDB;
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Employee')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Database connection error:', err));
