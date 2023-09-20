import { IImageProps } from "components/image/interface";
import { ITextProps } from "components/text/interface";
import { IData } from "configs";
import { ViewStyle } from "react-native";

export interface IHeaderProps {
  title?: string;
  showHeader?: boolean;
  showUser?: boolean;
  noBack?: boolean;
  center?: boolean;
  style?: ViewStyle;
  titleOptions?: ITextProps;
  rightComponent?: any;
  leftComponent?: any;
  showUserTitles?: boolean;
  imageOptions?: IImageProps;
  showSideMenu?: boolean;
  rightOptions?: IData[];
  goBackRoute?: string;
  onPressOption?: (arg: IData) => any;
}
