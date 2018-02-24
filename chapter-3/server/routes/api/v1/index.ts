import * as express from 'express';
import article from './article';

const v1 = express.Router();
v1.use('/article', article);

export default v1;
