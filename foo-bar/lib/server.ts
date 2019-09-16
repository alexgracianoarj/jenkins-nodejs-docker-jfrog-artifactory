import App from './config/app';
import * as http from 'http';
import * as https from 'https';

const PORT = process.env.PORT;
http.createServer(App).listen(PORT, () => console.log('Server started at port ' + PORT));

module.exports = App;