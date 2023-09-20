import Text from "components/text";
import { Colors } from "configs";

import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { INoDataProps } from "./interface";

const NoDataComponent = ({ text, titleOptions }: INoDataProps) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text
        style={styles.text}
        center
        text={text || t("no data was found")}
        {...titleOptions}
      />
    </View>
  );
};

export default NoDataComponent;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 20,
  },
  text: {
    color: Colors.grey800,
  },
});
