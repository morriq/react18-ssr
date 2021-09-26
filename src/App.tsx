import { css } from "@linaria/core";
import { ReactElement } from "react";
import { useData } from "src/providers/Data";

const hello = css`
  color: blue;
`;

export default function App(): ReactElement {
  const data = useData();

  console.log(data);
  return <span className={hello}>hello</span>;
}
