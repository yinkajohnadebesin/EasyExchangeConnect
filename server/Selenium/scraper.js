//const universityLinks = [
//    'https://www.windesheim.com/',
//    'https://www.fhnw.ch/en',
//    'https://www.uniza.sk/index.php/en/',
//    'https://www.rit.edu/croatia/',
//    'https://www.mdu.se/',
//    'https://www.oth-regensburg.de/',
//    'https://www.unipg.it/',
//    'https://oamk.fi/en/',
//    'https://www.uni-lj.si/',
//    'https://www.fh-kufstein.ac.at/en/Home',
//    'https://www.uia.no/',
//    'https://www.upc.edu/ca'
//];

const { Builder } = require('selenium-webdriver');

async function example() {
    // Initialize WebDriver for Chrome
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        // Navigate to the website
        await driver.get("https://www.fhnw.ch/en");

        // Get the title of the page
        const title = await driver.getTitle();

        // Print the title to the console
        console.log("Page Title:", title, '\n');
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        // Close the browser
        await driver.quit();
    }
}

// Run the function
example();
