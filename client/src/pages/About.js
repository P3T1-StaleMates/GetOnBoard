import GameCard from "../components/Cards/GameCard";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import "./About.css"


const About = () => {
  return (
    <>
      {/* <section className="padding-40">
        <div className="col"><img className="icon" src="/assets/images/man-icon.jpg" alt="Avatar" />
          <div>
            <h5>Dashboard My Groups</h5>
            <p>Welcome, view all groups</p>
          </div>
        </div>
      </section> */}

      <section className="overflow-auto">

        <div className="container ">
          <div className="row">
            <div className="heading-title text-center">
              <h3 className="text-uppercase pt-4 h1">Meet the team!</h3>
            </div>
            {/* Kit */}
            <div className="col-md-6 col-sm-4">
              <div className="team-member">
                <div className="team-img">
                  <img src="https://image.freepik.com/free-photo/man-standing-with-a-black-t-shirt_1187-1045.jpg" alt="team member" className="img-responsive"></img>
                </div>
                <div className="team-hover">
                  <div className="desk">
                    <h4>Hi There !</h4>
                    <p>Full Stack Web Developer</p>
                  </div>
                  <div className="s-link">
                    <a href="/"><i className="fa fa-facebook"></i></a>
                    <a href="/"><i className="fa fa-twitter"></i></a>
                    <a href="/"><i className="fa fa-google-plus"></i></a>
                  </div>
                </div>
              </div>
              <div className="team-title">
                <h5>Kit</h5>
                <span>founder & ceo</span>
              </div>
            </div>

            {/* Lea */}
            <div className="col-md-6 col-sm-4">
              <div className="team-member">
                <div className="team-img">
                  <img src="https://image.freepik.com/free-photo/man-standing-with-a-black-t-shirt_1187-1045.jpg" alt="team member" className="img-responsive"></img>
                </div>
                <div className="team-hover">
                  <div className="desk">
                    <h4>Hi There !</h4>
                    <p>I love to introduce myself as a hardcore Web Designer.</p>
                  </div>
                  <div className="s-link">
                    <a href="/"><i className="fa fa-facebook"></i></a>
                    <a href="/"><i className="fa fa-twitter"></i></a>
                    <a href="/"><i className="fa fa-google-plus"></i></a>
                  </div>
                </div>
              </div>
              <div className="team-title">
                <h5>Martin Smith</h5>
                <span>founder & ceo</span>
              </div>
            </div>

            {/* Miguel */}
            <div className="col-md-6 col-sm-4">
              <div className="team-member">
                <div className="team-img">
                  <img src="https://image.freepik.com/free-photo/elegant-man-with-thumbs-up_1149-1595.jpg" alt="team member" className="img-responsive"></img>
                </div>
                <div className="team-hover">
                  <div className="desk">
                    <h4>Hello World</h4>
                    <p>I love to introduce myself as a hardcore Web Designer.</p>
                  </div>
                  <div className="s-link">
                    <a href="/"><i className="fa fa-facebook"></i></a>
                    <a href="/"><i className="fa fa-twitter"></i></a>
                    <a href="/"><i className="fa fa-google-plus"></i></a>
                  </div>
                </div>
              </div>
              <div className="team-title">
                <h5>Franklin Harbet</h5>
                <span>HR Manager</span>
              </div>
            </div>

            {/* Jesse */}
            <div className="col-md-6 col-sm-4">
              <div className="team-member">
                <div className="team-img">
                  <img src="https://image.freepik.com/free-photo/man-standing-with-a-black-t-shirt_1187-1045.jpg" alt="team member" className="img-responsive"></img>
                </div>
                <div className="team-hover">
                  <div className="desk">
                    <h4>Hi There !</h4>
                    <p>I love to introduce myself as a hardcore Web Designer.</p>
                  </div>
                  <div className="s-link">
                    <a href="/"><i className="fa fa-facebook"></i></a>
                    <a href="/"><i className="fa fa-twitter"></i></a>
                    <a href="/"><i className="fa fa-google-plus"></i></a>
                  </div>
                </div>
              </div>
              <div className="team-title">
                <h5>Martin Smith</h5>
                <span>founder & ceo</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
          </div>
          <div className="row">
          </div>
        </div>
      </section>
    </>
  )
};

export default About;
