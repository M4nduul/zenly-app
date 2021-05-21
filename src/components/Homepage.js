import './homepage.scss';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const Homepage = () => {
    const history = useHistory()
    
  
  
  
  return (
    <div className='container map'>
      <header className=''> <h4>ULAANBAATAR</h4> </header>
      <div className='button-container'>
        <a onClick={() => { history.push("/friendreq")}} className="btn-floating btn-large waves-effect waves-light white"><i className="material-icons indigo-text">chat</i></a>
        <a onClick={() => { history.push("/location")}} className="btn-floating btn-large waves-effect waves-light white"><i className="material-icons indigo-text">center_focus_weak</i></a>
        <a onClick={() => { history.push("/profile")}} className="btn-floating btn-large waves-effect waves-light white"><i className="material-icons indigo-text">account_circle</i></a>
      </div>
    </div>
  );
}
export default Homepage;