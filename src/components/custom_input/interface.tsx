import { KeyboardTypeOptions, ViewStyle } from "react-native";
export interface ICustomInputProps {
  placeholder?: string;
  style?: ViewStyle;
  marginBottom?: number;
  width?: number | `${number}%`;
  onChange?: (value?: string) => any;
  value?: string;
  disabled?: boolean;
  inputPlaceholder?: string;
  keyboardType?: KeyboardTypeOptions | undefined;
}
