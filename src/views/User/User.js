import React from "react";
import { Image } from "semantic-ui-react";
import Logo from "../../assets/mecanica.jpeg";
import "./User.scss";

export default function User(props) {
  return (
    <div className="user-main">
      <Image src={Logo} />
      <div className="welcome">
              <p>Bienvenido a MechanicOS</p>
      </div>
    </div>
  );
}
