require("dotenv").config();

const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", "not_views");

app.listen(8000, () => {
    console.log("Listening requests on port 8000...")
});

app.use(express.static("public"));

app.use(express.urlencoded({extended:true}));

const connectDB = require("./config/db");
connectDB();

const Note = require("./models/Notes");

app.get("/", (req,res) => {
        Note.find().sort({createdAt: -1})
        .then(notes => {
            res.render("not_index", {
                title: "Home",
                notes
            });
        });
});

app.get("/about", (req,res) => {
    res.render("not_about", {title: "About Page"});
});

app.get("/create-notes", (req, res) => {
    res.render("not_create", { title: "Create Notes" });
});

app.post("/create-notes", (req,res) => {
    const note = new Note({
        title: req.body.title,
        content: req.body.content
    });
    note.save()
    .then(() => res.redirect("/all-notes"))
    .catch(err => console.log(err));
});

app.get("/all-notes", (req,res) => {

        Note.find().sort({createdAt: -1})
        .then(notes => {
            res.render("not_all", {
                title: "All Notes",
                notes
            });
        })

});

app.use((req,res) => {
    res.status(404).render("not_error", {title: "404"});
});
