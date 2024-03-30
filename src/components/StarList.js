import React from "react";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { HStack } from '@gluestack-ui/themed';

const StarList = ({ star, size }) => {
    let StarList1 = [];
    let StarList2 = [];

    for (let i = 1; i <= star; i++) {
        StarList1.push(<MaterialCommunityIcons name="star" color="#FFD306" size={size} key={i}/>)
    }
    for (let i = star + 1; i <= 5; i++) {
        StarList2.push(<MaterialCommunityIcons name="star" color="#F0F0F0" size={size} key={i}/>)
    }
    let StarList = StarList1.concat(StarList2);

    return (
        <HStack>
            {StarList}
        </HStack>
    );
};
export default StarList;