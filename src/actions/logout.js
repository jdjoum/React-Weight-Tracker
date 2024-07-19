// RRD Imports
import { redirect } from "react-router-dom";

// Helper Functions
import { deleteItem } from "../helper";

export async function logoutAction() {
    // Delete the user
    deleteItem({
        key: "userName"
    })
    // Return redirect
    return redirect("/")
}