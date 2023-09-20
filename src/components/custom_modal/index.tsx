import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { CONSTANTS, Colors } from "configs";
import { Icon } from "@rneui/themed";
import Text from "components/text";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "store/interface";
import SelectedModal from "./modal_configs";
import { closeModal } from "store/system";

const CustomModal = () => {
  const {
    modalConfig: {
      modalName,
      variant,
      height,
      innerHeight,
      snapPoints,
      placeholder,
      noPadding,
      noScrollView,
      noBorder,
    },
  } = useSelector((state: IAppState) => state.system);

  const bSnapPoints = useMemo(() => snapPoints || ["25%", "60%"], [snapPoints]);

  const dispatch = useDispatch();
  const ref = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback((_index: number) => {
    if (_index === -1) {
      handleOnClose();
    }
  }, []);

  const [visible, setVisible] = useState(false);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  const modalHeight =
    (height as number) <= CONSTANTS.MIN_MODAL_HEIGHT
      ? CONSTANTS.MIN_MODAL_HEIGHT
      : height;

  const handleOnClose = useCallback(() => {
    setVisible(false);
    ref?.current?.close();
    dispatch(closeModal());
  }, [modalName]);

  const handleOnOpen = useCallback(() => {
    setVisible(true);
    ref?.current?.expand();
  }, [modalName]);

  useEffect(() => {
    if (!!modalName) {
      handleOnOpen();
    } else {
      handleOnClose();
    }
    return () => {};
  }, [modalName]);

  const sharedComponent = (
    <View style={styles.sharedContainerStyle}>
      <View style={styles.titleContainer}>
        <Text text={placeholder} marginBottom={0} fontFamily="bold" />
        <TouchableOpacity onPress={handleOnClose}>
          <Icon name="close" color={Colors.primary} size={24} />
        </TouchableOpacity>
      </View>
      {noScrollView ? (
        <View
          style={[
            {
              paddingHorizontal: noPadding ? 0 : 20,
              flex: 1,
            },
          ]}
        >
          <SelectedModal />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.wrapper,
            { paddingHorizontal: noPadding ? 0 : 20 },
          ]}
        >
          <SelectedModal />
        </ScrollView>
      )}
    </View>
  );

  if (variant === "simple") {
    return (
      <Modal visible={visible} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={handleOnClose}>
          <View style={[styles.modal, { height: modalHeight }]}>
            <View
              style={[
                styles.modalInner,
                { height: innerHeight },
                noBorder ? undefined : styles.modalBorder,
              ]}
            >
              {sharedComponent}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={bSnapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose
      bottomInset={0}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={[
        styles.handle,
        noBorder ? styles.noBorderHandle : undefined,
      ]}
      backgroundStyle={noBorder ? styles.noBorderBg : undefined}
    >
      <BottomSheetView style={styles.contentContainer}>
        {sharedComponent}
      </BottomSheetView>
    </BottomSheet>
  );
};
export default CustomModal;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.black + "10",
    width: "100%",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    position: "absolute",
    bottom: 0,
  },
  modalInner: {
    width: "100%",
    paddingVertical: 20,
    backgroundColor: Colors.white,
    shadowColor: Colors.black + "90",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  sharedContainerStyle: {
    width: "100%",
    flex: 1,
  },
  handle: {
    backgroundColor: Colors.primary + "70",
  },
  noBorderHandle: {
    backgroundColor: Colors.white,
    height: 0,
  },
  wrapper: {
    paddingBottom: 100,
  },
  modalBorder: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  noBorderBg: {
    borderRadius: 0,
  },
});
