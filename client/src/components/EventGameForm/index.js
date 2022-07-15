import { React, useState } from "react";
import SlimMultipleSelect from "react-slim-multiple-select";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_EVENT_GAME } from "../../utils/mutations";
import { QUERY_EVENT } from "../../utils/queries";

const EventGameForm = ({ hideEventGameForm, eventId }) => {
    const [formState, setFormState] = useState({
        eventGames: [],
    });
    const [gameList, setGameList] = useState([]);

    // Check that you can grab form data
    const handleGamesChange = (games) => {
        console.log("games", games);
        const eventGames = [];
        games.forEach((game) => {
            console.log("game", game);
            if (game.id) {
                eventGames.push(game);
            }
        });
        console.log("eventGames", eventGames);
        setGameList([...eventGames]);
    };

    const [updateEvent, { error }] = useMutation(UPDATE_EVENT_GAME);
    // Check that this form is submitting data correctly
    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
            await updateEvent({
                variables: { eventId, gameList },
            });
            console.log("This is a placeholder for creating the event");
            hideEventGameForm();
        } catch (e) {
            console.error(e);
        }

        // clear form values
        setFormState({
            eventGames: [],
        });
    };
    // Fix this query to pull info correctly.
    const { loading, data } = useQuery(QUERY_EVENT, {
        variables: { eventId },
    });
    if (loading) {
        return <div>Loading...</div>;
    }

    // let groupGames = [];
    const groupGames = data?.event?.groupGames || [];

    console.log(groupGames);
    const options = groupGames.map((game) => ({
        id: game._id,
        title: game.title,
    }));
    console.log("options", options);

    return (
        <div className="row center mb-4">
            <div className="center col-8">
                <div className="card">
                    <h4 className="card-header p-2 text-center">
                        Add Games to Your Event
                    </h4>
                    <div className="card-body">
                        <form onSubmit={handleFormSubmit}>
                            <SlimMultipleSelect
                                options={options}
                                value={gameList}
                                optLabel="title"
                                optKey="id"
                                onHandleChange={handleGamesChange}
                                placeholder="Add Games to Your Event"
                            />

                            <button
                                className="btn btn-block btn-green"
                                style={{ cursor: "pointer" }}
                                type="submit"
                            >
                                Submit
                            </button>
                        </form>

                        {error && (
                            <div className="my-3 p-3 bg-danger text-white">
                                {error.message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventGameForm;
