import "./Header.css";

export function Header() {
  return (
    <div className="header">
      <div className="container">
        <div>
          <a href={"/"}>HOLOLIVE</a>
        </div>
        <div>
          <a href="/"> DECKS</a>
        </div>
        <div>
          <a href="/login"> LOGIN</a>
        </div>
      </div>
    </div>
  );
}
