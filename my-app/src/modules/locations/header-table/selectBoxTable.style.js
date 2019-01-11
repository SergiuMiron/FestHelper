import styled from 'styled-components';

export const StyledBtn = styled.button`
    box-sizing: border-box;
    display: inline;
    :focus {
        outline:none;
      }
    vertical-align: middle;
    height: 25px;
    border-radius: 4px;
    margin-right: 37px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    padding: 4px 32px 4px 26px;
    position: relative;
    background-color: ${props => props.theme.dropdownColor};
    ::before {
        content: "\f111";   
        font-family: "FontAwesome";
        font-size: 6px;
        text-align: center;
        position: absolute;
        background-color: ${props => props.theme.dropdownColor};
        color: ${props => props.theme.primaryColor};
        left: 12px;
        top: 9px;
        
    }
    ::after {
        content: "\f078";   
        font-family: "FontAwesome";
        font-size: 11px;
        text-align: center;
        position: absolute;
        background-color: ${props => props.theme.dropdownColor};
        color: ${props => props.theme.secondaryColor};
        right: 10px;
        top: 5px;
    }
    `;

export const StyledContainer= styled.div`
    position: relative;
    margin: 0px;
    padding: 0px;
    cursor: pointer;
    `;
export const StyledDDropdown = styled.div`
    position: absolute;
    background-color: #fdfdfd;
    cursor: pointer;   
    overflow: auto;
    box-shadow: 0 5px 10px 0 ${props => props.theme.shadowColor};
    border: solid 0.5px ${props => props.theme.dropdownColor};
    z-index: 1;
    border-radius: 8px;
    line-height: 1.53;
    letter-spacing: -0.1px;
    top: 5px;
    left: 0px;
    
    padding: 9px 15px 9px 27px;
    list-style-type: none;
    .noSelection {
        position: relative;
        white-space: nowrap;
    }
    .selected {  

        position: relative;  
        .iTag {
            font-size: 11px;
            position: absolute;
            top: 7px;
            left: -21px;
            padding-left: 6px;
            display: inline-block;
        } 
    }
    .iTag {
            display: none;
    }
    `;
