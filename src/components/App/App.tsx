import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Header from '../Header/Header';
import ArticleFull from '../Article/ArticleFull';
import SignInForm from '../SignInForm/SignInForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import UserProfile from '../UserProfile/UserProfile';
import ArticlesList from '../ArticlesList/ArticlesList';

import './App.less';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ArticlesList />} />
          <Route path="/article/:slug" element={<ArticleFull />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
