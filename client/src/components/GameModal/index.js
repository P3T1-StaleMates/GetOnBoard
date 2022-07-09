import React, { useState } from 'react';
import GameCard from "../Cards/GameCard"
import { QUERY_GAMES } from "../../utils/queries";
import { gameSearch } from "../../utils/gameSearch";
import { useMutation, useQuery } from '@apollo/client';
import { ADD_GAME } from "../../utils/mutations";
import { Modal, Button } from "react-bootstrap"

const GameModal = ({ showModal, searchTerm, closeModal }) => {
  console.log("Search Term: ", searchTerm);
  // const [gameData, setGameData] = useState([]);
  // // ADD_GAME mutation goes here

  // // Grab game data from our backend using the searchTerm
  // const { loading, data } = useQuery(QUERY_GAMES, {
  //   variables: { title: searchTerm },
  // });

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // // If no data was found, run the API call to get data from somewhere.
  // if (data.games === null) {
  //   setGameData(gameSearch(searchTerm));
  // } else if (data.games) {
  //   setGameData(data.games);
  // }

  // const handleCloseModal = async (event) => {
  //   event.preventDefault();
  //   setGameData([]);
  //   closeModal(false);
  // }

  // console.log("Game Data: ", gameData);

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Game Results</Modal.Title>
      </Modal.Header>
      <Modal.Body>Game cards go here</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    //         {gameData.map((game) => {
    //           <div key={game.title}>
    //             <GameCard game={gameData} />
    //             <button type="button" className="btn btn-primary">Save Game</button>
    //           </div>
    //         })}
  );
}

export default GameModal