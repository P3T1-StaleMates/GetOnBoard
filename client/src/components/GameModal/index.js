import React, { useState, useEffect } from "react";
import GameCard from "../Cards/GameCard";
import { QUERY_GAMES } from "../../utils/queries";
import gameSearch from "../../utils/gameSearch";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_GAME } from "../../utils/mutations";
import { Modal, Button } from "react-bootstrap";

const GameModal = ({ showModal, searchTerm, closeModal }) => {
  console.log("Search Term: ", searchTerm);
  const [gameData, setGameData] = useState([]);
  // // ADD_GAME mutation goes here
  const [addGame, { error }] = useMutation(ADD_GAME);

  const handleAddBook = async (gameToAdd) => {
    try {
      const { data } = await addGame({
        variables: { ...gameToAdd },
      });
      console.log("Added Game Data: ", data);
    } catch (err) {
      console.error(err);
    }
  };

  // This is used for optimization later
  // Grab game data from our backend using the searchTerm
  // const { loading, data } = useQuery(QUERY_GAMES, {
  //   variables: { title: searchTerm },
  // });

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // console.log("Backend Data: ", data.games);

  useEffect(() => {
    gameSearch(searchTerm, setGameData);
    console.log("API Data: ", gameData);
    //   if (data.games.length === 0) {
    //   } else {
    //     setGameData(data.games);
    //   }
  }, []);
  // // If no data was found, run the API call to get data from somewhere.

  console.log("State Game Data: ", gameData);

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Game Search Results</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {gameData.length === 0 ? (
          <div>Loading...</div>
        ) : (
          gameData.map((game) => {
            return (
              <div key={game.title}>
                <GameCard game={game} />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleAddBook(game)}
                >
                  Save Game
                </button>
              </div>
            );
          })
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GameModal;
