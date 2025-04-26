import { useState, useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FORMAT_TEXT_COMMAND, FORMAT_ELEMENT_COMMAND, $getSelection, $isRangeSelection } from 'lexical';
import { $createTextNode, TextNode } from 'lexical';
import { $createLinkNode } from '@lexical/link';

const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [selectionFormat, setSelectionFormat] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    link: false,
    fontSize: '16px',
    fontFamily: 'Arial',
  });
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          try {
            setSelectionFormat({
              bold: selection.hasFormat('bold'),
              italic: selection.hasFormat('italic'),
              underline: selection.hasFormat('underline'),
              strikethrough: selection.hasFormat('strikethrough'),
              link: selection.hasFormat('link'),
              fontSize: selection.getStyle()?.fontSize || '16px',
              fontFamily: selection.getStyle()?.fontFamily || 'Arial',
            });
          } catch (e) {
            console.error("Error getting selection style:", e);
          }
        }
      });
    });
  }, [editor]);

  const formatText = (type) => editor.dispatchCommand(FORMAT_TEXT_COMMAND, type);
  const formatAlign = (type) => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, type);

  const applyColor = (color) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const nodes = selection.getNodes();
  
        nodes.forEach((node) => {
          if (node instanceof TextNode) {
            const isSelectedEntirely =
              selection.anchor.offset === 0 && selection.focus.offset === node.getTextContentSize();
  
            if (isSelectedEntirely) {
              node.setStyle(`color: ${color}`);
            } else {
              const text = node.getTextContent();
              const [start, end] = [
                Math.min(selection.anchor.offset, selection.focus.offset),
                Math.max(selection.anchor.offset, selection.focus.offset),
              ];
  
              const before = $createTextNode(text.slice(0, start));
              const selected = $createTextNode(text.slice(start, end));
              selected.setStyle(`color: ${color}`);
              const after = $createTextNode(text.slice(end));
  
              node.replace(before);
              before.insertAfter(selected);
              selected.insertAfter(after);
            }
          }
        });
      }
    });
  };

  const applyBackgroundColor = (color) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const nodes = selection.getNodes();
  
        nodes.forEach((node) => {
          if (node instanceof TextNode) {
            const isSelectedEntirely =
              selection.anchor.offset === 0 && selection.focus.offset === node.getTextContentSize();
  
            if (isSelectedEntirely) {
              node.setStyle(`background-color: ${color}`);
            } else {
              const text = node.getTextContent();
              const [start, end] = [
                Math.min(selection.anchor.offset, selection.focus.offset),
                Math.max(selection.anchor.offset, selection.focus.offset),
              ];
  
              const before = $createTextNode(text.slice(0, start));
              const selected = $createTextNode(text.slice(start, end));
              selected.setStyle(`background-color: ${color}`);
              const after = $createTextNode(text.slice(end));
  
              node.replace(before);
              before.insertAfter(selected);
              selected.insertAfter(after);
            }
          }
        });
      }
    });
  };

  const applyFontSize = (fontSize) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const nodes = selection.getNodes();
  
        nodes.forEach((node) => {
          if (node instanceof TextNode) {
            const isSelectedEntirely =
              selection.anchor.offset === 0 && selection.focus.offset === node.getTextContentSize();
  
            if (isSelectedEntirely) {
              node.setStyle(`font-size: ${fontSize}`);
            } else {
              const text = node.getTextContent();
              const [start, end] = [
                Math.min(selection.anchor.offset, selection.focus.offset),
                Math.max(selection.anchor.offset, selection.focus.offset),
              ];
  
              const before = $createTextNode(text.slice(0, start));
              const selected = $createTextNode(text.slice(start, end));
              selected.setStyle(`font-size: ${fontSize}`);
              const after = $createTextNode(text.slice(end));
  
              node.replace(before);
              before.insertAfter(selected);
              selected.insertAfter(after);
            }
          }
        });
      }
    });
  };

  const applyFontFamily = (fontFamily) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const nodes = selection.getNodes();
  
        nodes.forEach((node) => {
          if (node instanceof TextNode) {
            const isSelectedEntirely =
              selection.anchor.offset === 0 && selection.focus.offset === node.getTextContentSize();
  
            if (isSelectedEntirely) {
              node.setStyle(`font-family: ${fontFamily}`);
            } else {
              const text = node.getTextContent();
              const [start, end] = [
                Math.min(selection.anchor.offset, selection.focus.offset),
                Math.max(selection.anchor.offset, selection.focus.offset),
              ];
  
              const before = $createTextNode(text.slice(0, start));
              const selected = $createTextNode(text.slice(start, end));
              selected.setStyle(`font-family: ${fontFamily}`);
              const after = $createTextNode(text.slice(end));
  
              node.replace(before);
              before.insertAfter(selected);
              selected.insertAfter(after);
            }
          }
        });
      }
    });
  };

  const insertLink = () => {
    if (!linkUrl) return;
    
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const linkNode = $createLinkNode(linkUrl);
        selection.insertNodes([linkNode]);
      }
    });
    
    setShowLinkInput(false);
    setLinkUrl('');
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 border text-black border-gray-200 rounded-xl bg-white shadow-sm mb-4">
      {/* Text formatting */}
      <div className="flex flex-wrap gap-1 border-r pr-2 mr-2">
        <button
          type="button"
          onClick={() => formatText('bold')}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-all border ${selectionFormat.bold ? 'bg-blue-100 text-blue-600 border-blue-300' : 'hover:bg-gray-100 border-gray-200'}`}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => formatText('italic')}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-all border ${selectionFormat.italic ? 'bg-blue-100 text-blue-600 border-blue-300' : 'hover:bg-gray-100 border-gray-200'}`}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => formatText('underline')}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-all border ${selectionFormat.underline ? 'bg-blue-100 text-blue-600 border-blue-300' : 'hover:bg-gray-100 border-gray-200'}`}
        >
          U
        </button>
        <button
          type="button"
          onClick={() => formatText('strikethrough')}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-all border ${selectionFormat.strikethrough ? 'bg-blue-100 text-blue-600 border-blue-300' : 'hover:bg-gray-100 border-gray-200'}`}
        >
          S
        </button>
      </div>

      {/* Alignment */}
      <div className="flex flex-wrap gap-1 border-r pr-2 mr-2">
        <button type="button" onClick={() => formatAlign('left')} className="px-3 py-1 rounded-md text-sm hover:bg-gray-100 border border-gray-200">
          ⬅
        </button>
        <button type="button" onClick={() => formatAlign('center')} className="px-3 py-1 rounded-md text-sm hover:bg-gray-100 border border-gray-200">
          ↔
        </button>
        <button type="button" onClick={() => formatAlign('right')} className="px-3 py-1 rounded-md text-sm hover:bg-gray-100 border border-gray-200">
          ➡
        </button>
      </div>

      {/* Font size */}
      <div className="flex flex-wrap gap-1 border-r pr-2 mr-2">
        <input
          type="number"
          placeholder="Font size"
          value={selectionFormat.fontSize.replace('px', '')}
          onChange={(e) => applyFontSize(e.target.value + 'px')}
          className="px-2 py-1 rounded-md text-sm border border-gray-200 bg-white w-20"
        />
      </div>

      {/* Font family */}
      {/* <div className="flex flex-wrap gap-1 border-r pr-2 mr-2">
        <select 
          onChange={(e) => applyFontFamily(e.target.value)}
          className="px-2 py-1 rounded-md text-sm border border-gray-200 bg-white"
          value={selectionFormat.fontFamily}
        >
          <option value="Arial, sans-serif">Arial</option>
          <option value="'Times New Roman', serif">Times New Roman</option>
          <option value="'Courier New', monospace">Courier New</option>
          <option value="Georgia, serif">Georgia</option>
          <option value="Verdana, sans-serif">Verdana</option>
          <option value="'Trebuchet MS', sans-serif">Trebuchet MS</option>
        </select>
      </div> */}

      {/* Colors */}
      <div className="flex flex-wrap gap-1 border-r pr-2 mr-2">
        <div className="flex items-center">
          <span className="mr-1 text-xs">Text:</span>
          <input
            type="color"
            onChange={(e) => applyColor(e.target.value)}
            className="h-7 w-7 rounded-md border-none cursor-pointer"
            title="Text color"
          />
        </div>
        <div className="flex items-center">
          <span className="mr-1 text-xs">BG:</span>
          <input
            type="color"
            onChange={(e) => applyBackgroundColor(e.target.value)}
            className="h-7 w-7 rounded-md border-none cursor-pointer"
            title="Background color"
          />
        </div>
      </div>

      {/* Link */}
      <div className="flex flex-wrap gap-1">
        {showLinkInput ? (
          <div className="flex items-center">
            <input
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="Enter URL"
              className="px-2 py-1 rounded-l-md text-sm border border-gray-200"
            />
            <button
              type="button"
              onClick={insertLink}
              className="px-2 py-1 rounded-r-md text-sm bg-blue-500 text-white border border-blue-500"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setShowLinkInput(false)}
              className="px-2 py-1 ml-1 rounded-md text-sm bg-gray-300 text-gray-700"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowLinkInput(true)}
            className={`px-3 py-1 rounded-md text-sm border ${selectionFormat.link ? 'bg-blue-100 text-blue-600 border-blue-300' : 'hover:bg-gray-100 border-gray-200'}`}
          >
            🔗
          </button>
        )}
      </div>
    </div>
  );
};

export default ToolbarPlugin;
