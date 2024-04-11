import React from "react";
import { FlatList } from "react-native";
import BookDetail from "./BookDetail";

const BookList = ({ sections, navigation }) => {
  return (
    <FlatList
        data={sections}
        renderItem={({ item }) => <BookDetail book={item} navigation={navigation} />}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.title}
      />
  );
};

export default BookList;