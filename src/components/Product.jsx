import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import styled from "styled-components";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;
const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;

  &:hover {
    background-color: e9f5f5;
    transform: scale(1.1);
  }
`;

const addCard = async (id, fileName, price, name, color,size) => {
  var userlogin = JSON.parse(localStorage.getItem("user"));
  if (!userlogin) {
    alert("Please login before adding item to cart");
  }
  try {
    let res = await fetch("http://localhost:3000/add-item-to-cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email_id: userlogin.email_id,
        fileName: fileName,
        productId: id,
        name: name,
        size:size,
        color: color,
        price: price,
      }),
    });
    let resJson = await res.json();
    if (res.status === 201) {
      console.log("Item added to cart succesafully");
    } else {
      console.log("error in inserting user");
    }
  } catch (err) {
    console.log(err);
  }
};

const Product = ({ item }) => {
  return (
    <Container>
      <Circle>
        <Image src={item.fileName} />
        <Info>
          <Icon>
            <ShoppingCartOutlined
              onClick={(e) => {
                addCard(
                  item._id,
                  item.fileName,
                  item.price,
                  item.name,
                  item.color,
                  item.size,
                );
              }}
            />
          </Icon>
          <Icon>
            <SearchOutlined />
          </Icon>
          <Icon>
            <FavoriteBorderOutlined />
          </Icon>
        </Info>
        <div>
          <strong>Product Name: {item.name}</strong><br/>
          <strong>Color: {item.color}</strong><br/>
          <strong>Price: ??? {item.price}</strong><br/>
        </div>
      </Circle>
    </Container>
  );
};

export default Product;
