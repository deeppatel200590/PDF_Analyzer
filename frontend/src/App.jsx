import react from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Content from './components/Content';

const App = () => {
  return(
    <div className='h-screen flex flex-col justify-between'>
      <Navbar/>
      <Content/>
      <Footer/>
    </div>
  )
}

export default App;