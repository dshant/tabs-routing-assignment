import { FilePenLine, Trash } from "lucide-react";
import React, { useContext } from "react";
import { AppContext } from "./AppProvider";
import { MODULES } from "@/utils/constants";
import { v4 } from "uuid";

export const UserList = () => {
  const { users, setTabs, tabs } = useContext(AppContext);

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

  return (
    <div className="container mx-auto">
      <p className="text-4xl my-4 font-bold">Users</p>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Website</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* rows */}
            {users?.map((user) => (
              <tr key={user.id}>
                <th>{user.id}</th>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.website}</td>
                <td className="flex gap-2">
                  <FilePenLine
                    className="cursor-pointer"
                    onClick={() => handleEditUser(user)}
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
