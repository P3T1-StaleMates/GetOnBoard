import React, { useState } from 'react';
// import { useMutation, useQuery } from '@apollo/client';
import GameModal from "../GameModal";
// import { gameSearch } from "../../utils/gameSearch";
import "./SearchBar.css"
// import { QUERY_GAMES } from "../../utils/queries";

const SearchBar = () => {
    // Keeps track of what is being typed in the search box
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    // const [gameData, setGameData] = useState("")
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log("Hello World")
        handleShowModal()
    };

    const handleChange = (event) => {
        const { value } = event.target;

        setSearchTerm(value);
    };

    return (
        <>
            <form className="m-2 searchbar" onSubmit={handleFormSubmit}>
                <label>
                    Add a Game:
                    <input type="text" name='searchText' placeholder="Boardgame Name" value={searchTerm} onChange={handleChange} />
                </label>
                <button type="submit" className=" btn-green " value="Submit">Search</button>
            </form>
            {showModal && <GameModal showModal={showModal} searchTerm={searchTerm} closeModal={handleCloseModal} />}
        </>
    );
};

export default SearchBar