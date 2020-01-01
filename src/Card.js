/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import css from "@emotion/css/macro";
//import styled from '@emotion/styled/macro'
import Espada from "./espada.svg";
import Basto from "./basto.svg";
import Copa from "./copa.svg";
import Oro from "./oro.svg";

export default function Card(props) {
  const { card = {} } = props;
  return (
    <div
      css={css`
        width: 150px;
        display: inline-block;
        height: 200px;
        border: 1px solid #ccc;
        border-radius: 3px;
        padding: 10px;
        box-sizing: border-box;
        box-shadow: 2px 2px 5px #ddd, -3px -3px 4px #fff;
        background: #f1f4f5;
        margin: 10px;
        overflow: hidden;
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
