"use client";

import { Search } from "lucide-react";
import { ReactNode } from "react";

interface Props {
    search: string;
    onSearch: (value: string) => void;

    placeholder?: string;

    filterValue?: string;
    onFilterChange?: (value: string) => void;

    filterOptions?: string[];

    actions?: ReactNode;
}

export default function AdminSearch({
    search,
    onSearch,
    placeholder = "Search...",

    filterValue,
    onFilterChange,
    filterOptions,

    actions,
}: Props) {

    return (

        <div
            className="
                mb-8
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
            "
        >

            <div
                className="
                    flex
                    flex-col
                    gap-4
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                "
            >

                {/* Left */}

                <div
                    className="
                        flex
                        flex-1
                        flex-col
                        gap-4
                        md:flex-row
                    "
                >

                    {/* Search */}

                    <div className="relative flex-1">

                        <Search
                            size={18}
                            className="
                                absolute
                                left-4
                                top-1/2
                                -translate-y-1/2
                                text-slate-400
                            "
                        />

                        <input
                            value={search}
                            onChange={(e) =>
                                onSearch(e.target.value)
                            }
                            placeholder={placeholder}
                            className="
                                w-full
                                rounded-xl
                                border
                                border-slate-300
                                bg-white
                                py-3
                                pl-11
                                pr-4
                                outline-none
                                transition
                                focus:border-cyan-500
                            "
                        />

                    </div>

                    {/* Filter */}

                    {filterOptions && onFilterChange && (

                        <select
                            value={filterValue}
                            onChange={(e) =>
                                onFilterChange(e.target.value)
                            }
                            className="
                                rounded-xl
                                border
                                border-slate-300
                                bg-white
                                px-4
                                py-3
                                outline-none
                                transition
                                focus:border-cyan-500
                            "
                        >

                            {filterOptions.map((option) => (

                                <option
                                    key={option}
                                    value={option}
                                >
                                    {option}
                                </option>

                            ))}

                        </select>

                    )}

                </div>

                {/* Right */}

                {actions && (

                    <div
                        className="
                            flex
                            flex-wrap
                            gap-3
                        "
                    >
                        {actions}
                    </div>

                )}

            </div>

        </div>

    );
}