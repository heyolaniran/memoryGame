import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import SingleCard from './components/SingleCard';

const cardImages = [
  {"src" : "/img/helmet-1.png", matched: false}, 
  {"src" : "/img/potion-1.png", matched: false}, 
  {"src" : "/img/ring-1.png", matched: false}, 
  {"src" : "/img/scroll-1.png", matched: false}, 
  {"src" : "/img/shield-1.png", matched: false}, 
  {"src" : "/img/sword-1.png", matched: false}, 
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
     setChoiceOne(null)
     setChoiceTwo(null)
     setCards(shuffled)
     setTurns(0)

  }



  //comparing choices


  


  const handleChoice = (card) => {
 
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card) 
    console.log(choiceOne)
    console.log(choiceTwo)  
  }

  

  useEffect(() => {


    if(choiceOne && choiceTwo)
    {
        if(choiceOne.card.src === choiceTwo.card.src)
        {
          setCards(prevCards => {
           return prevCards.map(card => {
              if(card.card.src === choiceOne.card.src)
              {
                 return {...card, matched : true}
              }else 
              return card
            })
          })
          console.log("matches")
          resetTurns()
        }else 
        {
          console.log("do not matches")
         resetTurns()
        }
    }
  }, [choiceOne, choiceTwo])


  
  const resetTurns = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns((prevTurns) => prevTurns + 1)
}

// automatically start the game 

useEffect(() => {
  shuffleCards() 
}, [])

// share on whatsapp 

const handleShare = () => {

  const message = `Mon top score de carte tourné sur le memory game est de ${turns} , jouez-y ici https://memorygamevite.netlify.app`; 

  window.location.href =`https://wa.me/send?phone=22996584394&text=${message}`

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
             <div>
                
              <SingleCard 
                key={card.id} 
                card={card}
                handleChoice={handleChoice}
                flipped = { choiceTwo ==card || choiceOne == card || card.matched }
              />
             </div>
             
             
           )) }



        </div>

        <h3>
          Nombre de tours : { turns }
        </h3>

      </div>

      <div>
         <button onClick={handleShare}> Partager sur whatsapp </button>
      </div>

      
    </div>
  )
}

export default App
