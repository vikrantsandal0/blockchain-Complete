import { Spinner } from "react-bootstrap";

function Loading({ text = "Loading...", show }) {
  if (!show) return null;
  return (
    <div className="loading">
      <Spinner animation='grow' />
      <h4>{text}</h4>
    </div>
  );
}
export default Loading;
