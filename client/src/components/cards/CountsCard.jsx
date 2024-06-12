import React from "react"; // Import React library for defining React components
import styled from "styled-components"; // Import styled-components for styling

// Styled components for styling the card and its content
const Card = styled.div`
  flex: 1;
  min-width: 200px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  display: flex;
  gap: 6px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media (max-width: 600px) {
    gap: 6px;
  }
`;
const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;
const Value = styled.div`
  font-weight: 600;
  font-size: 32px;
  display: flex;
  align-items: end;
  gap: 8px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 600px) {
    font-size: 22px;
  }
`;
const Unit = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
`;
const Span = styled.div`
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 16px;
  @media (max-width: 600px) {
    font-size: 12px;
  }

  ${({ positive, theme }) =>
    positive
      ? `
  color: ${theme.green};`
      : `
  color: ${theme.red};`}
`;
const Icon = styled.div`
  height: fit-content;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  ${({ color, bg }) => `
  background: ${bg};
  color: ${color};
  `}
`;

const Desc = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary + 90};
  margin-bottom: 6px;
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

// Functional component to display a card with counts and an icon
const CountsCard = ({ item, data }) => {
  return (
    <Card> {/* Render a styled card */}
      <Left> {/* Render the left section of the card */}
        <Title>{item.name}</Title> {/* Render the title of the count */}
        <Value> {/* Render the value of the count */}
          {data && data[item.key].toFixed(2)} {/* Render the count value */}
          <Unit>{item.unit}</Unit> {/* Render the unit of the count */}
          <Span positive>(+10%)</Span> {/* Render a positive span */}
        </Value>
        <Desc>{item.desc}</Desc> {/* Render the description of the count */}
      </Left>
      <Icon color={item.color} bg={item.lightColor}> {/* Render the icon */}
        {item.icon}
      </Icon>
    </Card>
  );
};

export default CountsCard; // Export the CountsCard component as the default export
