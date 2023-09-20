import { Redirect } from "expo-router";
import { getRouteName } from "utils";

export default () => {
  const redirectTo = getRouteName();
  console.log("********** ROOT_UNMATCHED **********" + redirectTo);
  return <Redirect href={redirectTo} />;
};
