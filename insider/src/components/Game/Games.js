import Game from "./Game";
import {useEffect, useState} from 'react'
import CreateGame from "./CreateGame";


const Games = () => {
    const [games, setGames] = useState([])

    useEffect(() => {    
    const fetchGames = async () => {
            const data = await fetch('http://localhost:5000/game/', {credentials: 'include'})
            let body = await data.json()
            setGames(body)
        }
        fetchGames()
}, [])

    return (
        <div>
            <h1>JOIN GAME</h1>
            {games.map((game) => <Game key={game.id} game={game} setGames={setGames}/>)}

            <CreateGame setGames={setGames}/>
        </div>
    )
}
export default Games;