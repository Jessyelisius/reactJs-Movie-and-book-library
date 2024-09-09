import React from 'react';
import SingleBook from '../library/bookDetails';


const BookPage = ({ id }) => {
  return <SingleBook match={id} />;
};

export default BookPage;
