import "./Button.css";

function Button({ children, handleClick }) {
  return (
    <button onClick={handleClick} className="btn">
      {children}
    </button>
  );
}

export default Button;
