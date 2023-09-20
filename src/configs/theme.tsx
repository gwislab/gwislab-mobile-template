import { ThemeMode, createTheme } from "@rneui/themed";
import { Dimensions } from "react-native";
import colors from "./colors";
const { width, height } = Dimensions.get("screen");

const appTheme = (mode: ThemeMode) =>
  createTheme({
    lightColors: {
      primary: colors.primary,
    },
    darkColors: {
      primary: colors.primary,
    },
    mode,
  });

export const appDimension = {
  width,
  height,
  minHeight: 667,
};

export default appTheme;
