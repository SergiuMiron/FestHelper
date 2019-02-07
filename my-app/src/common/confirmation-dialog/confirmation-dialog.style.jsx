import styled from 'styled-components'

export const StyledConfirmationDialog = styled.div`
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width:100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        z-index: 1;
    }
    
    .modal-main {
        position:fixed;
        background: #ffffff;
        width: 515px;
        height: 167px;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        border-radius: 7px;

        .fas {
            color: #de411b;
            position: absolute;
            right: 5px;
            cursor: pointer;
        }

        p {
            text-align:center;
            margin: 65px auto 35px auto;
            font-family: Roboto;
            font-size: 18px;
            font-weight: bold;
            letter-spacing: 0.5px;
        }

        .flex-buttons {
            display: flex;
            justify-content: flex-end;
            
            button {
                margin-right: 30px;
            }
        }
    }
    
    .display-block {
        display: block;
    }
    
    .display-none {
        display: none;
    }

    @media only screen and (max-width : 768px) {

        .modal-main {
            width: 300px;
            height: 120px;
        }

        p {
            font-size: 10px !important;
            margin: 40px auto 25px auto !important;
        }
    }
`