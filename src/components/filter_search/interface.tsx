import { IColor } from "configs";
import { ViewStyle } from "react-native";
export interface IFilterSearchProps {
  placeholder?: string;
  style?: ViewStyle;
  marginBottom?: number;
  width?: number | `${number}%`;
  onChange?: (value: string) => any;
  onPressFilter?: (value?: string) => any;
  value?: string;
  disabled?: boolean;
  hideFilter?: boolean;
  iconColor?: IColor;
}
