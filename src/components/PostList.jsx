import { FilePenLine, Trash } from "lucide-react";
import React, { useContext } from "react";
import { AppContext } from "./AppProvider";
import { MODULES } from "@/utils/constants";
import { v4 } from "uuid";

export const PostList = () => {
  const { posts, setTabs, tabs, handleEditUser } = useContext(AppContext);

  const handleEditPost = (postInfo) => {
    // Deactivate all tabs
    const deactivatedTabs = tabs.map((tab) => ({
      ...tab,
      active: false,
    }));

    // Check if we already have a post list tab
    const hasUserListTab = deactivatedTabs.some(
      (tab) => tab.module === MODULES.POST_LIST
    );

    // Add the post list tab if it doesn't exist
    const postListTab = !hasUserListTab
      ? [
          {
            tabId: v4(),
            title: "Post",
            module: MODULES.POST_LIST,
            active: false,
          },
        ]
      : [];

    // Check if there's already an open tab for the edited post
    const hasSamePostTab = deactivatedTabs.find(
      (tab) => tab.module === MODULES.POST && tab.data?.id === postInfo.id
    );

    // If there's an open tab for the edited post, make it active
    if (hasSamePostTab) {
      const updatedTabs = deactivatedTabs.map((tab) =>
        tab.module === MODULES.POST && tab.data?.id === postInfo.id
          ? { ...tab, active: true }
          : tab
      );
      setTabs([...postListTab, ...updatedTabs]);
      return;
    }

    // Add a new tab for the edited post
    setTabs([
      ...postListTab,
      ...deactivatedTabs,
      {
        tabId: v4(),
        title: postInfo.title,
        module: MODULES.POST,
        data: postInfo,
        active: true,
      },
    ]);
  };

  return (
    <div className="container mx-auto">
      <p className="text-4xl my-4 font-bold">Posts</p>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>User</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* rows */}
            {posts?.map((post) => (
              <tr key={post.id}>
                <th>{post.id}</th>
                <td>{post.title}</td>
                <td
                  className="link link-primary"
                  onClick={() => handleEditUser(post.user)}
                >
                  {post.user.name}
                </td>
                <td className="flex gap-2">
                  <FilePenLine
                    className="cursor-pointer"
                    onClick={() => handleEditPost(post)}
                  />
                  <Trash className="cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
