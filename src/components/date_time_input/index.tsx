import { useEffect, useState } from "react";
import { Colors, SharedStyles } from "configs";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { IDateTimeInputProps } from "./interface";
import Text from "components/text";
import DatePicker from "react-native-date-picker";
import { useSelector } from "react-redux";
import { formatDate, formatTimeMoment, getMomentDate } from "utils";
import { Icon } from "@rneui/base";

const DateTimeInput = ({
  placeholder,
  mode = "date",
  onPress,
  style,
  timeTextOptions,
  placeholderTextOptions,
  dateTimeContainerStyle,
  value,
  marginBottom,
}: IDateTimeInputProps) => {
  const todayDate = getMomentDate();

  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState(false);
  const { systemLanguage } = useSelector((state: any) => state.language);

  useEffect(() => {
    if (value) {
      setDate(getMomentDate(value));
    }
    return () => {};
  }, [value]);

  return (
    <TouchableOpacity
      style={[
        mode === "time" ? styles.itemTime : styles.container,
        { marginBottom },
        style,
      ]}
      onPress={() => setOpen(true)}
    >
      {mode !== "time" ? (
        <View>
          <Text
            text={placeholder}
            color="grey800"
            variant="small"
            marginBottom={5}
            {...placeholderTextOptions}
          />
          <View style={[styles.dateContainer, dateTimeContainerStyle]}>
            <Text
              text={
                mode === "date"
                  ? date
                    ? formatDate(date)
                    : "dd/mm/yyyy"
                  : date
                  ? formatDate(date) + " - " + formatTimeMoment(date)
                  : "dd/mm/yyyy - hh:mm"
              }
              color={date ? undefined : "grey800"}
              variant="small"
              marginBottom={0}
            />
            <Icon
              name="calendar-alt"
              type="font-awesome-5"
              color={Colors.primary}
              size={20}
            />
          </View>
        </View>
      ) : (
        <View>
          <Text
            text={placeholder}
            variant="small"
            marginBottom={8}
            center
            {...placeholderTextOptions}
          />
          <View style={[styles.time, dateTimeContainerStyle]}>
            <Text
              center
              text={formatTimeMoment(date)}
              marginBottom={0}
              {...timeTextOptions}
            />
          </View>
        </View>
      )}
      <DatePicker
        modal
        mode={mode}
        open={open}
        date={date || todayDate}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
          onPress?.(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        onDateChange={(date) => {
          console.log({ date });
          setDate(date);
          onPress?.(date);
        }}
        title={placeholder}
        confirmText="Ok"
        cancelText="Cancel"
        locale={systemLanguage}
        maximumDate={mode !== "time" ? todayDate : undefined}
      />
    </TouchableOpacity>
  );
};

export default DateTimeInput;

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.borderGrey,
    borderWidth: 1,
    width: "100%",
    padding: 5,
    paddingLeft: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  dateContainer: {
    ...SharedStyles.rowBetweenCenter,
    paddingRight: 5,
    marginBottom: 4,
    width: "100%",
  },
  itemTime: {
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
  time: {
    backgroundColor: Colors.drawerBorder,
    padding: 10,
    width: 75,
    borderRadius: 10,
  },
});
