module.exports = function (api) {
  api.cache(true);

  if (process.env.NODE_ENV == "test") {
    console.log("test");
    return {
      presets: [
        "@babel/preset-env",
        "@babel/preset-react",
        "@babel/preset-typescript",
      ],
    };
  }

  return {
    presets: [
      [
        "next/babel",
        {
          "preset-env": {},
          "transform-runtime": {},
          "styled-jsx": {},
          "class-properties": {},
        },
      ],
    ],
  };
};
