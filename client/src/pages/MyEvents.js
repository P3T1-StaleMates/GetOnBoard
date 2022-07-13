import EventForm from "../components/EventForm";
import "./MyEvents.css"
import { useQuery } from "@apollo/client";
import { QUERY_MY_EVENTS } from "../utils/queries";
import EventCard from "../components/Cards/EventCard";

const MyEvents = () => {

    const { loading, data } = useQuery(QUERY_MY_EVENTS);

    if (loading) {
        return <div>Loading...</div>;
    }
    console.log("data", data);
    const { myEvents } = data;

    return (
        <>
            <EventForm />
            <h4 className="pl-2">
                        Upcoming Events
                    </h4>
            <div className="eventContainer">
                {myEvents.map(myEvent => 
                    <EventCard key={myEvent._id} myEvent={myEvent} />)
                }
            </div>
        </>
    );
};

export default MyEvents;
