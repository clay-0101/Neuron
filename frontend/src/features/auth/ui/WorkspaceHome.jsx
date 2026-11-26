import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUp,
  AudioLines,
  BookOpenText,
  Check,
  ChevronRight,
  FileText,
  FolderKanban,
  Lightbulb,
  Link2,
  MessageSquarePlus,
  Paperclip,
  Sparkles,
  X,
} from "lucide-react";

const suggestions = [
  "Help me brainstorm",
  "Summarize a document",
  "Plan my week",
  "Explain a complex idea",
];

const quickActions = [
  {
    id: "new-chat",
    title: "New chat",
    description: "Start fresh and think out loud.",
    icon: MessageSquarePlus,
    tint: "blue",
    className: "workspace-action-large",
  },
  {
    id: "summarize",
    title: "Summarize a doc",
    description: "Pull out the important details.",
    icon: FileText,
    tint: "amber",
    className: "",
  },
  {
    id: "connect",
    title: "Connect apps",
    description: "Bring your tools together.",
    icon: Link2,
    tint: "green",
    className: "",
  },
  {
    id: "explore",
    title: "Explore ideas",
    description: "Find a new angle to explore.",
    icon: Lightbulb,
    tint: "violet",
    className: "workspace-action-wide",
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.075, delayChildren: 0.06 } },
};

const rise = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } },
};

function PromptComposer({ value, onChange, onSend }) {
  const [fileName, setFileName] = useState("");
  const fileInput = useRef(null);
  const textarea = useRef(null);

  function submitPrompt(event) {
    event.preventDefault();
    const prompt = value.trim();
    if (!prompt) return;
    onSend(prompt, fileName);
    setFileName("");
  }

  return (
    <div className="workspace-composer-wrap">
      <form className="workspace-composer" onSubmit={submitPrompt}>
        <label htmlFor="workspace-prompt" className="sr-only">Message Neuron</label>
        <textarea
          ref={textarea}
          id="workspace-prompt"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
              event.preventDefault();
              event.currentTarget.form?.requestSubmit();
            }
          }}
          placeholder="Ask anything, or start with an idea..."
          rows={2}
        />
        {fileName && (
          <span className="workspace-attachment-chip">
            <FileText size={14} />
            {fileName}
            <button type="button" aria-label="Remove attachment" onClick={() => setFileName("")}>
              <X size={13} />
            </button>
          </span>
        )}
        <div className="workspace-composer-toolbar">
          <input
            ref={fileInput}
            className="sr-only"
            type="file"
            aria-label="Attach a file"
            onChange={(event) => setFileName(event.target.files?.[0]?.name || "")}
          />
          <button
            type="button"
            className="workspace-composer-tool"
            aria-label="Attach a file"
            onClick={() => fileInput.current?.click()}
          >
            <Paperclip size={17} strokeWidth={1.7} />
            <span>Attach</span>
          </button>
          <div className="workspace-composer-end">
            <button
              type="button"
              className="workspace-composer-tool workspace-voice-button"
              aria-label="Voice input coming soon"
              title="Voice input is coming soon"
              disabled
            >
              <AudioLines size={17} strokeWidth={1.7} />
            </button>
            <button
              type="submit"
              className="workspace-send-button"
              aria-label="Send message"
              disabled={!value.trim()}
            >
              <ArrowUp size={18} strokeWidth={2} />
            </button>
          </div>
        </div>
      </form>
      <div className="workspace-suggestions" aria-label="Prompt suggestions">
        {suggestions.map((suggestion) => (
          <button
            type="button"
            key={suggestion}
            className="workspace-suggestion"
            onClick={() => {
              onChange(suggestion);
              textarea.current?.focus();
            }}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}

function QuickActionCard({ action, onClick }) {
  const Icon = action.icon;

  return (
    <motion.button
      type="button"
      variants={rise}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.985 }}
      className={`workspace-action-card ${action.className}`}
      onClick={() => onClick(action.id)}
    >
      <span className={`workspace-action-icon tint-${action.tint}`}>
        <Icon size={19} strokeWidth={1.65} />
      </span>
      <span className="workspace-action-copy">
        <strong>{action.title}</strong>
        <small>{action.description}</small>
      </span>
      <ChevronRight className="workspace-action-arrow" size={17} />
    </motion.button>
  );
}

