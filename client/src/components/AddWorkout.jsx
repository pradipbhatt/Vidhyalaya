import React, { useState } from "react"; // Import React and useState hook
import styled from "styled-components"; // Import styled-components for styling
import TextInput from "./TextInput"; // Import TextInput component
import Button from "./Button"; // Import Button component

// Styled component for the card container
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
// Styled component for the title of the card
const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

// Functional component for adding a new workout
const AddWorkout = ({ workout, setWorkout, addNewWorkout, buttonLoading }) => {
  return (
    <Card> {/* Render a styled card */}
      <Title>Add New Blog</Title> {/* Render the title of the card */}
      <TextInput
        label="Blog"
        textArea
        rows={10}
        placeholder={`Enter in this format:

#Category
-Blog Name`}
        value={workout}
        handelChange={(e) => setWorkout(e.target.value)}
      /> {/* Render a TextInput component for entering workout details */}
      <Button
        text="Add Blogs"
        small
        onClick={() => addNewWorkout()}
        isLoading={buttonLoading}
        isDisabled={buttonLoading}
      /> {/* Render a Button component for adding new blogs */}
    </Card>
  );
};

export default AddWorkout; // Export the AddWorkout component as the default export
