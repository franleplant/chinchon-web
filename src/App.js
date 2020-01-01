/** @jsx jsx */
import { jsx } from "@emotion/core";
import css from "@emotion/css/macro";
import styled from "@emotion/styled/macro";
import { Global } from "@emotion/core";

import GameBoard from "./components/GameBoard";

//TODO
//- use https://css-tricks.com/draggin-and-droppin-in-react/ instead of react-dnd
//for a better out of the box experience
//- hide oponents cards
//- create a better card reverse (maybe with backgrounds degrade)
//- add titles to each gameboard part
//- refactor gameboard into smaller composoable chunks

const Container = styled.div`
  padding: 10px;
  background: #f1f4f5;
  height: 100%;
  box-sizing: border-box;
`;

export default function App() {
  return (
    <Container>
        <Global
          styles={css`
            html,
            body,
            #root {
              height: 100%;
            }
          `}
        />
        <GameBoard />
    </Container>
  );
}
