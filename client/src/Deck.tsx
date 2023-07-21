import { useEffect, useState } from "react";
import "./Deck.css";
import { useParams } from "react-router-dom";
import { createCard } from "./api/createCard";
import { getDeck } from "./api/getDeck";
import { TDeck } from "./api/getDecks";
import { deleteCard } from "./api/deleteCard";

export default function Deck() {
  const [deck, setDeck] = useState<TDeck | undefined>();
  const [cards, setCards] = useState<string[]>([]);
  const [text, setText] = useState("");
  let { deckId } = useParams();
  // const [decks, setDecks] = useState<TDeck[]>([]);

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    const { cards: serverCards } = await createCard(deckId!, text);
    setCards(serverCards);
    setText("");
  }

  async function handleDeleteCard(index: number) {
    if (!deckId) return;
    const newDeck = await deleteCard(deckId, index);
    setCards(newDeck.cards);
    // setDecks(decks.filter((deck) => deck._id !== deckId));
  }

  useEffect(() => {
    async function fetchDecks() {
      if (!deckId) return;
      const newDeck = await getDeck(deckId);
      setDeck(newDeck);
      setCards(newDeck.cards);
    }
    fetchDecks();
  }, [deckId]);

  return (
    <>
      <div className="Deck">
        <h1>CURRENTLY SELECTED DECK: {deck?.title}</h1>
        <form onSubmit={handleCreateDeck}>
          <label htmlFor="card-text">Card Text: </label>
          <input
            id="card-text"
            value={text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setText(e.target.value);
            }}
          />
          <button>Create Card</button>
        </form>

        <ul className="cards">
          {cards.map((card, index) => (
            <li key={index}>
              {card}
              <button onClick={() => handleDeleteCard(index)}>X</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
