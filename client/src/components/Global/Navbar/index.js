// component for navigating the site

const Navbar = () => {
  return (
    <div>
      <div>
        {/* logo goes here */}
        <p>
          Get On Board
        </p>
        <p>
          Streamline your boardgame night!
        </p>

        {/* these links should render conditionally */}
        <ul>
          {/* Not logged in */}
          <li> Log In </li>
          <li> About </li>

          {/* Logged In */}

          <li> My Dashboard </li>
          <li> My Games </li>
          <li> My Friends </li>
          <li> Groups </li>
          <li> Events </li>
          <li> Log Out </li>

        </ul>
      </div>
    </div>
  );
};

export default Navbar;
