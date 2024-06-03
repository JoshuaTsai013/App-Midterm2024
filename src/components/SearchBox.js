import React, { useState } from 'react';
import { View, TextInput, Animated, Dimensions, StyleSheet } from 'react-native';
import { Pressable } from "@gluestack-ui/themed";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { data } from '../components/Data';

const SearchBox = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchText, setSearchText] = useState('');
    const animation = useState(new Animated.Value(50))[0]; // 初始化宽度为图标宽度
    const screenWidth = Dimensions.get('window').width;

    const toggleSearch = () => {
        Animated.timing(animation, {
            toValue: isExpanded ? 50 : screenWidth * 0.6, // 根据状态选择目标值
            duration: 400,
            useNativeDriver: false,
        }).start();
        setIsExpanded(!isExpanded);
    };
    const handleSearch = (text) => {
        setSearchText(text);
        // if (text === '') {
        //     setFilteredData([]);
        // } else {
        //     const filtered = data.filter(item => item.title.includes(text));
        //     setFilteredData(filtered); 
        // }
        console.log(searchText)
    };

    const animatedStyle = {
        width: animation, // 动态宽度样式
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: isExpanded ? 1 : 0, // 根据是否展开控制边框
        borderColor: '#ccc',
        borderRadius: 25,
        paddingHorizontal: 10,
        backgroundColor: 'white'
    };

    return (
        <View style={styles.container}>
            <Animated.View style={animatedStyle}>
                {isExpanded && (
                    <TextInput
                        style={styles.input}
                        placeholder='搜尋'
                        placeholderTextColor="#999"
                        value={searchText}
                        onChangeText={handleSearch}
                    />
                )}
                <Pressable onPress={toggleSearch}>
                    {
                        isExpanded
                            ?
                            <MaterialIcons
                                name='clear'
                                size={26}
                                color="#000"
                            />
                            :
                            <MaterialCommunityIcons
                                name='magnify'
                                size={26}
                                color="#000" />
                    }
                </Pressable>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
        color: '#000',
    },
});

export default SearchBox;