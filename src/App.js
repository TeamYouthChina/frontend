import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

import {Footer} from './page/playground/general-component/footer';
import {Header} from './page/playground/general-component/header';
import {PageNoFound} from './page/page-no-found';
import {Playground} from './page/playground';
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
                path="/page-no-found"
                component={routeProps => <PageNoFound {...routeProps} />}
              />
              {/* ====== playground BEGIN====== */}
              <Route
                path="/playground"
                component={routeProps => <Playground {...routeProps} />}
              />
              {/* ====== playground END====== */}
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
