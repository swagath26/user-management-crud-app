import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import List from './components/List';
import UserView from './components/UserView';
import { ListContext, ListProvider } from './context/listContext';
import UserViewWrapper from './components/UserViewWrapper';
import ScrollOnNav from './components/ScrollOnNav';
import Deleted from './components/Deleted';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="absolute z-10 top-0 bg-slate-200 h-[10vh] w-full">
          <Navbar />
        </header>

        <ScrollOnNav />

        <main className='min-h-[100vh] w-full pt-[10vh] relative'>
          <ListProvider>
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/home' element={<Home />}></Route>
              <Route path='/list' element={<List />}></Route>
              <Route path='/deleted' element={<Deleted />}></Route>
              <Route path='/list/:id' element={<List />}></Route>
              <Route path='/user-view' element={<UserViewWrapper />}></Route>
              <Route path='/user-view/:id' element={<UserViewWrapper />}></Route>
            </Routes>
          </ListProvider>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;