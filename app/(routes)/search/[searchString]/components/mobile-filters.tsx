"use client";

import Button from "@/components/ui/button";
import IconButton from "@/components/ui/icon-button";
import { Author, Publisher, Category } from "@/types";
import { Dialog } from "@headlessui/react";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import Filter from "./filter";

interface MobileFiltersProps {
    authors: Author[];
    publishers: Publisher[];
    categories: Category[];
}

const MobileFilters = ({
    authors, publishers, categories
}: MobileFiltersProps) => {

    const [open, setOpen] = useState(false);

    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);

    return (
        <>
            <Button onClick={onOpen} className="flex items-center gap-x-2 lg:hidden">
                Filters
                <Plus size={20} />
            </Button>

            <Dialog open={open} as="div" className="relative z-20 lg:hidden" onClose={onClose}>
                <div className="fixed inset-0 bg-black bg-opacity-25">

                </div>

                <div className="fixed inset-0 z-40 flex">
                    <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                        <div className="flex items-center justify-end px-4">
                            <IconButton icon={<X size={15} onClick={onClose} />} />
                        </div>

                        <div className="p-4">
                            <Filter
                                valueKey="categoryId"
                                name="Categories"
                                data={categories}
                            />
                            <Filter
                                valueKey="authorId"
                                name="Authors"
                                data={authors}
                            />
                            <Filter
                                valueKey="publisherId"
                                name="Publishers"
                                data={publishers}
                            />
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    );
}

export default MobileFilters;