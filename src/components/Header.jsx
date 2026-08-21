import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import twitterLogo from "../assets/twitter.png";
import "./Header.css"
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "../services/tanStack";
import { FaHome, FaSignOutAlt, FaUser } from "react-icons/fa";
import { API_BASE_URL } from "../services/api";


function Header() {
    const history = useHistory();
    const { data: currentUser, isPending: isAuthPending, error: isAuthError } = useCurrentUser();
    const queryClient = useQueryClient();//cache'i çıkış yapınca temizlemek için ekledim
    const handleLogout = async () => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/logout`,
                {},
                {
                    withCredentials: true
                }
            );

            console.log("Logout response:", response);

            history.push("/login");
            queryClient.clear();//cache'i log out olunca temizlemek için kullandım.
        } catch (error) {
            console.log("Logout error:", error);
            console.log("Status:", error.response?.status);
            console.log("Data:", error.response?.data);
        }
    };
    if (isAuthPending) return "Yükleniyor..."
    if (isAuthError) return "Yüklenirken bir hata oluştu..."
    return (<div className="header-container">
        <div className="header-content">
            <div className="header-logo">
                <img src={twitterLogo} alt="Twitter Clone Logo" className="login-logo" />
                <h1>Twitter Clone</h1>
            </div>

            <nav>
                <Link to="/">
                    <FaHome />
                </Link>
                <Link to={`/profile/${currentUser?.id}`} className="user-link">
                    <FaUser />
                    <span>{currentUser.userName}</span>
                </Link>

                <button type="button" onClick={handleLogout}>
                    <FaSignOutAlt />
                </button>
            </nav>
        </div>
    </div>)
}
export default Header;