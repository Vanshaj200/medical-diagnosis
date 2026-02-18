import React, { useState, useEffect, useCallback } from 'react';
import { Box, SimpleGrid, Stack, Text, Icon, Flex } from '@chakra-ui/react';
import { Pie } from 'react-chartjs-2';
import { useAuth, useUser } from "@clerk/clerk-react";
import { userProfile, getWorkoutChart, fetchDashboardData } from '../utils/fetchData';
import DistanceBarGraph from '../components/BarChart';
import { FaFire, FaRunning, FaWalking, FaClock, FaTrophy, FaTimesCircle } from 'react-icons/fa';


import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import CaloriesLineChart from '../components/LineGraph';


ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const StatCard = ({ title, value, unit, icon, color }) => (
  <Box
    p={6}
    bg="gray.800"
    borderRadius="xl"
    boxShadow="lg"
    border="1px"
    borderColor="gray.700"
    transition="transform 0.2s"
    _hover={{ transform: 'translateY(-2px)', borderColor: color }}
    position="relative"
    overflow="hidden"
  >
    <Box position="absolute" top="-10px" right="-10px" opacity="0.1">
      <Icon as={icon} w={24} h={24} color={color} />
    </Box>
    <Flex align="center" mb={2}>
      <Icon as={icon} w={6} h={6} color={color} mr={3} />
      <Text fontWeight="medium" color="gray.400" fontSize="sm" textTransform="uppercase" letterSpacing="wide">
        {title}
      </Text>
    </Flex>
    <Flex align="baseline">
      <Text fontSize="3xl" fontWeight="bold" color="white" mr={2}>
        {value}
      </Text>
      <Text fontSize="md" color="gray.500" fontWeight="medium">
        {unit}
      </Text>
    </Flex>
  </Box>
);

const Dashboard = () => {
  const { user } = useUser();
  const { getToken } = useAuth()
  const [score, setScore] = useState(0)



  const [workoutChartData, setWorkoutData] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Workout Types',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 206, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
        ],
        borderWidth: 2,
      },
    ],
  });
  const [dashboardData, setDashboardData] = useState({
    caloriesBurned: 0,
    distanceCovered: 0,
    stepsTaken: 0,
    timeSpent: '0h 0m',
    achievedGoals: 0,
    notAchievedGoals: 0,
  });

  const fetchDashboard = useCallback(async () => {
    try {
      const response = await fetchDashboardData(user?.id)
      const data = response;

      const token = await getToken()
      const userdata = await userProfile(token, user?.id)
      setScore(userdata?.score)

      setDashboardData({
        caloriesBurned: data.totalCaloriesBurned || 0,
        distanceCovered: data.totalDistance || 0,
        stepsTaken: data.totalSteps || 0,
        timeSpent: `${Math.floor(data.totalTimeSpent / 60)}h ${data.totalTimeSpent % 60}m`,
        achievedGoals: data.achievedGoals || 0,
        notAchievedGoals: data.notAchievedGoals || 0,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id])

  useEffect(() => {
    const fetchWorkoutData = async () => {
      try {
        const response = await getWorkoutChart(user?.id);
        setWorkoutData(response);

        // Assuming the response structure is correct
        const labels = response?.map(item => item.workoutType);
        const dataValues = response?.map(item => item.totalDuration);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Workout Types',
              data: dataValues,
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 206, 86)',
                'rgb(75, 192, 192)',
                'rgb(153, 102, 255)',
              ],
              borderWidth: 2,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching workout data:', error);
      }
    };

    fetchDashboard()
    fetchWorkoutData();
  }, [user?.id, fetchDashboard]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: 'white' }
      },
      title: {
        display: true,
        text: 'Workout Distribution',
        color: 'white',
        font: { size: 16 }
      },
    },
  };

  return (
    <Stack spacing={8} p={4}>
      <Box mb={4}>
        <Text fontSize="2xl" fontWeight="bold" color="white" mb={2}>Dashboard Overview</Text>
        <Text color="gray.400">Track your fitness journey and detailed statistics.</Text>
      </Box>

      {/* Upper Section with 6 boxes */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        <StatCard title="Calories Burned" value={dashboardData.caloriesBurned} unit="kcal" icon={FaFire} color="orange.400" />
        <StatCard title="Distance" value={dashboardData.distanceCovered} unit="km" icon={FaRunning} color="blue.400" />
        <StatCard title="Steps" value={dashboardData.stepsTaken} unit="steps" icon={FaWalking} color="green.400" />
        <StatCard title="Active Time" value={dashboardData.timeSpent} unit="" icon={FaClock} color="purple.400" />
        <StatCard title="Goals Met" value={`${dashboardData.achievedGoals}/${dashboardData.achievedGoals + dashboardData.notAchievedGoals}`} unit="" icon={FaTrophy} color="yellow.400" />
        <StatCard title="Pending Goals" value={dashboardData.notAchievedGoals} unit="" icon={FaTimesCircle} color="red.400" />
      </SimpleGrid>

      {/* Lower Section with Charts */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
        <Box p={6} bg="gray.800" borderRadius="xl" boxShadow="lg" border="1px" borderColor="gray.700">
          <Text fontSize="lg" fontWeight="semibold" color="white" mb={4}>Weekly Activity</Text>
          <CaloriesLineChart />
        </Box>
        <Box p={6} bg="gray.800" borderRadius="xl" boxShadow="lg" border="1px" borderColor="gray.700">
          <Text fontSize="lg" fontWeight="semibold" color="white" mb={4}>Distance Covered</Text>
          <DistanceBarGraph />
        </Box>
        <Box p={6} bg="gray.800" borderRadius="xl" boxShadow="lg" border="1px" borderColor="gray.700" gridColumn={{ lg: "span 2" }} maxW={{ lg: "50%" }} mx="auto" w="full">
          <Text fontSize="lg" fontWeight="semibold" color="white" mb={4} textAlign="center">Workout Types</Text>
          <Box h="300px" display="flex" justifyContent="center">
            <Pie data={chartData} options={{ ...options, maintainAspectRatio: false }} />
          </Box>
        </Box>
      </SimpleGrid>
    </Stack>
  );
};

export default Dashboard;
