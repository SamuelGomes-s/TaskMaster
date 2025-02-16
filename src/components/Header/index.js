import React from "react";
import { Background, Container, Logo } from "./styles";
import RocketIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

export default function Header() {

    return (
        <TouchableWithoutFeedback style={{ flex: 1 }}
            onPress={() => Keyboard.dismiss()}
            touchSoundDisabled
        >
            <Background>
                <Container>
                    <RocketIcon name='rocket-launch-outline' color={"#bc14ee"} size={30} />
                    <Logo style={{ marginLeft: 5 }} color={"#5CB200"}>Task<Logo color={'#bc14ee'}>Master</Logo></Logo>
                </Container>
            </Background>
        </TouchableWithoutFeedback>
    )
}