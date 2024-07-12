var express = require("express");
var bodyParser = require("body-parser");
const path = require("path");
var pool = require("./connection");
var app = express();
const mysql = require('mysql2');
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
// const MySQLStore = require('express-mysql-session')(session);
app.set('views', path.join(__dirname, 'views'));
const session = require('express-session');
app.use(session({
  secret: 'your secret key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 10 * 60 * 1000 // 10 minutes in milliseconds
  }
}));

app.get("/login", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "html", "studentlogin.html"));
});
app.get("/ACCOUNT.HTML", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "html", "account.html"));
});
app.get("/tutorial.html", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "html","teacher", "tutorial.html"));
});
app.get("/login", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "html", "studentlogin.html"));
});
const roleToTableMap = {
  student: 'student',
  teacher: 'teacher',
  admin: 'admin'
};

app.post('/login', async (req, res) => {
  const { email, password, role } = req.body;
  const tableName = roleToTableMap[role];

  if (!tableName) {
      return res.status(400).send('Invalid role specified');
  }

  const query = `SELECT * FROM ${mysql.escapeId(tableName)} WHERE email = ?`;

  pool.query(query, [email], async (error, results) => {
      if (error) {
          console.error('Database error:', error);
          return res.status(500).send('Database error');
      }

      if (results.length === 0) {
          return res.status(401).send('Login failed: Invalid email');
      }
      function checkAuthentication(req, res, next) {
        if (req.session.userId && req.session.role) {
          next();
        } else {
          res.status(403).send("Not authorized");
        }
      }
      
      function checkRole(role) {
        return function(req, res, next) {
          if (req.session.role === role) {
            next();
          } else {
            res.status(403).send("Access denied");
          }
        }
      }
      const user = results[0];

      // Check password
      const isMatch = password === user.password//await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(401).send('Login failed: Invalid password');
      }
      
      req.session.userId = user.tid; // assuming `id` is a field in your user record
      req.session.role = role;

      if (role === 'teacher') {
        req.session.tid = user.tid; // Assuming 'tid' is the identifier for teacher ID in your 'teacher' table
      }
      
      if (role === 'student') {
        req.session.sid = user.sid; // Assuming 'tid' is the identifier for teacher ID in your 'teacher' table
      }
      // Redirect based on role
      switch (role) {
          case 'student':
            const sqlAssignments = 'SELECT title, fpath FROM assignment';
            pool.query(sqlAssignments, (err, assignments) => {
              if (err) {
                console.error('Database error on assignments:', err);
                return res.status(500).send('Failed to retrieve assignments');
              }
        
              const sqlTutorials = 'SELECT title, fpath FROM tutorial';
              pool.query(sqlTutorials, (err, tutorials) => {
                if (err) {
                  console.error('Database error on tutorials:', err);
                  return res.status(500).send('Failed to retrieve tutorials');
                }
        
                res.render('studentdashboard', { assignments: assignments, tutorials: tutorials });
//                 const sqlVideos = 'SELECT title  FROM videos';
// pool.query(sqlVideos, (err, videos) => {
//   if (err) {
//     console.error('Database error on videos:', err);
//     return res.status(500).send('Failed to retrieve videos');
//   }

//   res.render('courses', {
  
//     videos: videos
//   });  
//  });

              });
            });
            break;
              
              break;
          case 'teacher':
              res.redirect('/teacherdashboard.html');
              break;
          case 'admin':
              res.redirect('/admindashboard.html');
              break;
          default:
              res.status(401).send('Role does not have a designated dashboard');
              break;
      }
      
  });
});



// app.get("//studentdashboard", function (req, res) {
//   res.sendFile(path.join(__dirname, "public", "html","student", "/studentdashboard"));
// });

app.get("/teacherdashboard.html", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "html","teacher", "teacherdashboard.html"));
});

app.get("/admindashboard.html", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "html","admin", "admindashboard.html"));
});


app.get("/signup.html", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "html", "signup.html"));
});

