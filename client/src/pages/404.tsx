import * as React from "react";
import { Link, HeadFC, PageProps } from "gatsby";
import { Typography } from "../components/facade-good/facade-good";
import styled from "@emotion/styled";

const H1 = styled("h1")`
  font-size: 160px;
  margin: 0;
  font-weight: 900;
  letter-spacing: 20px;
`;
const H2 = styled("h2")``;

const Main = styled("main")`
  min-height: 100vh;
  background-image: linear-gradient(125deg, #6a89cc, #b8e994);
  position: relative;
`;

const Container = styled("div")`
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  color: #343434;
`;

const Link404 = styled(Link)`
  text-decoration: none;
  text-transform: uppercase;
  background: #ffb421;
  color: #343434;
  font-weight: 400;
  font-size: 14px;
  padding: 12px 14px;
  display: inline-block;
  border-radius: 25px;
  transition: 0.4s;
  margin-top: 20px;
  :hover {
    background: #f1b84a;
  }
`;

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <Main>
      <Container>
        <H2>Страница не найдена</H2>
        <H1>404</H1>
        <Typography>
          К сожалению, запрашиваемая вами страница не найдена.
        </Typography>
        <Link404 to="/">Вернутся на главную</Link404>
      </Container>
    </Main>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>Страница не найдена</title>;
