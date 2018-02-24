import * as bodyParser from 'body-parser';
import 'ejs';
import * as express from 'express';
import * as path from 'path';
import api from './routes/api';
import index from './routes/index';

/**
 * Expressアプリケーションオブジェクト
 * @type {Express}
 */
const app = express();

// テンプレートエンジンに ejs を使用するための設定
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 静的ファイルのルーティング
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', api);

// 404のルーティング
app.use((req, res, next) => {
  const err = {
    status: 404,
    message: 'Not Found.'
  };
  next(err);
});

// エラーハンドラ
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  err.status = err.status || 500;
  res.status(err.status);
  if (req.xhr) {
    res.send({ status: err.status, message: err.message });
  } else {
    res.render('error', { status: err.status, message: err.message });
  }
});

export default app;
