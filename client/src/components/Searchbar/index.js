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

    // const handleFormSubmit = async (event) => {
    //     event.preventDefault();

    //     const { loading, data } = useQuery(QUERY_GAMES, {
    //         variables: { title: searchTerm },
    //     });

    //     if (loading) {
    //         return <div>Loading...</div>;
    //     }

    //     const game = data.games;

    //     if (game === null) {
    //         const newGameData = gameSearch(searchTerm);
            
    //         setGameData(newGameData);
    //     } else {
    //         setGameData(game);
    //     }

    //     handleShow();
    // };

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
                <button type="submit" class="btn btn-primary" value="Submit" />
            </form>
            {show ? <Modal gameData={gameData} handleClose={handleClose} /> : <div></div>}
        </>
    );
};

export default SearchBar