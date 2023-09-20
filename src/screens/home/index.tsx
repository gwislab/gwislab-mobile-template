import { StaticImage } from "assets/images";
import {
  Button,
  CheckBox,
  Container,
  CustomInput,
  CustomMenuTrigger,
  DateTimeInput,
  FilterSearch,
  Image,
  ImagePicker,
  ModalSelector,
  NoDataComponent,
  PhoneNumberInput,
  Switcher,
  Text,
} from "components";
import { appModals, daysOfWeeks } from "configs";
import { useRouter } from "expo-router";
import { t } from "i18next";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { IModalConfig } from "store/interface";
import { openModal } from "store/system";

const HomeScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const goToNext = () => {
    router.push("/user/dashboard");
  };

  const onOpen = () => {
    dispatch(
      openModal({
        modalName: appModals.IMAGE_PICKER,
        modalData: {
          multiple: true,
        },
        variant: "simple",
        placeholder: t("pickFrom"),
      } as IModalConfig)
    );
  };
  return (
    <Container
      headerOptions={{
        title: t("Component libraries"),
        center: true,
        rightOptions: daysOfWeeks,
      }}
      bottomButtonOptions={{
        title: t("Go to Dashboard"),
        onPress: goToNext,
      }}
    >
      <Text
        variant={"title"}
        text={t("Example title")}
        center
        fontFamily="bold"
      />
      <Text text={t("Example title")} center style={styles.textStyle} />

      <PhoneNumberInput placeholder={t("Example title")} marginBottom={15} />
      <CustomInput placeholder={t("Example title")} />
      <DateTimeInput placeholder={t("Example title")} marginBottom={15} />
      <DateTimeInput
        mode="time"
        placeholder={t("Example title")}
        marginBottom={15}
      />
      <ImagePicker />
      <ModalSelector
        data={daysOfWeeks}
        placeholder={t("Example title")}
        marginBottom={15}
      />
      <FilterSearch placeholder={t("Example title")} marginBottom={15} />
      <CheckBox text={t("Example title")} />
      <Switcher text={t("Example title")} marginBottom={15} />
      <CustomMenuTrigger data={daysOfWeeks} border />
      <Image localUri={StaticImage.noDocument} reset />
      <Button title={t("Open modal")} onPress={onOpen} />
      <NoDataComponent />
    </Container>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  textStyle: {
    marginVertical: 20,
    paddingBottom: 60,
  },
});
