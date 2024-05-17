#! /usr/bin/env node
import inquirer from "inquirer";
import Student from "./Student.js";
import chalk from "chalk";
let history = [];
let courses = {
    "BS English": 5000,
    "BS Math": 10000,
    "BS CS": 15000,
};
function successMessage(msg) {
    console.log(chalk.bgGreen(msg));
}
function studentValidate(sID) {
    let exist = false;
    if (history.length > 0) {
        for (let i = 0; i < history.length; i++) {
            if (history[i].getStudentID() == sID) {
                exist = true;
                break;
            }
        }
    }
    else {
        console.log("Please Add Student first!");
    }
    return exist;
}
async function studentOperation() {
    let operations = await inquirer.prompt({
        message: "Select Operation Type:",
        type: "list",
        name: "operation",
        choices: [
            "Add Student",
            "Add Student Balance",
            "Enroll Course",
            "Student Status",
            "Exit",
        ],
    });
    switch (operations.operation) {
        case "Add Student":
            addStudent();
            break;
        case "Add Student Balance":
            addBalance();
            break;
        case "Enroll Course":
            enrolStudent();
            break;
        case "Student Status":
            studentStatus();
            break;
        case "Exit":
            console.log("\n******* Thanks for using Student Management System*******\n");
            break;
    }
}
async function addStudent() {
    let student_input = await inquirer.prompt([
        {
            message: "Enter Student Name: ",
            name: "studentName",
            type: "string",
        },
        {
            message: "Enter Student Balance: ",
            type: "number",
            name: "balance",
        },
    ]);
    history.push(new Student(student_input.studentName, student_input.balance));
    successMessage("\nStudent has been added\n");
    console.log(history);
    studentOperation();
}
async function addBalance() {
    let student_input = await inquirer.prompt([
        {
            message: "Enter Student ID: ",
            name: "studentID",
            type: "number",
        },
        {
            message: "Enter Btudent Balance",
            type: "number",
            name: "balance",
        },
    ]);
    if (studentValidate(student_input.studentID)) {
        for (let i = 0; i < history.length; i++) {
            if (history[i].getStudentID() == student_input.studentID) {
                history[i].addBalance(student_input.balance);
                break;
            }
        }
        successMessage("\nBalance has been added\n");
        console.log(history);
    }
    else {
        console.log("\nInvalid Student ID\n");
    }
    studentOperation();
}
function courseValidate(ind, selCourse) {
    let alreadyAdded = false;
    for (let j of history[ind].getEnrolledCourse()) {
        if (j == selCourse) {
            alreadyAdded = true;
        }
    }
    return alreadyAdded;
}
function balanceValidate(ind, cBalance) {
    let lowBalance = false;
    let aviBalace = history[ind].getBalance();
    if (aviBalace < cBalance) {
        lowBalance = true;
    }
    return lowBalance;
}
async function enrolStudent() {
    console.log(courses);
    let course_input = await inquirer.prompt([
        {
            message: "Enter Student ID: ",
            name: "studentID",
            type: "number",
        },
        {
            message: "Select course name: ",
            name: "coursName",
            type: "list",
            choices: ["BS English", "BS Math", "BS CS"],
        },
    ]);
    const selectedCourse = course_input.coursName;
    if (studentValidate(course_input.studentID)) {
        for (let i = 0; i < history.length; i++) {
            if (history[i].getStudentID() == course_input.studentID) {
                let cFail = courseValidate(i, course_input.coursName);
                if (cFail) {
                    console.log("\nThis course is already enrolled\n");
                    break;
                }
                else {
                    let bFail = balanceValidate(i, courses[selectedCourse]);
                    if (bFail) {
                        console.log("\nBalance is not sufficient, please add balace first\n");
                        break;
                    }
                    else {
                        history[i].enroll(course_input.coursName, courses[selectedCourse]);
                        successMessage("\nCourse has been assigned to Student\n");
                        console.log(history);
                        break;
                    }
                }
            }
        }
    }
    else {
        console.log("\nInvalid Student ID\n");
    }
    studentOperation();
}
let studentStatus = async () => {
    let student_input = await inquirer.prompt([
        {
            message: "Enter Student ID: ",
            name: "studentID",
            type: "number",
        },
    ]);
    if (studentValidate(student_input.studentID)) {
        for (let i = 0; i < history.length; i++) {
            if (history[i].getStudentID() == student_input.studentID) {
                history[i].showStatus();
                break;
            }
        }
    }
    studentOperation();
};
studentOperation();
