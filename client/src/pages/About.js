import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

import "./About.css"


const About = () => {
  return (
    <>
    <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"></link>
      {/* <section className="padding-40">
        <div className="col"><img className="icon" src="/assets/images/man-icon.jpg" alt="Avatar" />
          <div>
            <h5>Dashboard My Groups</h5>
            <p>Welcome, view all groups</p>
          </div>
        </div>
      </section> */}

      <section className="overflow-auto ">
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
                    <a href="https://github.com/freyaliesel" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub} /></a>
                    <a href="/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faLinkedin} /></a>
                  </div>
                </div>
              </div>
              <div className="team-title">
                <h5>Kit</h5>
                <span>Full Stack Web Developer</span>
              </div>
            </div>

            {/* Lea */}
            <div className="col-md-6 col-sm-4">
              <div className="team-member">
                <div className="team-img">
                  <img src="/assets/images/Lea.jpg" alt="team member" className="img-responsive"></img>
                </div>
                <div className="team-hover">
                  <div className="desk">
                    <h4>Hi There !</h4>
                    <p>I love to introduce myself as a hardcore Web Designer.</p>
                  </div>
                  <div className="s-link">
                    <a href="https://github.com/lealinnea" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub} /></a>
                    <a href="https://www.linkedin.com/in/lea-guerrero-020516174/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faLinkedin} /></a>
                  </div>
                </div>
              </div>
              <div className="team-title">
                <h5>Lea</h5>
                <span>Full Stack Web Developer</span>
              </div>
            </div>

            {/* Miguel */}
            <div className="col-md-6 col-sm-4">
              <div className="team-member d-flex justify-content-center">
                <div className="team-img d-flex justify-content-center">
                  <img src="https://image.freepik.com/free-photo/elegant-man-with-thumbs-up_1149-1595.jpg" alt="team member" className="img-responsive"></img>
                </div>
                <div className="team-hover">
                  <div className="desk">
                    <h4>Hello World</h4>
                    <p>I love to introduce myself as a hardcore Web Designer.</p>
                  </div>
                  <div className="s-link">
                    <a href="https://github.com/mae2136" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub} /></a>
                    <a href="https://www.linkedin.com/in/miguel-a-escobar/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faLinkedin} /></a>
                  </div>
                </div>
              </div>
              <div className="team-title">
                <h5>Miguel</h5>
                <span>Full Stack Web Developer</span>
              </div>
            </div>

            {/* Jesse */}
            <div className="col-md-6 col-sm-4">
              <div className="team-member">
                <div className="team-img d-flex justify-content-center">
                  <img src="/assets/images/Jesse.png" alt="team member" className="img-responsive"></img>
                </div>
                <div className="team-hover">
                  <div className="desk">
                    <h4>Hi There !</h4>
                    <p>Board/Video game enthusiast. Impending full stack web developer.</p>
                  </div>
                  <div className="s-link">
                    <a href="https://github.com/JesseComeau" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub} /></a>
                    <a href="https://linkedin.com/in/jessecomeau" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faLinkedin} /></a>
                  </div>
                </div>
              </div>
              <div className="team-title flex-column justify-content-center">
                <h5>Jesse</h5>
                <span>Full Stack Web Developer</span>
              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  )
};

export default About;
