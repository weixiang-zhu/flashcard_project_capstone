import React from "react";
import { Link, useLocation } from "react-router-dom";

const BreadcrumbNavi = ({ deckName, cardId }) => {
    const location = useLocation();
    const pathSegments = location.pathname.split("/").filter((segment) => segment);

    const generateBreadcrumbs = () => {
        let links = [
            <Link key="home" to="/">
                Home
            </Link>,
        ];

        pathSegments.forEach((segment, index) => {
            switch (segment) {
                case "decks":
                    const deckId = pathSegments[index + 1];

                    if (deckId === "new") {
                        links.push(<span key="create-deck">Create Deck</span>);
                    } else {
                        links.push(
                            pathSegments.length === 2 ? (
                                <span key={`deck-${deckId}`}>{deckName || `Deck ${deckId}`}</span>
                            ) : (
                                <Link key={`deck-${deckId}`} to={`/decks/${deckId}`}>
                                    {deckName || `Deck ${deckId}`}
                                </Link>
                            )
                        );

                        switch (true) {
                            case pathSegments.includes("edit") && !pathSegments.includes("cards"):
                                links.push(<span key="edit-deck">Edit Deck</span>);
                                break;
                            case pathSegments.includes("study"):
                                links.push(<span key="study-deck">Study</span>);
                                break;
                            case pathSegments.includes("cards"):
                                const cardIndex = pathSegments.indexOf("cards");
                                const cardId = pathSegments[cardIndex + 1];

                                if (pathSegments.includes("new")) {
                                    links.push(<span key="add-card">Add Card</span>);
                                } else if (cardId) {
                                    if (pathSegments.includes("edit")) {
                                        links.push(
                                            <span key={`edit-card-${cardId}`}>Edit Card {cardId}</span>
                                        );
                                    }
                                }
                                break;
                            default:
                                break;
                        }
                    }
                    break;
                case "new":
                    links.push(<span key="create-deck">Create Deck</span>);
                    break;
                default:
                    break;
            }
        });


        return links;
    };

    return (
        <nav className="breadcrumb-nav">
            {generateBreadcrumbs().map((breadcrumb, index) => (
                <span key={index}>
          {index > 0 && " / "}
                    {breadcrumb}
        </span>
            ))}
        </nav>
    );
};

export default BreadcrumbNavi;
