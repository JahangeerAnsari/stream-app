import React, { Suspense } from "react";
import { Container } from "./_components/container";
import { Navbar } from "./_components/navbar";
import { Sidebar, SidebarSkeleton } from "./_components/sidebar";
// const  = React.lazy(() => import("./_components/sidebar"));

function ErrorFallback() {
  return <div>Error loading sidebar!</div>;
}

const BrowseLayout = ({ children }: { children: React.ReactNode; }) => {
    return (
      <>
        <Navbar />
        <div className="flex h-full pt-20">
          <Suspense fallback={<SidebarSkeleton/>}>
            {/*  ṣidebar*/}
            <Sidebar/>
            {/* this is containr for fixed size for homepage
                this children belong to homepage we ca adjust the homepage size of sidebar
                */}
          </Suspense>

          <Container>{children}</Container>
        </div>
      </>
    );
}
 
export default BrowseLayout;