"use client";

import React, { useState } from "react";
import { AlertWarning } from "../../alert";

type Props = {
    disabled?: boolean;
    acceptTypes: string[];
    onChange: (file: File | null) => void;
    className?: string;
    required: boolean;
    id?: string;
    label?: string;
    maxSize?: number;
};

const FileInput: React.FC<Props> = (props) => {
    const [message, setMessage] = useState("");

    const limitSize = props.maxSize || 2048;
    const acceptTypes = props.acceptTypes.join(",");

    const handleFileInput = (
        event: React.ChangeEvent<HTMLInputElement>,
        callback: (data: File | null) => void
    ): void => {
        const target = event.target;
        const currentFile: File = (target.files as FileList)[0];

        setMessage("");

        if (!props.acceptTypes.includes(currentFile.type)) {
            target.value = "";
            setMessage(
                `'${currentFile.type}' is invalid file type. The allowed file types are ${acceptTypes}`
            );
            callback(null);
            return;
        }

        if (currentFile.size > limitSize * 1024) {
            target.value = "";
            setMessage(`Your file is oversize`);
            callback(null);
            return;
        }

        callback(currentFile);
    };

    return (
        <div className="w-full flex flex-col gap-1 my-2">
            <strong className="text-xs font-bold text-slate-500">{props.label}</strong>
            <input
                type="file"
                className={`text-sm w-full rounded-md p-2 bg-[#505050] bg-opacity-10 border border-white focus:border-slate-500 focus:outline-none ${props.className}`}
                disabled={props.disabled}
                required={props.required || false}
                accept={acceptTypes}
                id={props.id}
                onChange={(e) => handleFileInput(e, props.onChange)}
            />
            {message !== "" && (
                <AlertWarning title="Peringatan">{message}</AlertWarning>
            )}
        </div>
    );
};

export default FileInput;
