import { css } from "@linaria/core";
import { ReactElement } from "react";
import { hot } from "react-hot-loader/root";
import { useData } from "src/providers/Data";

const hello = css`
  color: blue;
`;

function App(): ReactElement {
  const data = useData();

  return <span className={hello}>hello {JSON.stringify(data)}</span>;
}

export default hot(App);
