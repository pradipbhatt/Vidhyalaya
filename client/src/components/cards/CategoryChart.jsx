import React from "react"; // Import React library to define React components
import styled from "styled-components"; // Import styled-components for styling
import { PieChart } from "@mui/x-charts/PieChart"; // Import PieChart component from Material-UI

// Styled components for styling the card and title
const Card = styled.div`
  flex: 1;
  min-width: 280px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
  display: flex;
  flex-direction: column;
  gap: 6px;
  @media (max-width: 600px) {
    padding: 16px;
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

// Functional component to display a pie chart of weekly calories burned
const CategoryChart = ({ data }) => {
  return (
    <Card> {/* Render a styled card */}
      <Title>Weekly Blogs</Title> {/* Render a title for the card */}
      {data?.pieChartData && ( // Check if pieChartData is available in the data prop
        <PieChart // Render a PieChart component with the pieChartData
          series={[
            {
              data: data?.pieChartData, // Pass the pieChartData to the series prop
              innerRadius: 30, // Set the inner radius of the pie chart
              outerRadius: 120, // Set the outer radius of the pie chart
              paddingAngle: 5, // Set the padding angle between sectors of the pie chart
              cornerRadius: 5, // Set the corner radius of the sectors in the pie chart
            },
          ]}
          height={300} // Set the height of the pie chart
        />
      )}
    </Card>
  );
};

export default CategoryChart; // Export the CategoryChart component
