import styled, { css } from 'styled-components';

const Td = styled.td`
   
${props => {
    const textOverflow = props.textOverflow || 'clip';
    const maxWidth = props.maxWidth || 'auto';
    const color = props.color || props.theme.secondaryColor;
    const borderColor = props.theme.scrollbarColor || props.theme.primaryColorDark;
    const textAlign = props.textAlign || 'center';
    const textTransform = props.textTransform || 'capitalize';
  
    return css`
        padding: 35px 30px 35px 0;
        border-bottom: 2px solid ${borderColor};
        overflow: hidden;
        text-overflow: ${textOverflow};
        max-width: ${maxWidth};
        width: ${maxWidth};
        white-space: nowrap; 
        color: ${color};
        text-align:  ${textAlign};
        text-transform: ${textTransform};
        .fa-pencil-alt {
            margin-right :22px;
            cursor: pointer;
        }
      
        .fa-trash {
            color: ${props => props.theme.primaryColor};
            cursor: pointer;
        }
    `

}}
`
export default Td;