import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ISwitcherProps } from "./interface";
import Text from "components/text";
import { Switch } from "@rneui/base";
import { Colors, SharedStyles } from "configs";

const Switcher = ({
  text,
  style,
  center,
  onPress,
  marginBottom = 10,
  marginRight,
  spaceBetween,
  textPosition = "left",
  textOption,
  value = false,
  width = "100%",
}: ISwitcherProps) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(value);

    return () => {};
  }, []);

  const handleCheck = () => {
    setIsChecked(!isChecked);
    onPress?.(!isChecked);
  };

  return (
    <View
      style={[
        styles.switcherWrapper,
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
      <Switch
        thumbColor={isChecked ? Colors.primary : Colors.timeBg}
        color={Colors.primaryLight}
        trackColor={{
          true: Colors.primaryLight,
          false: Colors.grey800,
        }}
        value={isChecked}
        onValueChange={handleCheck}
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

export default Switcher;

const styles = StyleSheet.create({
  switcherWrapper: {
    ...SharedStyles.rowBetweenCenter,
    width: "100%",
  },
  between: {
    justifyContent: "space-between",
  },
  center: {
    justifyContent: "center",
  },
});
