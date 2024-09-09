import React,{useEffect, useState} from 'react'
import {
    Link,
    NavLink,
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";
  import '../css/libray.css'

  // import img2 from '../assets/2.jpg'

import axios from 'axios';
import BookCard from './bookCard';

export default function BookDetails() {
    const navigate = useNavigate();
    
    const { id } = useParams();

    const [BookData, setBookData] = useState( {})
    const [Loading, setLoading] = useState(true)
    const [Books, setBooks] = useState([])

    const handleNavigation = (id) => {
        navigate(`/library/book/${id}`)
        window.location.reload()
    }

    async function GetBookData() {
        setLoading(true)
        try {
            let collect= await axios({
                url:`https://openlibrary.org/search.json?q=${id}&fields=subject_key,ratings_average,time,place,first_sentence,edition_count,author_name,key,title,first_publish_year,ratings_average,cover_i,author_key,author_name`,
                method:'get',
                headers:{
                Accept:'application/json'
                }
            })

           
            setBookData(collect.data.docs[0])
            await GetAuthorBooks(collect.data.docs[0]?.author_name[0])
        } catch (error) {
          console.log(error);
          
            console.log(error?.response?.data);
            alert("Error Occured")
        }
    }

    async function GetAuthorBooks(authorName) {
        // setLoading(true)
        try {
        let collect= await axios({
            url:`https://openlibrary.org/search.json?author=${authorName}&sort=new&fields=key,title,first_publish_year,cover_i&limit=10`,
            method:'get',
            headers:{
            Accept:'application/json'
            }
        })

        setBooks(collect.data?.docs)

        } catch (error) {
            console.log(error.response.data);
            alert("Not found")
        }finally{
          setLoading(false)
        }
    }

    useEffect(() => {
        GetBookData()
    }, []);

    
    return (
    <div className='libraryDetailBody'>



        {
        Loading&&(<div className="modal-overlay" >
        <div className="modal-content" style={{width:'auto'}} onClick={(e) => e.stopPropagation()}>
        <div style={{flex:1, display:'flex', justifyContent:"center", alignItems:'center', height:'100%'}}>
          <div className="loader">Loading...</div>
        </div>
        </div>
        </div>)
      }
        
        <div className='leftTab'>
      <button className='backBTN' onClick={()=> navigate(-1)}>&#8592;</button>

            {/* right */}
            <div style={{zIndex:2}} className='leftTab-imgcontainer'>
                <img src={`https://covers.openlibrary.org/b/id/${BookData.cover_i}-L.jpg`} />
                {/* <p className='movieFloater'>{((BookData?.ratings_average/5)*100)?.toPrecision(2)}</p> */}
            </div>
                
            <div className='leftTab-bottom'>
                    <div className='top-leftTab-single'>
                        <h3 style={{fontFamily: 30,fontWeight: 700,}}>{BookData?.title}</h3>
                        <ul style={{marginLeft:0}}>
                          <li>{BookData?.first_publish_year}</li>
                          <li>{BookData?.edition_count} Editions</li>
                          {BookData?.place?(<li>{`${BookData?.place[0]}`}</li>):''}
                          {BookData?.time?(<li>{`${BookData?.time[0]}`}</li>):''}
                          {BookData?.place?(<li>{BookData?.place[0]}</li>):''} 
                        </ul>
                    </div>

                    <div className='bottom-topLeft-single'>
                        <h3 style={{fontFamily: 15,fontWeight: 600,}}>First Sentence</h3>
                        <p>{BookData?.first_sentence?`${BookData?.first_sentence[0]}`:''}</p>
                    </div>
            </div>

            
        </div>

        <div className='rightTab'>


            <div >
                <h3 style={{fontWeight:500}}>Book Authors</h3>
                
                <br/>
                {/* list */}
                <ul className='Booklist'>
                    
                    {BookData?.author_name?.map((i,index)=>(
                        <li className='AuthorItemContainer' key={index} >

                            <img src={`https://covers.openlibrary.org/a/olid/${BookData.author_key[index]}-M.jpg`}/>

                            <div className='movieNameContainer' >
                                <h4 style={{height:'auto', lineHeight:'normal', textAlign:'center', color:'black'}}>{i}</h4>
                            </div>
                            {/* <p className='movieFloater'>90</p> */}

                        </li>
                    ))}
                        
                </ul>
            </div>
<hr />
            <div style={{display:'flex',flex:1,flexDirection:'column'}}>
                <h3>Authors Books</h3>
                <br/>

                <ul >
                    
                <>
                  {Books.map((i) => {
                                        
                    return(
                    <div key={i.key} className="book-card" onClick={() => handleNavigation(i.title)}>
                      <img src={`https://covers.openlibrary.org/b/id/${i.cover_i}-L.jpg`} alt={i.title} />
                      <div className='book-info'>
                        <h3>{i.title.length > 18 ? `${i.title.slice(0, 18)}...` : i.title}</h3>
                        <span className='ratings'>
                          ⭐⭐⭐⭐⭐ {i.first_publish_year} . {i.ratings_average?.toPrecision(2)} 
                          {/* <span style={{ color: 'gold' }}></span>  */}
                        </span>
                        <p className='card-p'>{i?.author_name && i.author_name.map((author, index) => `${index !== 0 ? ", " : ""}${author}`)}</p>
                      </div>
                    </div>
                  )})}
                </>
                </ul>
            </div>
        </div>
    </div>
  )
}