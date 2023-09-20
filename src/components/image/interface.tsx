import { ImageStyle } from "react-native";
export interface IImageProps {
  uri?: string;
  localUri?: string;
  height?: number;
  width?: number;
  size?: number;
  reset?: boolean;
  style?: ImageStyle;
  onPress?: (any?: any) => any;
}
