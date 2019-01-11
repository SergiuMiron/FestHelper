import React from 'react';
import './container-header.scss';

const ContainerHeader = ({label, className}) => (
    <h2 className="header-page"><i className = {className} ></i>{label}</h2>
);

export default ContainerHeader;