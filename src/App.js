import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

import {AnswerEdit} from './page/answer-edit';
import {Footer} from './page/footer';
import {Header} from './page/header';
import {PageNoFound} from './page/page-no-found';
import {Playground} from './page/playground';
import {Question} from './page/question';
import {QuestionEdit} from './page/question-edit';
import {Search} from './page/playground/yu3tong/page/search';
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
                path="/question/:qid/answer/:aid/edit"
                component={routeProps => <AnswerEdit{...routeProps} create={false} />}
              />
              <Route
                path="/question/:qid/answer/create"
                component={routeProps => <AnswerEdit{...routeProps} create={true} />}
              />
              <Route
                path="/question/:qid/answer/:aid"
                component={routeProps => <Question {...routeProps} />}
              />
              <Route
                path="/question/:qid/edit"
                component={routeProps => <QuestionEdit{...routeProps} create={false} />}
              />
              <Route
                path="/question/create"
                component={routeProps => <QuestionEdit{...routeProps} create={true} />}
              />
              <Route
                path="/question/:qid"
                component={routeProps => <Question {...routeProps} />}
              />
              <Route
                path="/search"
                component={routeProps => <Search {...routeProps} />}
              />
              {/* ====== playground BEGIN====== */}
              <Route
                path="/playground"
                component={routeProps => <Playground {...routeProps} />}
              />
              {/* ====== playground END====== */}
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
