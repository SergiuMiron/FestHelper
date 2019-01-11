import styled, { css } from 'styled-components';

const Th = styled.th`
${props => {
    const color = props.color || props.theme.secondaryColor;
    const textAlign = props.textAlign || 'center';
  
    return css`
        border-bottom: 2px solid ${color};
        padding-bottom: 10px;
        text-align:  ${textAlign};
`
}}
`

export default Th;