app.post("/signup.html", function (req, res) {
    const { sfname, slname, email, password } = req.body;
    var sql = "INSERT INTO student(sfname, slname, email, password) VALUES ?";
    var values = [[sfname, slname, email, password]];
  
    pool.query(sql, [values], function (error, results) {
      if (error) {
        console.error("Failed to insert data:", error);
        res.status(500).send("Error registering new student");
        return;
      }
      res.send("Student Register successful with ID: " + results.insertId);
    });
  });

  // app.get('/courses', (req, res) => {
  //   res.render('courses', {  videos: videos });
  // });
  app.get("/playlist.html", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "html","student", "playlist.html"));
  });
  app.get("/allpeers.html", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "html","student", "allpeers.html"));
  });
  app.get("/teachers.html", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "html","student", "teachers.html"));
  });
  app.get("/videos.html", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "html","teacher", "videos.html"));
  });
  app.get("/watch-video.html", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "html","student", "watch-video.html"));
  });
  app.get("/viewpeer.html", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "html","student", "viewpeer.html"));
  });


  app.get("/profile.html", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "html","student", "profile.html"));
  });
  app.get("/teacher_profile.html", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "html","teacher", "teacher_profile.html"));
  });
  app.get("/update.html", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "html","student", "update.html"));
  });
  app.get("/managestudents.html", function (req, res) {
  res.sendFile(
    path.join(__dirname, "public", "html", "admin", "managestudents.html")
  );
});
//adding students
app.post("/managestudents.html", function (req, res) {
    const { sfname,slname, email } = req.body;
    var sql = "INSERT INTO student(sfname,slname, email) VALUES ?";
    var values = [[sfname,slname, email]];
  
    pool.query(sql, [values], function (error, results) {
      if (error) {
        console.error("Failed to insert data:", error);
        res.status(500).send("Error registering new student");
        return;
      }
      res.send("Student Register successful with ID: " + results.insertId);
    });
  });

//add teachers
  app.get("/manageteachers.html", function (req, res) {
    res.sendFile(
      path.join(__dirname, "public", "html", "admin", "manageteachers.html")
    );
  });
  app.post("/manageteachers.html", function (req, res) {
    const { tfname,tlname, email,tsubject } = req.body;
    var sql = "INSERT INTO teacher(tfname, tlname,email,tsubject) VALUES ?";
    var values = [[tfname,tlname, email,tsubject]];
  
    pool.query(sql, [values], function (error, results) {
      if (error) {
        console.error("Failed to insert data:", error);
        res.status(500).send("Error registering new teacher");
        return;
      }
      res.send("teacher Register successful with ID: " + results.insertId);
    });
  });



const multer = require('multer');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = './uploads'; // Base upload path
    if (file.fieldname === 'videos') {
      uploadPath += '/videos'; // Videos directory
    } else if (file.fieldname === 'file') {
      uploadPath += '/assignments'; // Assignments directory
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

app.get("/assignment.html", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "html", "teacher", "assignment.html"));
});

app.post('/assignment.html', upload.single('file'), function(req, res) {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  if (!req.body.title) {
    return res.status(400).send('Assignment title is required.');
  }

  const title = req.body.title;
  const tid = req.session.tid; // Assumes session management is setup
  const fPath = req.file.path; // Correct variable name usage

  const sql = 'INSERT INTO assignment (tid, title, fpath, tstamp) VALUES (?, ?, ?, NOW())';
  const values = [tid, title, fPath];

  pool.query(sql, values, function(error, results) {
    if (error) {
      console.error('Error uploading assignment:', error);
      return res.status(500).send('Error uploading assignment');
    }
    res.send('Assignment uploaded successfully');
   
  
   
  });
});
app.set('view engine','ejs');


app.get('/studentdashboard', (req, res) => {
  const sqlAssignments = 'SELECT title, fpath FROM assignment';
  pool.query(sqlAssignments, (err, assignments) => {
    if (err) {
      console.error('Database error on assignments:', err);
      res.status(500).send('Failed to retrieve assignments');
      return;
    }

    const sqlTutorials = 'SELECT title, fpath FROM tutorial';
    pool.query(sqlTutorials, (err, tutorials) => {
      if (err) {
        console.error('Database error on tutorials:', err);
       return res.status(500).send('Failed to retrieve tutorials');
        
      }

      res.render('studentdashboard', { assignments: assignments, tutorials: tutorials });
    });
  });
});


