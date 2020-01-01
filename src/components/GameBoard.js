/** @jsx jsx */
import { useState, useCallback } from "react";
import { jsx } from "@emotion/core";
import css from "@emotion/css/macro";
import styled from "@emotion/styled/macro";
import _ from "lodash";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Card from "./Card";
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
const initialState = {
  deck,
  hand1: deck.drawCards(7),
  hand2: deck.drawCards(7),
  stack: [deck.drawCard()]
};

export default function GameBoard(props) {
  const [gameState, setGameState] = useState(initialState);

  const onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    const newGameState = _.cloneDeep(gameState);

    const dragingCard = newGameState.hand1[source.index];

    if (source.droppableId === destination.droppableId) {
      newGameState.hand1.splice(source.index, 1);
      newGameState.hand1.splice(destination.index, 0, dragingCard);
    } else {
      // descartar
      newGameState.hand1.splice(source.index, 1);
      newGameState.stack.push(dragingCard);
    }

    setGameState({ ...newGameState });
  };

  const handleCenterCardClick = card => {
      const newGameState = _.cloneDeep(gameState);
    if (card.suit === "REVERSE") {
      const newCard = newGameState.deck.drawCard();
      newGameState.hand1.push(newCard);
    } else {
      const newCard = newGameState.stack.pop();
      newGameState.hand1.push(newCard);
    }
      setGameState({ ...newGameState });
  };

  console.log("hand", gameState);

  const stackTop = gameState.stack[gameState.stack.length - 1];
  const centerCards = [reverse, stackTop];
  console.log("hand", gameState, centerCards);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <p>Cartas {deck.len()} </p>
        <Section>
          {gameState.hand2.map(card => (
            <Card key={card.id} card={card} />
          ))}
        </Section>

        <Droppable droppableId={"deck"} direction="horizontal">
          {(provided, snapshot) => (
            <Section ref={provided.innerRef}>
              {centerCards.filter(Boolean).map((card, index) => (
                <Card
                  card={card}
                  index={index}
                  key={card.id}
                  onClick={() => handleCenterCardClick(card)}
                />
              ))}
              {provided.placeholder}
            </Section>
          )}
        </Droppable>

        <DropableSection cards={gameState.hand1} dropableId={"userHand"} />
      </Container>
    </DragDropContext>
  );
}

function DropableSection(props) {
  const { dropableId, cards } = props;

  return (
    <Droppable droppableId={dropableId} direction="horizontal">
      {(provided, snapshot) => (
        <Section ref={provided.innerRef}>
          {cards.map((card, index) => (
            <DragableCard card={card} index={index} key={card.id} />
          ))}
          {provided.placeholder}
        </Section>
      )}
    </Droppable>
  );
}

function DragableCard(props) {
  const { card, index } = props;
  return (
    <Draggable key={card.id} draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          card={card}
        />
      )}
    </Draggable>
  );
}
