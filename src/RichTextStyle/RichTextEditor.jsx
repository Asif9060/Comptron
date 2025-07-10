import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold } from "@tiptap/extension-bold";
import { Italic } from "@tiptap/extension-italic";
import { Underline } from "@tiptap/extension-underline";
import { Strike } from "@tiptap/extension-strike";
import { Heading } from "@tiptap/extension-heading";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import { FontFamily } from "@tiptap/extension-font-family";
import { Link } from "@tiptap/extension-link";
import { BulletList } from "@tiptap/extension-bullet-list";
import { OrderedList } from "@tiptap/extension-ordered-list";
import { CodeBlock } from "@tiptap/extension-code-block";
import { Blockquote } from "@tiptap/extension-blockquote";
import { TextAlign } from "@tiptap/extension-text-align";
import { Placeholder } from "@tiptap/extension-placeholder";
import PropTypes from "prop-types";
import "./RichTextEditor.css";

// Custom Font Size Extension
const FontSize = TextStyle.extend({
   addAttributes() {
      return {
         ...this.parent?.(),
         fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize,
            renderHTML: (attributes) => {
               if (!attributes.fontSize) {
                  return {};
               }
               return {
                  style: `font-size: ${attributes.fontSize}`,
               };
            },
         },
      };
   },
   addCommands() {
      return {
         ...this.parent?.(),
         setFontSize:
            (fontSize) =>
            ({ commands }) => {
               return commands.setMark(this.name, { fontSize });
            },
         unsetFontSize:
            () =>
            ({ commands }) => {
               return commands.setMark(this.name, { fontSize: null });
            },
      };
   },
});

// Lightweight SVG icons
const icons = {
   bold: (
      <svg
         width="20"
         height="20"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2">
         <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
         <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
      </svg>
   ),
   italic: (
      <svg
         width="20"
         height="20"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2">
         <line x1="19" y1="4" x2="10" y2="4" />
         <line x1="14" y1="20" x2="5" y2="20" />
         <line x1="15" y1="4" x2="9" y2="20" />
      </svg>
   ),
   underline: (
      <svg
         width="20"
         height="20"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2">
         <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" />
         <line x1="4" y1="21" x2="20" y2="21" />
      </svg>
   ),
   strikethrough: (
      <svg
         width="20"
         height="20"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2">
         <path d="M16 4H9a3 3 0 0 0-2.83 4" />
         <path d="M14 12a4 4 0 0 1 0 8H6" />
         <line x1="4" y1="12" x2="20" y2="12" />
      </svg>
   ),
   h1: (
      <svg
         width="20"
         height="20"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2">
         {/* H shape */}
         <path d="M4 6v12M4 12h8M12 6v12" />
         {/* Number 1 */}
         <path
            d="M18 6l-2 0M18 6v12M16 18h4"
            strokeLinecap="round"
            strokeLinejoin="round"
         />
      </svg>
   ),
   h2: (
      <svg
         width="20"
         height="20"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2">
         {/* H shape */}
         <path d="M4 6v12M4 12h8M12 6v12" />
         {/* Number 2 */}
         <path
            d="M16 9c0-1.1.9-2 2-2s2 .9 2 2c0 .8-.4 1.5-1 1.9L16 15h4"
            strokeLinecap="round"
            strokeLinejoin="round"
         />
      </svg>
   ),
   alignLeft: (
      <svg
         width="20"
         height="20"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2">
         <line x1="17" y1="10" x2="3" y2="10" />
         <line x1="21" y1="6" x2="3" y2="6" />
         <line x1="21" y1="14" x2="3" y2="14" />
         <line x1="17" y1="18" x2="3" y2="18" />
      </svg>
   ),
   alignCenter: (
      <svg
         width="20"
         height="20"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2">
         <line x1="18" y1="10" x2="6" y2="10" />
         <line x1="21" y1="6" x2="3" y2="6" />
         <line x1="21" y1="14" x2="3" y2="14" />
         <line x1="18" y1="18" x2="6" y2="18" />
      </svg>
   ),
   alignRight: (
      <svg
         width="20"
         height="20"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2">
         <line x1="21" y1="10" x2="7" y2="10" />
         <line x1="21" y1="6" x2="3" y2="6" />
         <line x1="21" y1="14" x2="3" y2="14" />
         <line x1="21" y1="18" x2="7" y2="18" />
      </svg>
   ),
   list: (
      <svg
         width="20"
         height="20"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2">
         <line x1="8" y1="6" x2="21" y2="6" />
         <line x1="8" y1="12" x2="21" y2="12" />
         <line x1="8" y1="18" x2="21" y2="18" />
         <line x1="3" y1="6" x2="3.01" y2="6" />
         <line x1="3" y1="12" x2="3.01" y2="12" />
         <line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
   ),
   listNumbers: (
      <svg
         width="20"
         height="20"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2">
         <line x1="10" y1="6" x2="21" y2="6" />
         <line x1="10" y1="12" x2="21" y2="12" />
         <line x1="10" y1="18" x2="21" y2="18" />
         <path d="M4 6h1v4" />
         <path d="M4 10h2" />
         <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
      </svg>
   ),
   code: (
      <svg
         width="20"
         height="20"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2">
         <polyline points="16,18 22,12 16,6" />
         <polyline points="8,6 2,12 8,18" />
      </svg>
   ),
   quote: (
      <svg
         width="20"
         height="20"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2">
         <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
         <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
      </svg>
   ),
   link: (
      <svg
         width="20"
         height="20"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2">
         <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
         <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
   ),
   unlink: (
      <svg
         width="20"
         height="20"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2">
         <path d="M18.84 12.25l1.72-1.71a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
         <path d="M5.17 11.75l-1.72 1.71a5 5 0 0 0 7.07 7.07l1.72-1.71" />
         <line x1="8" y1="2" x2="8" y2="5" />
         <line x1="2" y1="8" x2="5" y2="8" />
         <line x1="16" y1="19" x2="16" y2="22" />
         <line x1="19" y1="16" x2="22" y2="16" />
      </svg>
   ),
   fontFamily: (
      <svg
         width="20"
         height="20"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2">
         <path d="M4 20V4h16v16" />
         <path d="M8 12h8" />
         <path d="M8 8h8" />
         <path d="M8 16h5" />
      </svg>
   ),
   fontSize: (
      <svg
         width="20"
         height="20"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2">
         <path d="M7 4V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2" />
         <path d="M5 4h14l-1 7H6l-1-7z" />
         <path d="M12 11v10" />
         <path d="M8 21h8" />
      </svg>
   ),
};

