import { useCallback, useEffect, useState } from "react";
import { Colors, IData, SharedStyles } from "configs";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { IModalSelectorProps } from "./interface";
import Text from "components/text";
import RNModalSelector from "react-native-modal-selector";
import { useTranslation } from "react-i18next";
import { Icon } from "@rneui/themed";
import { convertArrayToObject, makeArrayUnique } from "utils";

const ModalSelector = ({
  placeholder,
  data,
  onPress,
  cancelText,
  marginBottom,
  width = "100%",
  style,
  value,
  disabled,
  multiselect,
  onPressMultiSelect,
  selectedData,
  noBorders,
  placeholderOptions,
  titleOptions,
}: IModalSelectorProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<IData>();
  const [itemToAdd, setItemToAdd] = useState({ key: "", label: "" });
  const [modalData, setModalData] = useState(data);
  const [multiSelectedItems, setMultiSelectedItems] = useState<
    Record<string, any>
  >({});

  const handleMultiSelect = useCallback(
    (item: IData) => {
      setMultiSelectedItems((prev) => {
        const id: string = item.key.toString();
        const { [id]: _, ...rest } = prev;

        return prev[id]
          ? rest
          : {
              ...prev,
              [item.key]: item,
            };
      });
    },
    [multiSelectedItems]
  );

  const onSelectMultiple = () => {
    onPressMultiSelect?.(
      Object.values(multiSelectedItems).map((item) => ({
        key: item.key,
        label: item.label,
        id: item.id,
      }))
    );
    setOpen(false);
  };

  useEffect(() => {
    const transformedData = data.map((item) => ({
      ...item,
      component: (
        <TouchableOpacity
          style={[
            SharedStyles.rowCenter,
            styles.text,
            multiselect ? styles.multiselect : undefined,
          ]}
          onPress={() => {
            handleMultiSelect(item);
          }}
        >
          <Text
            text={item.label}
            center
            marginBottom={2}
            color="primary"
            marginRight={10}
          />
          {Object.keys(multiSelectedItems).includes(item.key?.toString()) ? (
            <Icon
              name="check"
              type="antdesign"
              size={20}
              color={Colors.primary}
            />
          ) : undefined}
        </TouchableOpacity>
      ),
    }));

    const addSelectedItem = multiselect
      ? [
          {
            key: "selected",
            label: "selected",
            component: (
              <View style={styles.selectContainer}>
                <TouchableOpacity
                  style={[
                    SharedStyles.rowCenter,
                    styles.text,
                    styles.multiselect,
                  ]}
                  onPress={onSelectMultiple}
                >
                  <Text text={"ok"} center marginBottom={0} color="primary" />
                </TouchableOpacity>
              </View>
            ),
          },
        ]
      : [];

    const modalData = multiselect
      ? [...transformedData, ...addSelectedItem]
      : data;

    setModalData(modalData);

    return () => {};
  }, [multiselect, data, itemToAdd, multiSelectedItems, multiselect]);

  useEffect(() => {
    if (value) {
      const selected = data.find(
        (item) =>
          item.key.toString().toLowerCase() === value.toLowerCase() ||
          item.label === value
      );

      setSelectedValue(selected);
    }
    if (selectedData?.length) {
      setMultiSelectedItems(convertArrayToObject(selectedData, "id"));
    }

    return () => {};
  }, [value, selectedData, data]);

  const getModalData = useCallback(() => {
    if (multiselect) {
      const [, ...rest] = modalData;

      return makeArrayUnique([...rest], "key");
    } else {
      return modalData;
    }
  }, [multiselect, modalData]);
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { marginBottom },
        { width },
        noBorders ? styles.noBorders : undefined,
        style,
      ]}
      onPress={
        !disabled
          ? () => {
              if (multiselect) {
                setModalData([...data]);
                setItemToAdd({ key: "", label: "" });
              }
              setOpen(true);
            }
          : undefined
      }
    >
      {placeholder ? (
        <Text
          text={placeholder}
          color="grey800"
          variant="small"
          marginBottom={5}
          {...placeholderOptions}
        />
      ) : undefined}
      <View style={SharedStyles.rowBetweenStart}>
        {multiselect ? (
          <View style={[SharedStyles.rowWrap, styles.itemContainer]}>
            {Object.values(multiSelectedItems).map((item) => (
              <View key={item.key} style={[styles.selectedItem]}>
                <Text
                  text={item.label}
                  center
                  marginBottom={2}
                  marginRight={2}
                  color="primary"
                  variant="small"
                />
              </View>
            ))}
          </View>
        ) : (
          <Text
            text={selectedValue?.label}
            variant="small"
            marginBottom={5}
            {...titleOptions}
          />
        )}
        {!disabled ? (
          <Icon
            name="keyboard-arrow-down"
            type="material"
            size={noBorders ? 24 : 20}
          />
        ) : undefined}
      </View>
      <RNModalSelector
        disabled={disabled}
        data={getModalData()}
        overlayStyle={styles.overlay}
        style={styles.modal}
        initValue={placeholder}
        onChange={(selected) => {
          if (!multiselect) {
            setSelectedValue(selected);
            onPress?.(selected);
          }
        }}
        closeOnChange={!multiselect}
        keyExtractor={(item) => item.key}
        labelExtractor={(item) => item.label}
        visible={open}
        onModalClose={() => {
          setOpen(false);
        }}
        cancelStyle={styles.containerStyle}
        cancelTextStyle={styles.cancel}
        cancelText={cancelText || t("cancel").toLowerCase()}
        optionStyle={styles.containerStyle}
        optionContainerStyle={styles.containerStyle}
        optionTextStyle={styles.textStyle}
        selectStyle={styles.selectStyle}
        initialNumToRender={10}
      />
    </TouchableOpacity>
  );
};

export default ModalSelector;

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.borderGrey,
    borderWidth: 1,
    padding: 5,
    paddingLeft: 10,
    borderRadius: 10,
  },
  noBorders: {
    borderWidth: 0,
  },
  modal: {
    height: 0,
    borderWidth: 0,
  },
  selectStyle: {
    display: "none",
  },
  textStyle: {
   fontFamily: "regular",
    color: Colors.primary,
  },
  containerStyle: {
    backgroundColor: Colors.white,
    borderBottomColor: Colors.grey200 + "10",
    paddingHorizontal: 0,
  },
  cancel: {
    color: Colors.grey200,
   fontFamily: "regular",
  },
  overlay: {
    backgroundColor: Colors.backdrop,
  },
  addBtn: {
    ...SharedStyles.rowCenter,
    width: "27%",
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 10,
  },
  addInput: {
    marginRight: 5,
    flex: 1,
  },
  addContainer: {
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  selectContainer: {
    borderColor: Colors.primaryLight,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 10,
  },
  multiselectInfo: {
    paddingTop: 5,
    paddingLeft: 4,
  },
  text: {
    paddingHorizontal: 25,
  },
  selectedItem: {
    backgroundColor: Colors.primary + "40",
    borderRadius: 10,
    padding: 2,
    paddingHorizontal: 8,
    marginRight: 5,
    marginTop: 5,
  },
  itemContainer: {
    width: "93%",
    paddingBottom: 3,
  },
  multiselect: {
    width: "100%",
  },
});
