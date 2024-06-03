import { Pressable } from "@gluestack-ui/themed";
import { useDispatch, useSelector } from "react-redux";
import { selectColorMode } from "../Redux/cartReducer";
import { toggleColorMode } from "../Redux/cartReducer";
import { useTheme } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather'

const ColorModeBtn = () => {
  const { colors } = useTheme();
  const colorMode = useSelector(selectColorMode);

  const dispatch = useDispatch();

  return (
    <Pressable onPress={() => dispatch(toggleColorMode())}>
      {colorMode === "light" ? (
        <Feather name="sun" color={colors.black} size={26} />
      ) : (
        <Feather name="moon" color={colors.white} size={26} />
      )}
    </Pressable>
  );
};

export default ColorModeBtn;