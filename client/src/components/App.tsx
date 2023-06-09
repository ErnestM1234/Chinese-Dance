import React, { useEffect } from 'react';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Search from './pages/Search';
import Article from './pages/Article';
import CreateArticle from './pages/CreateArticle';
import WebFont from 'webfontloader';
import Articles from './pages/Articles';
import Landing from './pages/Landing';
import About from './pages/About';
import Author from './pages/Author';


const App = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Droid Sans', 'Chilanka']
      }
    });
   }, []);


  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/create" element={<CreateArticle/>} />
        <Route path="/search" element={<Search/>}/>
        <Route path="/article" element={<Article/>}/>
        <Route path="/articles" element={<Articles/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/author" element={<Author/>}/>
      </Routes>
    </>
  );
};

export default App;