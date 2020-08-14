import {
  createSourceFile,
  createProgram,
  ScriptTarget,
  CompilerHost,
  ModuleKind,
} from "typescript";

export default function transpile(
  files: Map<string, { content: string; type: string }>,
  entry: string,
) {
  const output = new Map<string, { content: string; type: string }>();
  const getSourceFile = (filename: string) => {
    return createSourceFile(
      filename,
      files.get(filename)?.content ?? "",
      ScriptTarget.ES5,
    );
  };

  // Create a compilerHost object to allow the compiler to read and write files
  const compilerHost: CompilerHost = {
    getSourceFile,
    writeFile: (name, text) => {
      output.set(
        name,
        {
          content: text,
          type: name.endsWith(".map") ? "application/json" : "text/javascript",
        },
      );
    },
    getDefaultLibFileName: () => "lib.d.ts",
    useCaseSensitiveFileNames: () => false,
    getCanonicalFileName: (fileName) => fileName,
    getCurrentDirectory: () => "",
    getNewLine: () => "\n",
    fileExists: (fileName): boolean => files.has(fileName),
    readFile: (fileName) => files.get(fileName)?.content ?? "",
    directoryExists: () => true,
    getDirectories: () => [],
  };

  const program = createProgram(
    [entry],
    { module: ModuleKind.AMD, outFile: "bundle.js" },
    compilerHost,
  );
  program.emit();
  return output;
}