export const MenuBar = ({ editor }) => {
   if (!editor) {
      return null;
   }

   const commonButtonClasses =
      "flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 text-sm font-medium hover:scale-105 active:scale-95";
   const activeClasses =
      "bg-blue-500 text-white shadow-lg shadow-blue-500/25 ring-2 ring-blue-200";
   const inactiveClasses =
      "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-gray-200 shadow-sm";

   return (
      <div className="flex flex-wrap gap-1.5 p-3 bg-gradient-to-r from-gray-50 to-white rounded-t-xl border border-gray-200 border-b-0 shadow-sm">
         {/* Text Formatting Group */}
         <div className="flex gap-1 p-1 bg-gray-100/50 rounded-lg">
            <button
               type="button"
               onClick={() => editor.chain().focus().toggleBold().run()}
               className={`${commonButtonClasses} ${
                  editor.isActive("bold") ? activeClasses : inactiveClasses
               }`}
               title="Bold (Ctrl+B)">
               {icons.bold}
            </button>
            <button
               type="button"
               onClick={() => editor.chain().focus().toggleItalic().run()}
               className={`${commonButtonClasses} ${
                  editor.isActive("italic") ? activeClasses : inactiveClasses
               }`}
               title="Italic (Ctrl+I)">
               {icons.italic}
            </button>
            <button
               type="button"
               onClick={() => editor.chain().focus().toggleUnderline().run()}
               className={`${commonButtonClasses} ${
                  editor.isActive("underline") ? activeClasses : inactiveClasses
               }`}
               title="Underline (Ctrl+U)">
               {icons.underline}
            </button>
            <button
               type="button"
               onClick={() => editor.chain().focus().toggleStrike().run()}
               className={`${commonButtonClasses} ${
                  editor.isActive("strike") ? activeClasses : inactiveClasses
               }`}
               title="Strikethrough">
               {icons.strikethrough}
            </button>
         </div>

         {/* Color Picker */}
         <div className="flex items-center p-1 bg-gray-100/50 rounded-lg">
            <div className="relative group">
               <input
                  type="color"
                  onInput={(event) =>
                     editor.chain().focus().setColor(event.target.value).run()
                  }
                  value={editor.getAttributes("textStyle").color || "#000000"}
                  className="w-9 h-9 rounded-lg border-2 border-gray-200 cursor-pointer hover:border-gray-300 transition-colors"
                  title="Text Color"
               />
               <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  Text Color
               </div>
            </div>
         </div>

         {/* Font Family and Size */}
         <div className="flex gap-1 p-1 bg-gray-100/50 rounded-lg">
            <div className="relative group">
               <select
                  onChange={(event) =>
                     editor.chain().focus().setFontFamily(event.target.value).run()
                  }
                  value={editor.getAttributes("textStyle").fontFamily || ""}
                  className="w-32 h-9 rounded-lg border-2 border-gray-200 cursor-pointer hover:border-gray-300 transition-colors text-sm bg-white px-2"
                  title="Font Family">
                  <option value="">Default</option>
                  <option value="Arial, sans-serif">Arial</option>
                  <option value="Georgia, serif">Georgia</option>
                  <option value="'Times New Roman', serif">Times</option>
                  <option value="'Courier New', monospace">Courier</option>
                  <option value="Helvetica, sans-serif">Helvetica</option>
                  <option value="Verdana, sans-serif">Verdana</option>
                  <option value="'Comic Sans MS', cursive">Comic Sans</option>
                  <option value="Impact, sans-serif">Impact</option>
               </select>
            </div>
            <div className="relative group">
               <select
                  onChange={(event) =>
                     editor.chain().focus().setFontSize(event.target.value).run()
                  }
                  value={editor.getAttributes("textStyle").fontSize || ""}
                  className="w-20 h-9 rounded-lg border-2 border-gray-200 cursor-pointer hover:border-gray-300 transition-colors text-sm bg-white px-2"
                  title="Font Size">
                  <option value="">Default</option>
                  <option value="10px">10px</option>
                  <option value="12px">12px</option>
                  <option value="14px">14px</option>
                  <option value="16px">16px</option>
                  <option value="18px">18px</option>
                  <option value="20px">20px</option>
                  <option value="24px">24px</option>
                  <option value="28px">28px</option>
                  <option value="32px">32px</option>
                  <option value="36px">36px</option>
                  <option value="48px">48px</option>
               </select>
            </div>
         </div>

         {/* Headings Group */}
         <div className="flex gap-1 p-1 bg-gray-100/50 rounded-lg">
            <button
               type="button"
               onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
               className={`${commonButtonClasses} ${
                  editor.isActive("heading", { level: 1 })
                     ? activeClasses
                     : inactiveClasses
               }`}
               title="Heading 1">
               {icons.h1}
            </button>
            <button
               type="button"
               onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
               className={`${commonButtonClasses} ${
                  editor.isActive("heading", { level: 2 })
                     ? activeClasses
                     : inactiveClasses
               }`}
               title="Heading 2">
               {icons.h2}
            </button>
         </div>

         {/* Alignment Group */}
         <div className="flex gap-1 p-1 bg-gray-100/50 rounded-lg">
            <button
               type="button"
               onClick={() => editor.chain().focus().setTextAlign("left").run()}
               className={`${commonButtonClasses} ${
                  editor.isActive({ textAlign: "left" }) ? activeClasses : inactiveClasses
               }`}
               title="Align Left">
               {icons.alignLeft}
            </button>
            <button
               type="button"
               onClick={() => editor.chain().focus().setTextAlign("center").run()}
               className={`${commonButtonClasses} ${
                  editor.isActive({ textAlign: "center" })
                     ? activeClasses
                     : inactiveClasses
               }`}
               title="Align Center">
               {icons.alignCenter}
            </button>
            <button
               type="button"
               onClick={() => editor.chain().focus().setTextAlign("right").run()}
               className={`${commonButtonClasses} ${
                  editor.isActive({ textAlign: "right" })
                     ? activeClasses
                     : inactiveClasses
               }`}
               title="Align Right">
               {icons.alignRight}
            </button>
         </div>

         {/* Lists Group */}
         <div className="flex gap-1 p-1 bg-gray-100/50 rounded-lg">
            <button
               type="button"
               onClick={() => editor.chain().focus().toggleBulletList().run()}
               className={`${commonButtonClasses} ${
                  editor.isActive("bulletList") ? activeClasses : inactiveClasses
               }`}
               title="Bullet List">
               {icons.list}
            </button>
            <button
               type="button"
               onClick={() => editor.chain().focus().toggleOrderedList().run()}
               className={`${commonButtonClasses} ${
                  editor.isActive("orderedList") ? activeClasses : inactiveClasses
               }`}
               title="Numbered List">
               {icons.listNumbers}
            </button>
         </div>

         {/* Special Elements Group */}
         <div className="flex gap-1 p-1 bg-gray-100/50 rounded-lg">
            <button
               type="button"
               onClick={() => editor.chain().focus().toggleCodeBlock().run()}
               className={`${commonButtonClasses} ${
                  editor.isActive("codeBlock") ? activeClasses : inactiveClasses
               }`}
               title="Code Block">
               {icons.code}
            </button>
            <button
               type="button"
               onClick={() => editor.chain().focus().toggleBlockquote().run()}
               className={`${commonButtonClasses} ${
                  editor.isActive("blockquote") ? activeClasses : inactiveClasses
               }`}
               title="Quote">
               {icons.quote}
            </button>
         </div>

         {/* Link Group */}
         <div className="flex gap-1 p-1 bg-gray-100/50 rounded-lg">
            <button
               type="button"
               onClick={() => {
                  const url = window.prompt("🔗 Enter URL:", "https://");
                  if (url && url !== "https://") {
                     editor.chain().focus().setLink({ href: url }).run();
                  }
               }}
               className={`${commonButtonClasses} ${
                  editor.isActive("link") ? activeClasses : inactiveClasses
               }`}
               title="Insert Link (Ctrl+K)">
               {icons.link}
            </button>
            <button
               type="button"
               onClick={() => editor.chain().focus().unsetLink().run()}
               className={`${commonButtonClasses} ${inactiveClasses}`}
               title="Remove Link"
               disabled={!editor.isActive("link")}>
               {icons.unlink}
            </button>
         </div>
      </div>
   );
};