function RecentActivity({ items, loading, onStartChat }) {
  return (
    <section className="workspace-activity-section" aria-labelledby="recent-activity-title">
      <div className="workspace-section-heading">
        <div>
          <p className="workspace-eyebrow">KEEP YOUR MOMENTUM</p>
          <h2 id="recent-activity-title">Recent activity</h2>
        </div>
        {items.length > 0 && (
          <button type="button" className="workspace-text-link" onClick={onStartChat}>
            View all <ChevronRight size={15} />
          </button>
        )}
      </div>

      {loading ? (
        <div className="workspace-activity-list" aria-label="Loading recent activity">
          {[0, 1, 2].map((item) => (
            <div key={item} className="workspace-activity-skeleton">
              <span />
              <div><i /><i /></div>
              <b />
            </div>
          ))}
        </div>
      ) : items.length ? (
        <motion.div className="workspace-activity-list" variants={stagger} initial="hidden" animate="visible">
          {items.map((item) => (
            <motion.article key={item.id} variants={rise} className="workspace-activity-row">
              <span className="workspace-activity-icon"><BookOpenText size={17} strokeWidth={1.65} /></span>
              <span className="workspace-activity-copy">
                <strong>{item.title}</strong>
                <small>{item.description}</small>
              </span>
              <time>{item.time}</time>
              <ChevronRight className="workspace-activity-arrow" size={16} />
            </motion.article>
          ))}
        </motion.div>
      ) : (
        <div className="workspace-activity-empty">
          <span className="workspace-empty-mark"><Sparkles size={17} /></span>
          <div>
            <strong>A clean slate.</strong>
            <p>Your chats and projects will show up here as you work.</p>
          </div>
        </div>
      )}
    </section>
  );
}

function ConnectedAppsDialog({ open, onClose }) {
  const apps = ["Google Drive", "Notion", "Slack"];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="workspace-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="connected-apps-title"
            className="workspace-connect-dialog"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
          >
            <button type="button" className="workspace-icon-button workspace-dialog-close" aria-label="Close dialog" onClick={onClose}>
              <X size={18} />
            </button>
            <span className="workspace-dialog-mark"><Link2 size={20} /></span>
            <p className="workspace-eyebrow">YOUR TOOLS, TOGETHER</p>
            <h2 id="connected-apps-title">Connect your apps</h2>
            <p className="workspace-dialog-description">
              Bring your notes, files, and conversations into one thoughtful workspace.
            </p>
            <div className="workspace-app-list">
              {apps.map((app) => (
                <div key={app} className="workspace-app-row">
                  <span className="workspace-app-mark">{app.charAt(0)}</span>
                  <span>{app}</span>
                  <span className="workspace-coming-soon">Coming soon</span>
                </div>
              ))}
            </div>
            <button type="button" className="workspace-primary-button" onClick={onClose}>
              <Check size={16} /> Sounds good
            </button>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function WorkspaceHome({
  firstName,
  draft,
  onDraftChange,
  onSend,
  recentActivity,
  loading,
  onQuickAction,
  onStartChat,
}) {
  const [connectOpen, setConnectOpen] = useState(false);

  useEffect(() => {
    if (!connectOpen) return undefined;
    function closeOnEscape(event) {
      if (event.key === "Escape") setConnectOpen(false);
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [connectOpen]);

  function handleQuickAction(action) {
    if (action === "connect") {
      setConnectOpen(true);
      return;
    }
    onQuickAction(action);
  }

  return (
    <>
      <motion.div
        className="workspace-home"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <section className="workspace-hero" aria-labelledby="workspace-greeting">
          <div className="workspace-hero-glow" aria-hidden="true" />
          <p className="workspace-eyebrow workspace-ready-label">
            <span />
            YOUR SPACE IS READY
          </p>
          <h1 id="workspace-greeting" className="font-editorial">
            Good to see you, <span>{firstName}.</span>
          </h1>
          <p className="workspace-hero-subtitle">
            A little more space to think. What would you like to explore?
          </p>

          <PromptComposer value={draft} onChange={onDraftChange} onSend={onSend} />
        </section>

        <section className="workspace-actions-section" aria-labelledby="quick-actions-title">
          <div className="workspace-section-heading">
            <div>
              <p className="workspace-eyebrow">A GOOD PLACE TO BEGIN</p>
              <h2 id="quick-actions-title">Make something happen</h2>
            </div>
          </div>
          <motion.div
            className="workspace-bento-grid"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {quickActions.map((action) => (
              <QuickActionCard key={action.id} action={action} onClick={handleQuickAction} />
            ))}
          </motion.div>
        </section>

        <RecentActivity
          items={recentActivity}
          loading={loading}
          onStartChat={onStartChat}
        />
      </motion.div>
      <ConnectedAppsDialog open={connectOpen} onClose={() => setConnectOpen(false)} />
    </>
  );
}
