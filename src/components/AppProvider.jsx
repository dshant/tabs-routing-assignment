import { API } from "@/utils/API";
import React, { createContext, useEffect, useMemo, useState } from "react";

export const AppContext = createContext({
  users: [],
  posts: [],
});

export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  // This will represent the tabs list
  // Each obj in this represents one tab
  // tab.title - Title of the tab
  // tab.module - Module of the tab ( user, post, etc.)
  // tab.data - Some data which is required for tab to display data properly
  // tab.active - If true the tab is selected
  const [tabs, setTabs] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await API.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching the users", users);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await API.get("/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching the psots", error);
    }
  };

  const postsWithUserDetails = useMemo(() => {
    return posts.map((p) => ({
      ...p,
      user: users.find((u) => u.id === p.userId) || {},
    }));
  }, [posts, users]);

  useEffect(() => {
    fetchPosts();
    fetchUsers();
  }, []);

  const contextValue = useMemo(
    () => ({
      users,
      posts: postsWithUserDetails,
      tabs,
      setTabs,
    }),
    [users, postsWithUserDetails, tabs]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
