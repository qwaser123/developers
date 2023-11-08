import styled from "styled-components";

export const WhiteModal = styled.div`
background: rgb(255, 255, 255);
width: ${(props) => props.width};
height: ${(props) => props.height};
padding: 30px;
border-radius: 10px;
position: absolute;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
top: 55%;
left: 54.5%;
transform: translate(-50%, -50%);
z-index: 5;
`;