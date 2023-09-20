import * as React from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { Container, Text } from "components";
import { Colors, SharedStyles } from "configs";
import { Icon } from "@rneui/base";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import TabB from "./tab_b";
import TabA from "./tab_a";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

const renderScene = SceneMap({
  tab_a: TabA,
  tab_b: TabB,
});

const UserDashboardScreen = () => {
  const layout = useWindowDimensions();
  const { t } = useTranslation();
  const [index, setIndex] = React.useState(0);
  const router = useRouter();

  const [routes] = React.useState([
    { key: "tab_a", title: "TabA" },
    { key: "tab_b", title: "TabB" },
  ]);

  const handlePush = () => {
    router.push("/user/home");
  };

  return (
    <Container
      noScrolling
      floatButtonOptions={{
        onPress: handlePush,
        title: "",
        iconName: index ? "group-add" : "add",
        iconType: index ? "material" : "ionicons",
      }}
      headerOptions={{
        showSideMenu: true,
        noBack: true,
        center: true,
        title: t("Gwislab"),
        titleOptions: {
         fontFamily: "bold",
          paddingRight: 10,
        },
        showUser: true,
        rightComponent: (
          <View style={SharedStyles.rowCenter}>
            <Icon name="location-on" size={18} color={Colors.primary} />
            <Text text={t("Yaounde, CM")} variant="small" marginBottom={0} />
          </View>
        ),
      }}
    >
      <TabView
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={styles.tabView}
            activeColor={Colors.primary}
            labelStyle={styles.tabViewLabel}
            tabStyle={styles.tabStyle}
            indicatorStyle={styles.indicator}
          />
        )}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </Container>
  );
};

export default UserDashboardScreen;

const styles = StyleSheet.create({
  tabView: {
    backgroundColor: Colors.white,
    marginLeft: 20,
    width: "80%",
    marginBottom: 15,
  },
  tabViewLabel: {
    color: Colors.grey800,
   fontFamily: "semiBold",
    textTransform: "capitalize",
    fontSize: 16,
  },
  tabStyle: {
    alignItems: "flex-start",
  },
  indicator: {
    backgroundColor: Colors.primary,
  },
});
