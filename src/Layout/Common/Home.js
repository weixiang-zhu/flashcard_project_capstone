import React from "react";
import { Link } from "react-router-dom";

import DeckList from "../Deck/DeckList";

const Home = ({ decks, deleteDeck }) => {
    const deckList = () => {
        return decks.map((deck) => {
            const cardsForDeck = deck.cards?.filter((card) => card.id === deck.id) || [];
            return (
                <li key={deck.id}>
                    <DeckList deck={deck} cards={cardsForDeck} deleteDeck={deleteDeck} />
                </li>
            );
        });
    };

    return (
        <div>
            <Link to="/decks/new">
                <button className="btn btn-secondary mb-3">Create deck</button>
            </Link>
            <ul className="list-unstyled">{deckList()}</ul>
        </div>
    );
};

export default Home;
