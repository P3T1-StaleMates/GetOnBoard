import { React, useState } from "react";
import SlimMultipleSelect from "react-slim-multiple-select";
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import { useMutation, useQuery } from "@apollo/client";
import { CREATE_EVENT } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";

// small form component to create an event

const EventForm = () => {
    const [formState, setFormState] = useState({
        eventName: "",
        location: "",
        date: "",
        players: [],
    });

    const [selected, setSelected] = useState(new Date());

    const handleFormChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const [createEvent, { error, data }] = useMutation(CREATE_EVENT);

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
            const { data } = await createEvent({
                variables: { ...formState },
            });
            console.log("This is a placeholder for creating the event");
        } catch (e) {
            console.error(e);
        }

        // clear form values
        setFormState({
            name: "",
            location: "",
            date: "",
        });
        // redirect to Edit Event Form here - to add games
    };

    const { loading, data: myData } = useQuery(QUERY_ME);
    if (loading) {
        return <div>Loading...</div>;
    }
    console.log("myData", myData);

    const { friends } = myData.me;
    const options = friends.map((friend) => ({
        id: friend._id,
        name: friend.name,
    }));

    let footer = <p>Please pick a day.</p>;
    if (selected) {
        footer = <p>You picked {format(selected, "PP")}.</p>;
        // setFormState()
    }

    return (
        <main className="flex-row justify-center mb-4">
            <div className="col-12 col-lg-10">
                <div className="card">
                    <h4 className="card-header bg-dark text-light p-2">
                        Create Event
                    </h4>
                    <div className="card-body">
                        <form onSubmit={handleFormSubmit}>
                            <input
                                className="form-input"
                                placeholder="Name Your Event"
                                name="eventName"
                                type="eventName"
                                value={formState.eventName}
                                onChange={handleFormChange}
                            />
                            <input
                                className="form-input"
                                placeholder="Location"
                                name="location"
                                type="location"
                                value={formState.location}
                                onChange={handleFormChange}
                            />

                            <DayPicker
                            mode="single"
                            selected={selected}
                            onSelect={setSelected}
                            footer={footer}
                            />

                            <SlimMultipleSelect
                                options={options}
                                value={formState.players}
                                optLabel="name"
                                optKey="id"
                                onHandleChange={(value) => console.log(value)}
                                placeholder="Add Friends"
                            />

                            <button
                                className="btn btn-block btn-primary"
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
        </main>
    );
};

export default EventForm;
