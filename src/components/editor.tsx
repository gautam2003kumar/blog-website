'use client';

import { Button } from "./ui/button";
import { useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react";
import EditorJS, { OutputData, BlockToolConstructable } from "@editorjs/editorjs";

const Editor = forwardRef((props, ref) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const editorInstance = useRef<EditorJS | null>(null);

  const initializeEditor = async () => {
    if (!editorInstance.current) {
      const Editorjs = (await import("@editorjs/editorjs")).default;
      const Header = (await import("@editorjs/header")).default;
      const List = (await import("@editorjs/list")).default;
      const Table = (await import("@editorjs/table")).default;
      const CodeTool = (await import("@editorjs/code")).default;
      const Quote = (await import("@editorjs/quote")).default;
      const Delimiter = (await import("@editorjs/delimiter")).default;

      editorInstance.current = new Editorjs({
        holder: "editorjs",
        tools: {
          header: {
            class: Header as unknown as BlockToolConstructable,
            inlineToolbar: true,
            config: {
              placeholder: "Heading",
              levels: [1, 2, 3, 4],
              defaultLevel: 2,
            },
          },
          list: List,
          table: Table,
          code: CodeTool,
          quote: Quote,
          delimiter: Delimiter,
        },
        data: {} as OutputData,
        onReady: () => {
          console.log("Editor.js is ready");
        },
      });
    }
  };

  // Expose the save function using useImperativeHandle
  useImperativeHandle(ref, () => ({
    save: async () => {
      if (editorInstance.current) {
        try {
          const outputData: OutputData = await editorInstance.current.save();
          console.log("Data saved:", outputData);
          return outputData;
        } catch (error) {
          console.error("Saving failed:", error);
          throw error;
        }
      }
    },
  }));

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
      if (editorInstance.current) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, [isMounted]);

  return (
    <div className="prose max-w-full mx-auto">
      <div id="editorjs"></div>
    </div>
  );
});

Editor.displayName = "Editor";

export default Editor;
