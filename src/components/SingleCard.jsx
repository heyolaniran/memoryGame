import  '../assets/css/singleCard.css' ; 
export default function SingleCard ({card, handleChoice, flipped}) {
   
    const handleClick = () => {
     
        handleChoice(card)
    }

    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img className='front' src={card.card.src} alt="card front" />
                <img className='back'  src="/img/cover.png" alt="card back" onClick={handleClick} />
            </div>
            

        </div>
    )
}