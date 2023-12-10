import '../Pagination/Pagination.css'

function Pagination() {
  return (
    <footer data-pagination>
      <a href="#" disabled><i className="ion-chevron-left"></i></a>
      <ul>
        <li className="current"><a href="#1">1</a></li>
        <li><a href="#2">2</a></li>
        <li><a href="#3">3</a></li>
        <li><a href="#4">4</a></li>
        <li><a href="#5">5</a></li>
        <li><a href="#6">6</a></li>
        <li><a href="#7">7</a></li>
        <li><a href="#8">8</a></li>
        <li><a href="#9">9</a></li>
        <li><a href="#10">…</a></li>
        <li><a href="#41">7508</a></li>
      </ul>
      <a href="#2"><i className="ion-chevron-right"></i></a>
    </footer>
  );
}

export default Pagination