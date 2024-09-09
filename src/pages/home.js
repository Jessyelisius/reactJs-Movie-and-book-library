import React, { useState, useEffect } from 'react';
// import { searchBooks } from '../api';
import BookCard from '../library/bookCard';
import axios from 'axios';
import '../css/libray.css';
import { Link, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';



const Home = () => {
  const [books, setBooks] = useState([]);

  const navigate = useNavigate();


  const [modal, setModal] = useState(true)
  
  const [genre, setGenre] = useState('')

  const [FilteredBooks, setFilteredBooks] = useState([])

  const [SearchInput, setSearchInput] = useState('')
  
  const [search, setSearch] = useState('Title')
  // const [query, setQuery] = useState('react');

  function switchSearch (){
    setSearch(search=='Title'?"Author":"Title")
  }

  // useEffect(() => {
  //   GetData();
  // }, []);

  async function GetData() {
    try {
        let Intigration = await axios({
            // url:'https://openlibrary.org/search.json?q=action',
            url:`https://openlibrary.org/search.json?q=${genre?genre:"action"}&fields=author_name,key,title,first_publish_year,ratings_average,cover_i`,
            method:'get',
            headers:{
              Accept: 'application/json'
            }
        })

        setBooks(Intigration.data.docs)
        setFilteredBooks(Intigration.data.docs)
    } catch (error) {
        console.error(error)
        alert("Error fetching books")
      }
    }

    useEffect(() => {
      if(genre.length>1)setModal(false)
        GetData(genre)
    },[genre]);


    useEffect(() => {
      let filter = search == 'Title'?(
        books.filter(i=>((i.title).toLowerCase()).includes(SearchInput?.toLowerCase()))
      ):(
        books.filter(i => {
          let authorSearch = false;

          if(i.author_name) {
            i.author_name.forEach(x =>{
              if(x.toLowerCase().includes(SearchInput?.toLocaleLowerCase())){
                authorSearch = true;
              }
            });
          }

          return authorSearch;
        })
      )
      setFilteredBooks(filter)
    }, [SearchInput, search, books]);


  return (
    <div className='home-wrapper'>
        <div className='search-bar'>
          <input 
            type="text" 
            placeholder={`Search for books...${search}`}
            onChange={(e) => setSearchInput(e.target.value)}
          />

        <div className='searchOptionDiv'>
              <button onClick={()=>setModal(true)}>
                Search genre
              </button>
              <button value={genre} onClick={switchSearch}>
                Search {search=='Title'?"Author":"Title"}
              </button>
        </div>
      </div>

        {
        modal&&(<div className="modal-overlay" onClick={()=>setModal(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={()=>setModal(false)}>×</button>
          <div>
            <u><h3 style={{textAlign:'center'}}>Select genre</h3></u>
            <br/>
            <select onChange={(e)=>setGenre(e.target.value)} style={{textAlign:'center', width:'100%', borderRadius:5}}>
              <option value="">Select Genre</option>
              <option value="fiction">Fiction</option>
              <option value="mystery">Mystery</option>
              <option value="fantasy">Fantasy</option>
              <option value="science-fiction">Science Fiction</option>
              <option value="biography">Biography</option>
              <option value="non-fiction">Non-Fiction</option>
              <option value="historical">Historical</option>
              <option value="romance">Romance</option>
              <option value="thriller">Thriller</option>
              <option value="self-help">Self-Help</option>
              <option value="children">Children's</option>
              <option value="young-adult">Young Adult</option>
              <option value="poetry">Poetry</option>
              <option value="horror">Horror</option>
              <option value="graphic-novel">Graphic Novel</option>
              <option value="drama">Drama</option>
              <option value="action">Action</option>
              <option value="comedy">Comedy</option>

            </select>
          </div>
        </div>
        </div>)
      }

    

        <div className="book-grid">
          <BookCard FilteredBooks={FilteredBooks} />
          <h5 style={{color:'white', textAlign:'center'}}>End of Result</h5>
        </div>



        <div className='filter-area'>
            <button>reset all</button>
              <div className='filter-section'>

              </div>
        </div>
    </div>
  );
};

export default Home;
