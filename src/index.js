import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import store from './redux-file/store.js'
import { HashRouter ,BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import './mock'
import './assets/index.less'

import qs from 'qs';
import { addLocaleData, IntlProvider, FormattedMessage } from 'react-intl';
import scriptjs from 'scriptjs';

const locale = qs.parse(location.search && location.search.slice(1)).locale || 'en-US';
const localePrefix = locale.slice(0, locale.indexOf('-'));

const scripts = [];

if (!window.Intl) {
    // should output by server by <script>
    scripts.push(`https://as.alipayobjects.com/g/component/intl/1.0.1/Intl.js`);
    scripts.push(`https://as.alipayobjects.com/g/component/intl/1.0.1/locale-data/jsonp/en-US.js`);
    // the following should be output by server template conditionally by <script>
    if (locale !== 'en-US') {
      scripts.push(`https://as.alipayobjects.com/g/component/intl/1.0.1/locale-data/jsonp/${locale}.js`);
    }
    // end
  }
  // should output by server by <script>
  scripts.push(`https://as.alipayobjects.com/g/component/react-intl/2.0.0/locale-data/en.js`);
  // the following should be output by server template conditionally by <script>
  if (localePrefix !== 'en') {
    scripts.push(`https://as.alipayobjects.com/g/component/react-intl/2.0.0/locale-data/${localePrefix}.js`);
  }
  // end

console.log(scripts)

  const ready = () => {
    // addLocaleData(window.ReactIntlLocaleData[localePrefix]);
    window.app = {
        // output by server conditional
        'zh-Hans-CN': {
            'app.zh': '选择中文',
            'app.en': '选择英文',
        },
        'en-US': {
            'app.zh': 'choose chinese',
            'app.en': 'choose english',
        },
    };
    const defaultApp = window.app['en-US'];
    // const Test = React.createClass({
    //     render() {
    //       return (<div>
    //         <p>
    //           npm install react-intl@2.0.0
    //         </p>
    //         <p>
    //           <a href="?locale=en-US"><FormattedMessage
    //             id="app.en"
    //             defaultMessage={defaultApp['app.en']}
    //           /></a>
    //         </p>
    //         <p>
    //           <a href="?locale=zh-Hans-CN"><FormattedMessage
    //             id="app.zh"
    //             defaultMessage={defaultApp['app.zh']}
    //           /></a>
    //         </p>
    //       </div>);
    //     },
    //   });
      ReactDOM.render(
        <HashRouter>
            <IntlProvider
            locale={locale}
            messages={window.app[locale] || defaultApp}
            >
                <Provider store={store}>
                    <App ></App>
                </Provider>
            </IntlProvider>
        </HashRouter>,
        document.querySelector('#root')
    )

  }
  
if (scripts.length) {
    scriptjs(scripts, ready);
  } else {
    ready();
  }

// ReactDOM.render(
//     <HashRouter>
//         <Provider store={store}><App ></App></Provider>
//     </HashRouter>,
//     document.querySelector('#root')
// )