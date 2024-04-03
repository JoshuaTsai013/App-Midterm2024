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

export default (props) => {
    const [showActionsheet, setShowActionsheet] = React.useState(false);
    const { zoomRatio, site } = props;
    const handleClose = () => setShowActionsheet(!showActionsheet);
    return (
        <Box>
            <MaterialCommunityIcons
                name={"pin"}
                color='#146D08'
                size={25}
                onPress={handleClose}
            />
            <Actionsheet isOpen={showActionsheet} onClose={handleClose} zIndex={999}>
                <ActionsheetBackdrop />
                <ActionsheetContent h="50%" zIndex={999}>
                    <ActionsheetDragIndicatorWrapper>
                        <ActionsheetDragIndicator />
                    </ActionsheetDragIndicatorWrapper>
                    <ActionScreen onClose={showActionsheet} site={site} />
                </ActionsheetContent>
            </Actionsheet>
        </Box>
    );
};


