import * as bodyParser from 'body-parser';
import * as express from 'express';
import WordRankingController from './controllers/wordRankingController';

// create express app server instance
const app = express();

// add json body parser for requests
app.use(bodyParser.json());

// create instance form controller
const wordController = new WordRankingController();

// add controller router to app
app.use(wordController.getRouter());

// listen to server in port 5000
app.listen(5000, () => {
  console.log('listen');
});
