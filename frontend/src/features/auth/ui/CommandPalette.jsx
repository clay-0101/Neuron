import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FolderKanban,
  House,
  LibraryBig,
  MessageSquareText,
  Plus,
  Search,
  Settings,
  SunMoon,
} from "lucide-react";

const commands = [
  { id: "new-chat", label: "Start a new chat", section: "Actions", icon: Plus },
  { id: "Home", label: "Go to Home", section: "Navigate", icon: House },
  { id: "Chats", label: "Open Chats", section: "Navigate", icon: MessageSquareText },
  { id: "Projects", label: "Open Projects", section: "Navigate", icon: FolderKanban },
  { id: "Library", label: "Open Library", section: "Navigate", icon: LibraryBig },
  { id: "Settings", label: "Open Settings", section: "Navigate", icon: Settings },
  { id: "toggle-theme", label: "Toggle appearance", section: "Preferences", icon: SunMoon },
];

export function CommandPalette({ open, onClose, onSelect }) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const filteredCommands = useMemo(
    () => commands.filter((command) => command.label.toLowerCase().includes(query.trim().toLowerCase())),
    [query],
  );

  function close() {
    setQuery("");
    setActiveIndex(0);
    onClose();
  }

  function chooseCommand(id) {
    onSelect(id);
    close();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="workspace-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="command-palette-title"
            className="workspace-command-palette"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
          >
            <h2 id="command-palette-title" className="sr-only">Command palette</h2>
            <label className="workspace-command-search">
              <Search size={19} strokeWidth={1.7} />
              <input
                autoFocus
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown" && filteredCommands.length) {
                    event.preventDefault();
                    setActiveIndex((index) => (index + 1) % filteredCommands.length);
                  } else if (event.key === "ArrowUp" && filteredCommands.length) {
                    event.preventDefault();
                    setActiveIndex((index) => (index - 1 + filteredCommands.length) % filteredCommands.length);
                  } else if (event.key === "Enter" && filteredCommands[activeIndex]) {
                    event.preventDefault();
                    chooseCommand(filteredCommands[activeIndex].id);
                  }
                }}
                placeholder="Search pages and actions..."
                aria-label="Search commands"
              />
              <kbd>ESC</kbd>
            </label>
            <div className="workspace-command-list" role="listbox" aria-label="Commands">
              {filteredCommands.length ? filteredCommands.map(({ id, label, section, icon: Icon }, index) => (
                <button
                  type="button"
                  role="option"
                  aria-selected={index === activeIndex}
                  key={id}
                  className={`workspace-command-option ${index === activeIndex ? "is-active" : ""}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => chooseCommand(id)}
                >
                  <Icon size={17} strokeWidth={1.7} />
                  <span>{label}</span>
                  <small>{section}</small>
                </button>
              )) : (
                <p className="workspace-command-empty">No matching commands.</p>
              )}
            </div>
            <footer className="workspace-command-footer">
              <span><kbd>↑</kbd><kbd>↓</kbd> to navigate</span>
              <span><kbd>↵</kbd> to select</span>
            </footer>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
