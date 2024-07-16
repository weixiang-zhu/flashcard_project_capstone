import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";
import BreadcrumbNavi from "../Common/BreadcrumbNavi";

const Study = () => {
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [nextButtonVisible, setNextButtonVisible] = useState(false);
    const { deckId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const loadDeck = async () => {
            const abortController = new AbortController();
            const fetchedDeck = await readDeck(deckId, abortController.signal);
            setDeck(fetchedDeck);
            setCards(fetchedDeck.cards);
        };
        loadDeck();
    }, [deckId]);

    const toggleCard = () => {
        setIsFlipped(!isFlipped);
        setNextButtonVisible(!isFlipped);
    };

    const showNextCard = () => {
        setIsFlipped(false);
        setNextButtonVisible(false);
        if (currentIndex === cards.length - 1) {
            const restart = window.confirm("Restart cards?\nClick 'cancel' to return to home page.");
            restart ? setCurrentIndex(0) : navigate("/");
        } else {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const renderStudyView = () => (
        <div className="text-start">
            <h6 className="mb-3">{`Card ${currentIndex + 1} of ${cards.length}`}</h6>
            <div className="card mb-3">
                <div className="card-body">
                    <p className="card-text">{isFlipped ? cards[currentIndex].back : cards[currentIndex].front}</p>
                </div>
            </div>
            <div className="d-flex justify-content-start">
                <button className="btn btn-secondary btn" onClick={toggleCard}>
                    {isFlipped ? "Flip Back" : "Flip"}
                </button>
                {nextButtonVisible && (
                    <button className="btn btn-primary ms-2 next-button" onClick={showNextCard}>
                        Next
                    </button>
                )}
            </div>
        </div>
    );

    const renderCreateCardView = () => (
        <div className="text-start">
            <h2>Not enough cards.</h2>
            <p>You need at least 3 cards to study. There are {cards.length} cards in this deck.</p>
            <Link to={`/decks/${deck.id}/cards/new`}>
                <button className="btn btn-primary">Add Cards</button>
            </Link>
        </div>
    );


    return (
        <div>
            <BreadcrumbNavi deckName={deck.name}/>
            <h1>Study: {deck.name}</h1>
            {cards.length < 3 ?
                renderCreateCardView() :
                renderStudyView()
            }
        </div>
    );
}

export default Study;
