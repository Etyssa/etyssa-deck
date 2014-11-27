'use strict';

describe('The main view', function () {

  beforeEach(function () {
    browser.get('http://localhost:3000/index.html');
  });

  it('show 5 columns', function () {

    element.all(by.repeater('query in columns')).each(
        function(u) {
            u.getSize().then(function(e) {
                expect(e.height > 100).toBeTruthy();
            });
        }
    );

    element.all(by.repeater('query in columns')).count().then(function(count) {
      expect(count > 1).toBeTruthy();
    });
  });

});
