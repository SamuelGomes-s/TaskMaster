import React from "react";
import { ButtonDelete, Container, Content, Description, StatusTask } from "./styles";
import DeleteIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CheckIcon from "react-native-vector-icons/MaterialCommunityIcons";

export default function TaskList({ data, completeItem, deleteItem }) {

    function handleDelete() {
        deleteItem(data.id)
    }

    function handleComplete() {
        completeItem(data.id)
    }

    return (
        <Container>
            <StatusTask
                onPress={() => handleComplete()}
            >
                {data.isComplete ? (
                    <CheckIcon
                        name='check-circle'
                        size={20}
                        color={'#7dee14cc'}
                    />
                ) : (
                    <CheckIcon
                        name='check-circle-outline'
                        size={20}
                        color={'#bc14eecc'}
                    />
                )}
            </StatusTask>
            <Content>
                <Description
                    complete={data.isComplete}
                    numberOfLines={5}
                >
                    {data.taskDescription}
                </Description>
            </Content>
            <ButtonDelete
                onPress={handleDelete}
            >
                <DeleteIcon
                    name='delete-forever-outline'
                    size={25}
                    color={'#121212'}
                />
            </ButtonDelete>
        </Container>
    )
}