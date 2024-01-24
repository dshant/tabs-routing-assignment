import { FilePenLine, Trash } from "lucide-react";
import React, { useContext } from "react";
import { AppContext } from "./AppProvider";
import { MODULES } from "@/utils/constants";
import { v4 } from "uuid";

export const PostList = () => {
  const { posts, setTabs, tabs } = useContext(AppContext);

  const handleEditUser = (userInfo) => {
    const unactiveTabs = tabs.map((t) => ({
      ...t,
      active: false,
    }));
    setTabs([
      ...unactiveTabs,
      {
        tabId: v4(),
        title: userInfo.name,
        module: MODULES.USER,
        data: userInfo,
        active: true,
      },
    ]);
  };

  const handleEditPost = (postInfo) => {
    const unactiveTabs = tabs.map((t) => ({
      ...t,
      active: false,
    }));
    setTabs([
      ...unactiveTabs,
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
