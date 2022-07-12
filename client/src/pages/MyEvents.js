import EventForm from "../components/EventForm";
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
            {myEvents.map(myEvent => 
                <EventCard key={myEvent.eventName} myEvent={myEvent} />)
            }
        </>
    );
};

export default MyEvents;
