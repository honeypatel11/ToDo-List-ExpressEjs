const express = require("express");

const app = express('');
const PORT = 2300;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

let TaskList = []; 


app.get("/", (req, res) => {
    res.render("todo", { TaskList });
});

app.post("/add-task", (req, res) => {
    let newTask = req.body;
    TaskList.push(newTask);
    
    return res.redirect("/");
});


app.get("/delete-task", (req, res) => {
    let id = req.query.taskId;
    TaskList = TaskList.filter(task => task.id != id); 
    return res.redirect("/");
});


app.get("/edit-task", (req, res) => {
    let taskId = req.query.taskId;
    const task = TaskList.find(t => t.id == taskId); 
    return res.render("edit.ejs", { task , TaskList });
});


app.post("/edit-task", (req, res) => {
    let editId = req.body.id;
    let editIdx = TaskList.findIndex(t => t.id == editId);
    
    TaskList[editIdx] = {
        ...req.body,
        id:TaskList[editIdx].id
    } 
    return res.redirect("/");
});


app.listen(PORT, (err) => {
    if (err) {
        console.log("Something went wrong.....");
    } else {
        console.log("server is run...");
        console.log(`http://localhost:${PORT}`);
    }
});
