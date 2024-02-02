import { API } from "../utils/API";
import { MODULES } from "../utils/constants";
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { v4 } from "uuid";

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

  const handleEditUser = useCallback(
    (userInfo) => {
      // Deactivate all tabs
      const deactivatedTabs = tabs.map((tab) => ({
        ...tab,
        active: false,
      }));

      // Check if we already have a user list tab
      const hasUserListTab = deactivatedTabs.some(
        (tab) => tab.module === MODULES.USER_LIST
      );

      // Add the user list tab if it doesn't exist
      const userListTab = !hasUserListTab
        ? [
            {
              tabId: v4(),
              title: "User",
              module: MODULES.USER_LIST,
              active: false,
            },
          ]
        : [];

      // Check if there's already an open tab for the edited user
      const hasSameUserTab = deactivatedTabs.find(
        (tab) => tab.module === MODULES.USER && tab.data?.id === userInfo.id
      );

      // If there's an open tab for the edited user, make it active
      if (hasSameUserTab) {
        const updatedTabs = deactivatedTabs.map((tab) =>
          tab.module === MODULES.USER && tab.data?.id === userInfo.id
            ? { ...tab, active: true }
            : tab
        );
        setTabs([...userListTab, ...updatedTabs]);
        return;
      }

      // Add a new tab for the edited user
      setTabs([
        ...userListTab,
        ...deactivatedTabs,
        {
          tabId: v4(),
          title: userInfo.name,
          module: MODULES.USER,
          data: userInfo,
          active: true,
        },
      ]);
    },
    [tabs]
  );

  console.log(":: Tabs", tabs);

  const contextValue = useMemo(
    () => ({
      users,
      posts: postsWithUserDetails,
      tabs,
      setTabs,
      handleEditUser,
    }),
    [users, postsWithUserDetails, tabs, handleEditUser]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
