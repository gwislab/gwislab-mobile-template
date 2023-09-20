import { randomColor } from "utils";
import { IColor } from "./interface";

const Colors: Record<IColor, string> = {
  red: "#DE212B",
  black: "#000000",
  white: "#ffffff",
  normal: "#FCFCFD",
  primary: "#A64DE5",
  secondary: "#84F8DB",
  grey800: "#1D2939",
  transparent: "transparent",
  grey200: "#5F6585",
  random: randomColor(),
  primaryLight: "#D3A6F2",
  borderGrey: "#D6E0EB",
  redLight300: "#E44E55",
  drawerBorder: "#F2F2F2",
  border: "#D0D5DD",
  success: "#19a001",
  backdrop: "#5F658580",
  timeBg: "#808080",
};

export default Colors;