app.get('/assignment/:fpath', function(req, res) {
  const fpath = req.params.fpath;
  console.log("Requested file path:", fpath);
  
  if (!fpath) {
    return res.status(400).send('Bad Request: File path is undefined');
  }

  // Assuming `fpath` is a full path, you might need to extract just the filename
  const filename = path.basename(fpath); // Extracts the filename from the path

  res.download(fpath, filename, function(err) {
    if (err) {
      console.error('Error downloading file:', err);
      res.status(404).send('File not found');
    } else {
      console.log('File downloaded successfully:', fpath);
    }
  });
});



//updateprofilestudent
app.post('/update.html', upload.single('profile_pic'), async (req, res) => {
  const { name, email, old_pass, new_pass, c_pass } = req.body;

  // Check if new passwords match
  if (new_pass && new_pass !== c_pass) {
    return res.status(400).send('New passwords do not match');
  }

  try {
    // Retrieve userId from session
    const userId = req.session.sid;

    // Check if userId is stored in session
    if (!userId) {
      return res.status(401).send('User not authenticated');
    }

    // Query to retrieve user information
    const getUserQuery = "SELECT * FROM student WHERE sid = ?";
    
    pool.query(getUserQuery, [userId], async (error, results) => {
      if (error) {
        console.error("Failed to fetch user details:", error);
        return res.status(500).send("Failed to fetch user details");
      }

      if (results.length === 0) {
        console.log("No user found with userId:", userId);
        return res.status(404).send("User not found");
      }

      const user = results[0];

      if (old_pass && old_pass !== user.password) {
        return res.status(401).send('Incorrect old password');
      }

      // Update user data based on form inputs
      let updateQuery = "UPDATE student SET sfname = ?, email = ?";
      const updateValues = [name, email];

      if (new_pass) {
        // Validate new password (optional)
        // Example: check if new_pass meets password complexity requirements
      
        // Update query to set new password directly
        updateQuery += ", password = ?";
        updateValues.push(new_pass); // Directly use new_pass assuming it's already hashed or secured
      }

      // Add profile pic update logic if needed
      if (req.file) {
        // Handle updating profile picture in database or storage
        // Example: updateQuery += ", profile_pic = ?";
        // updateValues.push(req.file.filename); // Assuming filename saved in database
      }

      updateQuery += " WHERE sid = ?";
      updateValues.push(userId);

      // Execute the update query
      pool.query(updateQuery, updateValues, (error, results) => {
        if (error) {
          console.error("Failed to update profile:", error);
          return res.status(500).send("Failed to update profile");
        }

        res.send("Profile updated successfully");
      });
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).send("Error updating profile");
  }
});

//video
// app.get('/courses', (req, res) => {
//   const sqlVideos = 'SELECT vid, title FROM videos';

//   pool.query(sqlVideos, (err, videos) => {
//     if (err) {
//         console.error('Database error on videos:', err);
//         res.status(500).send('Failed to retrieve videos');
//         return; // Exit early after sending error response
//     }

//     res.render('courses', {
//         videos: videos
//     });
// });
// });


app.post('/videos.html', upload.single('videos'), function(req, res) {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  if (!req.body.title) {
    return res.status(400).send('Video title is required.');
  }

  const title = req.body.title;
  const description = req.body.description || ''; // Optional description
  const tid = req.session.tid; // Assumes session management is setup
 // const fPath = req.file.path;

  const sql = 'INSERT INTO videos (title,tid,filename, uploaded_at) VALUES (?, ?, ?, NOW())';
  const values = [title,  tid, req.file.originalname];

  pool.query(sql, values, function(error, results) {
    if (error) {
      console.error('Error uploading video:', error);
      return res.status(500).send('Error uploading video');
    }
    res.send('Video uploaded successfully');
  });
});

app.get('/courses', (req, res) => {
  
      // SQL query to retrieve videos
      const sqlVideos = 'SELECT vid,title,filename FROM videos';
      
      // Execute the SQL query using the connection pool
      pool.query(sqlVideos, (err, videos) => {
        if (err) {
          // If there's an error retrieving videos, log the error and send a 500 status response
          console.error('Database error on videos:', err);
          res.status(500).send('Failed to retrieve videos');
          return; // Exit the callback function to prevent further execution
        }

        // If all queries are successful, render the 'studentdashboard' template
        res.render('courses', {
          
          videos: videos
        });
      });
    });







app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});