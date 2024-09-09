import React,{useEffect, useState} from 'react'
import {
    Link,
    NavLink,
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";
//   import img2 from '../assets/2.jpg'
import '../css/cast.css'
import axios from 'axios';

export default function Cast() {
    const navigate = useNavigate();
    
    const { idMovie } = useParams();


    // selected movie data 
    const [MovieData, setMovieData] = useState()
    const [movies2, setMovies2] = useState([])

    //api to get selected movie
    async function GetData() {
        try {
            let Intigrate= await axios({
                url:`https://www.omdbapi.com/?apikey=ae200cc9&i=${idMovie}`,
                headers:{
                    Accept:'application/json'
                },
                method:'get'
            })

            let Data= Intigrate.data

            if(Data.Response!='True'){
                navigate(-1)
                return alert("Invalid Movie")
            }

            setMovieData(Intigrate.data)

            GetApi(setMovies2,Data.Genre.split(',')[0])
        } catch (error) {
            console.log(error);
            alert("Network error")
        }
    }

    //get list of related movie
    async function GetApi(setstate, srch) {
        try {
            let Intigrate= await axios({
                url:`https://www.omdbapi.com/?apikey=ae200cc9&s=${srch}`,
                headers:{
                    Accept:'application/json'
                },
                method:'get'
            })

            setstate(Intigrate.data.Search)
        } catch (error) {
            console.log(error);
            alert("Network error")
        }
    }

    const handleNavigate = (id) => {
        navigate(`/movie/${id}`)
        window.location.reload()
    }

    

    useEffect(() => {
        GetData()
    }, []);

    return (
    <div className='singleMovieBody'>
        
        {/* top tab */}
        <div className='topTab-single'>
            <div style={{width:'100%', height:'300px', position:'absolute', backgroundColor:'black', opacity:0.8,zIndex:0,left:0 }}/>
            {/* left */}
            <div style={{zIndex:2}} className='topLeft-single'>

                
                    <div className='top-topLeft-single'>
                        <button onClick={()=> navigate(-1)}>Back</button>
                        <h3>{MovieData?.Title}</h3>
                        <span>{MovieData?.Released}</span>
                    </div>

                    <div className='bottom-topLeft-single'>
                        <h3>Overview</h3>
                        <p>{MovieData?.Plot}</p>
                    </div>
            </div>

            {/* right */}
            <div style={{zIndex:2}} className='topRight-single'>
                <img src={MovieData?.Poster} />
                <p className='movieFloater'>{(MovieData?.imdbRating/10)*100}</p>
            </div>
        </div>

        <div className='movieBody'>
            {/* popular */}
            <div >
                <h3 style={{fontWeight:400}}>Top Billed Cast</h3>
                
                <br/>
                {/* list */}
                <ul>
                    
                    {MovieData?.Actors?.split(',')?.map((i,index)=>(
                        <li key={index} >

                            <img src={MovieData?.Poster} className='authorImg' style={{height:120,borderRadius:'100px'}} />

                            <div className='movieNameContainer'>
                                <h4>{i}</h4>
                                <span>Actor</span>
                            </div>

                        </li>
                    ))}
                        
                    {MovieData?.Director?.split(',')?.map((i,index)=>(
                        <li key={index} >

                            <img src={MovieData?.Poster} className='authorImg' style={{height:120,borderRadius:'100px'}} />

                            <div className='movieNameContainer'>
                                <h4>{i}</h4>
                                <span>Director</span>
                            </div>

                        </li>
                    ))}

                    {MovieData?.Writer?.split(',')?.map((i,index)=>(
                        <li key={index} >

                            <img src={MovieData?.Poster} className='authorImg' style={{height:120,borderRadius:'100px'}} />

                            <div className='movieNameContainer'>
                                <h4>{i}</h4>
                                <span>Writer</span>
                            </div>

                        </li>
                    ))}

                </ul>
            </div>

            {/* toprated */}
            <div>
                <h3>Related movies</h3>
                <br/>

                {/* list */}
                <ul>
                    
                    {movies2.map(i=>(
                        <li onClick={()=> handleNavigate(i.imdbID)}  key={i.imdbID}>

                            <img src={i.Poster} />

                            <div className='movieNameContainer'>
                                <h4>{i.Title.length>10?`${i.Title.slice(0,10)}...`:i.Title}</h4>
                                <span>Year: {i.Year}</span>
                            </div>
                            <p className='movieFloater'>90</p>

                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  )
}
