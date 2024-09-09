import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";




const List = () => {

  const navigate = useNavigate();

    const [searchInput, setsearchInput] = useState(''); 
    const [searchData, setSearchData] = useState([]); 
    const [popular, setpopular] = useState([]);
    const [topRated, setTopRated] = useState([]);


    let config = {
        headers:{Accept:'application/json'}
    };

    const fetchData = () =>{
        let url = "https://www.omdbapi.com/?apikey=3f98c445&s=action";
        axios.get(url, config).then((result)=>{
            if(result.data.Search.length > 0){
                setpopular(result.data.Search);
            }
        })
        .catch((error) => {
            console.log(error.message);
            
        })
    }

    const fetchTopData = () => {
        let url = "https://www.omdbapi.com/?apikey=3f98c445&s=romance";
        axios.get(url, config).then((result)=>{
            if(result.data.Search.length !==0){
                setTopRated(result.data.Search);
            }
        }).catch((error)=>{
            console.log(error.message);
            
        })
    }

    useEffect(()=>{
        fetchData();
        fetchTopData();
    },[]);

    useEffect(() => {
      const datas = [...topRated, ...popular];
      const filters = datas.filter(i=>((i.Title)?.toLowerCase())?.includes(searchInput.toLowerCase()));
      setSearchData(filters);
    }, [searchInput]);
    
    return (
        <div>
            <div className="topbar">

                <div className="search-area">
                    <input onChange={(e)=>setsearchInput(e.target.value)} type="text" className='search-input' placeholder='search movie'/>
                    <span className="white">X</span>
                </div>

            
                {searchInput.length > 0 && (
                  <div className="search-wrapper">
                    {searchData.map(item => (
                      <a onClick={()=>navigate(`/movie/${item.imdbID}`)}> <h3>{item.Title}</h3><span>{item.Year}</span></a>
                    ))}
                    
                   
                  </div>

                )}
                
            </div>
        
      
      <div className="main-content">
        <h1 className="White">Popular</h1>
        <div className="movie-container">
          {popular &&
            popular.map((movie, index) => (
              <div onClick={()=>navigate(`/movie/${movie.imdbID}`)} className="card-wrapper" key={index}>
                <img src={movie.Poster} alt="" />
                <div className="rating">
                  <span>64</span>
                </div>
                <h5>{movie.Title}</h5>
                <span>Year: {movie.Year}</span>
              </div>
            ))}
        </div>

        <h1 className="White mt-5">Top Rated</h1>
        <div className="movie-container">
          {topRated &&
            topRated.map((movie, index) => (
              <div onClick={()=>navigate(`/movie/${movie.imdbID}`)} className="card-wrapper" key={index}>
                <img src={movie.Poster} alt="" />
                <div className="rating">
                  <span>64</span>
                </div>
                <h5>{movie.Title}</h5>
                <span>Year: {movie.Year}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default List;