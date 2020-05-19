import React, { useRef } from "react";
import "../css/header.css";
import logo from "../imgs/logo.png";
import userIcon from "../imgs/social.png";
import { Link } from "react-router-dom";

function Header() {
  const $Header = useRef();
  // scroll처리
  window.addEventListener("scroll", function(e) {
    let offSet = window.scrollY;
    offSet === 0 ? $Header.current.classList.remove("notTop") : $Header.current.classList.add("notTop")
  });

  return (
    <div className="Header" ref={$Header}>
      <div className="logo">
        {/* 홈으로 */}
        <Link to="/">
          <img alt="로고" src={logo} className="logoImg" />
        </Link>
      </div>
      <div className="userInfo">
        <img alt="유저" src={userIcon} className="userImg" />
        {/* 유저 테이블의 닉네임 값 */}
        <div className="nickName center">닉네임</div>
      </div>
    </div>
  );
}

export default Header;
