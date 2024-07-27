function NavBarItem({ label, icon, onClick, activeScreen, screen }) {
  const isActive = activeScreen === screen;
  return (
    <li onClick={onClick} className={`navbar-item ${isActive ? "active" : ""}`}>
      <img className="navbar-item-icon" src={icon} alt={`${label}-icon`} />
      {label}
    </li>
  );
}

export default NavBarItem;
