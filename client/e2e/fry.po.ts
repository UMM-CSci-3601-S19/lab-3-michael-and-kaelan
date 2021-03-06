import {browser, by, element, Key} from 'protractor';

export class FryPage {
  navigateToTodos() {
    return browser.get('/todos');
  }

  navigateToFry() {
    return browser.get('/fry');
  }

  clickMenuButton() {
    let menuButton = element(by.id('nav button'));
    menuButton.click();
  }

  clickFryFromMenu() {
    let fryButton = element(by.id('fry button'));
    fryButton.click();
  }

  //http://www.assertselenium.com/protractor/highlight-elements-during-your-protractor-test-run/
  highlightElement(byObject) {
    function setStyle(element, style) {
      const previous = element.getAttribute('style');
      element.setAttribute('style', style);
      setTimeout(() => {
        element.setAttribute('style', previous);
      }, 200);
      return "highlighted";
    }

    return browser.executeScript(setStyle, element(byObject).getWebElement(), 'color: red; background-color: yellow;');
  }

  getTodoTitle() {
    let title = element(by.id('todo-list-title')).getText();
    this.highlightElement(by.id('todo-list-title'));

    return title;
  }

  typeAnOwner(name: string) {
    let input = element(by.id('todoOwner'));
    input.click();
    input.sendKeys(name);
  }

  typeABody(name: string) {
    let input = element(by.id('todoBody'));
    input.click();
    input.sendKeys(name);
  }

  typeAStatus(name: string) {
    let input = element(by.id('todoStatus'));
    input.click();
    input.sendKeys(name);
  }

  // getTodoByAge() {
  //     let input = element(by.id('todoName'));
  //     input.click();
  //     input.sendKeys(Key.TAB);
  // }

  backspace(){
    browser.actions().sendKeys(Key.BACK_SPACE).perform();
  }

  getUniqueTodo(_id:string) {
    let todo = element(by.id(_id)).getText();
    this.highlightElement(by.id(_id));

    return todo;
  }
}
