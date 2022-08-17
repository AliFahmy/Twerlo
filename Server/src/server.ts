import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as cors from 'cors';
import WordRankingController from './controllers/wordRankingController';

// create express app server instance
const app = express();
const PORT = 5000;
app.use(cors());
// add json body parser for requests
app.use(bodyParser.json());

// create instance form controller
const wordController = new WordRankingController();

// add controller router to app
app.use(wordController.getRouter());

// listen to server in port 5000
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
