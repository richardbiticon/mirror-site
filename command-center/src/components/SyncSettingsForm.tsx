import { useState } from "react";
import type { SyncConfig } from "../hooks/useJsonbinSync";

interface Props {
  config: SyncConfig;
  isReady: boolean;
  status: string;
  error: string | null;
  onInitialize: (apiKey: string) => Promise<unknown>;
  onSaveExisting: (next: SyncConfig) => void;
  onPull: () => Promise<void>;
  onPush: () => Promise<void>;
  onDisable: () => void;
  onClose: () => void;
}

export function SyncSettingsForm({
  config,
  isReady,
  status,
  error,
  onInitialize,
  onSaveExisting,
  onPull,
  onPush,
  onDisable,
  onClose,
}: Props) {
  const [mode, setMode] = useState<"create" | "existing">(
    isReady ? "existing" : "create"
  );
  const [apiKey, setApiKey] = useState(config.apiKey);
  const [leadsBinId, setLeadsBinId] = useState(config.leadsBinId);
  const [projectsBinId, setProjectsBinId] = useState(config.projectsBinId);
  const [busy, setBusy] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  async function handleInitialize() {
    if (!apiKey.trim()) {
      setLocalError("API key is required.");
      return;
    }
    setBusy(true);
    setLocalError(null);
    try {
      await onInitialize(apiKey.trim());
      onClose();
    } catch (e) {
      setLocalError(e instanceof Error ? e.message : "Failed to create bins.");
    } finally {
      setBusy(false);
    }
  }

  function handleSaveExisting() {
    if (!apiKey.trim() || !leadsBinId.trim() || !projectsBinId.trim()) {
      setLocalError("API key and both bin IDs are required.");
      return;
    }
    onSaveExisting({
      enabled: true,
      apiKey: apiKey.trim(),
      leadsBinId: leadsBinId.trim(),
      projectsBinId: projectsBinId.trim(),
    });
    onClose();
  }

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950 p-5">
      <div className="mb-4 flex items-baseline justify-between">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
            Cloud Sync (JSONBin.io)
          </h3>
          <p className="text-xs text-slate-500">
            Push and pull your data to a private bin so you can use the same
            account from another device or browser.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-xs uppercase tracking-wide text-slate-400 hover:text-slate-200"
        >
          Close
        </button>
      </div>

      {isReady ? (
        <div className="mb-4 rounded border border-emerald-900/60 bg-emerald-950/30 p-3 text-xs text-emerald-200">
          Sync is on. Status: {status}.{" "}
          {error && <span className="text-rose-300">Last error: {error}</span>}
        </div>
      ) : (
        <div className="mb-4 flex gap-2">
          <ModeButton
            active={mode === "create"}
            onClick={() => setMode("create")}
            label="New Bins"
          />
          <ModeButton
            active={mode === "existing"}
            onClick={() => setMode("existing")}
            label="Existing Bins"
          />
        </div>
      )}

      <label className="mb-3 block">
        <span className="mb-1 block text-xs uppercase tracking-wide text-slate-400">
          JSONBin Master API Key
        </span>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="$2b$10$..."
          className={inputClass}
        />
        <span className="mt-1 block text-xs text-slate-500">
          Sign up free at jsonbin.io and copy your X-Master-Key.
        </span>
      </label>

      {(mode === "existing" || isReady) && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-xs uppercase tracking-wide text-slate-400">
              Leads Bin ID
            </span>
            <input
              value={leadsBinId}
              onChange={(e) => setLeadsBinId(e.target.value)}
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs uppercase tracking-wide text-slate-400">
              Projects Bin ID
            </span>
            <input
              value={projectsBinId}
              onChange={(e) => setProjectsBinId(e.target.value)}
              className={inputClass}
            />
          </label>
        </div>
      )}

      {(localError || error) && (
        <p className="mt-3 text-xs text-rose-400">
          {localError ?? error}
        </p>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-end gap-2">
        {isReady && (
          <>
            <button
              type="button"
              disabled={busy || status === "pulling"}
              onClick={async () => {
                setBusy(true);
                await onPull();
                setBusy(false);
              }}
              className="rounded border border-slate-700 px-3 py-1.5 text-xs uppercase tracking-wide text-slate-300 hover:bg-slate-900 disabled:opacity-50"
            >
              Pull from cloud
            </button>
            <button
              type="button"
              disabled={busy || status === "pushing"}
              onClick={async () => {
                setBusy(true);
                await onPush();
                setBusy(false);
              }}
              className="rounded border border-slate-700 px-3 py-1.5 text-xs uppercase tracking-wide text-slate-300 hover:bg-slate-900 disabled:opacity-50"
            >
              Push to cloud
            </button>
            <button
              type="button"
              onClick={() => {
                if (
                  confirm(
                    "Disable sync? Your local data stays. Bins remain in JSONBin until you delete them there."
                  )
                ) {
                  onDisable();
                  onClose();
                }
              }}
              className="rounded border border-rose-900 px-3 py-1.5 text-xs uppercase tracking-wide text-rose-300 hover:bg-rose-950"
            >
              Disable Sync
            </button>
          </>
        )}
        {!isReady && mode === "create" && (
          <button
            type="button"
            disabled={busy}
            onClick={handleInitialize}
            className="rounded bg-sky-600 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white hover:bg-sky-500 disabled:opacity-50"
          >
            {busy ? "Creating bins..." : "Create Bins & Enable"}
          </button>
        )}
        {!isReady && mode === "existing" && (
          <button
            type="button"
            onClick={handleSaveExisting}
            className="rounded bg-sky-600 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white hover:bg-sky-500"
          >
            Save & Enable
          </button>
        )}
      </div>
    </div>
  );
}

function ModeButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "rounded-full border px-3 py-1 text-xs uppercase tracking-wide transition " +
        (active
          ? "border-sky-500 bg-sky-500/10 text-sky-300"
          : "border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200")
      }
    >
      {label}
    </button>
  );
}

const inputClass =
  "w-full rounded border border-slate-800 bg-slate-900 px-3 py-2 font-mono text-sm text-slate-100 placeholder:text-slate-600 focus:border-sky-500 focus:outline-none";
