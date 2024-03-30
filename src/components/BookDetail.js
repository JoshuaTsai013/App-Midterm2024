import React from "react";
import { Image } from "react-native";
import StarList from "./StarList";
import { Box, VStack, Text, Pressable } from "@gluestack-ui/themed";

const BookDetail = ({ book, navigation }) => {

  return (
    <VStack>
      <Box p={10} mt={5}>
        <Pressable
          onPress={() => navigation.navigate('Detail', book)}
        >
          <Image height={200} width={140}
            source={{
              uri: book.image
            }}
          />
        </Pressable>
      </Box>
      <VStack pl={12}>
        <Box mb={5}>
          {
            book.StarAppear ?
              <StarList star={book.star} size={18} />
              : null
          }
        </Box>
        <Text fontSize={16}
          color="#131313"
          fontWeight='500'
        >{book.title}</Text>
        <Text mt={5}
          fontSize={12}
          fontWeight='500'
          color="#666666"
        >{book.artist}</Text>
      </VStack>
    </VStack>

  )
};

export default BookDetail;