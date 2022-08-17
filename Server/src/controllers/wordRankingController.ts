import { Request, Response, NextFunction, IRouter, Router } from 'express';
import { scoresList, wordList } from '../../TestData.json';
import IRank from './../interfaces/IRank';
class WordRankingController {
  // controller router
  private router: IRouter;
  constructor() {
    // initalize router;
    this.router = Router();
    this.initializeRoutes();
  }
  private initializeRoutes() {
    // get WordsList Endpoint
    this.router.get('/words', this.getWords);
    this.router.post('/rank', this.rank);
  }
  private getWords = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    // send words array in json
    let list = [];
    // take copy from original list
    const wordsListCopy = wordList.slice();
    // find and insert adverb
    let index: number = wordsListCopy.findIndex(
      (word) => word.pos === 'adverb',
    );
    list.push(wordsListCopy[index]);
    // remove it from list to avoid duplicates
    wordsListCopy.splice(index, 1);

    // find and insert adjective
    index = wordsListCopy.findIndex((word) => word.pos === 'adjective');
    list.push(wordsListCopy[index]);
    wordsListCopy.splice(index, 1);

    // find and insert noun
    index = wordsListCopy.findIndex((word) => word.pos === 'noun');
    list.push(wordsListCopy[index]);
    wordsListCopy.splice(index, 1);

    // find and insert verb
    index = wordsListCopy.findIndex((word) => word.pos === 'verb');
    list.push(wordsListCopy[index]);
    wordsListCopy.splice(index, 1);

    // fill the rest of the array randomly
    let i: number = 6;
    while (i !== 0) {
      index = Math.floor(Math.random() * wordsListCopy.length);
      list.push(wordsListCopy[index]);
      wordsListCopy.splice(index, 1);
      i--;
    }
    res.status(200).send({ wordsList: list });
  };
  private rank = async (req: Request, res: Response, next: NextFunction) => {
    // fetch score from request body
    const { score }: IRank = req.body;
    // initialize counter
    let count = 0;
    // sort list for better performance
    scoresList.sort(function (a, b) {
      return a - b;
    });
    // count all scores below the given score
    for (let i = 0; i < scoresList.length; i++) {
      if (scoresList[i] < score) {
        count++;
      } else {
        break;
      }
    }
    // calculate rank, round it to nearest hundredth and send it
    const rank = Math.round(100 * ((count * 100) / scoresList.length)) / 100;
    res.send({ rank });
  };
  public getRouter() {
    // provide router to App
    return this.router;
  }
}
export default WordRankingController;
