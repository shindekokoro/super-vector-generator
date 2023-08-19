const fs = require('fs');
const inquirer = require('inquirer');

const { Circle, Triangle, Square } = require('./modules/shapes');


const isNoMoreThan3 = async (input) => {
    if (input.length > 3) {
        return 'You have entered more than 3 characters.';
    } else {
        return true;
    }
}

// Write File to file system
function writeToFile(fileName, content) {
    fs.writeFile(fileName, content, (error) => {
        error ? console.error(error) : console.log(`Generated ${fileName}`)
    })
}

async function init() {
    let questions = [
        {
            type: 'input',
            name: 'text',
            message: 'What would you like the text on your LOGO to be?',
            validate: await isNoMoreThan3
        },
        {
            type: 'input',
            name: 'textColor',
            message: (answers) => `What color would you like '${answers.text.toUpperCase()}' to be?`
        },
        {
            type: 'list',
            name: 'shape',
            message: 'Choose from a shape to display on your logo:',
            choices: ['Circle', 'Triangle', 'Square']
        },
        {
            type: 'input',
            name: 'shapeColor',
            message: (answers) => `What color would you like '${answers.shape}' to be?`
        },
        {
            type: 'confirm',
            name: 'continue',
            message: (answers) => `Does this looks correct?\n\t${answers.shapeColor} ${answers.shape}\n\t${answers.textColor} ${answers.text}`

        }

    ]

    async function askQuestions() {
        return await inquirer
            .prompt(questions)
            .then(async (answers) => {
                if (answers.continue) {
                    return answers;
                } else {
                    return await askQuestions();
                }
            })
    }
    askQuestions()
        .then(async (answers) => {
            let shape;
            switch (answers.shape) {
                case 'Circle':
                    shape = new Circle();
                    break;
                case 'Triangle':
                    shape = new Triangle();
                    break;
                case 'Square':
                    shape = new Square();
                    break;
                default:
                    console.error('Unknown shape selected, should not be here.');
                    break;
            }
            shape.setText(answers.text, answers.textColor)
            shape.setColor(answers.shapeColor);

            writeToFile('logo.svg', shape.createLogo())
        })
}

init();