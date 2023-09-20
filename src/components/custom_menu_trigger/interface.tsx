import { IData } from "configs";
import { ViewStyle } from "react-native";

export interface ICustomMenuTriggerProps {
  onClick?: (data?: IData) => any;
  data: IData[];
  placeholder?: string;
  style?: ViewStyle;
  border?: boolean;
}
