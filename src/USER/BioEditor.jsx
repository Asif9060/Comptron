
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import ToolbarPlugin from "../utils/ToolbarPlugin";
import "./editorStyles.css"; // optional for custom styles

const BioEditor = () => {
  const initialConfig = {
    namespace: "BioEditor",
    theme: {
      paragraph: "editor-paragraph",
    },
    onError: (error) => {
      throw error;
    },
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="border p-2 rounded-md">
        <ToolbarPlugin />
        <RichTextPlugin
          contentEditable={<ContentEditable  />}
          placeholder={<div>Write your bio here...</div>}
          ErrorBoundary={({ error }) => <div>Error: {error.message}</div>}
        />
        <HistoryPlugin />
      </div>
    </LexicalComposer>
  );
};

export default BioEditor;
