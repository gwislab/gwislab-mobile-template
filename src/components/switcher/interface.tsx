import { ITextProps } from "components/text/interface";
import { ReactNode } from "react";
import { StyleProp, TextStyle } from "react-native";

export interface ISwitcherProps {
  text?: string | ReactNode;
  textPosition?: "left" | "right";
  marginBottom?: number;
  marginRight?: number;
  center?: boolean;
  onPress?: (any?: any) => any;
  style?: StyleProp<TextStyle>;
  spaceBetween?: boolean;
  textOption?: ITextProps;
  value?: boolean;
  width?: number | `${number}%`;
}
