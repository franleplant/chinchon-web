/** @jsx jsx */
import React, {useRef, forwardRef} from "react";
import { jsx } from "@emotion/core";
import css from "@emotion/css/macro";
import styled from "@emotion/styled/macro";
import { useDrag, useDrop } from 'react-dnd'

import Joker from "./Joker";
import CardBack from "./CardBack";

import Espada from "./espada.svg";
import Basto from "./basto.svg";
import Copa from "./copa.svg";
import Oro from "./oro.svg";

const CardContainer = styled.div`
  width: ${props => props.width}px;
  display: inline-block;
  height: ${props => props.width / 0.75}px;
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
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow: hidden;
`;

export const Card = forwardRef((props, ref) => {
  const {
    card = {},
      width = 100,
      children = card => <CardContent suit={card.suit} rank={card.rank} />
  } = props;


  return (
    <CardContainer width={width} ref={ref}>
      <CardBody>{children(card)}</CardBody>
    </CardContainer>
  );

})

export default Card

export function CardContent({ suit, rank }) {
  if (suit === "REVERSE") {
    return <CardBack />;
  }
  if (suit === "JOKER") {
    return <Joker />;
  }

  return (
    <>
      <div
        css={css`
          margin: 10px;
          font-weight: bold;
        `}
      >
        {suit}
      </div>
      <div
        css={css`
          margin: 10px;
          font-weight: bold;
        `}
      >
        {rank}
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
          src={suitToImage(suit)}
          alt={suit}
          css={css`
            height: 100%;
          `}
        />
      </div>
    </>
  );
}

export function suitToImage(suit) {
  switch (suit) {
    case "ESPADA": {
      return Espada;
    }
    case "BASTO": {
      return Basto;
    }
    case "COPA": {
      return Copa;
    }
    case "ORO": {
      return Oro;
    }
    default: {
      throw new Error(`Incorrect card suit`, suit);
    }
  }
}
