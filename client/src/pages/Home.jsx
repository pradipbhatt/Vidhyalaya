import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Banner from "./Banner";
import Footer from "./Footer";
import SchoolList from "./SchoolList";
import Testimonials from "./Testimonials";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 100px;
  overflow-y: scroll;
`;
const Wrapper = styled.div`
  flex: 1;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Home = () => {

  return (
    <Container>
      <Wrapper>
        <Banner/>
        <SchoolList/>
        <Testimonials/>
        <Footer/>
      </Wrapper>
    </Container>
  );
};

export default Home;
