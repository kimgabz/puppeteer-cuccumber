const { setWorldConstructor } = require('cucumber');
const { expect } = require('chai');
const puppeteer = require('puppeteer');

class CustomWorld {
    async launchBrowser() {
        this.browser = await puppeteer.launch({ headless: true});
        this.page = await this.browser.newPage();
        this.page.setDefaultTimeout(10000);
    }

    async closeBrowser() {
        await this.browser.close();
    }

    async visit() {
        await this.page.goto("http://zero.webappsecurity.com/login.html");
    }

    async fillLoginForm() {
        await this.page.waitForSelector("#login_form");
        await this.page.type("#user_login", "username");
        await this.page.type("#user_password", "password");
    }

    async submitLogin() {
        await this.page.click(".btn-primary");
    }

    async verifySuccessFulLogin() {
        await this.page.waitForSelector("#account_summary_tab");
    }
}

setWorldConstructor(CustomWorld);