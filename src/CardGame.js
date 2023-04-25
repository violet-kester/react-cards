import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "./Button"
import Card from "./Card"

const BASE_URL = "https://deckofcardsapi.com/api/deck/"

/**
 * CardGame
 *
 * state:
 * decks: deck of cards object, cards remaining in deck, isLoading boolean
 * card: array of drawn card objects
 *
 * props:
 * -
 *
 * CardGame -> { Card, Button }
 *
 */

function CardGame() {
  const [cards, setCards] = useState([]);
  const [deck, setDeck] = useState({
    data: null,
    numCardsLeft: null,
    cardsLeft: false,
    isLoading: true
  });

  console.log("CardGame cards state: ", cards, "deck state: ", deck);

  // get new deck on mount
  useEffect(function fetchDeckWhenMounted() {
    async function fetchDeck() {
      const deckResult = await axios.get(`${BASE_URL}new/shuffle/?deck_count=1`);
      setDeck({
        data: deckResult.data,
        numCardsLeft: deckResult.remaining,
        cardsLeft: true,
        isLoading: false
      });
    }
    fetchDeck();
  }, []);

  // draw a card
  async function drawCard() {
    if(deck.numCardsLeft === 0) {
      setDeck(curr => {
        curr.cardsLeft = false;
        return { ...curr };
      }) 
    }
    const response = await axios.get(`${BASE_URL}${deck.data.deck_id}/draw/?count=2`);
    const drawnCard = response.data.cards[0];
    setCards(curr => {
      curr.unshift(drawnCard);
      return [...curr];
    });
    setDeck(curr => {
      curr.numCardsLeft = response.data.remaining;
      return { ...curr };
    });
  }

  if (deck.isLoading) return <i>Loading deck...</i>;

  return (
    <div className="CardGame">
      <Button handleClick={drawCard} message="Draw a card" />
      {!deck.cardsLeft &&
        <p>"Error: No cards remaining. Please reshuffle."</p>
      }
      {cards.length > 0 && 
      cards.map(c => <Card key={c.code} imageSrc={c.image} />)}
    </div>
  );
}

export default CardGame;