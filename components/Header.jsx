import styled from "styled-components";
import SearchIcon from "../public/search-icon.svg";
import Image from "next/image";
import Star from "../public/star.svg";

export default function Header() {
  return (
    <StyledHeader>
      <div className="logo">AMATORSKIE</div>
      <div className="center">
        <div className="input-wrapper">
          <input type="text" placeholder="Wyszukaj" />
          <button className="search">
            <Image src={SearchIcon} alt="Search" />
          </button>
        </div>
        <button className="premium">
          <Image src={Star} alt="Star" />
          PREMIUM
        </button>
      </div>
      <div className="right">
        <p>ZAREJESTRUJ SIĘ</p>
        <p>LOGIN</p>
      </div>
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  padding: 20px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .center {
    display: flex;
    gap: 30px;
    .input-wrapper {
      position: relative;
      .search {
        /* background: transparent; */
        border: none;
        outline: none;
        height: 100%;
        width: 50px;
        border-radius: 7px;
        position: absolute;
        right: 0;
        cursor: pointer;
      }
    }
    .premium {
      padding: 0 17px;
      border: none;
      outline: none;
      font-family: var(--font);
      font-weight: 500;
      font-size: 16px;
      border-radius: 7px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
      background-color: #7d0000;
      transition: background 0.2s linear;
      &:hover {
        background-color: #a60000;
      }
    }

    input {
      font-family: var(--font);
      width: 300px;
      border-radius: 7px;
      padding: 15px;
      background-color: rgba(255, 255, 255, 0.3);
      outline: none;
      border: none;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.6);
    }
  }
  .logo {
    font-size: 35px;
  }
  .right {
    display: flex;
    gap: 25px;
    cursor: pointer;
    p {
      transition: color 0.2s linear;
      &:hover {
        color: #d6d6d6;
      }
    }
  }
`;
