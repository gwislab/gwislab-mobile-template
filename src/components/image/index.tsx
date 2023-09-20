import React from "react";
import { IImageProps } from "./interface";
import {
  StyleSheet,
  Image as RNImage,
  View,
  TouchableOpacity,
} from "react-native";
import { Image as ExpoImage } from "expo-image";
import { Colors } from "configs";
import { StaticImage } from "assets/images";
import { Icon } from "@rneui/themed";
import { IAppState } from "store/interface";
import { useSelector } from "react-redux";

const Image = ({
  uri,
  localUri,
  height,
  width,
  size = 45,
  style,
  reset,
  onPress,
}: IImageProps) => {
  const commonProp = {
    height: height || size,
    width: width || size,
    borderRadius: 200,
  };
  const token = useSelector((state: IAppState) => state.systemPersist.token);

  if (!uri && !localUri) {
    return (
      <View
        style={[styles.imageUser, style]}
        onStartShouldSetResponder={onPress}
      >
        <Icon
          name="user"
          size={22}
          type="font-awesome"
          color={Colors.grey800}
        />
      </View>
    );
  }

  if (localUri) {
    return (
      <TouchableOpacity onPress={onPress}>
        <RNImage
          source={localUri as any}
          style={
            !reset
              ? {
                  ...styles.image,
                  ...commonProp,
                }
              : style
          }
        />
      </TouchableOpacity>
    );
  }

  return (
    <ExpoImage
      onStartShouldSetResponder={onPress}
      style={[
        {
          ...styles.image,
          ...commonProp,
        },
        style as any,
      ]}
      source={{
        uri,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }}
      placeholder={StaticImage.loading}
      contentFit="cover"
      transition={1000}
    />
  );
};

export default Image;

const styles = StyleSheet.create({
  image: {
    backgroundColor: Colors.grey800,
  },
  imageUser: {
    marginRight: 10,
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderRadius: 50,
    borderColor: Colors.grey800,
    borderWidth: 1,
  },
});
