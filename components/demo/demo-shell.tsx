import { TopBar } from "./top-bar";
import { Chat } from "./chat";

/**
 * Full-viewport shell for /demo per brief §5.2.
 * Top bar pinned at the top, chat fills the rest. No global Nav or
 * Footer; this route lives outside the (marketing) route group.
 */
export function DemoShell() {
  return (
    <div className="flex flex-col h-dvh">
      <TopBar />
      <Chat />
    </div>
  );
}
