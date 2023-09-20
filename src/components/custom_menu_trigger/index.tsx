import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { ICustomMenuTriggerProps } from "./interface";
import { Icon } from "@rneui/base";
import { Colors, SharedStyles } from "configs";
import Text from "components/text";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

const CustomMenuTrigger = ({
  data = [],
  onClick,
  placeholder,
  style,
  border,
}: ICustomMenuTriggerProps) => {
  const [selectedItem, setSelectedItem] = useState(data[0]);

  const handleOnPress = (item: any) => {
    setSelectedItem(item);
    onClick && onClick(item);
  };

  return (
    <View style={[border ? styles.border : undefined, style]}>
      <Menu>
        <MenuTrigger style={SharedStyles.row}>
          <Text
            fontWeight="semiBold"
            text={selectedItem.label || placeholder}
            marginBottom={border ? 0 : -9}
            numberOfLines={1}
            style={styles.width}
            center
          />
          <Icon name="chevron-small-down" type="entypo" size={32} />
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsContainer: styles.optionContainer,
          }}
        >
          {data.map((item, index) => {
            return (
              <MenuOption
                onSelect={() => handleOnPress(item)}
                key={index}
                style={styles.optionItem}
              >
                <Text text={item.label} numberOfLines={1} />
              </MenuOption>
            );
          })}
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default CustomMenuTrigger;

const styles = StyleSheet.create({
  border: {
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 10,
    height: 30,
  },
  optionItem: {
    paddingHorizontal: 20,
  },
  optionContainer: {
    paddingVertical: 10,
  },
  width: {
    width: "70%",
    paddingLeft: 5,
  },
});
