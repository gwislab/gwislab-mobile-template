import { Colors } from "configs";
import { StyleSheet, TextInput, View } from "react-native";
import { ICustomInputProps } from "./interface";
import Text from "components/text";
import { byPlatform } from "utils";

const CustomInput = ({
  placeholder,
  onChange,
  marginBottom = 15,
  width = "100%",
  style,
  value,
  disabled,
  inputPlaceholder,
  keyboardType,
}: ICustomInputProps) => {
  return (
    <View style={[styles.container, { width }, { marginBottom }, style]}>
      {placeholder ? (
        <Text
          text={placeholder}
          color="grey800"
          variant="small"
          marginBottom={byPlatform({ ios: 10, android: 1 })}
        />
      ) : undefined}
      {!disabled ? (
        <TextInput
          placeholderTextColor={Colors.grey800}
          value={value}
          aria-disabled={disabled}
          onChangeText={onChange}
          autoCapitalize="none"
          keyboardType={keyboardType}
          placeholder={inputPlaceholder}
          style={inputPlaceholder ? styles.inputStyle : undefined}
        />
      ) : (
        <Text text={value} marginBottom={0} style={styles.text} />
      )}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.borderGrey,
    borderWidth: 1,
    padding: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    borderRadius: 10,
  },
  text: {
    marginTop: -3,
  },
  inputStyle: {
    paddingVertical: 7,
    margin: 0,
  },
});
