import React, { useContext } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { Box, Image, Text } from '@chakra-ui/react';

import ExerciseCard from './ExerciseCard'
import BodyPart from './BodyPart';
import RightArrowIcon from '../media/right-arrow-png-gz9b00bbbt8krd2l.png';
import LeftArrowIcon from '../media/red-arrow-left-pointing-5.png';

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Box onClick={() => scrollPrev()} className="right-arrow" cursor="pointer" p={2}>
      <Image src={LeftArrowIcon} alt="left-arrow" width="50px" />
    </Box>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Box onClick={() => scrollNext()} className="left-arrow" cursor="pointer" p={2}>
      <Image src={RightArrowIcon} alt="right-arrow" width="50px" />
    </Box>
  );
};

const HorizontalScrollbar = ({ data, bodyParts, setBodyPart, bodyPart }) => (
  <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
    {data.map((item) => (
      <Box
        key={item.id || item}
        itemId={item.id || item}
        title={item.id || item}
        m="0 40px"
      >
        {bodyParts ? <BodyPart item={item} setBodyPart={setBodyPart} bodyPart={bodyPart} /> : <ExerciseCard exercise={item} />}
      </Box>
    ))}
  </ScrollMenu>
);

export default HorizontalScrollbar;