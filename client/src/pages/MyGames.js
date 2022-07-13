import GameCard from "../components/Cards/GameCard";
import Searchbar from "../components/Searchbar";
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ME } from "../utils/queries";
import { REMOVE_GAME } from "../utils/mutations";

const MyGames = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeGame, { error }] = useMutation(REMOVE_GAME);

  const handleRemoveGame = async (gameId) => {
    try {
      const { removedGame } = await removeGame({
        variables: { gameId }
      })
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) {
    return <div>Loading....</div>
  }

  const { ownedGames } = data.me

  return (
    <>
      <section className="padding-40">
        <div className="col"><img className="icon" src="/assets/images/man-icon.jpg" alt="Avatar" />
          <div>
            <h5>Dashboard My Games Page</h5>
            <p>Welcome, view all groups</p>
          </div>
        </div>
        <Searchbar />
      </section>

      <section>
        <div className="container">
          <div className="row">
            {ownedGames.length ? ownedGames.map((game) => {
              return <div className="col" key={game.title}> <GameCard game={game} />
                <button className="btn btn-danger" onClick={() => handleRemoveGame(game._id)}>Remove Game</button>
              </div>
            }) : <p>No Games to Show! Add a new game by searching for one above!</p>}
          </div>
          <div className="row">
          </div>
        </div>
      </section>
    </>
  )
}

export default MyGames