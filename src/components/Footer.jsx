import { Facebook, Instagram, Pinterest, Twitter } from "@material-ui/icons";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction:column;

`;
const Center = styled.div`
  flex: 1;
`;

const Logo = styled.h1``;
const Desc = styled.p``;
const SocialContainer = styled.div``;
const SocialIcon = styled.div``;


const Right = styled.div`
  flex: 1;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>LAMA.</Logo>
        <Desc>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, odio
          distinctio cum delectus minus, suscipit porro, sunt minima repudiandae
          consequuntur corporis. Itaque officia expedita veniam quas nostrum
          sunt nesciunt dolores?
        </Desc>
        <SocialContainer>
          <SocialIcon>
            <Facebook />
          </SocialIcon>
          <SocialIcon>
            <Instagram />
          </SocialIcon>
          <SocialIcon>
            <Twitter />
          </SocialIcon>
          <SocialIcon>
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center></Center>
      <Right></Right>
    </Container>
  );
};

export default Footer;