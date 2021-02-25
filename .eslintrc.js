module.exports = {
  root: true,
  "extends": "airbnb",
"parser": "babel-eslint",
"ecmaFeatures":{
  "classes": true
},
"rules":{
  "react/jsx-filename-extensions":["error", {extensions: [".js",".jsx"]}],
  "linebreak-style": ["error", "windows"],
  
},
"env":{
  "browser":true,
}
};
