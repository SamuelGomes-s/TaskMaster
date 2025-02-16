import styled from "styled-components/native";

const Container = styled.SafeAreaView`
    flex-direction: row;
`;

const Background = styled.SafeAreaView`
    justify-content: center;
    align-items: center;
    background-color: #c3c3c3;
    height: 150px;
    border-bottom-left-radius: 25px;    
    border-bottom-right-radius: 25px;    
`;

const Logo = styled.Text`
    color: ${props => props.color};
    font-size: 25px;
    font-weight: bold;
    font-style: italic;
`;

export {
    Container,
    Logo,
    Background
}