const fs = require('fs');
const inquirer = require('inquirer');

const { Circle, Triangle, Square, Heart, Star } = require('./modules/shapes');

// Write File to file system
function writeToFile(fileName, content) {
    fs.writeFile(fileName, content, (error) => {
        error ? console.error(error) : console.log(`Generated ${fileName}`);
    })
}

async function init() {
    const isNoMoreThan3 = async (input) => {
        if (input.length > 3) {
            return 'You have entered more than 3 characters.';
        } else {
            return true;
        }
    }

    // Confirm Questions/Answers Function for formatting and readability
    const confirmQuestions = (input) => {
        let shapeColor = input.shapeColor ? input.shapeColor + ' ' : '';
        let textColor = input.textColor ? input.textColor + ' ' : '';
        let fontFamily = input.fontFamily ? ' in ' + input.fontFamily : '';
        return `Does this looks correct?
    ${shapeColor}${input.shape}
    ${textColor}${input.text}${fontFamily}`;
    }

    let questions = [
        {
            type: 'input',
            name: 'text',
            message: 'What should the text on your LOGO be?',
            validate: await isNoMoreThan3
        },
        {
            type: 'input',
            name: 'textColor',
            message: (answers) => `What color would you like '${answers.text.toUpperCase()}' to be?`
        },
        {
            type: 'list',
            name: 'fontFamily',
            message: 'Is there a font family you would like to have for the text in your LOGO?',
            choices: ['', 'serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui', 'ui-serif', 'ui-sans-serif', 'ui-monospace', 'ui-rounded', 'emoji', 'math', 'fangsong'],
        },
        {
            type: 'list',
            name: 'shape',
            message: 'Choose from a shape to display on your logo:',
            choices: ['Circle', 'Triangle', 'Square', 'Heart', 'Star']
        },
        {
            type: 'input',
            name: 'shapeColor',
            message: (answers) => `What color would you like '${answers.shape}' to be?`
        },
        {
            type: 'confirm',
            name: 'continue',
            message: confirmQuestions
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
                case 'Heart':
                    shape = new Heart();
                    break;
                case 'Star':
                    shape = new Star();
                    break;
                default:
                    console.error('Unknown shape selected, should not be here.');
                    break;
            }
            shape.setText(answers.text, answers.textColor, answers.fontFamily);
            shape.setColor(answers.shapeColor);

            writeToFile('logo.svg', shape.createLogo());
        })
}

init();