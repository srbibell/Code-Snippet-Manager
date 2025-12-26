"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Tag,
  Code,
  Trash2,
  Copy,
  Check,
  LogOut,
  User,
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import Fuse from "fuse.js";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

interface Snippet {
  id: string;
  title: string;
  code: string;
  language: string;
  tags: string[];
  createdAt: string;
}

const languages = [
  "javascript",
  "typescript",
  "python",
  "java",
  "csharp",
  "cpp",
  "c",
  "html",
  "css",
  "json",
  "sql",
  "bash",
  "go",
  "rust",
  "php",
  "ruby",
];

const getCodePlaceholder = (language: string): string => {
  const placeholders: Record<string, string> = {
    javascript:
      "// JavaScript example\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet('World'));",
    typescript:
      "// TypeScript example\nfunction greet(name: string): string {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet('World'));",
    python:
      "# Python example\ndef greet(name: str) -> str:\n    return f\"Hello, {name}!\"\n\nprint(greet('World'))",
    java: '// Java example\npublic class Main {\n    public static String greet(String name) {\n        return "Hello, " + name + "!";\n    }\n}',
    csharp:
      '// C# example\npublic class Program\n{\n    public static string Greet(string name)\n    {\n        return $"Hello, {name}!";\n    }\n}',
    cpp: '// C++ example\n#include <iostream>\n#include <string>\n\nstd::string greet(const std::string& name) {\n    return "Hello, " + name + "!";\n}',
    c: '// C example\n#include <stdio.h>\n#include <string.h>\n\nvoid greet(const char* name) {\n    printf("Hello, %s!\\n", name);\n}',
    html: "<!DOCTYPE html>\n<html>\n<head>\n    <title>Example</title>\n</head>\n<body>\n    <h1>Hello, World!</h1>\n</body>\n</html>",
    css: "/* CSS example */\n.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 2rem;\n}",
    json: '{\n  "name": "example",\n  "version": "1.0.0",\n  "description": "Example JSON"\n}',
    sql: "-- SQL example\nSELECT id, name, email\nFROM users\nWHERE active = true\nORDER BY created_at DESC;",
    bash: '#!/bin/bash\n# Bash example\ngreet() {\n    echo "Hello, $1!"\n}\n\ngreet "World"',
    go: '// Go example\npackage main\n\nimport "fmt"\n\nfunc greet(name string) string {\n    return fmt.Sprintf("Hello, %s!", name)\n}',
    rust: '// Rust example\nfn greet(name: &str) -> String {\n    format!("Hello, {}!", name)\n}\n\nfn main() {\n    println!("{}", greet("World"));\n}',
    php: '<?php\n// PHP example\nfunction greet($name) {\n    return "Hello, " . $name . "!";\n}\n\necho greet(\'World\');\n?>',
    ruby: "# Ruby example\ndef greet(name)\n  \"Hello, #{name}!\"\nend\n\nputs greet('World')",
  };
  return (
    placeholders[language] ||
    `// ${language} example\n// Enter your code here...`
  );
};

export default function Home() {
  const { user, logout } = useAuth();
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [showModal, setShowModal] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState<Snippet | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    code: "",
    language: "javascript",
    tags: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("snippets");
    if (saved) {
      setSnippets(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("snippets", JSON.stringify(snippets));
  }, [snippets]);

  const fuse = new Fuse(snippets, {
    keys: ["title", "code", "tags", "language"],
    threshold: 0.3,
  });

  const filteredSnippets = () => {
    let filtered = snippets;

    if (searchQuery) {
      filtered = fuse.search(searchQuery).map((result) => result.item);
    }

    if (selectedLanguage !== "all") {
      filtered = filtered.filter((s) => s.language === selectedLanguage);
    }

    return filtered;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.code) return;

    if (editingSnippet) {
      setSnippets(
        snippets.map((s) =>
          s.id === editingSnippet.id
            ? {
                ...s,
                ...formData,
                tags: formData.tags
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean),
              }
            : s
        )
      );
    } else {
      const newSnippet: Snippet = {
        id: Date.now().toString(),
        ...formData,
        tags: formData.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        createdAt: new Date().toISOString(),
      };
      setSnippets([...snippets, newSnippet]);
    }

    setFormData({ title: "", code: "", language: "javascript", tags: "" });
    setShowModal(false);
    setEditingSnippet(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this snippet?")) {
      setSnippets(snippets.filter((s) => s.id !== id));
    }
  };

  const handleEdit = (snippet: Snippet) => {
    setEditingSnippet(snippet);
    setFormData({
      title: snippet.title,
      code: snippet.code,
      language: snippet.language,
      tags: snippet.tags.join(", "),
    });
    setShowModal(true);
  };

  const handleCopy = async (code: string, id: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const allTags = Array.from(new Set(snippets.flatMap((s) => s.tags)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Code Snippet Manager
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Organize, search, and manage your code snippets
              </p>
            </div>
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <User className="w-5 h-5" />
                  <span className="font-medium">{user.name}</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded">
                    {user.role}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Link
                    href="/dashboard"
                    className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors text-sm"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium flex items-center gap-2 transition-colors text-sm"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </header>

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search snippets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Languages</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              setEditingSnippet(null);
              setFormData({
                title: "",
                code: "",
                language: "javascript",
                tags: "",
              });
              setShowModal(true);
            }}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Snippet
          </button>
        </div>

        {filteredSnippets().length === 0 ? (
          <div className="text-center py-16">
            <Code className="w-16 h-16 mx-auto text-slate-400 mb-4" />
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              {snippets.length === 0
                ? "No snippets yet. Add your first one!"
                : "No snippets match your search."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSnippets().map((snippet) => (
              <div
                key={snippet.id}
                className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                    {snippet.title}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopy(snippet.code, snippet.id)}
                      className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
                      title="Copy code"
                    >
                      {copiedId === snippet.id ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      )}
                    </button>
                    <button
                      onClick={() => handleEdit(snippet)}
                      className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
                      title="Edit"
                    >
                      <Code className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    </button>
                    <button
                      onClick={() => handleDelete(snippet.id)}
                      className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>

                <div className="mb-3">
                  <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded">
                    {snippet.language}
                  </span>
                </div>

                <div className="mb-4 max-h-48 overflow-hidden rounded">
                  <SyntaxHighlighter
                    language={snippet.language}
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      borderRadius: "0.5rem",
                      fontSize: "0.875rem",
                    }}
                  >
                    {snippet.code}
                  </SyntaxHighlighter>
                </div>

                {snippet.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {snippet.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-200">
                  {editingSnippet ? "Edit Snippet" : "Add New Snippet"}
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                      Language
                    </label>
                    <select
                      value={formData.language}
                      onChange={(e) =>
                        setFormData({ ...formData, language: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {languages.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                      Code
                    </label>
                    <textarea
                      value={formData.code}
                      onChange={(e) =>
                        setFormData({ ...formData, code: e.target.value })
                      }
                      rows={12}
                      placeholder={getCodePlaceholder(formData.language)}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-700 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) =>
                        setFormData({ ...formData, tags: e.target.value })
                      }
                      placeholder="react, hooks, typescript"
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex gap-3 justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        setEditingSnippet(null);
                        setFormData({
                          title: "",
                          code: "",
                          language: "javascript",
                          tags: "",
                        });
                      }}
                      className="px-6 py-2 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                      {editingSnippet ? "Update" : "Create"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
