import React from "react";
import { Link, useNavigate } from "react-router-dom";

function DeckList({ deck, deleteDeck }) {
    const navigate = useNavigate();

    const deleteDeckHandler = (deckId) => {
        deleteDeck(deckId);
        navigate(0);
    };

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{deck.name}</h5>
                <p className="card-text">{deck.description}</p>
                <p className="card-text">{deck.cards ? deck.cards.length : 0} cards</p>
                <Link to={`/decks/${deck.id}`}>
                    <button className="btn btn-primary">View</button>
                </Link>
                <Link to={`/decks/${deck.id}/study`}>
                    <button className="btn btn-secondary">Study</button>
                </Link>
                <button className="btn btn-danger"
                        onClick={() => deleteDeckHandler(deck.id)}>Delete
                </button>
            </div>
        </div>
    );
}

export default DeckList;