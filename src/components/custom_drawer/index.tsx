import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Icon } from "@rneui/base";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useToggleDrawer } from "hooks/useAppNavigation";
import Text from "components/text";
import { Colors, IDrawerItemProps, SharedStyles, appDimension } from "configs";

interface ICustomDrawerProps extends DrawerContentComponentProps {
  customDrawerItem: IDrawerItemProps[];
  connectedUserName: string;
}

const CustomDrawer = (props: ICustomDrawerProps) => {
  const { customDrawerItem, connectedUserName, ...rest } = props;
  const router = useRouter();
  const toggleDrawer = useToggleDrawer();

  // const onShare = async () => {
  //   try {
  //     // const result = await Share.share({
  //     //   message: aLink,
  //     // });
  //   } catch (error) {}
  // };

  const onPressItem = (path: string) => {
    router.push(path);
    setTimeout(() => {
      toggleDrawer();
    }, 1000);
  };

  return (
    <DrawerContentScrollView {...rest}>
      <View style={styles.drawer}>
        <View style={styles.top}>
          <View style={[SharedStyles.rowCenter, styles.header]}>
            <Text
              text={connectedUserName}
              marginBottom={4}
              fontWeight="semiBold"
            />
            <Text
              text={"Voir profile"}
              variant="small"
              color="primary"
              fontWeight="semiBold"
            />
          </View>
          <DrawerItemList {...rest} />
          {customDrawerItem.map(({ label, routeTo, onPress, icon }) => (
            <DrawerItem
              label={label}
              key={label}
              onPress={() => {
                if (routeTo) {
                  onPressItem(routeTo);
                }
                onPress?.();
              }}
              activeTintColor={Colors.primary}
              // inactiveTintColor="green"
              icon={({ color }) => (
                <Icon
                  name={icon.name}
                  size={icon.size}
                  type={icon.type}
                  color={color}
                />
              )}
            />
          ))}
        </View>
        <View style={styles.bottom}>
          <Text
            text={"Gwislab V 4.0.1"}
            center
            variant="small"
            color="border"
          />
          <Text
            text={"Azimut HealthTech SARL © 2023"}
            center
            variant="small"
            color="border"
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  header: {
    flexDirection: "column",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    width: "100%",
    marginBottom: 10,
  },
  icon: {
    marginBottom: 10,
  },
  bottom: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 20,
    height: 100,
  },
  top: {
    position: "relative",
    flex: 1,
  },
  drawer: {
    flexDirection: "column",
    height: appDimension.height,
  },
});
