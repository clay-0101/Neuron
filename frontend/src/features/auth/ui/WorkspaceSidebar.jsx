import { useState } from "react";
import {
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  FolderKanban,
  House,
  LibraryBig,
  LogOut,
  MessageSquareText,
  Plus,
  Settings,
  X,
} from "lucide-react";
import { BrandMark } from "./BrandMark.jsx";

const navigation = [
  { label: "Home", icon: House },
  { label: "Chats", icon: MessageSquareText },
  { label: "Projects", icon: FolderKanban },
  { label: "Library", icon: LibraryBig },
  { label: "Settings", icon: Settings },
];

function Avatar({ name, className = "" }) {
  const initials = name
    ?.trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "N";

  return <span aria-hidden="true" className={`workspace-avatar ${className}`}>{initials}</span>;
}

export { Avatar };

export function WorkspaceSidebar({
  user,
  recentChats,
  activeSection,
  onNavigate,
  onSignOut,
  signOutBusy,
  collapsed,
  onToggleCollapsed,
  mobileOpen,
  onClose,
}) {
  const [workspaceMenuOpen, setWorkspaceMenuOpen] = useState(false);
  const displayName = user?.name || "Neuron member";
  const NavCollapseIcon = collapsed ? ChevronsRight : ChevronsLeft;

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Dismiss navigation overlay"
          className="workspace-drawer-backdrop"
          onClick={onClose}
        />
      )}
      <aside
        aria-label="Workspace navigation"
        className={`workspace-sidebar ${collapsed ? "is-collapsed" : ""} ${mobileOpen ? "is-open" : ""}`}
      >
        <div className="workspace-sidebar-brand">
          <BrandMark compact={collapsed} />
          <button
            type="button"
            className="workspace-icon-button workspace-sidebar-collapse"
            onClick={onToggleCollapsed}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <NavCollapseIcon size={17} strokeWidth={1.7} />
          </button>
          <button
            type="button"
            className="workspace-icon-button workspace-mobile-close"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        <div className="workspace-switcher-wrap">
          <button
            type="button"
            className="workspace-switcher"
            aria-expanded={workspaceMenuOpen}
            onClick={() => setWorkspaceMenuOpen((open) => !open)}
          >
            <span className="workspace-switcher-mark">N</span>
            <span className="workspace-switcher-name">Neuron workspace</span>
            <ChevronDown size={15} className="workspace-switcher-chevron" />
          </button>
          {workspaceMenuOpen && (
            <div className="workspace-popover workspace-switcher-menu">
              <p className="workspace-menu-eyebrow">WORKSPACES</p>
              <button type="button" className="workspace-popover-item" onClick={() => setWorkspaceMenuOpen(false)}>
                <span className="workspace-switcher-mark">N</span>
                Neuron workspace
                <span className="workspace-menu-check">Current</span>
              </button>
              <button type="button" className="workspace-popover-item" onClick={() => setWorkspaceMenuOpen(false)}>
                <Plus size={16} />
                Create workspace
              </button>
            </div>
          )}
        </div>

        <nav className="workspace-sidebar-nav" aria-label="Main navigation">
          <p className="workspace-sidebar-label">Workspace</p>
          {navigation.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              title={collapsed ? label : undefined}
              aria-current={activeSection === label ? "page" : undefined}
              className={`workspace-nav-item ${activeSection === label ? "is-active" : ""}`}
              onClick={() => {
                onNavigate(label);
                onClose();
              }}
            >
              <Icon size={18} strokeWidth={1.65} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="workspace-sidebar-recents">
          <div className="workspace-sidebar-label workspace-sidebar-recents-title">
            <span>Recent chats</span>
            <button
              type="button"
              aria-label="Start a new chat"
              title="Start a new chat"
              onClick={() => onNavigate("Home")}
            >
              <Plus size={15} />
            </button>
          </div>
          {recentChats.length ? (
            <div className="workspace-recent-links">
              {recentChats.slice(0, 5).map((chat) => (
                <button
                  type="button"
                  key={chat.id}
                  className="workspace-recent-link"
                  title={chat.title}
                  onClick={() => onNavigate("Chats")}
                >
                  <MessageSquareText size={16} strokeWidth={1.6} />
                  <span>{chat.title}</span>
                </button>
              ))}
            </div>
          ) : (
            <p className="workspace-sidebar-empty">Your conversations will appear here.</p>
          )}
        </div>

        <div className="workspace-sidebar-footer">
          <div className="workspace-profile-card">
            <Avatar name={displayName} />
            <span className="workspace-profile-copy">
              <span className="workspace-profile-name">{displayName}</span>
              <span className="workspace-profile-email">{user?.email}</span>
            </span>
          </div>
          <button
            type="button"
            className="workspace-signout"
            onClick={onSignOut}
            disabled={signOutBusy}
            title={collapsed ? "Sign out" : undefined}
          >
            <LogOut size={17} strokeWidth={1.7} />
            <span>{signOutBusy ? "Signing out..." : "Sign out"}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
