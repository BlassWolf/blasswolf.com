import sass from "sass";
import path from "path";

export default (styles?: string) => {
  const main = sass.renderSync({
    file: path.resolve(__dirname, "index.scss"),

    sourceMap: false,
  });
  const extra = styles && sass.renderSync({ data: styles, sourceMap: false });
  return main.css.toString() + (extra?.css.toString() ?? "");
};
