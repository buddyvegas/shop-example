import ReactDOM from 'react-dom';
import App from './App';
import { worker } from 'mocks/browser';

import './index.scss';

worker.start();
ReactDOM.render(<App />, document.getElementById('root'));
