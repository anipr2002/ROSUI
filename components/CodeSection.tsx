import { themes } from "prism-react-renderer";
import { CodeBlock } from "react-code-block";
import { useCopyToClipboard } from "react-use";
import { Clipboard, Check } from "lucide-react";

interface CodeBlockDemoProps {
  code: string;
  language: string;
}

function CodeSection({ code, language }: CodeBlockDemoProps) {
  const [state, copyToClipboard] = useCopyToClipboard();

  const copyCode = () => {
    copyToClipboard(code);
  };

  return (
    <CodeBlock code={code} language={language} theme={themes.github}>
      <div className="relative">
        <CodeBlock.Code className="bg-white border p-6 rounded-lg shadow">
          <div className="table-row">
            <CodeBlock.LineNumber className="table-cell pr-4 text-xs text-gray-400 text-right select-none" />
            <CodeBlock.LineContent className="table-cell">
              <CodeBlock.Token />
            </CodeBlock.LineContent>
          </div>
        </CodeBlock.Code>

        <button
          className="bg-white rounded-full px-3.5 py-1.5 absolute top-2 right-2 text-sm font-semibold"
          onClick={copyCode}
        >
          {state.value ? (
            <Check className="text-green-500" />
          ) : (
            <Clipboard className="text-gray-400" />
          )}
        </button>
      </div>
    </CodeBlock>
  );
}

export default CodeSection;
