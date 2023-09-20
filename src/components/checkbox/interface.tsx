import { ITextProps } from "components/text/interface";
import { ReactNode } from "react";
import { StyleProp, TextStyle } from "react-native";

export interface ICheckBoxProps {
  text?: string | ReactNode;
  textPosition?: "left" | "right";
  marginBottom?: number;
  marginRight?: number;
  center?: boolean;
  onPress?: (any?: any) => any;
  style?: StyleProp<TextStyle>;
  spaceBetween?: boolean;
  textOption?: ITextProps;
  checked?: boolean;
  width?: number | `${number}%`;
}
