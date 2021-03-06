import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

import {AnswerEdit} from './page/answer-edit';
import {Applicant} from './page/applicant';
import {Article} from './page/article';
import {ArticleEdit} from './page/article-edit';
import {ApplySuccess} from './page/apply-success';
import {BestForYou} from './page/best-for-you';
import {Company} from './page/company';
import {ComingSoon} from './page/coming-soon';
import {Connection} from './page/connection';
import {CreateResume} from './page/create-resume';
import {Discovery} from './page/discovery';
import {Footer} from './page/footer';
import {Header} from './page/header';
import {Job} from './page/job';
import {JobForYou} from './page/job-for-you';
import {Login} from './page/login';
import {My} from './page/my';
import {Notification} from './page/notification';
import {OnlineApplication} from './page/online-application';
import {PageNoFound} from './page/page-no-found';
import {Playground} from './page/playground';
import {Question} from './page/question';
import {QuestionEdit} from './page/question-edit';
import {Register} from './page/register';
import {Review} from './page/review';
import {ReviewEdit} from './page/review-edit';
import {Search} from './page/search';
import {SendPdfResumeTo} from './send-pdf-resume-to';
import {SubmitDone} from './page/submit-done';
import {store} from './redux/store';
import {UserReview} from './page/review-user';

/*
import * as actionJs from './redux/action';
import {get, isLogin} from './tool/api-helper';

if (isLogin()) {
  get('/token').then((data) => {
    store.dispatch(actionJs.creator(
      actionJs.type.userId,
      data.status.code === 2000 ? data.content.id : null
    ));
  });
}
*/

export class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Header />
            <div style={{minHeight: 'calc(100vh - 5vw - 5vw)'}}>
              <Switch>
                <Route
                  path="/"
                  exact
                  component={() => <Redirect to="/discovery" />}
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
                  path="/applicant/:id"
                  component={routeProps => <Applicant {...routeProps} />}
                />
                <Route
                  path="/applySuccess"
                  component={routeProps => <ApplySuccess {...routeProps} />}
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
                  path="/comingsoon"
                  component={routeProps => <ComingSoon {...routeProps} />}
                />
                <Route
                  path="/connection"
                  component={routeProps => <Connection {...routeProps} />}
                />
                <Route
                  path="/discovery"
                  component={routeProps => <Discovery {...routeProps} />}
                />
                <Route
                  path="/job/:id"
                  component={routeProps => <Job {...routeProps} />}
                />
                <Route
                  path="/job-for-you"
                  component={routeProps => <JobForYou {...routeProps} />}
                />
                <Route
                  path="/login"
                  component={routeProps => <Login {...routeProps} to="/my" />}
                />
                <Route
                  path="/my"
                  component={routeProps => <My {...routeProps} />}
                />
                <Route
                  path="/notification"
                  component={routeProps => <Notification {...routeProps} />}
                />
                <Route
                  path="/page-no-found"
                  component={routeProps => <PageNoFound {...routeProps} />}
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
                  path="/register"
                  component={routeProps => <Register {...routeProps} to="/" />}
                />
                <Route
                  path="/review/:id/edit"
                  component={routeProps => <ReviewEdit {...routeProps} create={false} />}
                />
                <Route
                  path="/review/create"
                  component={routeProps => <ReviewEdit {...routeProps} create={true} />}
                />
                <Route
                  path="/review/:id"
                  component={routeProps => <Review {...routeProps} />}
                />
                <Route
                  path="/search"
                  component={routeProps => <Search {...routeProps} />}
                />
                <Route
                  path="/send-pdf-resume-to/:id"
                  component={routeProps => <SendPdfResumeTo {...routeProps} />}
                />
                <Route
                  path="/user-review/:id"
                  component={routeProps => <UserReview{...routeProps} />}
                />

                {/* ====== path might change: BEGIN ====== */}
                <Route
                  path="/submit-done"
                  component={routeProps => <SubmitDone {...routeProps} />}
                />

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
                <Redirect to="/page-no-found" />
              </Switch>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
