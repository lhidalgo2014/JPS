import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import AccountMoney from './components/accountMoney/AccountMoney';
// import RegisterSorteo from './components/registerSorteo/RegisterSorteo';
import Search from './components/search/Search';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    {/* <AccountMoney /> */}
    {/* <RegisterSorteo /> */}
    <Search />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
