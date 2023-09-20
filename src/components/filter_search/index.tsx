import { Icon } from "@rneui/themed";
import { Colors, SharedStyles } from "configs";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { IFilterSearchProps } from "./interface";
import { useEffect, useState } from "react";

const FilterSearch = ({
  placeholder,
  style,
  marginBottom,
  width,
  onChange,
  value,
  disabled,
  onPressFilter,
  hideFilter,
  iconColor,
}: IFilterSearchProps) => {
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (value) {
      setSearch(search);
    }
    return () => {};
  }, [value]);

  return (
    <View
      style={[
        SharedStyles.rowCenter,
        styles.container,
        { width, marginBottom },
        style,
      ]}
    >
      <View style={[SharedStyles.rowStart, styles.textField]}>
        <Icon
          name="search1"
          type="ant-design"
          color={Colors[iconColor || "primary"]}
          style={styles.icon}
          size={20}
        />
        <TextInput
          placeholder={placeholder}
          keyboardType="web-search"
          value={search}
          onChangeText={(text) => {
            setSearch(text);
            onChange?.(text);
          }}
          aria-disabled={disabled}
        />
      </View>
      {!hideFilter ? (
        <TouchableOpacity
          style={[SharedStyles.rowCenter, styles.filterIcon]}
          onPress={() => onPressFilter?.()}
        >
          <Icon
            name="filter"
            type="font-awesome-5"
            color={Colors.primary}
            size={20}
          />
        </TouchableOpacity>
      ) : undefined}
    </View>
  );
};

export default FilterSearch;
const styles = StyleSheet.create({
  filterIcon: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: 10,
  },
  textField: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    flex: 1,
    marginRight: 10,
    height: 45,
  },
  icon: {
    marginHorizontal: 10,
  },
  container: {
    backgroundColor: Colors.white,
  },
});
