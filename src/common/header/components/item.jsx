import React from 'react';
import { NavLink } from 'react-router-dom';


const Item = (props) => {
    return(
      <li className="navbar__item">
        <NavLink activeClassName="navbar__link--is-active" to={props.href} className="navbar__link">{props.text}</NavLink>
      </li>
    );
}

export default Item;