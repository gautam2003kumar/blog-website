'use client'

import { useState, useRef } from "react";
import Editor from "@/components/editor";
import { Button } from "@/components/ui/button";
import EditorJS from "@editorjs/editorjs";
import { toast } from "sonner";
import axios from "axios";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectValue, SelectTrigger } from "@/components/ui/select";

import { Category } from "../home/page";
const Page = () => {
  // State to store input data
  const [formData, setFormData] = useState({
    bannerUrl: "",
    title: "",
    description: "",
    category: "",
    status: "draft",
  });

  const editorRef = useRef<EditorJS | null>(null);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save Editor.js data
  const handleSave = async (status: "draft" | "published") => {
    if (!editorRef.current) {
      return toast.error("Editor is not initialized.");
    }

    try {
      const editorData = await editorRef.current.save();

      // Validate fields
      if (!formData.title || !formData.description) {
        return toast.error("Title and Description are required.");
      }

      const blogData = {
        ...formData,
        content: editorData,
        status,
      };

      // API Call
      const response = await axios("/api/blog/create", {
        method: "POST",
        data: JSON.stringify(blogData),
        headers: { "Content-Type": "application/json" },
      });

      const result = response.data;

      if (response.status >= 200 && response.status < 300) {
        toast.success(result.message);
      } else {
        toast.error(result.error || "Failed to create blog.");
      }
    } catch (error) {
      console.error("Error saving blog:", error);
      toast.error("Error while saving the blog.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 ">
      <h1 className="text-2xl font-bold mb-4 justify-center flex ">Share the knowledge with the world</h1>

      <label htmlFor="bannerUrl" className="font-semibold mb-2 block">Blog Banner URL</label>
      <input
        type="text"
        name="bannerUrl"
        value={formData.bannerUrl}
        onChange={handleChange}
        placeholder="Blog Banner URL"
        className="border border-gray-300 rounded-lg p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-gray-600"
      />
      
      <label htmlFor="title" className="font-semibold mb-2 block">Blog Title</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Blog Title"
        className="border border-gray-300 rounded-lg p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-gray-600"
      />
      <label htmlFor="description" className="font-semibold mb-2 block">Blog Description</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Blog Description"
        className="border border-gray-300 rounded-lg p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-gray-600"        rows={4}
      />
      {/*<label htmlFor="category" className="font-semibold mb-2 block">Blog Category</label>
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Blog Category e.g. Technology, Health, etc"
        className="border border-gray-300 rounded-lg p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-gray-600"      
      />*/}

      <label htmlFor="category" className="font-semibold mb-2 block">Blog Category</label>
      <div className="mb-4">
        <Select
          name="category"
          onValueChange={(value) =>
            setFormData({ ...formData, category: value })
          }
        >
          <SelectTrigger className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-600">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              {Category.map((category, index) => (
                <SelectItem key={index} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>




      <label htmlFor="editorjs" className="font-semibold mb-2 block">Write the main content</label>
      <div className="border border-gray-300 rounded-lg p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-gray-600">
        <Editor ref={editorRef} />
      </div>

      {/* Buttons */}
      <div className="justify-center flex">
        <Button onClick={() => handleSave("published")} className="bg-black text-white rounded-lg p-2">
          Publish Blog
        </Button>
        <Button onClick={() => handleSave("draft")} className="bg-black text-white rounded-lg p-2 ml-4">
          Save as Draft
        </Button>
        <Button className="bg-black text-white rounded-lg p-2 ml-4">
          Preview
        </Button>
      </div>
    </div>
  );
};

export default Page;
