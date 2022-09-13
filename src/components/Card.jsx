export default function Card({ children }) {
  return (
    <div className="card">
      <div className="card__header">{children[0]}</div>
      <div className="card__separator"></div>
      <div className="card__footer">{children[1]}</div>
    </div>
  );
}
