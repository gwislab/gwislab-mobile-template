import { ITextProps } from "components/text/interface";
import { ImagePickerAsset, ImagePickerResult } from "expo-image-picker";
import { ImageStyle, StyleProp } from "react-native";

export interface IImagePickerProps {
  style?: StyleProp<ImageStyle>;
  placeholder?: string;
  textOptions?: ITextProps;
  multiple?: boolean;
  pickFrom?: "gallery" | "camera" | "both";
  onPress?: (value?: ImagePickerResult | ImagePickerAsset) => any;
  pickerComponent?: any;
  hideImage?: boolean;
}
