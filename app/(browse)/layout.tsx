import { Container } from "./_components/container";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const BrowseLayout = ({ children }: { children: React.ReactNode; }) => {
    return (
      <>
        <Navbar />
        <div className="flex h-full pt-20">
          {/*  ṣidebar*/}
                <Sidebar />
                {/* this is containr for fixed size for homepage
                this children belong to homepage we ca adjust the homepage size of sidebar
                */}
          <Container>{children}</Container>
        </div>
      </>
    );
}
 
export default BrowseLayout;