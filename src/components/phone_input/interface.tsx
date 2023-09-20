import { ViewStyle } from "react-native";
export interface IPhoneProps {
  placeholder?: string;
  style?: ViewStyle;
  isVerified?: boolean;
  onPress?: (value?: string) => any;
  marginBottom?: number;
  value?: string;
  disabled?: boolean;
}
