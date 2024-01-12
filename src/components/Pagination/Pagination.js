// Import necessary modules
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../Pagination/Pagination.css';

// Define the Pagination component
function Pagination({ currentUser, pageNumber, setPageNumber }) {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { pagenumber } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setInputValue(pagenumber || '');
  }, [pagenumber]);

  const handlePageClick = (page) => {
    setPageNumber(page);
  };

  const handleMoreClick = () => {
    setShowInput(true);
  };

  const handleInputChange = (event) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, '');
    setInputValue(numericValue);
  };

  const handleInputBlur = () => {
    setShowInput(false);
  };

  const handleInputKeyPress = () => {
    const parsedValue = parseInt(inputValue, 10) || 1;
    setPageNumber(parsedValue);
    navigate(`/${currentUser}/${parsedValue}`);
  };

  const handlePrevClick = () => {
    const prevPage = Math.max(1, pageNumber - 1);
    setPageNumber(prevPage);
    navigate(`/${currentUser}/${prevPage}`);
  };

  const handleNextClick = () => {
    setPageNumber((prevPageNumber) => {
      const nextPage = parseInt(prevPageNumber, 10) + 1;
      navigate(`/${currentUser}/${nextPage}`);
      return nextPage;
    });
  };
  
  
  return (
    <footer data-pagination>
      <ul>
        <li>
          <span onClick={handlePrevClick}>{'<'}</span>
        </li>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((page) => (
          <li key={page}>
            <Link to={`/${currentUser}/${page}`} onClick={() => handlePageClick(page)}>
              {page}
            </Link>
          </li>
        ))}
        <li>
          {showInput ? (
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyUp={handleInputKeyPress}
              autoFocus
              placeholder="Desired Page Number"
            />
          ) : (
            <span onClick={handleMoreClick}>...</span>
          )}
        </li>
        <li>
          <Link to={`/${currentUser}/7508`} onClick={() => handlePageClick(7508)}>
            7508
          </Link>
        </li>
        <li>
          <span onClick={() => handleNextClick()}>{'>'}</span>
        </li>
      </ul>
    </footer>
  );
}

export default Pagination;
