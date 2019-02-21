import {TodoPage} from './todo-list.po';
import {browser, protractor} from 'protractor';

let origFn = browser.driver.controlFlow().execute;

//https://hassantariqblog.wordpress.com/2015/11/09/reduce-speed-of-angular-e2e-protractor-tests/
browser.driver.controlFlow().execute = function () {
    let args = arguments;

    // queue 100ms wait between test
    //This delay is only put here so that you can watch the browser do its' thing.
    //If you're tired of it taking long you can remove this call
    origFn.call(browser.driver.controlFlow(), function () {
        return protractor.promise.delayed(0);
    });

    return origFn.apply(browser.driver.controlFlow(), args);
};

describe('Todo list', () => {
    let page: TodoPage;

    beforeEach(() => {
        page = new TodoPage();
    });

    it('should get and highlight Todo Name attribute ', () => {
        page.navigateTo();
        expect(page.getTodoTitle()).toEqual('Todos');
    });

    it('should type something in filter owner box and check that it returned correct element', () => {
        page.navigateTo();
        page.typeAnOwner("r");
        expect(page.getUniqueTodo("58895985c1849992336c219b")).toEqual("58895985c1849992336c219b (Fry)");
        page.backspace();
        page.typeAnOwner("Workman")
        expect(page.getUniqueTodo("5889598528c4748a0292e014")).toEqual("5889598528c4748a0292e014 (Workman)");
        for (let i = 0; i < 7; i++) {
          page.backspace();
        }
        page.typeAnOwner("b")
        expect(page.getUniqueTodo("58895985a22c04e761776d54")).toEqual("58895985a22c04e761776d54 (Blanche)");
    });

    it('should type something in filter body box and check that it returned correct element', () => {
        page.navigateTo();
        page.typeABody("non");
        expect(page.getUniqueTodo("58895985a22c04e761776d54")).toEqual("58895985a22c04e761776d54 (Blanche)");
        for (let i = 0; i < 3; i++) {
          page.backspace();
        }
        page.typeABody("ut in")
        expect(page.getUniqueTodo("5889598585bda42fb8388ba1")).toEqual("5889598585bda42fb8388ba1 (Blanche)");
        for (let i = 0; i < 5; i++) {
          page.backspace();
        }
        page.typeABody("commodo quis")
        expect(page.getUniqueTodo("58895985a22c04e761776d54")).toEqual("58895985a22c04e761776d54 (Blanche)");
    });

//    TODO: Owner name filtering in combination with STATUS and BODY
});
