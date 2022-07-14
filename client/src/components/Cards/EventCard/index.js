import React from "react";
import * as dayjs from 'dayjs'
import "./EventCard.css"
// card for displaying upcoming events for the user / group

const EventCard = (props) => {
    const { eventName, date, location, players, eventGames } = props.myEvent;
    const stockImage = "/assets/images/game-night.png";
    const eventDate = new dayjs(date * 1).format('ddd, MMM D, YYYY h:mm a')


    return (
        <div className="card animation m-3 mb-3">
            <div className="row g-0">
                <div className="col-md-2">
                    <div >
                        {eventGames.length >= 1 ? (
                            <img 
                                src={eventGames[0].imageUrl}
                                alt={eventGames[0].title}
                            />
                        ) : (
                            <img className="card-img  pt-5"
                                src={stockImage}
                                alt="Scrabble"
                            />
                        )}
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{eventName}</h5>
                        <p className="card-text">Event Location: {location}</p>
                        <p className="card-text">Invited: </p>
                        {players.map((player) => (
                            <li key={player._id}>{player.username}</li>
                        ))}
                        {eventGames.map((game) => (
                            <li key={game._id}>{game.title}</li>
                        ))}
                        <p className="card-text">
                            <small className="text-muted">
                                Event Date: {eventDate}
                            </small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
