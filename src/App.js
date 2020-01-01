/** @jsx jsx */
import { jsx } from "@emotion/core";
import css from "@emotion/css/macro";

import Card from "./Card";

const BASTO = "BASTO";
const ESPADA = "ESPADA";
const JOKER = "JOKER";
const COPA = "COPA";
const ORO = "ORO";

function createSuit(suit, maxRank = 12) {
  return "0"
    .repeat(maxRank)
    .split("")
    .map((_, index) => ({
      id: suit + (index + 1),
      suit,
      rank: index + 1
    }));
}

const cardSet = [
  ...createSuit(BASTO),
  ...createSuit(ESPADA),
  ...createSuit(ORO),
  ...createSuit(COPA),
  ...createSuit(JOKER, 2)
];

//https://www.wikizero.com/es/Baraja_espa%C3%B1ola
console.log("conchis", cardSet);

export default function App() {
  return (
    <div
      css={css`
        padding: 10px;
        background: #f1f4f5;
        min-height: 299px;
      `}
    >
      {cardSet.map(card => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
}
