import React, { useContext } from "react";
import { AppContext } from "./AppProvider";
import { MODULES } from "../utils/constants";
import { v4 } from "uuid";
import classNames from "classnames";
import { useNavigate, useLocation } from "react-router-dom";

const NAV_LINKS = [
  {
    title: "Users",
    href: "/users",
    module: MODULES.USER_LIST,
  },
  {
    title: "Posts",
    href: "/posts",
    module: MODULES.POST_LIST,
  },
];

export const Navbar = () => {
  const router = useLocation();
  const navigate = useNavigate();
  const { tabs, setTabs } = useContext(AppContext);

  const handleNavigation = (link) => {
    if (link.href === "/") {
      setTabs([]);
      navigate("/");
      return;
    }

    if (!tabs.length) {
      return navigate(link.href);
    }

    const alreadyInTabs = tabs.find((t) => t.module === link.module);

    if (alreadyInTabs) {
      const updatedTabs = tabs.map((t) => {
        if (t.module === link.module) {
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
      return;
    }

    const unactiveTabs = tabs.map((t) => ({
      ...t,
      active: false,
    }));

    setTabs([
      ...unactiveTabs,
      {
        tabId: v4(),
        title: link.title,
        data: link,
        module: link.module,
        active: true,
      },
    ]);
  };
  return (
    <div className="navbar justify-between border-b">
      <div className="navbar-start">
        <div
          className={classNames({
            "text-primary": router.pathname === "/",
          })}
          onClick={() => handleNavigation({ href: "/" })}
        >
          Home
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {NAV_LINKS.map((link, index) => (
            <li key={index}>
              <p
                className={classNames({
                  "text-primary": link.href === router.pathname,
                })}
                onClick={() => handleNavigation(link)}
              >
                {link.title}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
