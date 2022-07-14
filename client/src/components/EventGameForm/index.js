import { React, useState } from "react";
import SlimMultipleSelect from "react-slim-multiple-select";
import DateTimePicker from "react-datetime-picker";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_EVENT, UPDATE_EVENT_GAME } from "../../utils/mutations";
import { QUERY_EVENT } from "../../utils/queries";

// small form component to create an event

const EventGameForm = ({ hideEventGameForm, eventId }) => {
    const [formState, setFormState] = useState({
        eventGames: [],
    });
    const [gameList, setGameList] = useState([])

    const handleFormChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleGamesChange = (array) => {
        console.log("array", array)
        const eventGames = []
        array.forEach(pObj => {
            console.log("pObj", pObj.id)
            eventGames.push(pObj.id)
        });
        console.log("eventGames", eventGames)
        setGameList({
            ...formState,
            eventGames
        })
    }

    const [updateEvent, { error, data }] = useMutation(UPDATE_EVENT_GAME);

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
            const { data } = await updateEvent({
                variables: { eventId, ...formState },
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

    const { loading, eventData } = useQuery(QUERY_EVENT);
    if (loading) {
        return <div>Loading...</div>;
    }

    const { groupGames } = eventData.groupGames;
    const options = groupGames.map((game) => ({
        id: game._id,
        title: game.title,
    }));

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
                                optLabel="name"
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
