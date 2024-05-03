/*class Login {
	constructor(form, fields) {
		this.form = form;
		this.fields = fields;
		this.validateonSubmit();
	}

	validateonSubmit() {
		let self = this;

		this.form.addEventListener("submit", (e) => {
			e.preventDefault();
			var error = 0;
			self.fields.forEach((field) => {
				const input = document.querySelector(`#${field}`);
				if (self.validateFields(input) == false) {
					error++;
				}
			});
			if (error == 0) {
				//do login api here
				localStorage.setItem("auth", 1);
				this.form.submit();
			}
		});
	}

	validateFields(field) {
		if (field.value.trim() === "") {
			this.setStatus(
				field,
				`${field.previousElementSibling.innerText} cannot be blank`,
				"error"
			);
			return false;
		} else {
			if (field.type == "password") {
				if (field.value.length < 8) {
					this.setStatus(
						field,
						`${field.previousElementSibling.innerText} must be at least 8 characters`,
						"error"
					);
					return false;
				} else {
					this.setStatus(field, null, "success");
					return true;
				}
			} else {
				this.setStatus(field, null, "success");
				return true;
			}
		}
	}

	setStatus(field, message, status) {
		const errorMessage = field.parentElement.querySelector(".error-message");

		if (status == "success") {
			if (errorMessage) {
				errorMessage.innerText = "";
			}
			field.classList.remove("input-error");
		}

		if (status == "error") {
			errorMessage.innerText = message;
			field.classList.add("input-error");
		}
	}
}

const form = document.querySelector(".loginForm");
if (form) {
	const fields = ["username", "password"];
	const validator = new Login(form, fields);
}*/
const generateAccessToken = require("./generateAccessToken")
//import the generateAccessToken function
//LOGIN (AUTHENTICATE USER, and return accessToken)
//LOGIN (AUTHENTICATE USER)
app.post("/login", (req, res) => {
    const user = req.body.name;
    const password = req.body.password;

    db.getConnection(async (err, connection) => {
        if (err) {
            console.error("Error connecting to the database: ", err);
            return res.status(500).send("Internal server error");
        }

        const sqlSearch = "SELECT * FROM student WHERE user = ?";
        const search_query = mysql.format(sqlSearch, [user]);

        await connection.query(search_query, async (err, result) => {
            connection.release();

            if (err) {
                console.error("Error executing query: ", err);
                return res.status(500).send("Internal server error");
            }

            if (result.length == 0) {
                console.log("--------> User does not exist");
                res.status(404).send("User does not exist");
            } else {
                const hashedPassword = result[0].password; // Get the hashedPassword from result
                if (await bcrypt.compare(password, hashedPassword)) {
                    console.log("---------> Login Successful");
                    res.send(`${user} is logged in!`);
                } else {
                    console.log("---------> Password Incorrect");
                    res.status(401).send("Password incorrect!");
                } // end of bcrypt.compare()
            } // end of User exists i.e. results.length != 0
        }); // end of connection.query()
    }); // end of db.getConnection()
}); // end of app.post()
