const { Builder, By } = require("selenium-webdriver");

let date = new Date();

describe("Register New User", () => {
  it("should register a new user to the app, and bring user to dashboard/homescreen", async () => {
    let driver = await new Builder().forBrowser("chrome").build();
    try {
      // try to log in and act as a registering user
      await driver.get("http://localhost:3000/");

      //click register button to open register form
      await (await driver.findElement(By.name("register"))).click();
      // sending keys to the new email input field
      await driver
        .findElement(By.name("regEmail"))
        .sendKeys("newUser" + date + "@test.com");
      // sending keys to the new username field
      await driver
        .findElement(By.name("regUsername"))
        .sendKeys("newUsername" + date);
      //sending keys to the new password field
      await driver
        .findElement(By.name("regPassword"))
        .sendKeys("password" + date);
      //hitting submit button to complete the form
      await (await driver.findElement(By.className("btn-primary"))).click();
    } finally {
      await driver.quit();
    }
  });
});
