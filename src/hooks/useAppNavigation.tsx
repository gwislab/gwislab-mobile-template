import {
  DrawerActions,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";

import { useEffect, useState } from "react";

export const useToggleDrawer = () => {
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

  return () => navigation.dispatch(DrawerActions.toggleDrawer());
};

export const useGetCurrentRoute = () => {
  const navigation = useNavigation();
  const [currentRoute, setCurrentRoute] = useState();
  useEffect(() => {
    const unsubscribeRouteListener = navigation.addListener("state", () => {
      const routes = navigation.getState().routes;
      console.log({ currentRoute: routes[routes.length - 1].name });
      setCurrentRoute(routes[routes.length - 1].name);
    });

    return () => {
      unsubscribeRouteListener();
    };
  }, []);

  return currentRoute;
};
