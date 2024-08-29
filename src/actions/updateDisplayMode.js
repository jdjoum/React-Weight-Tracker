// RRD Imports
import { redirect } from "react-router-dom";

// Library Imports
import { toast } from "react-toastify";

// Helper Functions
import { deleteItem } from "../helper";

export async function updateDisplayModeAction() {
    const displayMode = JSON.parse(localStorage.getItem("displayMode"));
    toast.success(`You updated the display mode to ${displayMode}!`);
    // Return redirect
    return redirect("/React-Weight-Tracker/")
}