import { useState, useEffect } from "react";
import axios from "axios";
import { resolveError } from "../../components/utils";

const useSymbols = () => {
  const [symbols, setSymbols] = useState<string[]>([]);
  const [isErrored, setIsErrored] = useState(false);

  useEffect(() => {
    if (!symbols.length && !isErrored) {
      axios
        .get("https://ce-test-api.fly.dev/api/tickers/", {
          headers: { "api-token": "1337-time" },
        })
        .then((response) => setSymbols(response.data))
        .catch((error) => {
          resolveError(error, setIsErrored);
        });
    }
  }, [isErrored, symbols]);

  return { symbols, isErrored };
};

export default useSymbols;
