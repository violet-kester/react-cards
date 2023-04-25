import React, { useState, useEffect } from "react";
import axios from "axios";
import DrawButton from "./DrawButton"
import Card from "./Card"

/**
 * CardGame
 *
 * state:
 * decks: deck of cards object
 * card: current card object
 *
 * props:
 * -
 *
 * CardGame -> { Card, DrawButton }
 *
 */

// {
//   "success": true,
//   "deck_id": "3p40paa87x90",
//   "shuffled": true,
//   "remaining": 52
// }

// {
//   "success": true,
//   "deck_id": "kxozasf3edqu",
//   "cards": [
//       {
//           "code": "6H",
//           "image": "https://deckofcardsapi.com/static/img/6H.png",
//           "images": {
//                         "svg": "https://deckofcardsapi.com/static/img/6H.svg",
//                         "png": "https://deckofcardsapi.com/static/img/6H.png"
//                     },
//           "value": "6",
//           "suit": "HEARTS"
//       },
//       {
//           "code": "5S",
//           "image": "https://deckofcardsapi.com/static/img/5S.png",
//           "images": {
//                         "svg": "https://deckofcardsapi.com/static/img/5S.svg",
//                         "png": "https://deckofcardsapi.com/static/img/5S.png"
//                     },
//           "value": "5",
//           "suit": "SPADES"
//       }
//   ],
//   "remaining": 50
// }

function CardGame() {
  const [card, setCard] = useState();
  const [deck, setDeck] = useState({
    data: null,
    isLoading: true
  });

  //
  useEffect(function fetchDeckWhenMounted() {
    async function fetchDeck() {
      const deckResult = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
      setDeck({
        data: deckResult.data,
        isLoading: false
      });
    }
    fetchDeck();
  }, []);

  // draw a card
  async function drawCard() {
    const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.data.deck_id}/draw/?count=1`);
    const drawnCard = response.data.cards[0];
    setCard(drawnCard);
  }

  if (deck.isLoading) return <i>Loading deck...</i>;

  return (
    <div className="CardGame">
      <DrawButton drawCard={drawCard} />
      {card && <Card />}
    </div>
  );
}

export default CardGame;