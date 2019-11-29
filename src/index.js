import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducer';
import App from './components/App/App';
import './index.css';

const store = createStore(reducer);

ReactDom.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document
        .getElementById('root')
);