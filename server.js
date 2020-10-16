var express = require("express");
var path = require("path");
var fs = require("fs");
const { v4: uuidv4 } = require("uuid");
var jsonData = require("./db/db.json");
var app = express();
var PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Make Notes array here.

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function (req, res) {
  res.json(jsonData);
});

app.post("/api/notes", function (req, res) {
  var newNote = req.body;
  console.log(newNote);

  // Give each Item an unique ID
  newNote.id = uuidv4();
  jsonData.push(newNote);

  fs.writeFile("./db/db.json", JSON.stringify(jsonData), function finished(
    err
  ) {
    console.log("all set");
    res.json("Success!");
  });
});

app.delete("/api/notes/:id", function (req, res) {
  var id = req.params.id;

  for (i = 0; i < jsonData.length; i++) {
    if (jsonData[i].id === id) {
      jsonData.splice(i, 1);
    }
  }

  // Shortcut for above for loop
  //const filtered = jsonData.filter(note => note.id !== id);

  fs.writeFile("./db/db.json", JSON.stringify(jsonData), function finished(
    err
  ) {
    console.log("all set");
    res.json("Success!");
  });
});

app.listen(PORT, function () {
  console.log("App listening on PORT http://localhost:" + PORT);
});
