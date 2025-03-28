'use client'

import Editor from "@/components/editor";
import { Button } from "@/components/ui/button";
const page = () => {

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl align-middle font-bold mb-4">Share the knowledege the to the word</h1>
      <input
        type="text" 
        placeholder="Blog Banner URL"
        className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
      />
      <input 
        type="text" 
        placeholder="Blog Title"
        className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
      />
      <textarea
        placeholder="Blog Description"
        className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
        rows={4}
      />
      <input
        type="text"
        placeholder="Blog Category Eg: Technology, Health, etc"
        className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
      />
 
      <Editor />

      <Button className="bg-black text-white rounded-lg p-2 mt-4">
        Publish Blog
      </Button>
      <Button className="bg-black text-white rounded-lg p-2 mt-4 ml-4">
        Save as Draft
      </Button>
      <Button className="bg-black text-white rounded-lg p-2 mt-4 ml-4">
        Preview
      </Button>
    </div>
  );
}
export default page;