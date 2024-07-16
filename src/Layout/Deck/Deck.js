import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";
import BreadcrumbNavi from "../Common/BreadcrumbNavi";

function Deck({ deleteDeck, deleteCard }) {
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
    const { deckId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const loadDeck = async () => {
            const abortCtrl = new AbortController();
            try {
                const fetchedDeck = await readDeck(deckId, abortCtrl.signal);
                setDeck(fetchedDeck);
                setCards(fetchedDeck.cards);
            } catch (error) {
                console.error("Failed to fetch deck:", error);
            }
        };
        loadDeck();
    }, [deckId]);

    const handleDeleteDeck = (id) => {
        deleteDeck(id);
        navigate("/");
    };

    const handleDeleteCard = (id) => {
        deleteCard(id);
        navigate(0);
    };

    const deckButtons = (
        <div>
            <Link to={`/decks/${deck.id}/edit`}>
                <button className="btn btn-primary mr-2">Edit</button>
            </Link>
            <Link to={`/decks/${deck.id}/study`}>
                <button className="btn btn-secondary mr-2">Study</button>
            </Link>
            <Link to={`/decks/${deck.id}/cards/new`}>
                <button className="btn btn-success mr-2">Add Cards</button>
            </Link>
            <button
                className="btn btn-danger"
                onClick={() => handleDeleteDeck(deck.id)}
            >
                Delete
            </button>
        </div>
    );

    const cardList = (
        <ul className="list-group">
            {cards.map((card) => (
                <li className="list-group-item" key={card.id}>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <p className="mb-1">{card.front}</p>
                            <p className="mb-0">{card.back}</p>
                        </div>
                        <div>
                            <Link to={`/decks/${deck.id}/cards/${card.id}/edit`}>
                                <button className="btn btn-primary btn-sm mr-2">Edit
                                </button>
                            </Link>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDeleteCard(card.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );

    return (
        <div>
            <BreadcrumbNavi deckName={deck.name}/>
            <div className="card mb-3 border-0">
                <h5 className="card-title">{deck.name}</h5>
                <p className="card-text">{deck.description}</p>
                {deckButtons}
                <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted">Cards</h6>
                    {cardList}
                </div>
            </div>
        </div>
    );
}

export default Deck;
