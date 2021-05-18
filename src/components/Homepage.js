import './components/homepage.scss';

const Homepage = () => {
  return (
    <div className='container map'>
      <header className=''> <h4>ULAANBAATAR</h4> </header>
      <div className='button-container'>
        <a className="btn-floating btn-large waves-effect waves-light white"><i className="material-icons indigo-text">chat</i></a>
        <a className="btn-floating btn-large waves-effect waves-light white"><i className="material-icons indigo-text">center_focus_weak</i></a>
        <a className="btn-floating btn-large waves-effect waves-light white"><i className="material-icons indigo-text">account_circle</i></a>
      </div>
    </div>
  );
}
export default Homepage;