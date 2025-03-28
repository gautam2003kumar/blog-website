'use client';

import { Button } from "./ui/button";
import { useEffect, useState, useRef } from "react";
import EditorJS, { OutputData, BlockToolConstructable } from "@editorjs/editorjs";

const Editor = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const ref = useRef<EditorJS | null>(null);

  const initializeEditor = async () => {
    if (!ref.current) {
      const Editorjs = (await import("@editorjs/editorjs")).default;
      const Header = (await import("@editorjs/header")).default;
      const List = (await import("@editorjs/list")).default;
      const Table = (await import("@editorjs/table")).default;
      const CodeTool = (await import("@editorjs/code")).default;
      const ImageTool = (await import("@editorjs/image")).default;
      const Quote = (await import("@editorjs/quote")).default;
      const Delimiter = (await import("@editorjs/delimiter")).default;
      ref.current = new Editorjs({
        holder: "editorjs",
        tools: {
            header: {
                class: Header as unknown as BlockToolConstructable,
                inlineToolbar: true,
                config: {
                    placeholder: "Header",
                    levels: [2, 3, 4],
                    defaultLevel: 3
                }
            },
            list: List,
            table: Table,
            code: CodeTool,
            quoate: Quote,
            delimiter: Delimiter,
        },
        data: {} as OutputData,
        placeholder: "Let's write an awesome story!",
        onReady: () => {
          console.log("Editor.js is ready");
        },
      });
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();
    };

    if (isMounted) {
      init();
    }

    return () => {
      if (ref.current) {
        ref.current.destroy();
        ref.current = null;
      }
    };
  }, [isMounted]);

  const save = async () => {
    if (ref.current) {
      try {
        const outputData: OutputData = await ref.current.save();
        console.log("Data saved:", outputData);
      } catch (error) {
        console.error("Saving failed:", error);
      }
    }
  };

  return (
    <div className="prose max-w-full min-h-screen">
      <div id="editorjs" className="border p-4 min-h-[300px]"></div>
    </div>
  );
};

export default Editor;
