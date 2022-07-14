import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import SlimMultipleSelect from "react-slim-multiple-select";
import DateTimePicker from "react-datetime-picker";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_EVENT } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";
import EventGameForm from "../EventGameForm";

const EventModal = ({ showModal, closeModal }) => {
    const [eventGameForm, setEventGameForm] = useState(false);
    const showEventGameForm = () => setEventGameForm(true);
    const hideEventGameForm = () => setEventGameForm(false);
    const [eventId, setEventId] = useState("");

    const [formState, setFormState] = useState({
        eventName: "",
        location: "",
        date: new Date(),
        players: [],
    });
    const [date, setDate] = useState(new Date());
    const [playerList, setPlayers] = useState([])

    const handleFormChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleDateChange = (event) => {
        // console.log(event)
        setFormState({
            ...formState,
            date: event.toString()
        })
        setDate(event)
        console.log(formState)
    }

    const handlePlayersChange = (array) => {
        console.log("array", array)
        const players = []
        array.forEach(pObj => {
            console.log("pObj", pObj.id)
            players.push(pObj.id)
        });
        console.log("players", players)
        setFormState({
            ...formState,
            players
        })
    }

    const [createEvent, { error, data }] = useMutation(CREATE_EVENT);

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
            const { data } = await createEvent({
                variables: { ...formState },
            });
            console.log("This is a placeholder for creating the event", data.createEvent._id);
            setEventId(data.createEvent._id);
            showEventGameForm();
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

    const { friends } = myData.me;
    const options = friends.map((friend) => ({
        id: friend._id,
        name: friend.name,
    }));

    return (
        <Modal size="lg" show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title><h3>Let's Plan Your Board Game Night!</h3></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    {!eventGameForm ?
                    // Bring Back Event Form here, pass is showEventGame, setEventId as props
                        <div className="row center mb-4">
                            <div className="center col-8">
                                <div className="card">
                                    <div className="card-body">
                                        <form onSubmit={handleFormSubmit}>
                                            <input
                                                className="form-input"
                                                placeholder="Name Your Event"
                                                name="eventName"
                                                type="eventName"
                                                value={formState.eventName}
                                                onChange={handleFormChange}
                                            /><br></br>
                                            <input
                                                className="form-input"
                                                placeholder="Location"
                                                name="location"
                                                type="location"
                                                value={formState.location}
                                                onChange={handleFormChange}
                                            />
                                            <br></br>
                                            <DateTimePicker
                                                onChange={handleDateChange}
                                                value={date}
                                                className="mb-3"
                                            />

                                            <SlimMultipleSelect
                                                options={options}
                                                value={playerList}
                                                optLabel="name"
                                                optKey="id"
                                                onHandleChange={handlePlayersChange}
                                                placeholder="Add Friends"
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
                        : <EventGameForm hideEventGameForm={hideEventGameForm} eventId={eventId} />}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn-green" onClick={closeModal}>
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default EventModal;
