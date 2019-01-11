import styled, {css} from 'styled-components'

export const ComponentWrapper = styled.section`
width: 274px;
height: 19px;
float: right;

::after{
    content: "";
    clear: both;
    display: table;
}
`

export const PaginationWrapper = styled.section`
display: flex;
flex-direction: row;
flex-wrap: nowrap;
justify-content: space-between;

padding: 0px;
margin-top: 22px
`

export const NavigationElement = styled.span`
${props => {
    let fontWeight;
    let pointerEvents = "auto";
    if(props.type === "disabled"){
        fontWeight = 300;
        pointerEvents = "none";
    } else if (props.type === "current") {
        fontWeight = 900;
    } else if (props.type === "normal"){
        fontWeight = 500;
    }

    return css `
    color: ${props.theme.secondaryColor};
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    font-size: 16px;
    font-weight: ${fontWeight};
    letter-spacing: 0.54px;
    pointer-events: ${pointerEvents};
    user-select: none;

    &:hover {
        cursor: ${props.type === "disabled" ? "not-allowed" : "pointer"};
    }
    `
}
};`