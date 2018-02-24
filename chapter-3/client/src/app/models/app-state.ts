import { Article } from './article';

export interface AppState {

  articles?: Article[];

  showLoading?: boolean;

  currentShowArticle?: Article;

  currentUpdateArticle?: Article;
}
