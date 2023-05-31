// TODO: Create a function that returns a license badge based on which license is passed in
const getLicenseBadge = license => {
  if (license) {
    return `![${license} License](https://img.shields.io/badge/license-${license.split(' ').join('%20')}-blue)
`;
}};

// If there is no license, return an empty string
function renderLicenseBadge(license) {
  if (!license) {
    return '';
  }
  return getLicenseBadge(license);
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  switch(license) {
    case 'MIT':
      return 'https://opensource.org/licenses/MIT';
    case 'GNU':
      return 'https://www.gnu.org/licenses/gpl-3.0.en.html';
    case 'Apache 2.0':
      return 'https://www.apache.org/licenses/LICENSE-2.0';
    case 'ISC':
      return 'https://opensource.org/licenses/ISC';
    default:
      return '';
  }
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  if (!license) {
    return '';
  }
  let licenseSection = '';
  switch (license) {
    case 'MIT':
      licenseSection = `This project is licensed under the MIT License. You can find the full license text [here](${renderLicenseLink(license)}).
      `;
        break;

      case 'GNU':
        licenseSection = `This project is licensed under the GNU License. You can find the full license text [here](${renderLicenseLink(license)}).
        `;
        break;

        case 'Apache 2.0':
        licenseSection = `This project is licensed under the Apache 2.0 License. You can find the full license text [here](${renderLicenseLink(license)}).
        `;
        break;

        case 'ISC':
        licenseSection = `This project is licensed under the ISC License. You can find the full license text [here](${renderLicenseLink(license)}).
        `;
        break;
        
        default:
          return '';
  }
  return licenseSection;
}


//- - - - - - - Creating other sections of README - - - - - - - //


// Creates 'Description' section
const createDescription = (title, description, link) => {
  if (link) {
      return `${description}
          
View the deployed page at [${title}](${link}).`;
  } else {
      return `${description}`;
  }
};


// Creates 'Contents' section
const createTableOfContents = contentsArr => {

  // Creates contents list items based on user selection
  let contentsList = '';
  contentsArr.forEach((item) => {

      // Indents 'Screenshots' list item
      if (item.content && item.header === 'Screenshots') {
      contentsList += `* [${item.header}](#${(item.header).toLowerCase()})
`;
      } else if (item.content) {
          contentsList += `* [${item.header}](#${(item.header).toLowerCase().split(' ').join('-')})
`;
      }
  });
  return contentsList;
};


// Creates 'Test' section
const createTest = test => {
  if (test) {
      return `To run tests on the application, install:
\>\`\`
${test}
\`\`
and run \`npm run test\` from the command line.`
  } else {
      return '';
  };
};


// Creates 'Questions' section
const createQuestions = (email, github, repo) => {
  if (email) {
      return `If you have any questions about the repo, please [open an issue](https://github.com/${github}/${repo}/issues) or contact me via email at ${email}. You can find more of my work on my GitHub, [${github}](https://github.com/${github}/).`
  } else {
      return '';
  }
};


// Creates 'Built With' section
const builtWithSection = builtWith =>{
  let allTechnologies = '';

  if (builtWith) {
      builtWith.forEach(item => {
          allTechnologies += `
* ${item}`
      });
      return `${allTechnologies}`;
  } else {
      return '';
  };
};


// Creates 'Installation' section
const installationSection = install => {
  if (install) {
      return `To use this application, please install: 
\`\`
${install}
\`\``
  } else {
      return '';
  }
};


// Creates 'Usage' section
const usageSection = (usage, screenshots) => {
  return `${usage} ${screenshotSection(screenshots)}`
};


// Creates 'Screenshot' section
const screenshotSection = screenshotItem => {
  let allScreenshots = '';
  if (screenshotItem) {
    screenshotItem.forEach(shot => {
      allScreenshots += `![${shot.screenshotAlt}](${shot.screenshotLink})
      ${shot.screenshotDesc}
      `;
    });
    return `${allScreenshots}`;
  } else {
    return '';
  }
};


// Creates 'Credits' section
const creditsSection = creditItem => {
  let allCredits = '';
  if (creditItem) {
      creditItem.forEach((credit) => {
      allCredits += `* [${credit.creditName}](${credit.creditLink})
`;
      });
      return allCredits;
  } else {
      return '';
  }
};

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
let readmeContents = '';
const sectionArr = [
    {
        header: 'Installation',
        content: installationSection(data.installation)
    },
    {
        header: 'Usage',
        content: usageSection(data.usage)
    },
    {
        header: 'Screenshots',
        content: screenshotSection(data.screenshots)
    },
    {
        header: 'Built With',
        content: builtWithSection(data['built with'])
    },
    {
        header: 'License',
        content: renderLicenseSection(data.license)
    },
    {
        header: 'Contributing', 
        content: data.contributions
    },
    {
        header: 'Tests',
        content: createTest(data.tests)
    },
    {
        header: 'Questions',
        content: createQuestions(data.questions, data.github, data.repo)
    },
    {
        header: 'Credits',
        content: creditsSection(data.credits)
    },
];

// Adss each section of README if those contents exist
sectionArr.forEach((sectionItem) => {
  if (sectionItem.content && sectionItem.header === 'Screenshots') {
    readmeContents += `### ${sectionItem.header}
    ${sectionItem.content}
    `
  } else if (sectionItem.content) {
    readmeContents += `## ${sectionItem.header}
    ${sectionItem.content}
    `;
  }
});
return `# ${data.title}
[![Issues](https://img.shields.io/github/issues/${data.github}/${
    data.repo
  })](https://github.com/${data.github}/${
    data.repo
  }/issues) [![Issues](https://img.shields.io/github/contributors/${
    data.github
  }/${data.repo})](https://github.com/${data.github}/${
    data.repo
  }/graphs/contributors) ${renderLicenseBadge(data.license)}

## Description
${createDescription(data.title, data.description, data.link)}

## Contents
${createTableOfContents(sectionArr)}

${readmeContents}`;
}

module.exports = generateMarkdown;
