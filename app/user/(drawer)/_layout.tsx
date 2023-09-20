import React from "react";
import { Drawer } from "expo-router/drawer";
import { CustomDrawer } from "components";
import { Colors, IDrawerItemProps } from "configs";
import { Icon } from "@rneui/base";
import { useDispatch } from "react-redux";
import { reinitializeSystem } from "store/system";
import { reinitializeSystemPersist } from "store/system_persist";
import { Alert } from "react-native";
import { useRouter } from "expo-router";

const drawerItem: IDrawerItemProps[] = [
  {
    name: "dashboard",
    label: "Horraire",
    icon: {
      name: "calendar-alt",
      size: 20,
      type: "font-awesome-5",
    },
  },
];

const hiddenItems = [drawerItem[0].name];

const DrawerLayout = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(reinitializeSystem());
    dispatch(reinitializeSystemPersist());
    router.push("/welcome");
  };

  const onRemoveDoctor = () => {
    Alert.alert(
      "Se Déconnexion",
      "Vous êtes sur le point de vous déconnecter",
      [
        {
          text: "cancel",
          style: "cancel",
        },
        {
          text: "ok",
          style: "default",
          onPress: handleLogout,
        },
      ]
    );
  };

  const customDrawerItem: IDrawerItemProps[] = [
    {
      name: "language",
      label: "Langue",
      icon: {
        name: "language",
        size: 20,
        type: "font-awesome",
      },
    },
    {
      name: "logout",
      label: "Logout",
      icon: {
        name: "log-out",
        size: 20,
        type: "feather",
      },
      onPress: onRemoveDoctor,
    },
  ];

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: Colors.primary,
        drawerItemStyle: {
          backgroundColor: Colors.transparent,
        },
      }}
      drawerContent={(props) => (
        <CustomDrawer
          {...props}
          customDrawerItem={customDrawerItem}
          connectedUserName={"Gwislab Username"}
        />
      )}
    >
      {drawerItem.map((item) => (
        <Drawer.Screen
          key={item.name}
          name={item.name}
          options={{
            drawerIcon: (prop) => (
              <Icon
                name={item.icon.name}
                type={item.icon.type}
                size={item.icon.size}
                color={prop.color}
              />
            ),
            drawerLabel: item.label,
            drawerItemStyle: {
              display: hiddenItems.includes(item.name) ? "none" : undefined,
            },
          }}
        />
      ))}
    </Drawer>
  );
};

export default DrawerLayout;
