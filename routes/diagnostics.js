const diagnostics = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { readAndAppend, readFromFile } = require("../helpers/fsUtils");

// GET Route for retrieving diagnostic information
diagnostics.get("/", (req, res) => {
	readFromFile("./db/diagnostics.json").then((data) => res.json(JSON.parse(data)));
});

// POST Route for a error logging
diagnostics.post("/", (req, res) => {
	// TODO: Logic for appending data to the db/diagnostics.json file
	// Destructuring assignment for the items in req.body
	const { tip, topic, username } = req.body;

	// If all the required properties are present
	if (tip || topic || username) {
		// Variable for the object we will save
		const newDiag = {
			time: Date.now(),
			error_id: uuidv4(),
			errors: {
				tip: tip,
				topic: topic,
				username: username,
			},
		};

		readAndAppend(newDiag, "./db/diagnostics.json");

		const response = {
			status: "success",
			body: newDiag,
		};

		res.json(response);
	} else {
		res.json("Error in posting diagnostics");
	}
});

module.exports = diagnostics;
