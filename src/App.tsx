import { css } from "@linaria/core";
import { ReactElement } from "react";

const test = css`
  color: blue;
`;

export default function App(): ReactElement {
  return <span className={test}>hello</span>;
}
