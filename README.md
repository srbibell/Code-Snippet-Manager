# Code Snippet Manager

A production-ready, modern web application for managing and organizing code snippets with advanced search capabilities, syntax highlighting, and intuitive tag-based organization. Built with Next.js 14, TypeScript, and Tailwind CSS, optimized for performance and developer experience.

## Features

- ✨ **Beautiful UI** - Modern, responsive design with dark mode support and smooth animations
- 🔍 **Powerful Search** - Advanced fuzzy search algorithm (Fuse.js) across titles, code, tags, and languages with intelligent matching
- 🏷️ **Tag System** - Flexible tag-based organization with comma-separated tag support
- 💾 **Local Storage** - Persistent data storage using browser's localStorage API - no backend required
- 📋 **Copy to Clipboard** - One-click code copying with visual feedback
- 🎨 **Syntax Highlighting** - Professional syntax highlighting for 15+ programming languages using Prism
- 📱 **Responsive Design** - Fully responsive grid layout that adapts to desktop, tablet, and mobile devices
- 🌙 **Dark Mode** - Automatic dark mode detection based on system preferences with seamless theme switching
- ⚡ **Performance Optimized** - Built with Next.js 14 App Router for optimal performance and SEO

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Code Highlighting**: react-syntax-highlighter
- **Search**: Fuse.js (fuzzy search)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

This project is optimized for Vercel deployment. Follow these steps:

1. **Push to GitHub** (if not already):

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. **Deploy to Vercel**:

   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect Next.js and configure the build settings
   - Click "Deploy"

3. **That's it!** Your app will be live in seconds.

Alternatively, use the Vercel CLI:

```bash
npm i -g vercel
vercel
```

## Project Structure

```
.
├── app/
│   ├── layout.tsx      # Root layout with metadata configuration
│   ├── page.tsx        # Main page component with snippet management logic
│   └── globals.css     # Global styles and Tailwind CSS imports
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── postcss.config.js   # PostCSS configuration for Tailwind
├── next.config.js      # Next.js configuration
└── README.md           # Project documentation
```

## Features in Detail

### Search & Filter

- **Fuzzy Search**: Powered by Fuse.js with configurable threshold (0.3) for intelligent matching
- **Multi-field Search**: Searches across titles, code content, tags, and language fields simultaneously
- **Language Filtering**: Quick filter dropdown to narrow results by programming language
- **Real-time Updates**: Search results update instantly as you type

### Snippet Management

- **CRUD Operations**: Full create, read, update, and delete functionality
- **Language Support**: Support for 15+ programming languages including JavaScript, TypeScript, Python, Java, C++, Go, Rust, and more
- **Tag Organization**: Flexible tagging system with comma-separated input for easy categorization
- **Syntax Highlighting**: Automatic syntax highlighting using react-syntax-highlighter with VS Code Dark Plus theme
- **Visual Feedback**: Copy confirmation, hover effects, and smooth transitions

### Data Persistence

- **Local Storage API**: All data persisted in browser's localStorage
- **Zero Backend**: No server or database required - runs entirely client-side
- **Session Persistence**: Data automatically saved and restored across browser sessions
- **JSON Storage**: Clean JSON serialization for easy debugging and potential export

## Example Code Snippets

Here are some example code snippets you can use to get started:

### Example 1: React Custom Hook

```typescript
import { useState, useEffect } from "react";

/**
 * Custom hook to fetch data with loading and error states
 * @param url - API endpoint URL
 * @returns Object containing data, loading, and error states
 */
export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch");
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}
```

### Example 2: Debounce Function

```javascript
/**
 * Debounce function to limit the rate of function execution
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Usage example:
// const debouncedSearch = debounce((query) => {
//   console.log('Searching for:', query);
// }, 300);
```

### Example 3: Python Context Manager for Database Connection

```python
from contextlib import contextmanager
import sqlite3

@contextmanager
def database_connection(db_path: str):
    """
    Context manager for database connections with automatic cleanup
    """
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
        conn.commit()
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        conn.close()

# Usage example:
# with database_connection('app.db') as conn:
#     cursor = conn.cursor()
#     cursor.execute('SELECT * FROM users WHERE id = ?', (user_id,))
#     user = cursor.fetchone()
```

## Future Enhancements

Potential features I want to add:

- Export/import snippets (JSON)
- Share snippets via URL
- Cloud sync with authentication
- Code formatting on paste
- Snippet collections/folders
- Statistics dashboard
- Markdown support in descriptions

## License

MIT License
