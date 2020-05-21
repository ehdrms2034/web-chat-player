import React, { useRef, useEffect, useState } from "react";
import "../css/header.css";
import logo from "../imgs/logo.png";
import userIcon from "../imgs/social.png";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useCookies } from "react-cookie";
import Axios from "axios";
import { uniqueNamesGenerator, adjectives, colors, animals } from "unique-names-generator";
import Modal from "react-modal";

const serverUrl = "http://27.96.130.172";

const customConfig = {
  dictionaries: [adjectives, colors, animals],
  separator: " ",
  length: 2,
};
Modal.setAppElement(document.getElementById("forModal"));
function Header({ nickname, setNickname }) {
  var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const $Header = useRef();
  // scroll처리
  useEffect(() => {
    window.addEventListener("scroll", function(e) {
      let offSet = window.scrollY;
      offSet === 0 ? $Header.current.classList.remove("notTop") : $Header.current.classList.add("notTop");
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  const [cookie, setCookie] = useCookies(["cookie"]);

  useEffect(() => {
    async function init() {
      if (cookie.id === undefined) await createUser();
      else await getNickname();
    }
    init();
  }, [cookie]);

  const createUser = async () => {
    const uuid4 = uuidv4();
    const response = await Axios.post(`${serverUrl}/api/user/createUser`, {
      cookie: uuid4,
      nickname: uniqueNamesGenerator(customConfig),
    });
    if (response.data.response === "success") {
      setCookie("id", uuid4, { path: "/" });
      setNickname(response.data.data);
      console.log(`INFO (Header.js) : 새 쿠키 발행 --> Cookie : ${uuid4} / Nickname : ${response.data.data}`);
    }
  };

  const getNickname = async () => {
    const id = cookie.id;
    const response = await Axios.get(`${serverUrl}/api/user/getNickname`, {
      params: {
        cookie: id,
      },
    });
    if (response.data.response === "success") {
      setNickname(response.data.data);
      console.log(`INFO (Header.js) : 기존 쿠키 적용 --> Cookie : ${id} / Nickname : ${response.data.data}`);
    } else await createUser();
  };

  return (
    <div className="Header" ref={$Header} id="forModal">
      <div className="logo">
        {/* 홈으로 */}
        <Link to="/">
          <img alt="로고" src={logo} className="logoImg" />
        </Link>
      </div>
      <div className="userInfo">
        <img alt="유저" src={userIcon} className="userImg" />
        {/* 유저 테이블의 닉네임 값 */}

        <button onClick={openModal}>Open Modal</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
          <button onClick={closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </Modal>

        <div className="nickName center">{nickname}님</div>
      </div>
    </div>
  );
}

export default Header;
