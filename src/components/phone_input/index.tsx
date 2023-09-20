import { Colors } from "configs";
import { StyleSheet, View } from "react-native";
import PhoneInput from "react-native-phone-input";
import { IPhoneProps } from "./interface";
import Text from "components/text";
import { Icon } from "@rneui/themed";
import { byPlatform } from "utils";
import { useTranslation } from "react-i18next";
import React, { useEffect, useRef } from "react";
import ReactNativePhoneInput from "react-native-phone-input";

const PhoneNumberInput = React.forwardRef(
  (
    {
      placeholder,
      onPress,
      isVerified,
      marginBottom,
      value,
      disabled,
    }: IPhoneProps,
    ref
  ) => {
    const { t } = useTranslation();
    const phoneNumberRef = useRef<ReactNativePhoneInput>(null);

    useEffect(() => {
      if (value) {
        phoneNumberRef.current?.setValue(value);
      }

      return () => {};
    }, [value]);

    return (
      <View
        style={[
          styles.viewStyle,
          // isVerified ? styles.isVerified : undefined,
          { marginBottom },
        ]}
      >
        <Text
          text={placeholder}
          color={"grey800"}
          variant="small"
          marginBottom={5}
        />
        <PhoneInput
          ref={ref ? (ref as any) : phoneNumberRef}
          initialValue="+237"
          initialCountry={"cmr"}
          onChangePhoneNumber={onPress}
          disabled={disabled}
        />
        {isVerified ? (
          <View style={styles.verifiedContainer}>
            <Text
              text={t("verified")}
              color="primary"
              variant="small"
              marginBottom={0}
            />
            <Icon
              name="checkmark-circle-outline"
              type="ionicon"
              color={Colors.primary}
              size={20}
              style={styles.iconStyle}
            />
          </View>
        ) : undefined}
      </View>
    );
  }
);

export default PhoneNumberInput;

const styles = StyleSheet.create({
  viewStyle: {
    borderColor: Colors.borderGrey,
    borderWidth: 1,
    width: "100%",
    padding: 5,
    paddingBottom: 10,
    paddingLeft: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  isVerified: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + "25",
  },
  verifiedContainer: {
    position: "absolute",
    right: 10,
    top: "45%",
    justifyContent: "center",
    flexDirection: "row",
  },
  iconStyle: {
    marginLeft: 5,
    marginTop: byPlatform({ ios: -2, android: 0 }),
  },
});
