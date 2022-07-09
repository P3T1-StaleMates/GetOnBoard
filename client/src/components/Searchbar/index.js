import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Modal from "../Modal";
import { gameSearch } from "../../utils/gameSearch";
import "./SearchBar.css"
import { QUERY_GAMES } from "../../utils/queries";

const SearchBar = () => {
    // Keeps track of what is being typed in the search box
    const [searchTerm, setSearchTerm] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [gameData, setGameData] = useState("")

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log("Hello World")

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

        handleShow();
    };

    const handleChange = (event) => {
        const { value } = event.target;

        setSearchTerm(value);
    };

    return (
        <>
            <form className="m-2 seachbar " onSubmit={handleFormSubmit}>
                <label>
                    Board Game Search:
                    <input type="text" name='searchText' placeholder="Catan" value={searchTerm} onChange={handleChange} />
                </label>
                <button type="submit" className=" btn-green " value="Submit">Search</button>
            </form>
            {show ? <Modal gameData={gameData} handleClose={handleClose} /> : <div></div>}
        </>
    );
};

export default SearchBar