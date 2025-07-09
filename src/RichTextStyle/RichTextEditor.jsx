import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold } from "@tiptap/extension-bold";
import { Italic } from "@tiptap/extension-italic";
import { Underline } from "@tiptap/extension-underline";
import { Strike } from "@tiptap/extension-strike";
import { Heading } from "@tiptap/extension-heading";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import { Link } from "@tiptap/extension-link";
import { BulletList } from "@tiptap/extension-bullet-list";
import { OrderedList } from "@tiptap/extension-ordered-list";
import { CodeBlock } from "@tiptap/extension-code-block";
import { Blockquote } from "@tiptap/extension-blockquote";
import { TextAlign } from "@tiptap/extension-text-align";
import { Placeholder } from "@tiptap/extension-placeholder";
import {
   IconBold,
   IconItalic,
   IconUnderline,
   IconStrikethrough,
   IconH1,
   IconH2,
   IconAlignLeft,
   IconAlignCenter,
   IconAlignRight,
   IconList,
   IconListNumbers,
   IconCode,
   IconQuote,
   IconLink,
   IconUnlink,
} from "@tabler/icons-react";
import PropTypes from "prop-types";

export const MenuBar = ({ editor }) => {
   if (!editor) {
      return null;
   }

   const commonButtonClasses =
      "px-3 py-2 rounded-md transition-colors duration-200 text-sm font-medium";
   const activeClasses = "bg-blue-600 text-white shadow-md";
   const inactiveClasses = "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white";

   return (
      <div className="flex flex-wrap gap-2 p-2 bg-gray-800 rounded-t-lg border-b border-gray-700 toolbar">
         <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`${commonButtonClasses} ${
               editor.isActive("bold") ? activeClasses : inactiveClasses
            }`}
            title="Bold">
            <IconBold size={20} />
         </button>
         <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`${commonButtonClasses} ${
               editor.isActive("italic") ? activeClasses : inactiveClasses
            }`}
            title="Italic">
            <IconItalic size={20} />
         </button>
         <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`${commonButtonClasses} ${
               editor.isActive("underline") ? activeClasses : inactiveClasses
            }`}
            title="Underline">
            <IconUnderline size={20} />
         </button>
         <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`${commonButtonClasses} ${
               editor.isActive("strike") ? activeClasses : inactiveClasses
            }`}
            title="Strikethrough">
            <IconStrikethrough size={20} />
         </button>
         <input
            type="color"
            onInput={(event) => editor.chain().focus().setColor(event.target.value).run()}
            value={editor.getAttributes("textStyle").color || "#000000"}
            className="w-8 h-8 rounded-md border-none p-0 cursor-pointer"
            title="Text Color"
            style={{ minWidth: 32 }}
         />
         <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`${commonButtonClasses} ${
               editor.isActive("heading", { level: 1 }) ? activeClasses : inactiveClasses
            }`}
            title="Heading 1">
            <IconH1 size={20} />
         </button>
         <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`${commonButtonClasses} ${
               editor.isActive("heading", { level: 2 }) ? activeClasses : inactiveClasses
            }`}
            title="Heading 2">
            <IconH2 size={20} />
         </button>
         <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={`${commonButtonClasses} ${
               editor.isActive({ textAlign: "left" }) ? activeClasses : inactiveClasses
            }`}
            title="Align Left">
            <IconAlignLeft size={20} />
         </button>
         <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={`${commonButtonClasses} ${
               editor.isActive({ textAlign: "center" }) ? activeClasses : inactiveClasses
            }`}
            title="Align Center">
            <IconAlignCenter size={20} />
         </button>
         <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={`${commonButtonClasses} ${
               editor.isActive({ textAlign: "right" }) ? activeClasses : inactiveClasses
            }`}
            title="Align Right">
            <IconAlignRight size={20} />
         </button>
         <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`${commonButtonClasses} ${
               editor.isActive("bulletList") ? activeClasses : inactiveClasses
            }`}
            title="Bullet List">
            <IconList size={20} />
         </button>
         <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`${commonButtonClasses} ${
               editor.isActive("orderedList") ? activeClasses : inactiveClasses
            }`}
            title="Ordered List">
            <IconListNumbers size={20} />
         </button>
         <button
            type="button"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`${commonButtonClasses} ${
               editor.isActive("codeBlock") ? activeClasses : inactiveClasses
            }`}
            title="Code Block">
            <IconCode size={20} />
         </button>
         <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`${commonButtonClasses} ${
               editor.isActive("blockquote") ? activeClasses : inactiveClasses
            }`}
            title="Blockquote">
            <IconQuote size={20} />
         </button>
         <button
            type="button"
            onClick={() => {
               const url = prompt("Enter URL:");
               if (url) {
                  editor.chain().focus().setLink({ href: url }).run();
               }
            }}
            className={`${commonButtonClasses} ${
               editor.isActive("link") ? activeClasses : inactiveClasses
            }`}
            title="Link">
            <IconLink size={20} />
         </button>
         <button
            type="button"
            onClick={() => editor.chain().focus().unsetLink().run()}
            className={`${commonButtonClasses} ${inactiveClasses}`}
            title="Unlink">
            <IconUnlink size={20} />
         </button>
      </div>
   );
};

MenuBar.propTypes = {
   editor: PropTypes.object,
};

const RichTextEditor = ({ initialContent, onContentChange, contentClassName }) => {
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
         Link.configure({ openOnClick: false }),
         BulletList,
         OrderedList,
         CodeBlock,
         Blockquote,
         TextAlign.configure({
            types: ["heading", "paragraph"],
         }),
         Placeholder.configure({
            placeholder: "Type here...",
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
      <div className="editor-container rounded-b-lg overflow-hidden">
         <MenuBar editor={editor} />
         <EditorContent
            editor={editor}
            className={`prose prose-invert max-w-none p-4 min-h-[50px]  ${
               contentClassName || "bg-gray-800 text-black"
            }`}
         />
      </div>
   );
};

export default RichTextEditor;
