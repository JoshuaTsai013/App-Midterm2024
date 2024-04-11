import React from "react";
import {
    Box,
    Pressable,
    Text,
    Actionsheet,
    ActionsheetBackdrop,
    ActionsheetDragIndicator,
    ActionsheetDragIndicatorWrapper,
    ActionsheetItem,
    ActionsheetItemText,
    ActionsheetContent,
} from "@gluestack-ui/themed";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ActionScreen from '../screens/MyBookScreen';
import FontAwesome from '@expo/vector-icons/FontAwesome'

export default (props) => {
    const [showActionsheet, setShowActionsheet] = React.useState(false);
    const { zoomRatio, site } = props;
    const handleClose = () => setShowActionsheet(!showActionsheet);
    return (
        <Box>
            <FontAwesome
                name={"map-pin"}
                color='#146D08'
                size={25}
                onPress={handleClose}
            />
            <Actionsheet isOpen={showActionsheet} onClose={handleClose} zIndex={999}>
                <ActionsheetBackdrop />
                <ActionsheetContent h="50%" zIndex={99999999999}>
                    {/* <ActionsheetDragIndicatorWrapper>
                        <ActionsheetDragIndicator />
                    </ActionsheetDragIndicatorWrapper> */}
                    <ActionScreen onClose={showActionsheet} site={site} />
                </ActionsheetContent>
            </Actionsheet>
        </Box>
    );
};


