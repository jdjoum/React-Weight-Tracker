import React from 'react'

// RRD Imports
import { Form, NavLink } from "react-router-dom"

// Library Imports
import { TrashIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";

// Assets
import logomark from "/weighing-scale.png"

const Nav = ({ userName }) => {
  return (
    <nav>
        <NavLink to="/weightwise" aria-label="Go to home">
            <img src={logomark} alt="" height={30}/>
            <span>WeightWise</span>
        </NavLink>
        {
            userName && (
                <>
                    <NavLink to="/weightwise/profile" aria-label="Go to profile">
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