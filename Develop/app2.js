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

function promptUser() {
  return inquirer.prompt([
    {
      type: "confirm",
      name: "validate",
      message: "are you manager?",
    },
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
    },
  ]);
}

function teamSelect() {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "teamMembers",
        message: "Would you like to add a team?",
        choices: ["engineer", "intern", "NO"],
      },
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

function engQuestion() {
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
      name: "github",
      message: "what is your github user name?",
    },
  ]);
}

function intQuestion() {
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
      name: "school",
      message: "what is the name of your school?",
    },
  ]);
}
promptUser().then(function (answers) {
  switch (answers.validate) {
    case true:
      this.role = "manager";
      const manager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber
      );
      teamMembers.push(manager);
      teamSelect();
  }
});
function finalize(){
  let renderer = render(teamMembers)
fs.writeFile(outputPath, renderer, (err)=>{
  if(err)
    throw err;
    console.log(err);
});
}
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
