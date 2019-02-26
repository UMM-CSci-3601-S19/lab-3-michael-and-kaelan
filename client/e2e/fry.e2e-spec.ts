import {FryPage} from './fry.po';
import {browser, protractor} from 'protractor';

let origFn = browser.driver.controlFlow().execute;

//https://hassantariqblog.wordpress.com/2015/11/09/reduce-speed-of-angular-e2e-protractor-tests/
browser.driver.controlFlow().execute = function () {
  let args = arguments;

  // queue 100ms wait between test
  //This delay is only put here so that you can watch the browser do its' thing.
  //If you're tired of it taking long you can remove this call
  origFn.call(browser.driver.controlFlow(), function () {
    return protractor.promise.delayed(50);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};

describe('Fry list', () => {
  let page: FryPage;

  beforeEach(() => {
    page = new FryPage();
  });

  it('should, from the todos page, navigate to the menu, to Fry\'s owner page, type something in filter body and filter status (complete) boxes and check that it returned correct element in Fry', () => {
    page.navigateToTodos();
    page.clickMenuButton();
    page.clickFryFromMenu();
    page.typeABody("sint");
    page.typeAStatus("complete");
    expect(page.getUniqueTodo("58895985756338a6d69e107c")).toEqual("58895985756338a6d69e107c (Fry)");
  });

  it('should type something in filter body and filter status (complete) boxes and check that it returned correct element in Fry', () => {
    page.navigateToFry();
    page.typeABody("sint");
    page.typeAStatus("complete");
    expect(page.getUniqueTodo("58895985756338a6d69e107c")).toEqual("58895985756338a6d69e107c (Fry)");
  });

  it('should type something in filter body and filter status (incomplete) boxes and check that it returned correct element in Fry', () => {
    page.navigateToFry();
    page.typeABody("sint Lorem");
    page.typeAStatus("incomplete");
    expect(page.getUniqueTodo("588959856601f6a77b6a2862")).toEqual("588959856601f6a77b6a2862 (Fry)");
  });


});
