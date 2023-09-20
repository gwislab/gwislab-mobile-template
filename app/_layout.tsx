import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@rneui/themed";
import { Stack, useNavigation, useSegments } from "expo-router";
import { AppTheme, Colors, SharedStyles } from "configs";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SF_Pro_Display } from "assets/fonts";
import { getLocales } from "expo-localization";
import { initializeI18n } from "assets/i18n";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Provider, useDispatch, useSelector } from "react-redux";
import { initializeLang } from "store/language";
import { Log } from "utils";
import NetInfo from "@react-native-community/netinfo";
import * as Location from "expo-location";
import Toast from "react-native-root-toast";
import { Loader, Text } from "components";
import Constants from "expo-constants";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { persistor, store } from "store";
import { PersistGate } from "redux-persist/integration/react";
import { useApolloClientInstance } from "hooks/useApolloClient";
import { ApolloProvider } from "@apollo/client";
import { MenuProvider } from "react-native-popup-menu";
import { IAppState } from "store/interface";
import {
  closeModal,
  endProgress,
  finishInitUserLoading,
  removeError,
  removeSuccess,
} from "store/system";
import { Icon, LinearProgress } from "@rneui/base";
import { useInitializeSystemMomentLocale } from "hooks/system";
import { RootSiblingParent } from "react-native-root-siblings";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

//will prevent SplashScreen from auto-hide
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "/welcome",
};

const theme = AppTheme("light");

const AppSetup = () => {
  useInitializeSystemMomentLocale();
  const appLoading = useSelector((state: IAppState) => state.system.loading);
  const initUserLoading = useSelector(
    (state: IAppState) => state.system.initUserLoading
  );
  const isUserInitialized = useSelector(
    (state: IAppState) => state.systemPersist.isUserInitialized
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (initUserLoading) {
      dispatch(finishInitUserLoading());
    }

    return () => {};
  }, [initUserLoading, isUserInitialized]);

  useEffect(() => {
    dispatch(closeModal());
    return () => {};
  }, []);

  const loading = initUserLoading || appLoading;

  return (
    <ThemeProvider theme={theme}>
      {loading ? <Loader /> : undefined}
      <Stack
        initialRouteName="/welcome"
        screenOptions={{ headerShown: false }}
      />
    </ThemeProvider>
  );
};

const SubAppContainer = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const pathName = useSegments();
  const client = useApolloClientInstance();
  const error = useSelector((state: IAppState) => state.system.error);
  const success = useSelector((state: IAppState) => state.system.success);
  const progress = useSelector((state: IAppState) => state.system.progress);

  const askUserPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Toast.show(
        "Permission denied, Please go to Gwislab permission and enable it",
        { duration: Toast.durations.LONG }
      );
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    Log(location);
  };

  useEffect(() => {
    if (error) {
      Toast.show(error, { duration: Toast.durations.LONG });
      setTimeout(() => {
        dispatch(removeError());
      }, 5000);
    }

    if (success) {
      Toast.show(success, { duration: Toast.durations.LONG });
      setTimeout(() => {
        dispatch(removeSuccess());
      }, 3000);
    }

    if (progress >= 1) {
      setTimeout(() => {
        dispatch(endProgress());
      }, 3000);
    }

    if (progress > 0) {
      setTimeout(() => {
        dispatch(endProgress());
        if (progress > 0 && progress < 1) {
          // Toast.show("There might be an error uploading your file", {
          Toast.show(
            "Il se peut qu'il y ait une erreur lors du téléchargement de votre fichier",
            {
              duration: Toast.durations.LONG,
            }
          );
        }
      }, 20000);
    }

    return () => {};
  }, [error, success, progress]);

  useEffect(() => {
    dispatch(initializeLang());

    askUserPermission();

    const unsubscribeRouteListener = navigation.addListener("state", () => {
      const routes = navigation.getState().routes;
      Log({
        "getCurrentRoute ==> ": `${pathName}, ${
          routes[routes.length - 1].name
        }`,
      });
    });

    return () => {
      unsubscribeRouteListener();
    };
  }, [pathName]);

  return (
    <MenuProvider>
      {progress ? (
        <LinearProgress color={Colors.primary} value={progress} />
      ) : undefined}
      {error ? (
        <TouchableOpacity
          style={[styles.error, SharedStyles.rowBetween]}
          onPress={() => dispatch(removeError())}
        >
          <Text
            text={error}
            center
            variant="small"
            color="white"
            marginBottom={0}
          />
          <Icon name="close" color={Colors.white} size={22} />
        </TouchableOpacity>
      ) : undefined}
      {success ? (
        <TouchableOpacity
          style={[styles.success, SharedStyles.rowBetween]}
          onPress={() => dispatch(removeSuccess())}
        >
          <Text
            text={success}
            center
            variant="small"
            color="white"
            marginBottom={0}
          />
          <Icon name="close" color={Colors.white} size={22} />
        </TouchableOpacity>
      ) : undefined}
      {client ? (
        <ApolloProvider client={client}>
          <AppSetup />
        </ApolloProvider>
      ) : (
        <Loader />
      )}
    </MenuProvider>
  );
};

const App = () => {
  const [isLoaded] = useFonts(SF_Pro_Display);
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [{ languageCode }] = getLocales();
  const [isConnected, setIsConnected] = useState(false);
  const initializeApp = () => {
    initializeI18n(languageCode);
    setIsAppLoaded(true);
  };

  useEffect(() => {
    initializeApp();

    const unsubscribeNetInfoListener = NetInfo.addEventListener((state) => {
      Log(`Connection type: ${state.type}`);
      setIsConnected(!!state.isConnected);
    });

    return () => {
      unsubscribeNetInfoListener();
    };
  }, [isLoaded]);

  const handleOnLayout = useCallback(async () => {
    if (!isLoaded && isAppLoaded) {
      await SplashScreen.hideAsync(); //hide the splashscreen
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <RootSiblingParent>
      <SafeAreaProvider onLayout={handleOnLayout} style={styles.container}>
        <StatusBar style="dark" />
        <Provider store={store}>
          <PersistGate loading={isLoaded} persistor={persistor}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.screen}
                contentContainerStyle={styles.screen}
              >
                <BottomSheetModalProvider>
                  {!isConnected ? (
                    <View style={styles.error}>
                      <Text
                        text={
                          "You appear to be offline. please check your internet connection"
                        }
                        center
                        variant="small"
                        color="white"
                        marginBottom={0}
                      />
                    </View>
                  ) : undefined}
                  <SubAppContainer />
                </BottomSheetModalProvider>
              </KeyboardAvoidingView>
            </GestureHandlerRootView>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </RootSiblingParent>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: Colors.transparent,
  },
  error: {
    backgroundColor: Colors.redLight300,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  success: {
    backgroundColor: Colors.success,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  screen: {
    flex: 1,
  },
});
