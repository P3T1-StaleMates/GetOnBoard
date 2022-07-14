import React from "react";
import EventCard from "../EventCard";
import "./CardContainer.css";
import { useQuery } from "@apollo/client";
import { QUERY_MY_EVENTS } from "../../../utils/queries";

const CardContainer = () => {
    const { loading, data } = useQuery(QUERY_MY_EVENTS);

    if (loading) {
        return <div>Loading....</div>;
    }

    const { myEvents } = data;
    // console.log("events", myEvents)

    // myEvents.sort((a, b) => (a.date - b.date))

    return (
        <div className="row container-card">
            {myEvents.length ? (
                myEvents.slice(0, 3).map((myEvent) => {
                    return (
                        <div className="row" key={myEvent._id}>
                            {/* {" "} */}
                            <EventCard myEvent={myEvent} />
                        </div>
                    );
                })
            ) : (
                <p>No upcoming Events! Schedule with your friends!</p>
            )}

        </div>
    );
};

export default CardContainer;
