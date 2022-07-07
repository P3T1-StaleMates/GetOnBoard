// component for navigating the site

const Navbar = () => {
  return (
    <div className="col-2">
 
        <img
        href="#"
            className="brand-logo padding-top-20 logo"
            src="assets/images/Get-on-Board.png"
          />
          <ul className="nav flex-column padding-top-60">
            <li className="nav-item">
              <a className="nav-link active" href="#">My Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#">My Friends</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">My Games</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Schedule Meet Up</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#">About</a>
            </li>
          </ul>
          <div className="padding-top-280">
          <button type="button" className=" btn-clear center">Log Out</button>
        </div>
        </div>
  );
};

export default Navbar;
