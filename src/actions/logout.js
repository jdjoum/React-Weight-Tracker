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
    // Delete the weight data
    deleteItem({
        key: "weights"
    })
    // Delete the weight unit
    deleteItem({
        key: "weightUnit"
    })
    // Delete the goal weight
    deleteItem({
        key: "goalWeight"
    })
    // Delete the height
    deleteItem({
        key: "height"
    })
    // Delete the height unit
    deleteItem({
        key: "heightUnit"
    })
    toast.success("You've deleted your account!")
    // Return redirect
    return redirect("/React-Weight-Tracker")
}