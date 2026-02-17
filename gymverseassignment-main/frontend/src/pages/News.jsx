import React from 'react';
import Slider from "react-slick";
import { Box, Image, Heading, Text, Link, VStack, Flex } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logo1 from "../media/surgical-1200x630px-robots.jpg";
import logo2 from "../photos/1692862513774.jpg";
import logo3 from "../media/8_Main_Types_of_Heart_Disease.jpg";
import logo4 from "../media/Strength-training-programs.webp";
import logo5 from "../media/Screenshot 2024-06-20 131823.png";
import logo6 from "../media/supp.jfif";
import logo7 from "../media/park.jfif";


export default function News() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  const newsData = [
    {
      image: logo1,
      title: "New Fitness Tech Boosts Workout Efficiency",
      description: "Cutting-edge fitness technology has been introduced to enhance workout efficiency, offering personalized training experiences for better results.",
      date: "June 18, 2024",
      source: "Fitness Monthly",
      link: "https://fitnessmonthly.com"
    },
    {
      image: logo5,
      title: "Importance of Cardiovascular Exercise for Heart Health",
      description: "Health professionals emphasize the critical role of cardiovascular exercises in maintaining heart health and reducing the risk of cardiovascular diseases.",
      date: "June 12, 2024",
      source: "HeartBeat News",
      link: "https://heartbeatnews.com"
    },
    {
      image: logo2,
      title: "Healthy Eating Tips for Optimal Fitness",
      description: "Experts share effective strategies for maintaining optimal fitness through proper nutrition, emphasizing the importance of balanced diets.",
      date: "June 16, 2024",
      source: "FitLife Magazine",
      link: "https://fitlifemagazine.com"
    },
    {
      image: logo6,
      title: "Nutritional Supplements: Fact or Fiction?",
      description: "An investigation into the effectiveness and safety of nutritional supplements in supporting fitness goals, revealing key considerations for consumers.",
      date: "June 8, 2024",
      source: "Fitness Insights",
      link: "https://fitnessinsights.com"
    },
    {
      image: logo4,
      title: "Benefits of Strength Training for Aging Adults",
      description: "A new report discusses the benefits of strength training in older adults, highlighting improvements in muscle strength, bone density, and overall quality of life.",
      date: "June 10, 2024",
      source: "Fitness Age",
      link: "https://fitnessage.com"
    },
    {
      image: logo7,
      title: "Outdoor Fitness Trends for Summer 2024",
      description: "Exploring the latest outdoor fitness trends and activities to stay active and healthy during the summer months, focusing on fun and effective workouts.",
      date: "June 6, 2024",
      source: "Outdoor Fitness Guide",
      link: "https://outdoorfitnessguide.com"
    },
    {
      image: logo3,
      title: "New Study Shows Benefits of Yoga for Mental Health",
      description: "Recent research highlights the mental health benefits of practicing yoga regularly, showing significant improvements in stress management and overall well-being.",
      date: "June 14, 2024",
      source: "Yoga Journal",
      link: "https://yogajournal.com"
    }
  ];

  return (
    <Box py={10} px={{ base: 4, md: 8 }} className="news-slider-container">
      <Heading as="h2" size="xl" textAlign="center" mb={10} color="white">
        Latest <span className="text-blue-400">Health & Fitness</span> News
      </Heading>
      <style>
        {`
          .slick-dots li button:before {
            color: white;
          }
          .slick-dots li.slick-active button:before {
            color: #60a5fa;
          }
        `}
      </style>
      <Box maxW="container.xl" mx="auto">
        <Slider {...settings}>
          {newsData.map((element, index) => (
            <Box key={index} px={3} py={5}>
              <Box
                bg="gray.800"
                borderRadius="xl"
                boxShadow="lg"
                minHeight={'472px'}
                overflow="hidden"
                transition="all 0.3s ease"
                _hover={{ transform: "translateY(-5px)", boxShadow: "2xl", borderColor: "blue.500" }}
                border="1px"
                borderColor="gray.700"
                display="flex"
                flexDirection="column"
                h="100%"
              >
                <Image
                  src={element.image}
                  alt="News"
                  borderTopRadius="xl"
                  w="100%"
                  h="200px"
                  objectFit="cover"
                />
                <VStack align="start" spacing={4} p={6} flex="1">
                  <Heading as="h3" size="md" color="blue.300" noOfLines={2} lineHeight="short">
                    {element.title}
                  </Heading>
                  <Text color="gray.400" noOfLines={3} fontSize="sm">
                    {element.description}
                  </Text>
                  <Flex justify="space-between" align="center" width="full" mt="auto" pt={4}>
                    <Text color="gray.500" fontSize="xs" fontWeight="medium">
                      {element.source}
                    </Text>
                    <Link
                      href={element.link}
                      isExternal
                      color="blue.400"
                      fontWeight="bold"
                      fontSize="sm"
                      _hover={{ color: "blue.300", textDecoration: "none" }}
                      display="flex"
                      alignItems="center"
                    >
                      Read <ArrowForwardIcon ml={1} />
                    </Link>
                  </Flex>
                </VStack>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
}
