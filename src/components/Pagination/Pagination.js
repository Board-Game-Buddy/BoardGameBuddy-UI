import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../Pagination/Pagination.css';
import { getGamesByPage } from '../../apiCalls';

// Define the Pagination component
function Pagination({ currentUser, pageNumber, setPageNumber, totalPages }) {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { pagenumber } = useParams();
  const navigate = useNavigate();
  let timeoutId; // To store the timeout ID

  useEffect(() => {
    setInputValue(pagenumber || '');

    const parsedPageNumber = parseInt(pagenumber, 10) || 1;
    navigate(`/${currentUser}/${parsedPageNumber}`);
  }, [pagenumber, setPageNumber, currentUser, navigate]);

  const handlePageClick = (page) => {
    setPageNumber(page);
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

    // Clear any existing timeouts
    clearTimeout(timeoutId);

    // Set a new timeout
    timeoutId = setTimeout(() => {
      setPageNumber(parsedValue);
      navigate(`/${currentUser}/${parsedValue}`);

      // Call your network request function here
      getGamesByPage(parsedValue)
        .then(data => {
          // Handle the response data
          console.log(data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, 1000); // 1000ms (1 second) delay
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



// ... (previous code)

const handleInputFocus = (event) => {
  // Select the entire value when the input box is clicked
  event.target.select();
};

  const generatePageNumbers = () => {
    const currentPage = pageNumber || 1;
    const startPage = Math.floor((currentPage - 1) / 9) * 9 + 1;
    const endPage = Math.min(startPage + 8, totalPages);
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
            <span>...</span>
          )}
        </li>
        <li>
          <Link
            to={`/${currentUser}/${totalPages}`}
            onClick={() => handlePageClick(totalPages)}
            className={pageNumber === totalPages ? 'active-link' : ''}
          >
            {totalPages}
          </Link>
        </li>
        <li>
          <span onClick={handleNextClick}>{'>'}</span>
        </li>
      </ul>
      <div className="go-to">Go to page: 
            <input
              className="page-input"
              value={inputValue}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onKeyUp={handleInputKeyPress}
              placeholder="Desired Page Number"
            />
          </div>
    </footer>
  );
}

export default Pagination;
