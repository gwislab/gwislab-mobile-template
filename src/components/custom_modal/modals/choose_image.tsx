import Text from "components/text";
import { Colors } from "configs";
import { useUploadDocument } from "hooks/useUploadDocument";
import { TFunction } from "i18next";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { closeModal, setImagePickerResult } from "store/system";
import { pickImageFromCamera, pickImageFromGallery } from "utils/image";

interface IChooseImage {
  multiple: boolean;
  t: TFunction<"translation", undefined>;
}

const ChooseImage = ({ multiple, t }: IChooseImage) => {
  const dispatch = useDispatch();
  const { uploadImage } = useUploadDocument();

  const openCamera = async () => {
    const result = await pickImageFromCamera({ multiple });
    if (!result) return;
    if (!result.canceled) {
      dispatch(setImagePickerResult(result));
      await uploadImage(result.assets[0]);
      dispatch(closeModal());
    }
  };

  const openGallery = async () => {
    const result = await pickImageFromGallery({ multiple });
    if (!result) return;
    if (!result.canceled) {
      dispatch(setImagePickerResult(result));
      await uploadImage(result.assets[0]);
      dispatch(closeModal());
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openGallery} style={styles.picker}>
        <Text
          text={t("openGallery")}
          color="primary"
          center
          onPress={openGallery}
          marginBottom={0}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={openCamera} style={styles.picker}>
        <Text
          text={t("openCamera")}
          color="primary"
          center
          onPress={openCamera}
          marginBottom={0}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ChooseImage;

const styles = StyleSheet.create({
  picker: {
    paddingVertical: 10,
    backgroundColor: Colors.grey200 + "10",
    borderRadius: 10,
    marginBottom: 5,
  },
  container: {
    marginTop: 20,
  },
});
