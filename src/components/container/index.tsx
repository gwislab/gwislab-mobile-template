import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { Colors } from "configs";
import { IContainerProps } from "./interface";
import Header from "components/header";
import Button from "components/button";
import CustomModal from "components/custom_modal";

const Container = ({
  style,
  children,
  headerOptions,
  footer,
  beforeButton,
  bottomButtonOptions,
  floatButtonOptions,
  backgroundColor,
  noPadding,
  noScrolling,
  afterButton,
  paddingTop,
  noHeader,
}: IContainerProps) => {
  return (
    <SafeAreaView
      style={[
        style,
        styles.container,
        { backgroundColor: Colors[backgroundColor || "white"] },
      ]}
    >
      {!noHeader ? (
        <View style={styles.wrapper}>
          <Header {...headerOptions} />
        </View>
      ) : undefined}

      {noScrolling ? (
        <View style={[styles.containerChild, { paddingTop }]}>{children}</View>
      ) : (
        <ScrollView
          contentContainerStyle={[
            noPadding ? undefined : styles.wrapper,
            styles.wrapperBottom,
            { paddingTop },
          ]}
        >
          {children}
        </ScrollView>
      )}

      {footer || bottomButtonOptions ? (
        <View style={[styles.wrapper, styles.footer]}>
          {footer || (
            <View>
              {beforeButton}
              <Button
                title={bottomButtonOptions?.title || "Bottom Button"}
                {...bottomButtonOptions}
              />
              {afterButton}
            </View>
          )}
        </View>
      ) : undefined}

      {floatButtonOptions ? (
        <Button
          iconName="plus"
          iconType="antdesign"
          buttonStyle={styles.buttonStyle}
          {...floatButtonOptions}
          containerStyle={{
            ...styles.floatButton,
            ...(bottomButtonOptions ? styles.withBottom : {}),
          }}
        />
      ) : undefined}

      <CustomModal />
    </SafeAreaView>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  wrapperBottom: {
    paddingBottom: 100,
  },
  footer: {
    marginBottom: 10,
  },
  successTop: {
    width: "100%",
    position: "absolute",
    right: 0,
    top: 0,
  },
  successBottom: {
    width: "100%",
    position: "absolute",
    //   right: -(appDimension.width * 0.3),
    bottom: 0,
    transform: [{ rotate: "180deg" }],
  },
  containerChild: {
    flex: 1,
    marginBottom: 30,
  },
  floatButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 65,
    height: 65,
    borderRadius: 65,
    marginBottom: 0,
    justifyContent: "center",
  },
  withBottom: {
    bottom: 100,
  },
  buttonStyle: {
    height: 70,
  },
});
