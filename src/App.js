// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Contact from './directory/contact';
import List from './movie/list';
import Home from './pages/home';
import BookPage from './pages/bookPage';
import Cast from './movie/casts';
import BookDetails from './library/bookDetails';



function App() {

  return (
    <div>
        <Router>
          <Routes>

            <Route path="/contact" element={<Contact/>}/>

            <Route path="/" element={<List/>}/>
            <Route path="/movie/:idMovie" element={<Cast/>}/>

           
              <Route exact path="/home" element={<Home/>} />

              <Route path="/library/book/:id" element={<BookDetails/>} />
           

           </Routes>

        </Router>
    </div>

  )
}

export default App;

