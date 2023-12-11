import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../Pagination/Pagination.css';

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

  return (
    <footer data-pagination>
      <ul>
        <li>
          <Link to={`/${currentUser}/1`} onClick={() => handlePageClick(1)}>
            1
          </Link>
        </li>
        <li>
          <Link to={`/${currentUser}/2`} onClick={() => handlePageClick(2)}>
            2
          </Link>
        </li>
        <li>
          <Link to={`/${currentUser}/3`} onClick={() => handlePageClick(3)}>
            3
          </Link>
        </li>
        <li>
          <Link to={`/${currentUser}/4`} onClick={() => handlePageClick(4)}>
            4
          </Link>
        </li>
        <li>
          <Link to={`/${currentUser}/5`} onClick={() => handlePageClick(5)}>
            5
          </Link>
        </li>
        <li>
          <Link to={`/${currentUser}/6`} onClick={() => handlePageClick(6)}>
            6
          </Link>
        </li>
        <li>
          <Link to={`/${currentUser}/7`} onClick={() => handlePageClick(7)}>
            7
          </Link>
        </li>
        <li>
          <Link to={`/${currentUser}/8`} onClick={() => handlePageClick(8)}>
            8
          </Link>
        </li>
        <li>
          <Link to={`/${currentUser}/9`} onClick={() => handlePageClick(9)}>
            9
          </Link>
        </li>
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
      </ul>
    </footer>
  );
}

export default Pagination;
