import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { counts } from "../utils/data";  // Importing data for counts
import CountsCard from "../components/cards/CountsCard";  // Importing CountsCard component
import WeeklyStatCard from "../components/cards/WeeklyStatCard";  // Importing WeeklyStatCard component
import CategoryChart from "../components/cards/CategoryChart";  // Importing CategoryChart component
import AddWorkout from "../components/AddWorkout";  // Importing AddWorkout component
import WorkoutCard from "../components/cards/WorkoutCard";  // Importing WorkoutCard component
import { addWorkout, getDashboardDetails, getWorkouts } from "../api";  // Importing API functions

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
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
const Title = styled.div`
  padding: 0px 16px;
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
`;
const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 100px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Dashboard = () => {
  // State variables
  const [loading, setLoading] = useState(false);  // State for loading indicator
  const [data, setData] = useState();  // State to store dashboard data
  const [buttonLoading, setButtonLoading] = useState(false);  // State for button loading indicator
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);  // State to store today's workouts
  const [workout, setWorkout] = useState(`#Blog-title:
-Back Squat
-5 setsX15 reps
-30 kg
-10 min`);  // State to manage new workout input

  // Function to fetch dashboard data from API
  const dashboardData = async () => {
    setLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    await getDashboardDetails(token).then((res) => {
      setData(res.data);
      console.log(res.data);
      setLoading(false);
    });
  };

  // Function to fetch today's workouts from API
  const getTodaysWorkout = async () => {
    setLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    await getWorkouts(token, "").then((res) => {
      setTodaysWorkouts(res?.data?.todaysWorkouts);
      console.log(res.data);
      setLoading(false);
    });
  };

  // Function to add a new workout
  const addNewWorkout = async () => {
    setButtonLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    await addWorkout(token, { workoutString: workout })
      .then((res) => {
        dashboardData();
        getTodaysWorkout();
        setButtonLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  };

  // Fetch dashboard data and today's workouts on component mount
  useEffect(() => {
    dashboardData();
    getTodaysWorkout();
  }, []);

  return (
    <Container>
      <Wrapper>
        {/* Dashboard title */}
        <Title>Dashboard</Title>
        
        {/* Section for counts */}
        {/* <FlexWrap>
          {counts.map((item) => (
            <CountsCard item={item} data={data} />
          ))}
        </FlexWrap> */}

        {/* Section for weekly stats, category chart, and add workout form */}
        <FlexWrap>
          {/* <WeeklyStatCard data={data} />
          <CategoryChart data={data} /> */}
          <AddWorkout
            workout={workout}
            setWorkout={setWorkout}
            addNewWorkout={addNewWorkout}
            buttonLoading={buttonLoading}
          />
        </FlexWrap>

        {/* Section for today's workouts */}
        <Section>
          <Title>Todays Blogs</Title>
          <CardWrapper>
            {todaysWorkouts.map((workout) => (
              <WorkoutCard workout={workout} />
            ))}
          </CardWrapper>
        </Section>
      </Wrapper>
    </Container>
  );
};

export default Dashboard;
