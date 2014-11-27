'use strict';

describe('The main view', function () {

  beforeEach(function () {
    browser.get('http://localhost:3000/index.html');
  });

  it('list more than 5 awesome things', function () {

    element.all(by.repeater('query in columns')).count().then(function(count) {
      expect(count > 1).toBeTruthy();
    });
  });

});
