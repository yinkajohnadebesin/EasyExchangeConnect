const { Builder, By } = require('selenium-webdriver');

(async function example() {
    // Initialize WebDriver
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Navigate to the website
        await driver.get('https://www.fhnw.ch/en/startseite');

        // Fetch and print the page title
        let title = await driver.getTitle();
        console.log('Page Title:', title);

        // Fetch and print the meta description
        let metaDescription = await driver.findElement(By.css('meta[name="description"]')).getAttribute('content');
        console.log('Meta Description:', metaDescription);

        // Fetch and print all headings (h1, h2, h3, etc.)
        console.log('Headings on the Page:');
        for (let i = 1; i <= 6; i++) {
            let headings = await driver.findElements(By.css(`h${i}`));
            for (let heading of headings) {
                let text = await heading.getText();
                if (text) console.log(`h${i}: ${text}`);
            }
        }

        // Fetch and print all links on the page
        console.log('Links on the Page:');
        let links = await driver.findElements(By.css('a'));
        for (let link of links) {
            let href = await link.getAttribute('href');
            if (href) console.log(href);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        // Quit the browser
        await driver.quit();
    }
})();
