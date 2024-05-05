"use client"

import { Session } from "next-auth"
import Image from "next/image";
import profilePicPlaceholder from "@/assets/profile-pic-placeholder.png"
import { signIn, signOut } from "next-auth/react";

interface UserMenuButtonProps {
    session: Session | null
}

export default function UserMenuButton({session} : UserMenuButtonProps) {
    const user = session?.user;
    
    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
                {user ? (
                    <Image 
                    src={user?.image || profilePicPlaceholder}
                    alt="profile picture"
                    width={40}
                    height={40}
                    className="w-10 rounded-full"                    
                    />
                ) : (
                    <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                  >
                    {/* <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --> */}
                    {/* <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> */}
                    <path d="M5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12C3 10.8954 3.89543 10 5 10Z" fill="#000000"/>
                    <path d="M12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10Z" fill="#000000"/>
                    <path d="M21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12C17 13.1046 17.8954 14 19 14C20.1046 14 21 13.1046 21 12Z" fill="#000000"/>
                    </svg>
                ) }
            </label>
            <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-sm z-30 mt-3 w-52 bg-base-100 p-2 shadow"
            >
                <li>
                    {user? 
                    <button onClick={() => signOut({callbackUrl: "/"})}>sign out</button>
                    : <button onClick={() => signIn()}>sign in</button>}
                </li>
            </ul>
        </div>
    )
}


// situational questions
// 