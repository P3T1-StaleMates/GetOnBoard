import { GameCard } from "../Cards/GameCard"

const Modal = ({ gameData, handleClose }) => {
  // ADD_GAME mutation goes here

  return (
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            {gameData.forEach((game, index) => {
              <GameCard name={game.name} description={game.description} imageUrl={game.imageUrl} index={index} averageTime={game.averageTime} minPlayers={game.minPlayers} maxPlayers={game.maxPlayers}/>
              // Add button to add game to ownedGames for player using mutation
            })}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" onSubmit={handleClose}>Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal