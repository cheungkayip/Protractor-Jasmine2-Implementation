let AngularPage = require('../pageobjects/AngularPage.js');
describe('angularjs homepage todo list', function() {

    var page;

    beforeEach(function() {
       page = new AngularPage();
    });


    it('should greet the named user', function () {
        page.typeName('Julie');
        expect(page.greeting).toEqual('Hello Julie!');
    });


    describe('todo list',function () {

        it('should list todos', function () {
           expect(page.todoList.count()).toEqual(2);
           expect(page.todoAt(1)).toEqual('build an AngularJS app');
        });

        it('should add a todo', function() {
            page.addTodo('write a protractor test');
            expect(page.todoList.count()).toEqual(3);
            expect(page.todoAt(2)).toEqual('write a protractor test');
        });
    });


});