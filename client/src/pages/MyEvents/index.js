import { useState } from "react";
import "./MyEvents.css"
import { useQuery } from "@apollo/client";
import { QUERY_MY_EVENTS } from "../../utils/queries";
import EventModal from "../../components/EventModal";
import EventCard from "../../components/Cards/EventCard"

const MyEvents = () => {

    const { loading, data } = useQuery(QUERY_MY_EVENTS);
    // This state variable handles the modal functionality.
    const [showEventModal, setShowEventModal] = useState(false);
    const handleCloseModal = () => setShowEventModal(false);
    const handleShowModal = () => setShowEventModal(true);

    if (loading) {
        return <div>Loading...</div>;
    }
    console.log("data", data);
    const { myEvents } = data;

    return (
        <>
            <div className="container">
        <div className="row">
          <div className="col padding-40">
            <div>
              <img
                className="icon"
                src="/assets/images/chess/chess-orange.png"
                alt="Avatar"
                height="80"
              />
              <div>
                <h5>My Games</h5>
                <p>View all your added games</p>
              </div>
            </div>
          </div>
          <div className="col p-3">
                <div className="container m-3"><button className="btn btn-green center" onClick={handleShowModal}>Create Event</button></div>

          </div>
        </div>
      </div>
            <div className="eventContainer ">
                {myEvents.map(myEvent =>
                    <EventCard key={myEvent._id} myEvent={myEvent} />)
                }
            </div>
            {showEventModal && <EventModal closeModal={handleCloseModal} showModal={showEventModal}/>}
        </>
    );
};

export default MyEvents;
