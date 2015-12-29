import Mirage from 'ember-cli-mirage';

export default function() {
  this.get('/carTypes', ['carTypes', 'inventoryHistories']);
  this.post('/carTypes');

  this.get('carTypes/:id', ['carType', 'inventoryHistories']);
  this.put('carTypes/:id');
  this.delete('carTypes/:id');

  this.get('inventoryHistories/:id');
  this.post('inventoryHistories');
  this.put('inventoryHistories/:id');

  this.post('/oauth/token', function(server, req) {
    var data = req.requestBody.split('&').reduce((carry, current) => {
      var [key, value] = current.split('=');

      carry[key] = decodeURIComponent(value);

      return carry;
    }, {});

    if (data.username !== 'valid@example.com' || data.password !== 'password1234') {
      return new Mirage.Response(401, {}, ('error: invalid credentials'));
    }
    //ONLY SENT FOR VALID@EXAMPLE.COM
    return {
      // jscs: disable
      token_type: 'bearer',
      access_token: 'f1c5cb890586fea033c22b2ceff75f3fb6d37321',
      expires_in: 3600,
      refresh_token: '62fdd7267cba4e3a5784989acbd3a51f18ad0a05',
      // jscs: enable
    };
  });
}

/*
You can optionally export a config that is only loaded during tests
export function testConfig() {

}
*/
