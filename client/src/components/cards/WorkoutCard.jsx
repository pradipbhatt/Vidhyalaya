import { FitnessCenterRounded, TimelapseRounded } from "@mui/icons-material"; // Import icons from Material-UI
import React from "react"; // Import React library for defining React components
import styled from "styled-components"; // Import styled-components for styling

// Styled components for styling the workout card and its content
const Card = styled.div`
  flex: 1;
  min-width: 250px;
  max-width: 400px;
  padding: 16px 18px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
  display: flex;
  flex-direction: column;
  gap: 6px;
  @media (max-width: 600px) {
    padding: 12px 14px;
  }
`;
const Category = styled.div`
  width: fit-content;
  font-size: 14px;
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
  background: ${({ theme }) => theme.primary + 20};
  padding: 4px 10px;
  border-radius: 8px;
`;
const Name = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 600;
`;
const Sets = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.text_secondary};
  font-weight: 500;
  display: flex;
  gap: 6px;
`;
const Flex = styled.div`
  display: flex;
  gap: 16px;
`;
const Details = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
`;

// Functional component to display a card for a workout
const WorkoutCard = ({ workout }) => {
  return (
    <Card> {/* Render a styled card */}
      <Category>#{workout?.category}</Category> {/* Render the category of the workout */}
      <Name>{workout?.workoutName}</Name> {/* Render the name of the workout */}
      <Sets>
        {/* Placeholder for rendering sets and reps */}
         {/* sets X reps */}
      </Sets>
      {/* <Flex> */}
        {/* Details section for weight and duration */}
        {/* <Details>
          <FitnessCenterRounded sx={{ fontSize: "20px" }} />
          {workout?.weight} kg
        </Details>
        <Details>
          <TimelapseRounded sx={{ fontSize: "20px" }} />
          {workout?.duration} min
        </Details> */}
      {/* </Flex> */}
    </Card>
  );
};

export default WorkoutCard; // Export the WorkoutCard component as the default export
