/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import css from "@emotion/css/macro";
import Espada from "./espada.svg";
import Basto from "./basto.svg";
import Copa from "./copa.svg";
import Oro from "./oro.svg";

export default function Card(props) {
  const { card = {}, width = 150 } = props;

  const height = width / 0.75
  console.log("CARD", card, props);
  return (
    <div
      css={css`
        width: ${width}px;
        display: inline-block;
        height: ${height}px;
        //border: 1px solid #ccc;
        border-radius: 3px;
        padding: 10px;
        box-sizing: border-box;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5),
          -3px -3px 4px rgba(255, 255, 255, 0.9);
        background: #f1f4f5;
        margin: 10px;
        overflow: hidden;
        flex-shrink: 0;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          overflow: hidden;
        `}
      >
        <CardContent suit={card.suit} rank={card.rank} />
      </div>
    </div>
  );
}

export function CardContent({ suit, rank }) {
  if (suit === "REVERSE") {
    return (
      <div
        css={css`
          margin: 10px;
          font-weight: bold;
        `}
      >
        REVERSE
      </div>
    );
  }
  if (suit === "JOKER") {
    return (
      <div
        css={css`
          margin: 10px;
          font-weight: bold;
        `}
      >
        Joker
      </div>
    );
  }

  let suitImg;
  switch (suit) {
    case "ESPADA": {
      suitImg = Espada;
      break;
    }
    case "BASTO": {
      suitImg = Basto;
      break;
    }
    case "COPA": {
      suitImg = Copa;
      break;
    }
    case "ORO": {
      suitImg = Oro;
      break;
    }
    default: {
      throw new Error(`Incorrect card suit`, suit);
    }
  }

  return (
    <>
      <div
        css={css`
          margin: 10px;
          font-weight: bold;
        `}
      >
        {suit} {rank}
      </div>
      <div
        css={css`
          flex: 1;
          overflow: hidden;
          width: auto;
          max-height: 60%;
        `}
      >
        <img
          src={suitImg}
          css={css`
            height: 100%;
          `}
        />
      </div>
    </>
  );
}
