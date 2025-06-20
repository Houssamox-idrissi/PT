import { jwtDecode } from "jwt-decode";
import { FiSun, FiMoon } from "react-icons/fi";

export default function Topbar({ theme, setTheme }) {
  const token = localStorage.getItem("token")
  
  
  const capitalizeFirstLetter = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

  const decodedToken = jwtDecode(token);
  const firstName = capitalizeFirstLetter(decodedToken.firstName);
  const lastName = capitalizeFirstLetter(decodedToken.lastName);
  const userName = `${firstName} ${lastName}`;
  
  return (
    <div className="flex items-center justify-between px-8 pt-8 pb-4">
      <div className="flex items-center gap-4">
        <div>
          <div className="text-lg font-semibold">Bienvenue, {userName}</div>
        </div>
      </div>
      
    </div>
  );
} 