import { useEffect, useState } from "react";
import {
  Bell,
  Menu,
  Moon,
  Search,
  Sun,
} from "lucide-react";
import { Avatar } from "./WorkspaceSidebar.jsx";

export function WorkspaceTopBar({
  user,
  theme,
  onToggleTheme,
  onOpenSearch,
  onOpenSidebar,
  onSignOut,
}) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const ThemeIcon = theme === "dark" ? Sun : Moon;

  useEffect(() => {
    if (!notificationsOpen && !profileOpen) return undefined;
    function closeMenus(event) {
      if (event.key === "Escape") {
        setNotificationsOpen(false);
        setProfileOpen(false);
      }
    }
    window.addEventListener("keydown", closeMenus);
    return () => window.removeEventListener("keydown", closeMenus);
  }, [notificationsOpen, profileOpen]);

  return (
    <header className="workspace-topbar">
      <button
        type="button"
        className="workspace-icon-button workspace-mobile-menu"
        aria-label="Open navigation"
        onClick={onOpenSidebar}
      >
        <Menu size={19} />
      </button>

      <button type="button" className="workspace-search-trigger" onClick={onOpenSearch}>
        <Search size={17} strokeWidth={1.7} />
        <span>Search anything...</span>
        <span className="workspace-shortcut">
          <kbd>⌘ / Ctrl K</kbd>
        </span>
      </button>

      <div className="workspace-topbar-actions">
        <div className="workspace-popover-anchor">
          <button
            type="button"
            className={`workspace-icon-button ${notificationsOpen ? "is-open" : ""}`}
            aria-label="Notifications"
            aria-expanded={notificationsOpen}
            onClick={() => {
              setNotificationsOpen((open) => !open);
              setProfileOpen(false);
            }}
          >
            <Bell size={18} strokeWidth={1.7} />
          </button>
          {notificationsOpen && (
            <div className="workspace-popover workspace-notifications">
              <div className="workspace-popover-heading">
                <strong>Notifications</strong>
                <span>All caught up</span>
              </div>
              <p className="workspace-notification-empty">
                New updates will show up here.
              </p>
            </div>
          )}
        </div>

        <button
          type="button"
          className="workspace-icon-button"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          onClick={onToggleTheme}
        >
          <ThemeIcon size={18} strokeWidth={1.7} />
        </button>

        <div className="workspace-popover-anchor">
          <button
            type="button"
            className="workspace-avatar-button"
            aria-label="Open account menu"
            aria-expanded={profileOpen}
            onClick={() => {
              setProfileOpen((open) => !open);
              setNotificationsOpen(false);
            }}
          >
            <Avatar name={user?.name} />
          </button>
          {profileOpen && (
            <div className="workspace-popover workspace-account-menu">
              <div className="workspace-account-summary">
                <Avatar name={user?.name} />
                <span>
                  <strong>{user?.name || "Neuron member"}</strong>
                  <small>{user?.email}</small>
                </span>
              </div>
              <button
                type="button"
                className="workspace-popover-item workspace-account-signout"
                onClick={onSignOut}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
