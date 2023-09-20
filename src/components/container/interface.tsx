import { IButtonProps } from "components/button/interface";
import { IHeaderProps } from "components/header/interface";
import { IColor } from "configs";
import { StyleProp, ViewStyle } from "react-native";

export interface IContainerProps {
  headerOptions?: IHeaderProps;
  children?: any;
  footer?: any;
  beforeButton?: any;
  afterButton?: any;
  bottomButtonOptions?: IButtonProps;
  floatButtonOptions?: IButtonProps;
  backgroundColor?: IColor;
  style?: StyleProp<ViewStyle>;
  noPadding?: boolean;
  noScrolling?: boolean;
  floatButton?: boolean;
  noHeader?: boolean;
  paddingTop?: number;
}
