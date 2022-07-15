import React from "react";
import * as dayjs from 'dayjs'

// card for displaying upcoming events for the user / group

const EventCardDashboard = (props) => {
    const { eventName, date, location, players, eventGames } = props.myEvent;
    const stockImage = "/assets/images/game-night.png";
    const eventDate = new dayjs(date * 1).format('ddd, MMM D, YYYY h:mm a')


    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-2">
                    <div>
                        {eventGames.length >= 1 ? (
                            <img
                                src={eventGames[0].imageUrl}
                                alt={eventGames[0].title}
                            />
                        ) : (
                            <img
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

export default EventCardDashboard;
