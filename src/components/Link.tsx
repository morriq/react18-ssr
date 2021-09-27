import { ReactElement, useCallback } from "react";
import { Link as RouterLink } from "react-router-dom";

export default function Link({ url, as, children }): ReactElement {
  const onClick = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <RouterLink to={as} onClick={onClick}>
      {children}
    </RouterLink>
  );
}
