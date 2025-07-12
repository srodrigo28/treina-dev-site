// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Adicione este novo objeto de configuração para sobrescrever a regra
  {
    files: ["**/*.ts", "**/*.tsx"], // Aplica a regra somente a arquivos TypeScript
    rules: {
      // 1. Desativa a regra padrão do ESLint que está causando o erro
      "no-unused-expressions": "off",
      // 2. Habilita a regra do TypeScript com as opções que a tornam mais flexível
      "@typescript-eslint/no-unused-expressions": ["error", { "allowShortCircuit": true, "allowTernary": true }],
    },
  },
];

export default eslintConfig;