import styled, {css} from 'styled-components'


export const StyledButton = styled.button.attrs({
    disabled : props => (props.disabled ? true: false)
})`
${props => {
    const backgroundColor =  props.background === 'white' ? '#ffffff': props.theme.primaryColor;
    const textColor = props.background === 'white' ? props.theme.primaryColor: '#ffffff' ;
    const paddingBtn = props.size === 'Small' ? '' 
                        : props.size === 'Medium' ? '10px'  : '10px 60px';
    const fontSize =  props.size === 'Small' ? '14px' : '16px' ;
    const borderBtn =  props.background === 'white' ? `solid 1px ${props.theme.primaryColor}` : `solid 1px ${props.theme.primaryColor}` ;

    return css`
    background-color: ${backgroundColor};
    color: ${textColor};
    padding: ${paddingBtn};
    font-size: ${fontSize};
    border: ${borderBtn};
    text-transform: ${ props => props.textTransform ? props.textTransform : ''};
    
    background-color:  ${ props => props.background === 'white' ? '#ffffff': props.theme.primaryColor};
    color: ${ props => props.background === 'white' ? props.theme.primaryColor: '#ffffff' };
    padding: ${ props => props.size === 'Small' ? '' 
                        : props.size === 'Medium' ? '10px'  : '10px 30px'}
    font-size: ${ props => props.size === 'Small' ? '14px' : '16px' };
    border:  ${ props => props.background === 'white' ? `solid 1px ${props.theme.primaryColor}` : `solid 1px ${props.theme.primaryColor}` } };
    border-radius: 4px;
    cursor: pointer;
    outline: none;
    transition: background-color .5s ease-in-out, color .5s ease-in-out;
    &.disabled {
        background-color: gray;
        cursor: not-allowed;
        border:1px solid gray;
        &:hover{
         background-color: gray;
         color:#fff;
         border:1px solid gray;
        }
   }
    
    &:hover {
        background-color: #ffffff;
        color: ${props.theme.primaryColor};
        border: ${borderBtn};
        transition: background-color .5s ease-in-out, color .5s ease-in-out;
    }
    `
}}
`
