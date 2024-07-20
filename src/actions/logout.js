// RRD Imports
import { redirect } from "react-router-dom";

// Library Imports
import { toast } from "react-toastify";

// Helper Functions
import { deleteItem } from "../helper";

export async function logoutAction() {
    // Delete the user
    deleteItem({
        key: "userName"
    })
    toast.success("You've deleted your account!")
    // Return redirect
    return redirect("/")
}