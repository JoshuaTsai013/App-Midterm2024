import React, { useRef, useState } from 'react'
import { TouchableOpacity, View, TextInput, Animated, Dimensions, StyleSheet, Modal, SafeAreaView, Easing } from 'react-native'
import { Pressable, Text, Box } from "@gluestack-ui/themed";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import { data, testdata, region } from "../components/Data"




const PopupMenu = () => {
    const { colors } = useTheme();
    const [visible, setVisible] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const scale = useRef(new Animated.Value(0)).current;

    const handleFilterButtonClick = (selectedCategory) => {
        if (selectedFilters.includes(selectedCategory)) {
            let filters = selectedFilters.filter((el) => el !== selectedCategory);
            setSelectedFilters(filters);
        } else {
            setSelectedFilters([...selectedFilters, selectedCategory]);
        }
    };

    function resizeBox(to) {
        to === 1 && setVisible(true);
        Animated.timing(scale, {
            toValue: to,
            useNativeDriver: true,
            duration: 200,
            easing: Easing.linear,
        }).start(() => to === 0 && setVisible(false));
    }

    return (
        <>
            <TouchableOpacity onPress={() => resizeBox(1)}>
                <MaterialIcons name='menu' size={20} />
            </TouchableOpacity>
            <Modal transparent visible={visible}>
                <SafeAreaView
                    style={{ flex: 1 }}
                    onTouchStart={() => resizeBox(0)}
                >
                    <Animated.View style={[styles.popup, { transform: [{ scale }], }]}>
                        <TouchableOpacity style={{ width: '100%', borderBottomWidth: 1, borderColor: colors.lightGray, borderRadius: 10 }}>
                            <Box>
                                <Text h={40} pt={12} pl={15} fontSize={14}>我的珍藏</Text>
                            </Box>
                        </TouchableOpacity>
                        {Array.from(new Set(testdata.map(testItem => testItem.category))).map((category, index) => (
                            <TouchableOpacity
                                style={{ width: '100%', borderBottomWidth: 1, borderColor: colors.lightGray, borderRadius: 10 }}
                                key={`filters-${index}`}
                                onPress={() => handleFilterButtonClick(category)}
                            >
                                <Box bgColor={
                                    selectedFilters.includes(category)
                                        ? colors.darkGreen
                                        : colors.white
                                }>
                                    <Text h={40} pt={12} pl={15} fontSize={14} color={
                                        selectedFilters.includes(category)
                                            ? colors.white
                                            : colors.black
                                    }>{category}</Text>
                                </Box>
                            </TouchableOpacity>
                        ))
                        }
                    </Animated.View>
                </SafeAreaView>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    popup: {
        width: 230,
        backgroundColor: 'white',
        borderRadius: 10,
        position: 'absolute',
        top: 220,
        right: 20,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    }
})

export default PopupMenu;