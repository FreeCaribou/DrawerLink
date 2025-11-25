'use client'

import { createLink } from "@/app/actions"

export default function AddLinkForm() {
    return (
        <div>
            <h3 className="text-secondary text-lg">Add a link</h3>
            <form action={createLink}>
                <div>
                    <label htmlFor="label" className="block">Label</label>
                    <input type="text" name="label"
                        className="block rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-secondary"
                    />
                </div>
                <button type="submit"
                    className="mt-2 rounded-md bg-secondary px-3 py-2 text-white"
                >
                    Add
                </button>
            </form>
        </div>
    )
}
