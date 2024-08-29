// RRD Imports
import { redirect } from "react-router-dom";

export async function updateDisplayModeAction() {
    location.reload();
    // Return redirect
    redirect("/React-Weight-Tracker/")
    return null
}