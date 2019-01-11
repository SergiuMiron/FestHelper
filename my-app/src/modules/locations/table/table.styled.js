import styled from 'styled-components';

const StyleTable = styled.table`
  font-size: 16px;
  text-align: left;
  width: 100%;
  border-collapse: collapse;
  font-family: Roboto;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.5px;
  color: ${props => props.theme.secondaryColor};

  .fas {
    cursor: pointer;
    color: ${props => props.theme.primaryColor}
  }

  .fa-arrow-up, 
  .fa-arrow-down{
    padding-left: 8.5px;
  }

`;

export default StyleTable;
