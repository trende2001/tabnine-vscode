import {
  ExtensionContext,
  StatusBarAlignment,
  StatusBarItem,
  ThemeColor,
  window,
} from "vscode";
import { Capability, isCapabilityEnabled } from "./capabilities";
import { STATUS_BAR_COMMAND } from "./commandsHandler";

const SPINNER = "$(sync~spin)";
const WARNING = "$(warning)";

let statusBar: StatusBarItem;

export function registerStatusBar(context: ExtensionContext): void {
  if (statusBar) {
    return;
  }

  statusBar = window.createStatusBarItem(StatusBarAlignment.Left, -1);
  statusBar.command = STATUS_BAR_COMMAND;
  statusBar.tooltip = "TabNine (Click to open settings)";
  setLoadingStatus("Starting...");
  statusBar.show();

  context.subscriptions.push(statusBar);
}

export function setDefaultStatus(): void {
  setStatusBar();
}

export function setLoadingStatus(issue?: string | undefined | null): void {
  setStatusBar(SPINNER, issue);
}

export function setErrorStatus(issue?: string | undefined | null): void {
  setStatusBar(WARNING, issue);
  statusBar.color = new ThemeColor("errorForeground");
}

function setStatusBar(
  icon?: string | undefined | null,
  issue?: string | undefined | null
) {
  const brand = isCapabilityEnabled(Capability.ON_BOARDING_CAPABILITY)
    ? "✨ "
    : "";
  const iconText = icon ? ` ${icon}` : "";
  const issueText = issue ? `: ${issue}` : "";

  statusBar.text = `${brand}TabNine${iconText}${issueText}`;
}
