import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, FolderKanban, LibraryBig, MessageSquareText, Settings } from "lucide-react";
import { useAuth } from "../hooks/useAuth.js";
import { CommandPalette } from "./CommandPalette.jsx";
import { WorkspaceHome } from "./WorkspaceHome.jsx";
import { WorkspaceSidebar } from "./WorkspaceSidebar.jsx";
import { WorkspaceTopBar } from "./WorkspaceTopBar.jsx";

const sectionInfo = {
  Chats: {
    icon: MessageSquareText,
    description: "Your conversations will appear here after you start a chat.",
  },
  Projects: {
    icon: FolderKanban,
    description: "Give your ideas a home. Projects are coming together here.",
  },
  Library: {
    icon: LibraryBig,
    description: "Your saved notes and documents will live in your library.",
  },
  Settings: {
    icon: Settings,
    description: "Your workspace preferences will be available here.",
  },
};

function WorkspaceSection({ section, onGoHome }) {
  const details = sectionInfo[section];
  const Icon = details.icon;

  return (
    <motion.section
      className="workspace-section-empty"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      aria-labelledby="workspace-section-title"
    >
      <span className="workspace-section-empty-icon"><Icon size={21} strokeWidth={1.6} /></span>
      <p className="workspace-eyebrow">YOUR WORKSPACE</p>
      <h1 id="workspace-section-title" className="font-editorial">{section}</h1>
      <p>{details.description}</p>
      <button type="button" className="workspace-back-button" onClick={onGoHome}>
        <ArrowLeft size={16} /> Back to home
      </button>
    </motion.section>
  );
}

export function DashboardPage() {
  const { user, logout, status } = useAuth();
  const [theme, setTheme] = useState("dark");
  const [activeSection, setActiveSection] = useState("Home");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [recentActivity, setRecentActivity] = useState([]);
  const firstName = useMemo(
    () => user?.name?.trim().split(/\s+/)[0] || "there",
    [user?.name],
  );

  const closeCommandPalette = useCallback(() => setCommandOpen(false), []);

  useEffect(() => {
    function handleShortcut(event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(true);
      } else if (event.key === "Escape") {
        setCommandOpen(false);
        setMobileSidebarOpen(false);
      }
    }

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  function startNewChat() {
    setActiveSection("Home");
    setDraft("");
    setMobileSidebarOpen(false);
  }

  function handleSend(prompt, fileName) {
    setRecentActivity((items) => [
      {
        id: `${Date.now()}`,
        title: prompt,
        description: fileName ? `New chat · ${fileName}` : "New chat",
        time: "Just now",
      },
      ...items,
    ].slice(0, 5));
    setDraft("");
    setActiveSection("Home");
  }

  function handleQuickAction(action) {
    setActiveSection("Home");
    if (action === "new-chat") {
      setDraft("");
    } else if (action === "summarize") {
      setDraft("Summarize this document");
    } else if (action === "explore") {
      setDraft("Help me explore a fresh idea");
    }
  }

  function handleCommand(command) {
    if (command === "toggle-theme") {
      setTheme((current) => current === "dark" ? "light" : "dark");
      return;
    }
    if (command === "new-chat") {
      startNewChat();
      return;
    }
    setActiveSection(command);
  }

  return (
    <div className={`workspace-shell ${sidebarCollapsed ? "is-sidebar-collapsed" : ""}`} data-theme={theme}>
      <div className="workspace-noise" aria-hidden="true" />
      <div className="workspace-app-shell">
        <WorkspaceSidebar
          user={user}
          recentChats={recentActivity}
          activeSection={activeSection}
          onNavigate={setActiveSection}
          onSignOut={logout}
          signOutBusy={status === "loading"}
          collapsed={sidebarCollapsed}
          onToggleCollapsed={() => setSidebarCollapsed((collapsed) => !collapsed)}
          mobileOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
        />
        <div className="workspace-main-column">
          <WorkspaceTopBar
            user={user}
            theme={theme}
            onToggleTheme={() => setTheme((current) => current === "dark" ? "light" : "dark")}
            onOpenSearch={() => setCommandOpen(true)}
            onOpenSidebar={() => setMobileSidebarOpen(true)}
            onSignOut={logout}
          />
          <main className="workspace-main-content">
            {activeSection === "Home" ? (
              <WorkspaceHome
                firstName={firstName}
                draft={draft}
                onDraftChange={setDraft}
                onSend={handleSend}
                recentActivity={recentActivity}
                loading={status === "loading"}
                onQuickAction={handleQuickAction}
                onStartChat={() => setActiveSection("Chats")}
              />
            ) : (
              <WorkspaceSection section={activeSection} onGoHome={startNewChat} />
            )}
          </main>
        </div>
      </div>
      <CommandPalette
        open={commandOpen}
        onClose={closeCommandPalette}
        onSelect={handleCommand}
      />
    </div>
  );
}
