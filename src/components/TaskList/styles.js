import styled from "styled-components/native";

const Container = styled.View`
    background-color: #f2f2f2;
    margin-top: 20px;
    flex-direction: row;
    /* align-items: center; */
    border-radius: 8px;
    min-height: 50px;
    padding-top: 10px;
    max-height: 150px;
    padding-bottom: 10px;
`;

const Content = styled.View`
    flex: 1;
    padding: 5px;
`;

const Description = styled.Text`
    color: ${props => props.complete ? '#e00000cc' : '#000'};    
    text-decoration-line: ${props => props.complete ? 'line-through' : 'none'};
`;

const ButtonDelete = styled.TouchableOpacity`
    margin-right: 7px;
`;

const StatusTask = styled.TouchableOpacity`
    margin-left: 7px;
    justify-content: center;
`;

export {
    Container,
    Content,
    Description,
    ButtonDelete,
    StatusTask
}