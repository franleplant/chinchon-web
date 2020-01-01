/** @jsx jsx */
import { useState, useCallback } from "react";
import { jsx } from "@emotion/core";
import css from "@emotion/css/macro";
import styled from "@emotion/styled/macro";

import Card from "./Card";
import SortableCard from "./SortableCard.js";
import { SpanishDeck } from "../model/cardSet";

  //TODO replace by static method Card.reverse()
  const reverse = {
    id: "REVERSE1",
    suit: "REVERSE",
    rank: 1
  };

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Section = styled.div`
  align-items: center;
  border: 1px solid blue;
  display: flex;
  flex: 1;
  justify-content: center;
  overflow: hidden;
  padding: 10px;
`;

  //TODO this goes in the server
  const deck = new SpanishDeck();
  const hand1 = deck.drawCards(7);
  const hand2 = deck.drawCards(7);

export default function GameBoard(props) {

  const [userHand, setUserHand] = useState(hand2);


  // TODO this will probably need to go to the server somehow
  const moveCard = useCallback(
    // dragIndex: start index
    // hoverIndex: end index
    (dragIndex, hoverIndex) => {
      const dragingCard = userHand[dragIndex];
      const userHandClone = userHand.slice()
      userHandClone.splice(dragIndex, 1)
      userHandClone.splice(hoverIndex, 0, dragingCard)

      setUserHand(userHandClone)
    },
    [userHand]
  );

  return (
    <Container>
      <Section>
        {hand1.map(card => (
          <Card key={card.id} card={card} />
        ))}
      </Section>

      <Section>
        <Card card={reverse} />
        <Card card={deck.drawCard()} />
      </Section>

      <Section>
        {userHand.map((card, index) => (
          <SortableCard key={card.id} card={card} moveCard={moveCard} index={index} sortItem="YOURHAND"/>
        ))}
      </Section>
    </Container>
  );
}
