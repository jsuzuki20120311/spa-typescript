import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppStore } from './app-store';

import { RootComponent } from './components/root.component';
import { ArticleDetailPageComponent } from './components/article-detail-page/article-detail-page.component';
import { ArticleListPageComponent } from './components/article-list-page/article-list-page.component';
import { RegisterArticlePageComponent } from './components/register-article-page/register-article-page.component';
import { UpdateArticlePageComponent } from './components/update-article-page/update-article-page.component';

import { ArticleListPageService } from './services/article-list-page.service';
import { ArticleDetailPageService } from './services/article-detail-page.service';
import { UpdateArticlePageService } from './services/update-article-page.service';
import { RegisterArticlePageService } from './services/register-article-page.service';

import { ArticleDetailPageResolver } from './resolvers/article-detail-page.resolver';
import { ArticleListPageResolver } from './resolvers/article-list-page.resolver';
import { UpdateArticlePageResolver } from './resolvers/update-article-page.resolver';
import { ArticleCardComponent } from './components/article-list-page/article-card/article-card.component';

@NgModule({
  declarations: [
    RootComponent,
    ArticleDetailPageComponent,
    ArticleListPageComponent,
    RegisterArticlePageComponent,
    UpdateArticlePageComponent,
    ArticleCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: ArticleListPageComponent,
        resolve: {
          articleList: ArticleListPageResolver
        }
      },
      {
        path: 'create-article',
        component: RegisterArticlePageComponent
      },
      {
        path: 'article-detail/:id',
        component: ArticleDetailPageComponent,
        resolve: {
          article: ArticleDetailPageResolver
        }
      },
      {
        path: 'update-article/:id',
        component: UpdateArticlePageComponent,
        resolve: {
          article: UpdateArticlePageResolver
        }
      }
    ])
  ],
  providers: [
    AppStore,
    ArticleListPageService,
    ArticleDetailPageService,
    UpdateArticlePageService,
    RegisterArticlePageService,
    ArticleDetailPageResolver,
    ArticleListPageResolver,
    UpdateArticlePageResolver
  ],
  bootstrap: [RootComponent]
})
export class AppModule { }
