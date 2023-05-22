const cors = require('cors');


module.exports.http = {
  middleware: {
    order: [
      // ...
      'cors',
      // ...
      'router',
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
    // ...
  },
  // ...
};
