import { useState } from "react";
import "./MyEvents.css"
import { useQuery } from "@apollo/client";
import { QUERY_MY_EVENTS } from "../utils/queries";
import EventModal from "../components/EventModal";
import EventCard from "../components/Cards/EventCard"

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
            <h2 className="pl-2 text-center mt-3 p-2 pt-4">
                Upcoming Events
            </h2>
            <div className="eventContainer">
                {myEvents.map(myEvent =>
                    <EventCard key={myEvent._id} myEvent={myEvent} />)
                }
            </div>
            <div className="container m-3"><button className="btn btn-green center" onClick={handleShowModal}>Create Event</button></div>
            {showEventModal && <EventModal closeModal={handleCloseModal} showModal={showEventModal}/>}
        </>
    );
};

export default MyEvents;
