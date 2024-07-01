const inquirer = require("inquirer")
const mysql = require("mysql2")
require("console.table")
const db = mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"",
    port:3306,
    database:"employeetracker_db"
})
db.connect(()=>{
    mainMenu()
})
function mainMenu(){
    inquirer.prompt ([
        {
            type:"list",
            message:"select the following option",
            name:"option",
            choices:["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "and update an employee role"]
        }
    ])
    .then(answer=>{
        if(answer.option==="view all departments"){
            viewDepartment()
        }
        if(answer.option==="view all roles"){
            viewRoles()
        }
        if(answer.option==="view all employees"){
            viewEmployees()
        }
        if(answer.option==="add a department"){
            addDepartment()
        }
        if(answer.option==="add a role"){
            addRole()
        }
        if(answer.option==="add an employee"){
            addEmployee()
        }
    })
}
function viewDepartment(){
    db.query("select * from department", (err,data)=>{
    console.table(data)
    mainMenu()
    })
    }

function viewRoles(){
    db.query("select * from role", (err,data)=>{
        console.table(data)
        mainMenu()
    })
}

function viewEmployees(){
    db.query("select * from employee", (err,data)=>{
        console.table(data)
        mainMenu()
    })
}

function addDepartment(){
    inquirer.prompt([{
        type:"input",
        message:"enter new department",
        name:"departmentName"
    }])
    .then(answer=>{
        db.query("insert into department(name)values(?)",[answer.departmentName], err=>{
            viewDepartment()
        })
    })
}

function addRole(){
    inquirer.prompt([{
        type:"input",
        message:"enter new role",
        name:"title"
    },{
        type:"input",
        message:"enter new salary",
        name:"salary"
    },{
        type:"input",
        message:"enter department_id",
        name:"department_id"
    }])
    .then(answer=>{
        db.query("insert into role(title,salary,department_id)values(?,?,?)",[answer.title,answer.salary,answer.department_id], err=>{
            viewRoles()
        })
    })
}

function addEmployee(){
    inquirer.prompt([{
        type:"input",
        message:"enter first_name",
        name:"first_name"
    },{
        type:"input",
        message:"enter last_name",
        name:"last_name"
    },{
        type:"input",
        message:"enter role_id",
        name:"role_id"
    },{
        type:"input",
        message:"enter manager_id",
        name:"manager_id"
    }])
    .then(answer=>{
        db.query("insert into employee(first_name,last_name,role_id,manager_id)values(?,?,?,?)",[answer.first_name,answer.last_name,answer.role_id,answer.manager_id], err=>{
            viewEmployees()
        })
    })
}