MenuBar.propTypes = {
   editor: PropTypes.object,
};

const RichTextEditor = ({
   initialContent,
   onContentChange,
   contentClassName,
   minHeight = "200px",
}) => {
   const editor = useEditor({
      extensions: [
         StarterKit,
         Bold,
         Italic,
         Underline,
         Strike,
         Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
         Color,
         TextStyle,
         FontSize,
         FontFamily,
         Link.configure({ openOnClick: false }),
         BulletList,
         OrderedList,
         CodeBlock,
         Blockquote,
         TextAlign.configure({
            types: ["heading", "paragraph"],
         }),
         Placeholder.configure({
            placeholder: "Start writing your content here...",
            emptyEditorClass: "is-editor-empty",
         }),
      ],
      content: initialContent,
      onUpdate: ({ editor }) => {
         onContentChange(editor.getHTML());
      },
   });

   useEffect(() => {
      if (editor && initialContent !== editor.getHTML()) {
         editor.commands.setContent(initialContent || "", false);
      }
   }, [initialContent, editor]);

   return (
      <div className="editor-container bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
         <MenuBar editor={editor} />
         <EditorContent
            editor={editor}
            className={`prose prose-slate max-w-none p-8 bg-white focus-within:bg-gray-50/30 transition-colors duration-200 text-base ${
               contentClassName || ""
            }`}
            style={{ minHeight }}
         />
      </div>
   );
};

export default RichTextEditor;

RichTextEditor.propTypes = {
   initialContent: PropTypes.string,
   onContentChange: PropTypes.func.isRequired,
   contentClassName: PropTypes.string,
   minHeight: PropTypes.string,
};
