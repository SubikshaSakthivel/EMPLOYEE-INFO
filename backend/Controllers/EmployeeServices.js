const Employee = require('../models/Employee');

const createEmployee = async (req, res) => {
    console.log("Received employee data:", req.body);
    
    // Destructuring data from request body
    const { name, email, mobileNo, designation, gender, courses } = req.body;
    console.log(courses);
    
    // Create a new Employee instance with the data from req.body
    const newEmployee = new Employee({
        name,
        email,
        mobileNo,
        designation,
        gender,
        courses
    });

    try {
        // Check if the employee already exists by email (optional)
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Save the new employee to the database
        await newEmployee.save();
        
        // Send success response
        res.status(201).json({ message: 'Employee created successfully' });
    } catch (error) {
        console.error("Error creating employee:", error);
        // Send error response if something goes wrong
        res.status(500).json({ message: 'Error creating employee', error: error.message });
    }
};

const displayEmployee =  async (req,res)=>{

    try {
        const data = await Employee.find();
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        
        
    }
        
  
}

module.exports = { createEmployee , displayEmployee }
