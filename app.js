const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function promptManager() {
  console.log("enter manager info!");
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?",
    },
    {
      type: "input",
      name: "id",
      message: "What is your id?",
    },
    {
      type: "input",
      name: "email",
      message: "What is your email address?",
    },
    {
      type: "input",
      name: "officeNumber",
      message: "what is your office number?",
    }
  ]);
}

function engQuestion() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your engineer's name?",
    },
    {
      type: "input",
      name: "id",
      message: "What is your engineer's id?",
    },
    {
      type: "input",
      name: "email",
      message: "What is your engineer's email address?",
    },
    {
      type: "input",
      name: "github",
      message: "what is your engineer's github user name?",
    }
  ]);
}

function intQuestion() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your intern's name?",
    },
    {
      type: "input",
      name: "id",
      message: "What is your intern's id?",
    },
    {
      type: "input",
      name: "email",
      message: "What is your intern's email address?",
    },
    {
      type: "input",
      name: "school",
      message: "what is the name of your intern's school?",
    }
  ]);
}

function teamSelect() {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "teamMembers",
        message: "Would you like to add a team?",
        choices: ["engineer", "intern", "NO"]
      }
    ])
    .then(function (choice) {
      switch (choice.teamMembers) {
        case "engineer":
          engQuestion().then(function (answers) {
            const engineer = new Engineer(
              answers.name,
              answers.id,
              answers.email,
              answers.github
            );
            teamMembers.push(engineer);
            console.log(teamMembers);
            teamSelect();
          });
          break;

        case "intern":
          intQuestion().then(function (answers) {
            const intern = new Intern(
              answers.name,
              answers.id,
              answers.email,
              answers.school
            );
            teamMembers.push(intern);
            console.log(teamMembers);
            teamSelect();
          });
          break;
        case "NO":
          finalize();
          break;
      }
    });
}

promptManager().then(function (answers) {
  
      this.role = "manager";
      const manager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber
      );
      teamMembers.push(manager);
      teamSelect();
  
});

function finalize(){
fs.writeFile(outputPath, render(teamMembers), (err)=>{
  if(err)
    throw err;
});
}
