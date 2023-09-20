- install yarn

- To convert svg into expo svg use this [link](https://react-svgr.com/playground/?native=true&typescript=true)

```js

  const formik = useFormik({
    initialValues: {
      title: undefined,
      fullName: undefined,
      specialty: undefined,
      email: undefined,
      onmcNumber: undefined,
      consultationLanguages: undefined,
    },
    onSubmit: async (value, { setSubmitting }) => {
      try {
        setSubmitting(true);

        // const result = await createUserAccount({
        //   variables: {
        //     updateUserAccountInput: {
        //       id: user.id,
        //       ...value,
        //       consultationLanguages: convertArrayToObject(
        //         value?.consultationLanguages || [],
        //         "id"
        //       ),
        //     },
        //   },
        // });

        // if (result.errors?.length) {
        //   dispatch(showError(result.errors[0].message));
        // }

        // if (result.data?.updateUserAccount) {
        //   dispatch(setUser(result.data.updateUserAccount));
        //   goToNext();
        // }

goToNext()
        setSubmitting(false);
      } catch (error: any) {
        dispatch(showError(error.message));
        setSubmitting(false);
      }
    },
  });


this is a test consultation not
eat every morning
following these instruction
okay this works fine
note that if this is not working then we might have to fight

testing bold and italic
testing bold italic underline

```



yarn add @apollo/client @gorhom/bottom-sheet @graphql-codegen/cli @graphql-codegen/introspection @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo @react-native-async-storage/async-storage @react-native-community/netinfo @react-navigation/drawer @reduxjs/toolkit @rneui/base @rneui/themed @types/react-native axios expo expo-constants expo-contacts expo-font expo-image expo-image-picker expo-linking expo-localization expo-location expo-router expo-splash-screen expo-status-bar formik graphql i18next libphonenumber-js moment react react-dom react-i18next react-native react-native-date-picker react-native-gesture-handler react-native-modal-selector react-native-phone-input react-native-popup-menu react-native-reanimated react-native-root-siblings react-native-root-toast react-native-safe-area-context react-native-screens react-native-svg react-native-tab-view react-native-vector-icons react-native-web react-native-webview react-redux redux-persist @babel/core @tsconfig/react-native @types/jest @types/react @types/react-test-renderer babel-plugin-module-resolver metro-react-native-babel-preset react-native-svg-transformer tslint-config-prettier tslint-react-native typescript react-native-pager-view 



yarn add --dev @babel/core @tsconfig/react-native @types/jest @types/react @types/react-test-renderer @typescript-eslint/eslint-plugin @typescript-eslint/parser babel-plugin-module-resolver eslint eslint-config-prettier eslint-plugin-import eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-native husky lint-staged metro-react-native-babel-preset prettier react-native-svg-transformer typescript