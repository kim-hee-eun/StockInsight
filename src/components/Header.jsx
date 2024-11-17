import "../styles/components/Header.css";

import Logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="header__wrapper">
        <div className="header__start" onClick={() => navigate("/")}>
          <img className="header__logo" src={Logo} alt="Logo" />
          <span className="header__name">StockInsight</span>
        </div>
        <div className="header__end">
          <span className="header__login">로그인</span>
          <span className="header__join">회원가입</span>
        </div>
      </div>
    </div>
  );
}
