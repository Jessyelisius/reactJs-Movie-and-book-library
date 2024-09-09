import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/libray.css';

const BookCard = ({ FilteredBooks }) => {
  const navigate = useNavigate(); // Import the useNavigate hook

  return (
    <>
      {FilteredBooks.map((i) => (
        <div key={i.key} className="book-card" onClick={() => navigate(`/library/book/${i.title}`)}>
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
      ))}
    </>
  );
};

export default BookCard;
