/** @jsx jsx */
import { jsx } from "@emotion/core";
import css from "@emotion/css/macro";
import { Global } from "@emotion/core";

import Card from "./Card";
import { SpanishDeck } from "./model/cardSet";

//TODO
//- refactor styles into smaller chunks
//- create a single syle only card that can be used to show reverse or interactions
//- make the hand sortable
//- hide oponents cards
//- create a better card reverse (maybe with backgrounds degrade)
//- add titles to each gameboard part
//- refactor gameboard into smaller composoable chunks


export default function App() {
  return (
    <div
      css={css`
        padding: 10px;
        background: #f1f4f5;
        height: 100%;
        box-sizing: border-box;
      `}
    >
      <Global
        styles={css`
          html,
          body,
          #root {
            height: 100%;
          }
        `}
      />
      {/*
      {deck.map(card => (
        <Card key={card.id} card={card} />
      ))}
      */}
      <GameBoard />
    </div>
  );
}

export function GameBoard(props) {
const deck = new SpanishDeck();
  //const card = deck.drawRandomCard()
  const hand1 = deck.drawCards(7);
  const hand2 = deck.drawCards(7);
  //console.log(hand);
  //<Card card={card} />
  const reverse = {
        id: "REVERSE1",
        suit: "REVERSE",
        rank: 1
      }

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
      `}
    >
      <div
        css={css`
          border: 1px solid red;
          display: flex;

                      align-items: center;
        padding: 10px;
          overflow: hidden;
          flex: 1;
        `}
      >
        {hand1.map(card => {
          if (!card) {
            console.log("UNDEF", card)
          }
          return (
            <div css={css`
                overflow: hidden;
              `}>
          <Card key={card.id} card={card} width={150}/>
          </div>
        )})}
      </div>
    
      <div
        css={css`
          border: 1px solid blue;
              display: flex;
                  justify-content: center;
                      align-items: center;

          flex: 1;
        `}
      >
        <Card card={reverse} />
        <Card card={deck.drawCard()} />
      </div>




      <div
        css={css`
          border: 1px solid red;
          display: flex;

                      align-items: center;
        padding: 10px;
          overflow: hidden;
          flex: 1;
        `}
      >
        {hand2.map(card => {
          if (!card) {
            console.log("UNDEF", card)
          }
          return (
            <div css={css`
                overflow: hidden;
              `}>
          <Card key={card.id} card={card} width={150}/>
          </div>
        )})}
      </div>
    </div>
  );
}
