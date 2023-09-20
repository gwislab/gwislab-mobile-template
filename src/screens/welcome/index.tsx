import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Container, Text } from "components";
import { Colors, appDimension, appLanguage, AppLang } from "configs";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "store/language";
import { useTranslation } from "react-i18next";

const WelcomeScreen = () => {
  const router = useRouter();
  const { systemLanguage } = useSelector((state: any) => state.language);

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const goToNext = () => {
    router.push("/user/home");
  };

  return (
    <Container
      headerOptions={{ showHeader: false }}
      bottomButtonOptions={{
        title: t("continue"),
        onPress: goToNext,
      }}
    >
      <View style={styles.container}>
        <Text color="grey200" variant="small" text={t("welcome_to")} />
        <Text
          color="primary"
          variant="bigTitle"
          text="Gwislab"
          fontWeight="bold"
        />
        <Text
          color="grey200"
          text={t("this is to to demonstrate translations")}
          style={styles.textDesc}
          center
        />
        <View style={styles.langContainer}>
          <Text
            color="grey800"
            variant="small"
            text={t("preferred language")}
            fontWeight="italic"
            center
            marginBottom={20}
          />
          <View style={styles.flagContainer}>
            {appLanguage.map(({ local, lang }, inx) => (
              <TouchableOpacity
                key={inx}
                style={[
                  styles.flag,
                  systemLanguage === local ? styles.flagSelected : undefined,
                  local === AppLang.fr && styles.flagFR,
                  local === AppLang.en && styles.flagEn,
                ]}
                onPress={() => {
                  dispatch(changeLanguage(local));
                }}
              >
                <Text
                  color="grey800"
                  variant="small"
                  text={t(lang)}
                  marginBottom={0}
                  fontWeight="italic"
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Container>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: appDimension.height * 0.75,
  },
  flagContainer: {
    flexDirection: "row",
    width: appDimension.width * 0.8,
    alignItems: "center",
    justifyContent: "center",
  },
  flag: {
    borderWidth: 2,
    borderColor: Colors.grey200 + "50",
    borderRadius: 10,
    marginHorizontal: 5,
    justifyContent: "center",
    height: 110,
    width: 120,
    alignItems: "center",
  },
  flagFR: {
    padding: 10,
  },
  flagEn: {
    paddingHorizontal: 10,
  },
  flagSelected: {
    borderColor: Colors.primary,
  },
  langContainer: {
    paddingTop: 40,
    marginBottom: 50,
  },
  textDesc: {
    maxWidth: "90%",
    marginTop: 20,
  },
});
