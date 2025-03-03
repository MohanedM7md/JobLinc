export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode:"class",
  theme: {
    extend: {
      colors:{
        CrimsonRed/*(Primary) */:"#D72638",    /* Main buttons, highlights, brand color */
        DarkBurgundy:"#780000",   /* Navbar, headers, strong contrast sections */
        SoftRosewood:"#A52A2A",    /* Secondary buttons, borders, accents */
        LightGray:"#F4F4F4",    /* Backgrounds, cards, subtle UI elements */
        WarmWhite:"#FAFAFA",    /* Main background, clean space */
        CharcoalBlack:"#222222",    /* Main text, high contrast for readability */
        MutedSilver:"#A0A0A0",    /* Secondary text, icons, minor details */
      }
    },
  },
  plugins: [],
};
