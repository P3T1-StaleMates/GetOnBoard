import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { Modal } from "../Modal";
import { gameSearch } from "../../utils/gameSearch";

import { QUERY_GAMES } from "../../utils/queries";

const SearchBar = () => {
    // Keeps track of what is being typed in the search box
    const [searchTerm, setSearchTerm] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [gameData, setGameData] = useState({})

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const { loading, data } = useQuery(QUERY_GAMES, {
            variables: { name: searchTerm },
        });
        const game = data.games;

        if (game === null) {
            const data = gameSearch(searchTerm);
            setGameData(data);
        } else {
            setGameData(game);
        }

        handleShow();
    };

    const handleChange = (event) => {
        const { value } = event.target;

        setSearchTerm(value);
    };

    return (
        <>
            <form className="m-2" onSubmit={handleFormSubmit}>
                <label>
                    Board Game Search:
                    <input type="text" name='searchText' placeholder="Catan" value={searchTerm} onChange={handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            {/* {if (show) {
                <Modal gameData={gameData} />;
            }} */}
        </>
    );
};

export default SearchBar