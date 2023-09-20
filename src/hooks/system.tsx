import { useEffect } from "react";
import { useSelector } from "react-redux";
import { IAppState } from "store/interface";
import moment from "moment";

export const useInitializeSystemMomentLocale = () => {
  const language = useSelector(
    (state: IAppState) => state.language.systemLanguage
  );
  useEffect(() => {
    switch (language) {
      case "fr":
        require("moment/locale/fr");
        break;

      case "en":
        moment.locale("en");
        break;

      default:
        moment.locale("en");
        break;
    }

    return () => {};
  }, []);
};
