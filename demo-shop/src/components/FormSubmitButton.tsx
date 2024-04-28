"use client";

import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type FormSubmitButtonProps = {
    children: React.ReactNode,
    className?: string;
} & ComponentProps<"button">

export default function FromSubmitButton(
    {
        children,
        className,
        ...props
    } : FormSubmitButtonProps
) {
    const {pending} =  useFormStatus();

    return (
        <button
            {...props}
            type="submit"
            className={`btn btn-outline btn-primary btn-block ${className}`}
            disabled={pending}
            >
                {pending && <span className="loading loading-spinner"></span>}
                {children}
        </button>
    )
}