import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon } from "@rneui/themed";
import { IImagePickerProps } from "./interface";
import { Colors, appModals } from "configs";
import Text from "components/text";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "store/system";
import { pickImageFromCamera, pickImageFromGallery } from "utils/image";
import { IAppState, IModalConfig } from "store/interface";
import { useTranslation } from "react-i18next";
import { useUploadDocument } from "hooks/useUploadDocument";

const ImagePicker = ({
  style,
  onPress,
  placeholder,
  textOptions,
  multiple = false,
  pickFrom = "camera",
  pickerComponent,
  hideImage,
}: IImagePickerProps) => {
  const [image, setImage] = useState<string | null>(null);
  const { imagePickerResult } = useSelector((state: IAppState) => state.system);
  const { uploadImage } = useUploadDocument();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (imagePickerResult) {
      setImage(imagePickerResult?.assets?.[0]?.uri);
      onPress?.(multiple ? imagePickerResult : imagePickerResult?.assets?.[0]);
    }

    return () => {};
  }, [imagePickerResult]);

  const selectImageFromGallery = async () => {
    const result = await pickImageFromGallery({ multiple });
    if (!result) return;
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await uploadImage(result.assets[0]);
      onPress?.(multiple ? result : result.assets[0]);
      dispatch(closeModal());
    }
  };

  const selectImageFromCamera = async () => {
    const result = await pickImageFromCamera({ multiple });
    if (!result) return;
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await uploadImage(result.assets[0]);
      onPress?.(multiple ? result : result.assets[0]);
      dispatch(closeModal());
    }
  };

  const selectImage =
    pickFrom === "gallery"
      ? selectImageFromGallery
      : pickFrom === "camera"
      ? selectImageFromCamera
      : () =>
          dispatch(
            openModal({
              modalName: appModals.IMAGE_PICKER,
              modalData: {
                multiple,
              },
              variant: "simple",
              placeholder: t("pickFrom"),
            } as IModalConfig)
          );

  return (
    <View style={!pickerComponent ? styles.wrapper : undefined}>
      <View style={!pickerComponent ? styles.container : undefined}>
        {image && !hideImage ? (
          <TouchableOpacity onPress={selectImage}>
            <Image source={{ uri: image }} style={style || styles.image} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={selectImage}>
            {pickerComponent || (
              <Icon
                name="camera"
                type="entypo"
                containerStyle={styles.imageContainer}
                color={Colors.primary}
              />
            )}
          </TouchableOpacity>
        )}
        {!pickerComponent ? (
          <Text
            text={placeholder}
            center
            color="primary"
            {...textOptions}
            onPress={selectImage}
          />
        ) : undefined}
      </View>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 60,
    marginBottom: 10,
  },
  imageContainer: {
    backgroundColor: Colors.primary + "40",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    borderRadius: 60,
    marginBottom: 10,
  },
  picker: {
    paddingVertical: 10,
    backgroundColor: Colors.grey200 + "10",
    borderRadius: 10,
    marginBottom: 5,
  },
  container: {
    marginBottom: 20,
  },
  wrapper: {
    width: "100%",
    alignItems: "center",
  },
});
