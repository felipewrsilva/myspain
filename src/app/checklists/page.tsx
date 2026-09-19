import { permanentRedirect } from "next/navigation";

/** Checklists vivem dentro das guias. */
export default function ChecklistsIndexRedirect() {
  permanentRedirect("/guias");
}
