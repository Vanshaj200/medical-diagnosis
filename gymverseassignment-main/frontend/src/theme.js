import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        bg: "gray.900", // Fallback
        background: "linear-gradient(to bottom right, #374151, #111827, #030712)", // Matches index.css
        color: "white",
      },
    },
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});

export default theme;
