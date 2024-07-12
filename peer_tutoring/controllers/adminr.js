const pool = require('../connection.js');  // Assuming you have a database configuration file

// Function to add a student to the database
exports.addStudent = (req, res) => {
    const { sfname, email} = req.body;
    const sql = "INSERT INTO student (sfname, email) VALUES (?,?)";
    const values = [[sfname, email]];

    pool.query(sql, values, function(error, results) {
        if (error) {
            console.error('Failed to insert data:', error);
            return res.status(500).send('Error registering new student');
        }
        res.status(201).send({ message: 'Student registered successfully', id: results.insertId });
    });
};

// // Function to delete a student from the database
// exports.deleteStudent = (req, res) => {
//     const { id } = req.params;
//     const sql = "DELETE FROM student WHERE id = ?";

//     pool.query(sql, [id], function(error, results) {
//         if (error) {
//             console.error('Failed to delete student:', error);
//             return res.status(500).send('Error deleting student');
//         }
//         if (results.affectedRows === 0) {
//             return res.status(404).send('Student not found');
//         }
//         res.status(200).send({ message: 'Student deleted successfully' });
//     });
// };
