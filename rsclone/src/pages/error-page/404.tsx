import { Link } from "react-router-dom";
import "./404.scss";

export const Error404 = () => {
  return (
    <div id="error" className="error_code_404">
      <div className="error_message">
        The requested URL was not found on our server.
        <Link to="/">Go to the homepage</Link> »
      </div>
      <div className="error_bubble">
        <div className="error_code">
          404
          <br />
          <span>ERROR</span>
        </div>
        <div className="error_quote">There is no page.</div>
      </div>
      <div className="error_arrow"></div>
      <div className="error_attrib">
        <span>Spoon Boy, </span>
        <Link to="/movie/603/"> The Matrix (1999)</Link>
      </div>
    </div>
  );
};
