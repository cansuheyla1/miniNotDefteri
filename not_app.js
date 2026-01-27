
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", "not_views");

app.listen(8000);

app.get("/", (req,res) => {
    const notes = [
        {title: "Shopping List", content: "tomato, cucumber, soap, detergent, milk"},
        {title: "Exam Week", content: `
            Monday: Data Structures and Algorithms ,
            Tuesday: Discrete Computational Structures ,
            Wendnesday: Electrical Circuits ,
            Thursday: Basic Lineer Algebra ,
            Friday: Differential Equations
        `}
    ];
    res.render("not_index", {title: "Home", notes});
});

app.get("/about", (req,res) => {
    res.render("not_about", {title: "About Page"});
});

app.get("/create-notes", (req,res) => {
    res.render("not_create", {title: "Create a New Note"});
});

app.get("/all-notes", (req,res) => {
    const notes = [
        {title: "Shopping List", content: "tomato, cucumber, soap, detergent, milk"},
        {title: "Exam Week", content: `
            Monday: Data Structures and Algorithms ,
            Tuesday: Discrete Computational Structures ,
            Wendnesday: Electrical Circuits ,
            Thursday: Basic Lineer Algebra ,
            Friday: Differential Equations
        `}
    ];
    res.render("not_all", {title: "All Notes" , notes});
});

app.get((req,res) => {
    res.status(404).render("not_error", {title: "404"});
});
