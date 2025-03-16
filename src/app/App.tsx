import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCurrentUserQuery } from '@entities/user/api/userApi';
import { setUser } from '@entities/user/model/userSlice';
import Cookies from 'js-cookie';
import PrivateRoute from './PrivateRoute';
import Header from '@widgets/Header/Header';
import ArticleFull from '@pages/Article/ArticleFull';
import SignInForm from '@features/auth/ui/SignInForm/SignInForm';
import SignUpForm from '@features/auth/ui/SignUpForm/SignUpForm';
import UserSettings from '@features/userSettings/ui/UserSettings';
import ArticlesList from '@pages/ArticlesList/ArticlesList';
import ArticleForm from '@features/articleEditorForm/ui/ArticleForm';

import './App.less';
import { RootState } from './store';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const { data } = useGetCurrentUserQuery(undefined, { skip: !Cookies.get('token') });

  useEffect(() => {
    if (data?.user) {
      dispatch(setUser({ ...data.user, token: Cookies.get('token') }));
    }
  }, [data, dispatch]);
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ArticlesList />} />
          <Route path="/article/:slug" element={<ArticleFull />} />
          <Route
            path="/sign-in"
            element={isAuthenticated ? <Navigate to="/" replace /> : <SignInForm />}
          />
          <Route
            path="/sign-up"
            element={isAuthenticated ? <Navigate to="/" replace /> : <SignUpForm />}
          />
          <Route path="/profile" element={<PrivateRoute element={<UserSettings />} />} />
          <Route path="/create-article" element={<PrivateRoute element={<ArticleForm />} />} />
          <Route path="/edit-article" element={<PrivateRoute element={<ArticleForm />} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
