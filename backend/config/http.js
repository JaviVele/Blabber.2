const cors = require('cors');


module.exports.http = {
  middleware: {
    order: [
      // ...
      'cors',
      // ...
      'router',

      'bodyParser',
      // ...
    ],
    // ...
    cors: (function() {
      const corsOptions = {
        origin: 'http://localhost:4200',
        credentials: false,
        methods: 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
        headers: 'Content-Type',
        optionsSuccessStatus: 200,
      };
      return cors(corsOptions);
    })(),

    bodyParser: (function() {
      var opts = {
        limit: '5mb',
        extended: true,
      };
      return require('body-parser').urlencoded(opts);
    })
    // ...
  },
  // ...
};
