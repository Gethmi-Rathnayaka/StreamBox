/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

// Primary palette (coral-red) provided by the user
const coralRed = {
  "50": "#fef2f2",
  "100": "#ffe1e2",
  "200": "#ffc8c9",
  "300": "#ffa2a4",
  "400": "#fd6c6f",
  "500": "#f6474b",
  "600": "#e31f23",
  "700": "#bf161a",
  "800": "#9e1619",
  "900": "#83191b",
  "950": "#470809",
};

// Grayscale used for secondary roles (icons, borders, backgrounds)
const grayScale = {
  "50": "#f9fafb",
  "100": "#f3f4f6",
  "200": "#e5e7eb",
  "300": "#d1d5db",
  "400": "#9ca3af",
  "500": "#6b7280",
  "600": "#4b5563",
  "700": "#374151",
  "800": "#1f2937",
  "900": "#111827",
  "950": "#030712",
};

// Expose a couple of convenient primary combos
const primary = {
  main: coralRed["500"],
  variant: coralRed["600"],
  contrastText: "#ffffff",
};

export const Colors = {
  light: {
    text: "#111827",
    background: "#ffffff",
    // primary/tint uses coral-red
    tint: primary.main,
    primary: primary.main,
    primaryVariant: primary.variant,
    onPrimary: primary.contrastText,
    // use grayscale for secondary/neutral roles
    secondary: grayScale["500"],
    onSecondary: grayScale["50"],
    icon: grayScale["500"],
    tabIconDefault: grayScale["500"],
    tabIconSelected: primary.variant,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    // use a slightly lighter coral for dark-mode tint for contrast
    tint: coralRed["400"],
    primary: coralRed["400"],
    primaryVariant: coralRed["500"],
    onPrimary: "#000000",
    secondary: grayScale["300"],
    onSecondary: grayScale["950"],
    icon: grayScale["300"],
    tabIconDefault: grayScale["300"],
    tabIconSelected: coralRed["300"],
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
