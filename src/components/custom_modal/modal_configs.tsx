import { appModals } from "configs";
import React from "react";
import { useSelector } from "react-redux";
import { IAppState } from "store/interface";
import ChooseImage from "./modals/choose_image";
import { View } from "react-native";
import Text from "components/text";
import { useTranslation } from "react-i18next";

const SelectedModal = () => {
  const { t } = useTranslation();
  const {
    modalConfig: { modalName, modalData },
  } = useSelector((state: IAppState) => state.system);

  switch (modalName) {
    case appModals.IMAGE_PICKER:
      return <ChooseImage multiple={modalData?.multiple!} t={t} />;

    default:
      return (
        <View>
          <Text text={"No modal was found"} />
        </View>
      );
  }
};

export default SelectedModal;
