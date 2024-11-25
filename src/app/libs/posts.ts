import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Post {
  id: number;
  title: string;
  content: string;
  tags: string[];
  date: string;
  comments: number;
  image: string;
  author: string;
  readTime: string;
  category: string;
  likes: number;
  views: number;
}

interface PostStore {
  posts: Post[];
  filteredPosts: Post[];
  setFilteredPosts: (posts: Post[]) => void;
  addPost: (post: Omit<Post, 'id' | 'date'>) => void;
  deletePost: (id: number) => void;
}

const initialPosts: Post[] = [
  { 
    id: 1, 
    title: "Introduction to AI Agents and Their Applications", 
    tags: ["artificial intelligence", "ai agents"], 
    date: "Mar 15 2024", 
    comments: 5, 
    image: "/images/pot1.jpeg",
    content: "This is the full content of the AI Agents post...",
    author: "John Developer",
    readTime: "5 min read",
    category: "Technology",
    likes: 42,
    views: 1337
  },
  { 
    id: 2, 
    title: "Understanding AI Robots: Present and Future", 
    tags: ["robotics", "ai"], 
    date: "Mar 14 2024", 
    comments: 8, 
    image: "/images/pot2.jpg",
    content: "Exploring the future of AI in robotics...",
    author: "Jane Developer",
    readTime: "6 min read",
    category: "Robotics",
    likes: 33,
    views: 1024
  },
  { 
    id: 3, 
    title: "Machine Learning Agents in Modern Applications", 
    tags: ["machine learning", "ai agents"], 
    date: "Mar 13 2024", 
    comments: 12, 
    image: "/images/pot3.jpeg",
    content: "Machine learning agents and their use cases...",
    author: "Alice Developer",
    readTime: "7 min read",
    category: "Machine Learning",
    likes: 50,
    views: 1100
  },
  { 
    id: 4, 
    title: "The Rise of Autonomous AI Systems", 
    tags: ["autonomous", "ai"], 
    date: "Mar 12 2024", 
    comments: 6, 
    image: "/images/pot4.jpeg",
    content: "Autonomous AI systems and their future...",
    author: "Bob Developer",
    readTime: "4 min read",
    category: "AI",
    likes: 29,
    views: 900
  },
  { 
    id: 5, 
    title: "Intelligent Robots in Manufacturing", 
    tags: ["robotics", "industry"], 
    date: "Mar 11 2024", 
    comments: 4, 
    image: "/images/pot5.jpeg",
    content: "How AI robots are revolutionizing manufacturing...",
    author: "Carol Developer",
    readTime: "8 min read",
    category: "Industry",
    likes: 75,
    views: 1500
  },
  { 
    id: 6, 
    title: "Multi-Agent AI Systems: A Deep Dive", 
    tags: ["multi-agent", "ai systems"], 
    date: "Mar 10 2024", 
    comments: 9, 
    image: "/images/pot6.jpeg",
    content: "Exploring multi-agent AI systems...",
    author: "Dan Developer",
    readTime: "6 min read",
    category: "AI Systems",
    likes: 47,
    views: 800
  },
  { 
    id: 7, 
    title: "AI in Autonomous Vehicles", 
    tags: ["autonomous", "vehicles"], 
    date: "Mar 09 2024", 
    comments: 10, 
    image: "/images/pot7.jpeg",
    content: "How AI is shaping autonomous vehicles...",
    author: "Eve Developer",
    readTime: "5 min read",
    category: "Automotive",
    likes: 52,
    views: 1100
  },
  { 
    id: 8, 
    title: "Healthcare and AI: Current Trends", 
    tags: ["healthcare", "ai"], 
    date: "Mar 08 2024", 
    comments: 7, 
    image: "/images/pot8.jpg",
    content: "AI applications in healthcare...",
    author: "Frank Developer",
    readTime: "9 min read",
    category: "Healthcare",
    likes: 66,
    views: 1400
  },
  { 
    id: 9, 
    title: "Future of AI in Education", 
    tags: ["education", "ai"], 
    date: "Mar 07 2024", 
    comments: 11, 
    image: "/images/pot9.jpeg",
    content: "AI's impact on education...",
    author: "Grace Developer",
    readTime: "7 min read",
    category: "Education",
    likes: 80,
    views: 1300
  },
  { 
    id: 10, 
    title: "AI Ethics: Challenges and Solutions", 
    tags: ["ethics", "ai"], 
    date: "Mar 06 2024", 
    comments: 6, 
    image: "/images/pot10.jpeg",
    content: "Challenges and solutions in AI ethics...",
    author: "Henry Developer",
    readTime: "6 min read",
    category: "Ethics",
    likes: 39,
    views: 1200
  },
];

export const usePostStore = create<PostStore>()(
  persist(
    (set) => ({
      posts: initialPosts,
      filteredPosts: [],
      setFilteredPosts: (filtered) => set({ filteredPosts: filtered }),
      addPost: (newPost) => 
        set((state) => {
          const updatedPosts = [
            ...state.posts, 
            {
              ...newPost,
              id: state.posts.length + 1,
              date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
            }
          ];
          return {
            posts: updatedPosts,
            filteredPosts: updatedPosts 
          };
        }),
      deletePost: (id) =>
        set((state) => {
          const updatedPosts = state.posts.filter(post => post.id !== id);
          return {
            posts: updatedPosts,
            filteredPosts: updatedPosts
          };
        })
    }),
    {
      name: 'post-storage',
      storage: {
        getItem: (name) => {
          try {
            const str = localStorage.getItem(name);
            if (!str) return null;
            return JSON.parse(str);
          } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
          }
        },
        setItem: (name, value) => {
          try {
            localStorage.setItem(name, JSON.stringify(value));
          } catch (error) {
            console.error('Error writing to localStorage:', error);
          }
        },
        removeItem: (name) => {
          try {
            localStorage.removeItem(name);
          } catch (error) {
            console.error('Error removing from localStorage:', error);
          }
        }
      }
    }
  )
);