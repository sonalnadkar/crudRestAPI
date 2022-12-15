const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* MONGODB WITH MONGOOSE  */
try {
    mongoose.connect("mongodb://0.0.0.0:27017/moviedb", {
        useNewUrlParser: true,
    });
    console.log("DataBase Connected : Collection moviedb");
} catch (error) {
    console.log(`DataBase Connection Error \n ${error}`);
}

/* MONGOOSE DATABASE SCHEMA */
const moiveSchema = {
    name: String,
    img: String,
    summary: String,
};

/* CREATING A MODEL OBJECT */
const Movie = mongoose.model("Movie", moiveSchema);

// CRUD
// create
app.post("/create", function (req, res) {
    const movie = new Movie({
        name: req.body.name,
        img: req.body.img,
        summary: req.body.summary,
    });
    movie.save(function (err) {
        if (!err) {
            res.send("Data inserted sucessfully")
        } else {
            res.send(err)
        }
    });
});

// read
app.get("/", function (req, res) {
    // find all movies to display on home page
    Movie.find({}, function (err, movies) {
        res.send(movies)
    });
});

app.get("/read", function (req, res) {
    // find all movies specified by the name to display on home page
    const moviename = req.body.name;
    Movie.find({ name: moviename }, function (err, movies) {
        res.send(movies)
    });
});

// update movie specified by the name
app.post("/update", function (req, res) {
    const moviename = req.body.name;
    const movieimg = req.body.img;
    const moviesummary = req.body.summary;
    const filter = { name: moviename };
    const update = {
        img: movieimg,
        summary: moviesummary
    };
    const updateDocument = async () => {
        let doc = await Movie.findOneAndUpdate(filter, update);
        res.send("Documnet updated sucessfully")
    }
    updateDocument()

})

// delete movie specified by the name
app.post("/delete", function (req, res) {
    const name = req.body.name
    const filter = { name: name };
    Movie.findOneAndDelete(filter, function (err, docs) {
        if (err) {
            res.send(err)
        }
        else {
            res.send("Document deleted sucessfully");
        }
    })
})

/* SERVER INIT */
portnumber = 3001;
app.listen(portnumber, function () {
    console.log(`server started at port ${portnumber}`);
});