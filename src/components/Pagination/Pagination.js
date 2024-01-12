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
    setPageNumber((prevPageNumber) => {
      const parsedPageNumber = parseInt(pagenumber, 10) || 1;
      navigate(`/${currentUser}/${parsedPageNumber}`);
      return parsedPageNumber;
    });
  }, [pagenumber, setPageNumber, currentUser, navigate]);

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
    setPageNumber((prevPageNumber) => {
      const prevPage = Math.max(1, parseInt(prevPageNumber, 10) - 1);
      navigate(`/${currentUser}/${prevPage}`);
      return prevPage;
    });
  };

  const handleNextClick = () => {
    setPageNumber((prevPageNumber) => {
      const nextPage = parseInt(prevPageNumber, 10) + 1;
      navigate(`/${currentUser}/${nextPage}`);
      return nextPage;
    });
  };

  const generatePageNumbers = () => {
    const currentPage = pageNumber || 1;
    const startPage = Math.floor((currentPage - 1) / 9) * 9 + 1;
    const endPage = Math.min(startPage + 8, 7508);
    const pages = [];

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <footer data-pagination>
      <ul>
        <li className={pageNumber === 1 ? 'active' : ''}>
          <span onClick={handlePrevClick}>{'<'}</span>
        </li>
        {generatePageNumbers().map((page) => (
          <li key={page} className={pageNumber === page ? 'active' : ''}>
            <Link
              to={`/${currentUser}/${page}`}
              onClick={() => handlePageClick(page)}
              className={pageNumber === page ? 'active-link' : ''}
            >
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
          <Link
            to={`/${currentUser}/7508`}
            onClick={() => handlePageClick(7508)}
            className={pageNumber === 7508 ? 'active-link' : ''}
          >
            7508
          </Link>
        </li>
        <li>
          <span onClick={handleNextClick}>{'>'}</span>
        </li>
      </ul>
    </footer>
  );
}

export default Pagination;
