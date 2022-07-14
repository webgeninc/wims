// prettier-ignore
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.vue"],
  theme: {
    letterSpacing: {
      tighter: "-0.05em",
      tight: "-0.025em",
      normal: "0em",
      wide: ".015em",
      widewide: ".025em",
      wider: ".04em",
      widest: ".07em",
      widetest: ".1em",
    },
    minWidth: {
      80: "20rem",
    },
    screens: {
      "05xl": "1060px",
      "xl": "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
    },
    extend: {
      backgroundImage: {
        system: "url('../assets/systems.svg')",
      },
      spacing: {
        1.2: "0.3rem",
        13: "3.25rem",
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
        76: "19rem",
        78: "19.5rem",
        84: "21rem",
        86: "22rem",
        "1/7": "14.2857%",
        "2/7": "28.571%",
        "2/9": "22.222%",
        "1/6": "16.666667%",
        "18.5%": "18.5%",
        "1/5": "20%",
        110: "28rem",
        120: "40rem",
        "9/10": "90%",
        "98/100": "98%",
        0.75: "3px",
      },
      colors: {
        webgencol: "#39c684",
        fbbackground: "#F2F3F5",
      },
      fontFamily: {
        montserrat: ["Montserrat"],
      },
      fontSize: {
        "2xs": "10px",
        "3xs": "8px",
        "2sm": "13px",
        "2base": "15px",
      },
      animation: {
        "spin-slow": "spin 25s linear infinite",
        "load": "header-on 1.2s linear infinite" ,
        "spin-slow-twice": "spin 1s linear infinite",
        "spin-reverse": "spin-slow-reverse 2s linear infinite",
        "spin-reverse-twice": "spin-slow-reverse-twice 3s linear infinite",
        "header-on": "header-on 1s linear 1",
        "priority": "priority-on 5s ease-in-out infinite",
      },
      keyframes: {
        "priority-on": {
          "0%": { transform: "scale(1) ", opacity: 1},
          "5%": { transform: "scale(1.01)",  opacity: 0.8},
          "10%": { transform: "scale(1.05)",  opacity: 0.4, filter: "blur(2px)"},
          "20%": { transform: "scale(1)", opacity: 1,  filter: "blur(0px)"},
          "100%": { transform: "scale(1)", opacity: 1},
        },
        "header-on": {
          "0%": { opacity: 1 },
          "10%": { opacity: 0 },
          "50%": { opacity: 0 },
          "70%": { opacity: 1 },
          "100%": { opacity: 1 },
        },
        "spin-slow-reverse": {
          "0%": { transform: "translate(-100%)" },
          "50%": { transform: "translate(100%)" },
          "100%": { transform: "translate(-100%)" },
        },
        "spin-slow-reverse-twice": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
      },
      cursor: {
        grab: "grab",
      },
    },
  },
  variants: {
    scrollbar: ["rounded"],
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
};
