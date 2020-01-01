/** @jsx jsx */
import { jsx } from "@emotion/core";
import css from "@emotion/css/macro";

export default function CardBack() {
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
