import Boards from "./Screens/Boards";
import Dashboard from "./Screens/Dashboard";
import Profile from "./Screens/Profile";
import Search from "./Screens/Search";
import Settings from "./Screens/Settings";
import "./MainSection.css";

const screens = {
  dashboard: Dashboard,
  boards: Boards,
  profile: Profile,
  search: Search,
  settings: Settings,
};

function MainSection({ activeScreen }) {
  const ActiveScreen = screens[activeScreen];
  return (
    <div className="main-section">
      <ActiveScreen />
    </div>
  );
}

export default MainSection;
