import Link from "next/link";

import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

import MainNav from "@/components/main-nav";
import Container from "@/components/ui/container";
import NavbarActions from "@/components/navbar-actions";
import getCategories from "@/actions/get-categories";
import NavbarSearch from "@/components/navbar-search";

const Navbar = async () => {
    const categories = await getCategories();

    return (

        <div className="border-b">
            <Container>
                <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
                    <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
                        <p className="font-bold text-xl">UETruyen</p>
                    </Link>
                    <MainNav data={categories} />
                    <NavbarSearch />
                    <NavbarActions />
                    <header className="ml-auto flex items-center gap-x-4">
                        <div className="flex items-center rounded-full px-4 py-2 text-black bg-yellow-500">
                            <SignedOut>
                                <SignInButton />
                            </SignedOut>
                            <SignedIn>
                                <UserButton afterSignOutUrl="/" />
                            </SignedIn>
                        </div>
                    </header>
                </div>
            </Container>
        </div>
    );
};

export default Navbar;