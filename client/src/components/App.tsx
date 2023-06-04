import React from 'react';
import CreateLink from './pages/CreateLink';
import Header from './components/Header';
import LinkList from './components/LinkList';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Article from './pages/Article';
import CreateArticle from './pages/CreateArticle';


const App = () => {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Routes>
          <Route path="/" element={<LinkList/>} />
          <Route
            path="/create"
            element={<CreateArticle/>}
          />
          <Route
            path="/create"
            element={<CreateLink/>}
          />
          <Route path="/login" element={<Login/>} />
          <Route path="/search"element={<Search/>}/>
          <Route path="/article"element={<Article id={1}/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default App;