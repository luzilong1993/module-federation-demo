import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory,createBrowserHistory } from 'history';
import App from './App';

function mount(el, { onNavigate,defaultHistory,initialPath }) {
    const history = defaultHistory || createMemoryHistory({
        initialEntries:[initialPath]
    });
    if (onNavigate) history.listen(onNavigate);
    ReactDOM.render(<App history={history} />, el);

    return {
        onParentNavigate({ pathname: nextPathname }) {
            const { pathname } = history.location;
            if (nextPathname !== pathname) {
                history.push(nextPathname);
            }
        }
    }
}

if (process.env.NODE_ENV === 'development') {
    const el = document.querySelector('#dev-marketing');
    if (el) {
        mount(el, {defaultHistory: createBrowserHistory()})
    }
}

export { mount }