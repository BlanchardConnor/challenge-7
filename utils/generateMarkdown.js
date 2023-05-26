// TODO: Create a function that returns a license badge based on which license is passed in
const getLicenseBadge = license => {
  if (license) {
    return `![${license} License](https://img.shields.io/badge/license-${license.split(' ').join('%20')}-blue)
`;
  // let licenseType = license.license;
  // let yourLicense = ''
  // if (licenseType === 'MIT') {
  //   yourLicense = `[License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)`
  // } else if (licenseType === 'GPLv3') {
  //   yourLicense = `[GPLv3 license](https://img.shields.io/badge/License-GPLv3-blue.svg)`
  // } else if (licenseType === 'GPL') {
  //   yourLicense = `[GPL license](https://img.shields.io/badge/License-GPL-blue.svg)`
  // }
  // return yourLicense;
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
      licenseSection = `This project is licensed under the MIT License. You can find the full license text [here](${renderLicenseLink(license)}).${renderLicenseBadge(license)}
      `;
        break;

      case 'GNU':
        licenseSection = `This project is licensed under the GNU License. You can find the full license text [here](${renderLicenseLink(license)}).${renderLicenseBadge(license)}
        `;
        break;

        case 'Apache 2.0':
        licenseSection = `This project is licensed under the Apache 2.0 License. You can find the full license text [here](${renderLicenseLink(license)}).${renderLicenseBadge(license)}
        `;
        break;

        case 'ISC':
        licenseSection = `This project is licensed under the ISC License. You can find the full license text [here](${renderLicenseLink(license)}).${renderLicenseBadge(license)}
        `;
        break;
        
        default:
          return '';
  }
  return licenseSection;
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  const {title, 
    description, 
    installation, 
    screenshotLink, 
    screenshot: { alt: screenshotAlt = '', description: screenshotDesc = ''} = {}, 
    confirmAddScreenshot, 
    usage, 
    builtWith, 
    credits: { name: creditName = '', link: creditLink = ''} = {}, 
    confirmAddCredit, 
    contributions,
    license} = data;

  const licenseSection = renderLicenseSection(license);

  let screenshotSection = '';
  if (confirmAddScreenshot === 'Yes' || screenshotAlt !== '' && screenshotLink !== '') {
    screenshotSection = `
- - - -
![${screenshotAlt}](${screenshotLink})
- - - -
${screenshotDesc}
    `;
  }

  let creditsSection = '';
  if (confirmAddCredit === 'Yes' || creditName !== '' && creditLink !== '') {
    creditsSection = `
    ${creditName}
    ${creditLink}
    `;
  }

  return `# ${title}

## Description

${description}

- - - -

## Installation

${installation}

## Screenshot

${screenshotSection}

## Usage

${usage}

## Built With

This application was built using:
${builtWith}

- - - -

## Credits

${creditsSection}


## Contributions

${contributions}

- - - -

## License 

${licenseSection}
`;
}

module.exports = generateMarkdown;
