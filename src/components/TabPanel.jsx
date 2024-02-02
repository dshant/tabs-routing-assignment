import React, { useContext, useMemo } from "react";
import UserForm from "./UserForm";
import { AppContext } from "./AppProvider";
import classNames from "classnames";
import { MODULES } from "../utils/constants";
import { UserList } from "./UserList";
import { X } from "lucide-react";
import PostForm from "./PostForm";
import { PostList } from "./PostList";

export const TabPanel = () => {
  const { tabs, setTabs } = useContext(AppContext);

  const handleToggleTab = (tabId) => {
    const updatedTabs = tabs.map((t) => {
      if (t.tabId === tabId) {
        return {
          ...t,
          active: true,
        };
      }
      return {
        ...t,
        active: false,
      };
    });
    setTabs(updatedTabs);
  };

  const tabRenderer = useMemo(() => {
    return tabs.map((tab) => {
      switch (tab.module) {
        case MODULES.USER:
          return {
            ...tab,
            element: <UserForm userInfo={tab.data} />,
          };
        case MODULES.USER_LIST:
          return {
            ...tab,
            element: <UserList />,
          };
        case MODULES.POST:
          return {
            ...tab,
            element: <PostForm postInfo={tab.data} />,
          };
        case MODULES.POST_LIST:
          return {
            ...tab,
            element: <PostList />,
          };
        default:
          return {
            ...tab,
            element: null,
          };
      }
    });
  }, [tabs]);

  const handleCloseTab = (tabId) => {
    const filteredTabs = tabs.filter((t) => t.tabId !== tabId);

    if (!filteredTabs.length) {
      setTabs([]);
      return;
    }

    const isAnyTabActive = filteredTabs.find((t) => t.active);
    if (isAnyTabActive) {
      setTabs(filteredTabs);
      return;
    }

    const lastTabIsActive = filteredTabs.map((t, i) => {
      if (i === filteredTabs.length - 1) {
        return {
          ...t,
          active: true,
        };
      }
      return t;
    });

    setTabs(lastTabIsActive);
  };

  if (tabs.length === 0) return null;

  return (
    <div className="absolute top-0 w-full h-full bg-base-200">
      <div role="tablist" className="tabs tabs-lifted justify-start">
        {tabs.map((tab) => (
          <a
            key={tab.tabId}
            role="tab"
            className={classNames("tab min-w-60 max-w-60", {
              "tab-active": tab.active,
            })}
            onClick={() => handleToggleTab(tab.tabId)}
          >
            <div className="flex items-center justify-between gap-2 w-full">
              <p className="overflow-ellipsis whitespace-nowrap overflow-hidden w-44">
                {tab.title}
              </p>
              <X
                size={16}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseTab(tab.tabId);
                }}
              />
            </div>
          </a>
        ))}
      </div>
      <div className="h-full bg-base-100 p-4 relative">
        {tabRenderer.map(({ element, active, tabId }) => (
          <div
            className={classNames("absolute w-full", {
              hidden: !active,
            })}
            key={tabId}
          >
            {element}
          </div>
        ))}
      </div>
    </div>
  );
};
