import React from "react";
import { IHeaderProps } from "./interface";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import Text from "components/text";
import { Icon } from "@rneui/base";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import Image from "components/image";
import { SharedStyles, appDimension } from "configs";
import { useToggleDrawer } from "hooks/useAppNavigation";
import { IAppState } from "store/interface";
import { useSelector } from "react-redux";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";

const Header = ({
  title,
  style,
  showUser,
  noBack,
  center,
  showHeader = true,
  titleOptions,
  rightComponent,
  imageOptions,
  leftComponent,
  showUserTitles,
  showSideMenu,
  rightOptions,
  onPressOption,
  goBackRoute,
}: IHeaderProps) => {
  const router = useRouter();
  const user = useSelector((state: IAppState) => state.systemPersist.user);
  const toggleDrawer = useToggleDrawer();

  if (!showHeader) return;

  const goBack = () => {
    if (!noBack) {
      router.back();
    }
  };

  const showEmptyView = noBack && !title && !showUser && !leftComponent;

  return (
    <View
      style={[styles.container, rightComponent ? styles.btn : undefined, style]}
    >
      <View style={SharedStyles.rowCenter}>
        {!noBack ? (
          <TouchableOpacity
            onPress={!goBackRoute ? goBack : () => router.replace(goBackRoute)}
            activeOpacity={0.5}
          >
            <Icon
              name="arrowleft"
              type="antdesign"
              style={{ marginRight: center ? 0 : 15 }}
            />
          </TouchableOpacity>
        ) : undefined}

        {leftComponent}

        {showUser ? (
          <TouchableOpacity
            onPress={showSideMenu ? toggleDrawer : goBack}
            style={SharedStyles.rowCenter}
          >
            <Image
              style={center ? styles.imageCenter : undefined}
              {...imageOptions}
              size={35}
            />
            {showUserTitles ? (
              <View>
                <Text
                  text={user?.fullName || "not logged in"}
                  fontWeight="semiBold"
                  marginBottom={0}
                  capitalize
                />
                <Text
                  text={user?.role}
                  variant="small"
                  marginBottom={0}
                  capitalize
                />
              </View>
            ) : undefined}
          </TouchableOpacity>
        ) : undefined}

        {title ? (
          <Text
            text={title}
            fontWeight="semiBold"
            variant="title"
            style={[styles.title, center ? styles.titleCenter : undefined]}
            onPress={goBack}
            marginBottom={0}
            center={center}
            {...titleOptions}
          />
        ) : undefined}
      </View>

      {showEmptyView ? <View /> : undefined}

      {rightOptions?.length ? (
        <Menu>
          <MenuTrigger style={SharedStyles.row}>
            <Icon name="dots-three-vertical" type="entypo" size={20} />
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsContainer: styles.optionContainer,
            }}
          >
            {rightOptions.map((item, index) => {
              return (
                <MenuOption
                  onSelect={() => onPressOption?.(item)}
                  key={index}
                  style={styles.optionItem}
                >
                  <Text text={item.label} numberOfLines={1} />
                </MenuOption>
              );
            })}
          </MenuOptions>
        </Menu>
      ) : undefined}
      {rightComponent}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: 20,
    paddingLeft: 0,
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    marginBottom: 0,
  },
  titleCenter: {
    position: "absolute",
    marginBottom: 0,
    left: -20,
    width: appDimension.width,
    zIndex: -20,
  },
  imageCenter: {
    marginRight: 0,
  },
  btn: {
    justifyContent: "space-between",
  },
  optionItem: {
    paddingHorizontal: 20,
  },
  optionContainer: {
    paddingVertical: 10,
  },
});
