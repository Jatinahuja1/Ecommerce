import { Send } from "@material-ui/icons";
import styled from "styled-components";

const Container = styled.div``;
const Title = styled.h1``;

const Desc = styled.div``;

const InputContainer = styled.div``;

const Input = styled.input``;

const Button = styled.button``;

function Newsletter() {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc></Desc>
      <InputContainer>
        <Input />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
}

export default Newsletter;
