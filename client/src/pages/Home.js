import React from 'react';


const Home = () => {


  return (
    <main className="bg-white mt-5 mb-5 mrl-20">
    <div className="container">
    <img href="#" className="brand-logo logo" src="assets/images/Get-on-Board.png" />
    <button type="button" className="btn">Log Out</button>
    </div>
    <div className="container">
        <div className="mt-5">
            <h5>Hello, John Doe!</h5>
            <p>Welcome back let's Get on Board</p>
        </div>
        <div className="row">
            <div className="col ">
                <div className="container ">
                    <div className="row align-items-center">
                        <div className="col">
                    <div className="card" style={{width: "15rem"}}>
                        <img src="/assets/images/youreonmute.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                          <h5 className="card-title">Game Title</h5>
                          <p className="card-text">2 Player - 10 min Game</p>
                          <a href="#"></a>
                        </div>
                      </div>
                  </div>
                  <div className="col">
                    <div className="card" style={{width: "15rem"}}>
                        <img src="/assets/images/youreonmute.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                          <h5 className="card-title">Game Title</h5>
                          <p className="card-text">2 Player - 10 min Game</p>
                          <a href="#"></a>
                        </div>
                      </div>
                  </div>
                  <div className="col">
                    <div className="card" style={{width: "15rem"}}>
                        <img src="/assets/images/youreonmute.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                          <h5 className="card-title">Game Title</h5>
                          <p className="card-text">2 Player - 10 min Game</p>
                          <a href="#"></a>
                        </div>
                      </div>
                  </div>
                </div>


                {/* <!-- end of cards --> */}


                <div className="row align-items-center">
                    <div className="col">
                      <div className="card" style={{width: "15rem"}}>
                          <img src="/assets/images/youreonmute.jpg" className="card-img-top" alt="..." />
                          <div className="card-body">
                            <h5 className="card-title">Game Title</h5>
                            <p className="card-text">2 Player - 10 min Game</p>
                            <a href="#"></a>
                          </div>
                        </div>
                    </div>
                  
                    <div className="col">
                        <div className="card" style={{width: "15rem"}}>
                            <img src="/assets/images/youreonmute.jpg" className="card-img-top" alt="..." />
                            <div className="card-body">
                              <h5 className="card-title">Game Title</h5>
                              <p className="card-text">2 Player - 10 min Game</p>
                              <a href="#"></a>
                            </div>
                          </div>
                      </div>
                    

                    {/* <!-- solo card --> */}
                    <div className="col">
                      <div className="card" style={{width: "15rem"}}>
                          <img src="/assets/images/dice-and-pawns.jpg" className="card-img-top" alt="..." />
                          <div className="card-body">
                            <h5 className="card-title">LET'S <br/> EXPLORE!</h5>
                            <p className="card-text">Find and add more games</p>
                            <button type="button" className="btn center">EXPLORE</button>
                          </div>
                        </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
          </div>

</main>
  );
};

export default Home;
