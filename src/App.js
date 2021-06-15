import React,{useState} from 'react'
import Book from './components/Book';
import Main from './components/Main';
import Navbar from './components/Navbar'
import ThankYou from './components/ThankYou';

function App() {
  const [page, setPage] = useState(0)
  return (
<div><Navbar setPage={setPage}/>
{page===0 ? <Main setPage={setPage} /> : null}
{page===1 ? <Book setPage={setPage} /> : null}
{page===2 ? <ThankYou /> : null}
</div>
  );
}

export default App;
