import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineUnderline,
  AiOutlineUnorderedList,
  AiOutlineAlignLeft,
  AiOutlineAlignCenter,
  AiOutlineAlignRight,
  AiOutlineRollback,
  AiOutlineRedo,
} from "react-icons/ai";

type CustomEditorProps = {
  content: any;
  onChange: (content: any) => void;
};

const CustomEditor: React.FC<CustomEditorProps> = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write something...",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Color,
      FontFamily.configure({
        types: ["textStyle"],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
  });

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-gray-200 rounded-lg shadow-lg p-4">
      <div className="mb-2 flex flex-wrap gap-2">
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          aria-label="Bold"
        >
          <AiOutlineBold />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          aria-label="Italic"
        >
          <AiOutlineItalic />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          aria-label="Underline"
        >
          <AiOutlineUnderline />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          aria-label="Bullet List"
        >
          <AiOutlineUnorderedList />
        </button>
        <button
          onClick={() => editor?.chain().focus().setTextAlign("left").run()}
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          aria-label="Align Left"
        >
          <AiOutlineAlignLeft />
        </button>
        <button
          onClick={() => editor?.chain().focus().setTextAlign("center").run()}
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          aria-label="Align Center"
        >
          <AiOutlineAlignCenter />
        </button>
        <button
          onClick={() => editor?.chain().focus().setTextAlign("right").run()}
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          aria-label="Align Right"
        >
          <AiOutlineAlignRight />
        </button>
        <button
          onClick={() => editor?.chain().focus().setColor("#ff0000").run()}
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          aria-label="Text Color Red"
        >
          <span className="text-red-500">Red</span>
        </button>
        <button
          onClick={() => editor?.chain().focus().undo().run()}
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          aria-label="Undo"
        >
          <AiOutlineRollback />
        </button>
        <button
          onClick={() => editor?.chain().focus().redo().run()}
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          aria-label="Redo"
        >
          <AiOutlineRedo />
        </button>
      </div>
      <EditorContent
        editor={editor}
        className="prose lg:prose-xl text-gray-900 mt-4"
      />
    </div>
  );
};

export default CustomEditor;
