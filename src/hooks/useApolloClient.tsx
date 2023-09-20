import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { appEnv } from "configs/env";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IAppState } from "store/interface";
import { byPlatform } from "utils";

export const useApolloClientInstance = (): ApolloClient<any> => {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();
  const systemLanguage = useSelector(
    (state: IAppState) => state.language.systemLanguage
  );
  const token = useSelector((state: IAppState) => state.systemPersist.token);
  const isUserInitialized = useSelector(
    (state: IAppState) => state.systemPersist.isUserInitialized
  );
  useEffect(() => {
    const httpLink = createHttpLink({
      uri: byPlatform({
        ios: appEnv.backendUrl,
        android: "http://192.168.100.16:4000/graphql",
      }),
    });
    console.log({ token });
    const authLink = setContext((_, { headers }) => {
      // get the authentication token from local storage if it exists
      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          "content-type": "application/json",
          "Gwislab-user-locale": systemLanguage,
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    });

    const apolloClient = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });

    console.log(" *********** apollo client created *********** ");

    setClient(apolloClient);

    return () => {};
  }, [token, isUserInitialized]);

  return client as ApolloClient<NormalizedCacheObject>;
};

//+237680353245
