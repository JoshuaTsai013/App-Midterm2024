import React from "react";
import { FlatList, SectionList } from "react-native";
import { Text } from "@gluestack-ui/themed";
import BookDetail from "./BookDetail";


const Albumlist = ({ sections, navigation }) => {
  const renderSectionHeader = ({ section }) => (
    <>
      <Text mt={10}
        ml={10}
        color="#131313"
        fontWeight='500'
        fontSize={24}
      >{section.title}</Text>

      <FlatList
        horizontal={true}
        data={section.data}
        renderItem={({ item }) => <BookDetail book={item} navigation={navigation} />}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.title}
      />

    </>
  );
  const renderItem = ({ item, section }) => {
    if (section.horizontal) {
      return null;
    }
    return <BookDetail book={item} navigation={navigation} />
  };

  return (
    <SectionList
      sections={sections}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      stickySectionHeadersEnabled={false}
      showsHorizontalScrollIndicator={false}
      renderSectionHeader={renderSectionHeader}
      renderItem={renderItem}
      keyExtractor={item => item.title}
    />
  );
};

export default Albumlist;