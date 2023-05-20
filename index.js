// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown.js');
const { error } = require('console');
// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project? (Required)',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please provide a project title!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: 'What is your GitHub username? (Required)',
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log('Please enter a valid username!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'repo',
        message: 'What is the name of your repo? (Required)',
        validate: repoInput => {
            if (repoInput) {
                return true;
            } else {
                console.log('Please provide a valid repo!');
                return false;
            }
        }  
    },
    {
        type: 'input',
        name: 'description',
        message: 'What is the description of your project? (Required)',
        validate: descriptionInput => {
            if (descriptionInput) {
                return true;
            } else {
                console.log('Please provide a description!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Please describe the usage of your application. (Required)',
        validate: usageInput => {
            if (usageInput) {
                return true;
            } else {
                console.log('Please provide information regarding the use of your application!');
                return false;
            }
        }
    },
    {
       type: 'checkbox',
       name: 'contents',
       message: 'Any other sections you would like to add to your README file?',
       choices: [
        {
            name: 'Deployed Application',
            checked: false
        },
        {
            name: 'Installation',
            checked: false
        },
        {
            name: 'Screenshots',
            checked: true
        },
        {
            name: 'Built With',
            checked: true
        },
        {
            name: 'License',
            checked: false
        },
        {
            name: 'Contributions',
            checked: false
        },
        {
            name: 'Tests',
            checked: false
        },
        {
            name: 'Questions',
            checked: true
        },
        {
            name: 'Credits',
            checked: true
        },
       ] 
    },
    {
        type: 'input',
        name: 'link',
        message: 'Please provide a link to your deployed application.',
        when: ({contents}) => {
            if (contents.indexOf('Deployed Apllication') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: linkInput => {
            if (linkInput) {
                return true;
            } else {
                console.log('Please enter a valid link!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Please provide a list of any required packages for installation.',
        when: ({contents}) => {
            if (contents.indexOf('Installation') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: installInput => {
            if (installInput) {
                return true;
            } else {
                console.log('Please enter installation instructions!');
                return false;
            }
        }
    },
    {
        type: 'list',
        name: 'license',
        message: 'Please provide any licensing info.',
        choices: ['MIT', 'GNU', 'Apache 2.0', 'ISC'],
        default: 0,
        when: ({contents}) => {
            if (contents.indexOf('License') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: licenseInput => {
            if (licenseInput) {
                return true;
            } else {
                console.log('Please provide license info!');
                return false;
            }
        }
    },
    {
        type: 'checkbox',
        name: 'built with',
        message: 'Please select any/all technologies used to build your application.',
        choices: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'SASS', 'Express.js'],
        default: 0,
        when: ({contents}) => {
            if (contents.indexOf('Built With') > -1) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'contributions',
        message: 'Please enter any guidelines regarding contributions.',
        when: ({contents}) => {
            if (contents.indexOf('Contributions') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: contributionInput => {
            if (contributionInput) {
                return true;
            } else {
                console.log('Please enter any guidelines regarding contribution!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Please enter test info for your application.',
        when: ({contents}) => {
            if (contents.indexOf('Tests') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: testsInput => {
            if (testsInput) {
                return true;
            } else {
                console.log('What packages are required to run tests for your application?');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'questions',
        message: 'Please provide an email for others to reach you with questions regarding your application.',
        when: ({contents}) => {
            if (contents.indexOf('Questions') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: questionsInput => {
            if (questionsInput) {
                return true;
            } else {
                console.log('Please provide an email address!');
                return false;
            }
        }
    }
];

const screenshotQue = [
    {
        type: 'input',
        name: 'creditName',
        message: 'Please give your credit a name. (Required)',
        validate: creditName => {
            if (creditName) {
                return true;
            } else {
                console.log('Please enter a name for the credit!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'creditLink',
        message: 'Please provide a link for the credit. (Required)',
        validate: creditLink => {
            if (creditLink) {
                return true;
            } else {
                console.log('Please enter a name for the credit!');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmAddCredit',
        message: 'Would you like to add another credit?',
        default: false
    }
];

addScreenshots = readmeData => {
    if (!readmeData.screenshots) {
        readmeData.screenshots = [];
    }
    console.log(`
    ------------------
    Add New Screenshot
    ------------------
    `);
    return inquirer.prompt(screenshotQue)
    .then(screenshotData => {
        readmeData.screenshots.push(screenshotData);
        if (screenshotData.confirmAddScreenshot) {
            return addScreenshots(readmeData);
        } else {
            return readmeData;
        };
    });
};

addCredits = readmeInfo => {
    if (!readmeInfo.credits) {
        readmeInfo.credits = [];
    };
    console.log(`
    --------------
    Add New Credit
    --------------
    `);
    return inquirer.prompt(creditQue)
    .then(creditData => {
        readmeInfo.credits.push(creditData);
        if (creditData.confirmAddCredit) {
            return addCredits(readmeInfo);
        } else {
            return readmeInfo;
        }
    });
};

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(`./dist/${fileName}`, data, error => {
        if (error) {
            throw error
        };
        console.log('README created!')
    });
};

// TODO: Create a function to initialize app
function init() {
    return inquirer.prompt(questions);
};

// Function call to initialize app
init()
.then(userResponse => {
    if (userResponse.contents.indexOf('Screenshots') > -1) {
        return addScreenshots(userResponse);
    } else{
        return userResponse;
    }
})
.then(response => {
    if (response.contents.indexOf('Credits') > -1) {
        return addCredits(response);
    } else {
        return response;
    }
})
.then(answers => generateMarkdown(answers))
.then(generateReadme => writeToFile('READEME.md', generateReadme))
.catch(error => {
    console.log(error);
});
