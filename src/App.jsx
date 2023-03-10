import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import SingleCard from './components/SingleCard';

const cardImages = [
  {"src" : "/img/helmet-1.png"}, 
  {"src" : "/img/potion-1.png"}, 
  {"src" : "/img/ring-1.png"}, 
  {"src" : "/img/scroll-1.png"}, 
  {"src" : "/img/shield-1.png"}, 
  {"src" : "/img/sword-1.png"}, 
] ; 



function App() {

  const [cards, setCards] = useState([]) ; 
  const [turns, setTurns] = useState(0) ; 

  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo]  = useState(null)

  const shuffleCards = () => {
     const shuffled = [...cardImages, ...cardImages] 
     .sort(() => Math.random() -0.5 )
     .map((card) => ({card, id: Math.random()}))

     setCards(shuffled)
     setTurns(0)

  }



  //comparing choices


  


  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card) 
  }


  useEffect(() => {
    if(choiceOne && choiceTwo)
    {
        if(choiceOne.src === choiceTwo.src)
        {
          console.log("matches")
          resetTurns() ; 
        }else 
        {
          console.log("do not matches")
          resetTurns() ;
        }
    }
  }, [choiceOne, choiceTwo])

  const resetTurns = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns((prevTurns) => prevTurns + 1)
}
 

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Memory Game </h1>
      <div className="party">
        <button onClick={shuffleCards}>
        Nouvelle partie 
        </button>
        
        <div className="game-grid">
           
           { cards.map(card => (
            
              <SingleCard 
                key={card.id} 
                card={card.card}
                handleChoice={handleChoice}
              />
             
           )) }

        </div>
      </div>
      
    </div>
  )
}

export default App
