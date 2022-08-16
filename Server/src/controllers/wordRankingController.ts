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
    res.status(200).send({ wordsList: wordList });
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
    const rank = Math.round(100 * (count / scoresList.length) * 100) / 100;
    res.send({ rank });
  };
  public getRouter() {
    // provide router to App
    return this.router;
  }
}
export default WordRankingController;
