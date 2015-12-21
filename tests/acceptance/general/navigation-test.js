import { test } from 'qunit';
import moduleForAcceptance from 'razer-cars-app/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | general/navigation');

test('visiting /general/navigation', function(assert) {
  visit('/general/navigation');

  andThen(function() {
    assert.equal(currentURL(), '/general/navigation');
  });
});
