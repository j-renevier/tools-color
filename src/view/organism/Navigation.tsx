import { Link } from "react-router-dom";
import { routes } from "../router";

const Navigation = () => {

  return (
    <nav>
      <ul>
        <li>
          <Link to={routes.root.path}>{routes.root.name}</Link>
        </li>
        <li>
          <Link to={routes.parametre.path}>{routes.parametre.name}</Link>
          <ul>
            <li>
              <Link to={routes.parametre.children.hello.path}>{routes.parametre.children.hello.name}</Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;