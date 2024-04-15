import React from "react";
import { Image } from "react-native";
import StarList from "./StarList";
import { Box, VStack, Text, Pressable } from "@gluestack-ui/themed";

const JourneyDetail = ({ data, navigation }) => {

  return (
    <VStack>
      <Box p={10} mt={5} bg="$primary200" width="100%">
        <Pressable
          onPress={() => navigation.navigate('Detail', data)}
        >
          <Image height={150} width={140}
            source={{
              uri: data.image
            }}
          />
        </Pressable>
      </Box>
      <VStack pl={12}>
        <Box mb={5}>
          {
            data.StarAppear ?
              <StarList star={data.star} size={18} />
              : null
          }
        </Box>
        <Text fontSize={16}
          color="#131313"
          fontWeight='500'
        >{data.title}</Text>
        <Text mt={5}
          fontSize={12}
          fontWeight='500'
          color="#666666"
        >{data.artist}</Text>
      </VStack>
    </VStack>

  )
};

export default JourneyDetail;