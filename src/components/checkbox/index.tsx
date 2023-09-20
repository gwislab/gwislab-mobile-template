import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ICheckBoxProps } from "./interface";
import Text from "components/text";
import { CheckBox as RNCheckBox } from "@rneui/themed";

const CheckBox = ({
  text,
  style,
  center,
  onPress,
  marginBottom = 10,
  marginRight,
  spaceBetween,
  textPosition = "right",
  textOption,
  checked = false,
  width = "100%",
}: ICheckBoxProps) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(checked);

    return () => {};
  }, []);

  const handleCheck = () => {
    setIsChecked(!isChecked);
    onPress?.(!isChecked);
  };

  return (
    <View
      style={[
        styles.checkboxWrapper,
        { marginBottom, marginRight, width },
        spaceBetween ? styles.between : undefined,
        center ? styles.center : undefined,
        style,
      ]}
    >
      {text && textPosition === "left" ? (
        typeof text == "string" ? (
          <Text
            text={text}
            {...textOption}
            marginBottom={0}
            onPress={handleCheck}
          />
        ) : (
          text
        )
      ) : undefined}
      <RNCheckBox
        style={styles.checkbox}
        checked={isChecked}
        onPress={handleCheck}
        uncheckedColor="black"
        containerStyle={styles.checkboxStyle}
      />
      {text && textPosition === "right" ? (
        typeof text == "string" ? (
          <Text
            text={text}
            {...textOption}
            marginBottom={0}
            onPress={handleCheck}
            marginRight={-20}
          />
        ) : (
          text
        )
      ) : undefined}
    </View>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  checkboxWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -8,
  },
  checkbox: {
    borderRadius: 2,
  },
  between: {
    justifyContent: "space-between",
  },
  center: {
    justifyContent: "center",
  },
  checkboxStyle: {
    padding: 0,
    margin: 0,
    backgroundColor: "transparent",
    width: 18,
  },
});
