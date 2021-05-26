import './homepage.scss';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom';
const Homepage = () => {
  // const history = useHistory()

  return (
    <div className='container map'>
      <header className='header'> <h4>ULAANBAATAR</h4> </header>
      <div className='button-container'>
        <Link to='/friendreq' className="btn-floating btn-large waves-effect waves-light white"><i className="material-icons indigo-text">chat</i></Link>
        <Link to='/' className="btn-floating btn-large waves-effect waves-light white"><i className="material-icons indigo-text">center_focus_weak</i></Link>
        <Link to='/profile' className="btn-floating btn-large waves-effect waves-light white"><i className="material-icons indigo-text">account_circle</i></Link>
      </div>
    </div>
  );
}
export default Homepage;