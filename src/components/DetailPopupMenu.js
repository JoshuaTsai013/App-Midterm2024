import React, { useRef, useState } from 'react'
import { TouchableOpacity, View, TextInput, Animated, Dimensions, StyleSheet, Modal, SafeAreaView, Easing } from 'react-native'
import { Pressable, Text, Box } from "@gluestack-ui/themed";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { data } from './Data';




const DetailPopupMenu = () => {
    const { colors } = useTheme();
    const [visible, setVisible] = useState(false);
    const scale =useRef(new Animated.Value(0)).current;
    const options = [
        {
            title: '編輯日記',
            action: () => alert('編輯日記'),
        },
        {
            title: '更改照片',
            action: () => alert('更改照片'),
        }, {
            title: '刪除日記',
            action: () => alert('刪除日記'),
        },
    ];
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
                <SimpleLineIcons name='options-vertical' color={colors.white} size={17}/>
            </TouchableOpacity>
            <Modal transparent visible={visible}>
                <SafeAreaView
                    style={{ flex: 1 }}
                    onTouchStart={() => resizeBox(0)}
                >
                     <Animated.View style={[styles.popup,{transform:[{scale}],}]}>
                        {options.map((op, i) => (
                            <TouchableOpacity style={{ width: '100%', borderBottomWidth: 1, borderColor: colors.lightGray,borderRadius:10 }} key={i} onPress={op.action}>
                                <Box alignItems='center'>
                                    <Text h={40} pt={12} paddingHorizontal={20} fontSize={14}>{op.title}</Text>
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
        backgroundColor:'white',
        borderRadius: 10,
        position: 'absolute',
        top: 110,
        right: 20,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    }
})

export default DetailPopupMenu;