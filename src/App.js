import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

import {AnswerEdit} from './page/answer-edit';
import {Article} from './page/article';
import {ArticleEdit} from './page/article-edit';
import {BestForYou} from './page/best-for-you';
import {Company} from './page/company';
import {Connection} from './page/connection';
import {CreateResume} from './page/create-resume';
import {Footer} from './page/footer';
import {Header} from './page/header';
import {Help} from './page/help';
import {Job} from './page/job';
import {Login} from './page/login';
import {OnlineApplication} from './page/online-application';
import {Promotion} from './page/promotion';
import {PageNoFound} from './page/page-no-found';
import {Playground} from './page/playground';
import {Question} from './page/question';
import {QuestionEdit} from './page/question-edit';
import {Search} from './page/search';
import {Video} from './page/video';
import {VideoEdit} from './page/video-edit';
import {store} from './redux/store';
import * as actionJs from './redux/action';

import {languageHelper} from './tool/language-helper';

window.onresize = () => {
  store.dispatch(actionJs.creator(
    actionJs.type.bodyClientWidth,
    document.body.clientWidth
  ));
};

export class App extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = App.i18n[languageHelper()];
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route
                path="/"
                exact
                component={() => <Redirect to="/playground" />}
              />
              <Route
                path="/article/:id/edit"
                component={routeProps => <ArticleEdit {...routeProps} create={false} />}
              />
              <Route
                path="/article/create"
                component={routeProps => <ArticleEdit {...routeProps} create={true} />}
              />
              <Route
                path="/article/:id"
                component={routeProps => <Article {...routeProps} />}
              />
              <Route
                path="/best-for-you"
                component={routeProps => <BestForYou {...routeProps} />}
              />
              <Route
                path="/company/:id"
                component={routeProps => <Company {...routeProps} />}
              />
              <Route
                path="/connection/:id"
                component={routeProps => <Connection {...routeProps} />}
              />
              <Route
                path="/help"
                component={routeProps => <Help {...routeProps} />}
              />
              <Route
                path="/job/:id"
                component={routeProps => <Job {...routeProps} />}
              />
              <Route
                path="/login"
                component={routeProps => <Login {...routeProps} />}
              />
              <Route
                path="/promotion"
                component={routeProps => <Promotion {...routeProps} />}
              />
              <Route
                path="/question/:qid/answer/:aid/edit"
                component={routeProps => <AnswerEdit {...routeProps} create={false} />}
              />
              <Route
                path="/question/:qid/answer/create"
                component={routeProps => <AnswerEdit {...routeProps} create={true} />}
              />
              <Route
                path="/question/:qid/answer/:aid"
                component={routeProps => <Question {...routeProps} />}
              />
              <Route
                path="/question/:qid/edit"
                component={routeProps => <QuestionEdit {...routeProps} create={false} />}
              />
              <Route
                path="/question/create"
                component={routeProps => <QuestionEdit {...routeProps} create={true} />}
              />
              <Route
                path="/question/:qid"
                component={routeProps => <Question {...routeProps} />}
              />
              <Route
                path="/search"
                component={routeProps => <Search {...routeProps} />}
              />
              <Route
                path="/video/:id/edit"
                component={routeProps => <VideoEdit {...routeProps} create={false} />}
              />
              <Route
                path="/video/create"
                component={routeProps => <VideoEdit {...routeProps} create={true} />}
              />
              <Route
                path="/video/:id"
                component={routeProps => <Video {...routeProps} />}
              />
              {/* ====== path might change: BEGIN ====== */}
              <Route
                path="/create-resume"
                component={routeProps => <CreateResume {...routeProps} />}
              />
              <Route
                path="/online-application"
                component={routeProps => <OnlineApplication {...routeProps} />}
              />
              {/* ====== path might change: END ====== */}
              {/* ====== playground: BEGIN ====== */}
              <Route
                path="/playground"
                component={routeProps => <Playground {...routeProps} />}
              />
              {/* ====== playground: END ====== */}
              <Route
                path="/page-no-found"
                component={routeProps => <PageNoFound {...routeProps} />}
              />
              <Redirect to="/page-no-found" />
            </Switch>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

App.i18n = [
  {},
  {}
];

App.propTypes = {};
