import React, { useEffect, useState } from 'react'

// RRD Imports
import { Form, NavLink } from "react-router-dom"

// Library Imports
import { TrashIcon, Cog6ToothIcon, MoonIcon, SunIcon } from "@heroicons/react/24/solid";

// Assets
import logomark from "/weighing-scale.png"

const body = document.body;

const Nav = ({ userName }) => {

    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Load the saved theme from localStorage
        const savedMode = JSON.parse(localStorage.getItem("displayMode"));
        if (savedMode === "dark-mode") {
            document.body.setAttribute('data-theme', 'dark');
            setIsDarkMode(true);
        }
    }, []);

    return (
        <nav>
            <NavLink to="/React-Weight-Tracker/" aria-label="Go to home">
                <img src={logomark} alt="" height={30}/>
                <span>WeightWise</span>
            </NavLink>
            <Form method="post" action="updateDisplayMode" onSubmit={(e) => {
                if (body.getAttribute('data-theme') === 'dark') {
                    body.removeAttribute('data-theme');
                    localStorage.setItem("displayMode", JSON.stringify("light-mode"));
                    setIsDarkMode(false);
                } else {
                    body.setAttribute('data-theme', 'dark');
                    localStorage.setItem("displayMode", JSON.stringify("dark-mode"));
                    setIsDarkMode(true);
                }
            }}>
                <button type="submit" className='btn'>
                    {isDarkMode ? <SunIcon width={30} /> : <MoonIcon width={30} />}
                </button>
            </Form>
                
            {
                userName && (
                    <>
                        <NavLink to="/React-Weight-Tracker/profile" aria-label="Go to profile">
                            <Cog6ToothIcon width={30} />
                            <span>Profile</span>
                        </NavLink>
                        <Form method="post" action="logout" onSubmit={(e) => {
                            if(!confirm("Delete user and all data?")) {
                                e.preventDefault();
                            }
                        }}>
                            <button type="submit" className='btn btn--warning'>
                                <span>Delete User</span>
                                <TrashIcon width={20} />
                            </button>
                        </Form>
                    </>
                )
            }
        </nav>
    )
}

export default Nav