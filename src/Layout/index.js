import React, {useEffect, useState} from "react";
import Header from "./Common/Header";
import NotFound from "./Common/NotFound";
import Home from "./Common/Home";
import {Route, Routes} from "react-router-dom"
import Study from "./Study/Study";
import Deck from "./Deck/Deck";
import {createCard, deleteCard, deleteDeck, listDecks} from "../utils/api";
import CardForm from "./Card/CardForm";
import DeckForm from "./Deck/DeckForm";

function Layout() {
    const [decks, setDecks] = useState([])

    useEffect(() => {
        const fetchDecks = async () => {
            const abortController = new AbortController();
            const decks = await listDecks(abortController.signal)
            setDecks(decks)
        }
        fetchDecks();
    }, [])

    const removeDeck = async (deckId) => {
        const confirmDelete = window.confirm("Delete this deck? \n You will not be able to recover it");

        if (confirmDelete) {
            const abortController = new AbortController();
            try {
                await deleteDeck(deckId, abortController.signal)
                setDecks(decksBeforeDeletion => decksBeforeDeletion.filter(deck => deck.id !== deckId));
            } catch (error) {
                console.error("Error deleting card:", error);
            }
        }
    }

    const removeCard = async (cardId) => {
        const confirmDelete = window.confirm("Delete this card? \n You will not be able to recover it");

        if (confirmDelete) {
            console.log(`Deleting card with id ${cardId}`);
            const abortController = new AbortController();
            try {
                await deleteCard(cardId, abortController.signal)
            } catch (error) {
                console.error("Error deleting deck:", error);
            }
        }
    }

    const addNewCard = async (deckId, card) => {
        const abortController = new AbortController();
        try {
            await createCard(deckId, card, abortController.signal)
        } catch (error) {
            console.error("Error adding card:", error);
        }
    }

    return (
      <div>
        <Header />
        <div className="container">
            <Routes>
                <Route path="/" element={<Home decks={decks} deleteDeck={removeDeck}/>}/>
                <Route path="/decks" element={<Home decks={decks} deleteDeck={removeDeck}/>} />
                <Route path="/decks/new" element={<DeckForm decks={decks}/>}/>
                <Route path="/decks/:deckId/" element={<Deck deleteDeck={removeDeck} deleteCard={removeCard}  />} />
                <Route path="/decks/:deckId/cards/new" element={<CardForm addNewCard={addNewCard} />} />
                <Route path="/decks/:deckId/cards/:cardId/edit" element={<CardForm isEditable={true} />} />
                <Route path="/decks/:deckId/study" element={<Study />} />
                <Route path="/decks/:deckId/edit" element={<DeckForm isEditable={true}/>} />
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </div>
     </div>
  );
}

export default Layout;
