import { getRecommended } from "@/lib/recommended-service";
import { Recommended, RecommendedSkelton } from "./recommended";
import { Toggle } from "./toggle";
import { Wrapper } from "./wrapper";
// wrapper will be client comp
  // sidebar will be server comp i will inject server comp into clinet comp
export const Sidebar = async () => {
    const recommended = await getRecommended();
  return (
    <Wrapper>
      <Toggle />
      {/* render all the recommended users */}
      <div className="space-y-4 pt-4 lg:pt-0">
        <Recommended data={recommended} />
      </div>
    </Wrapper>
  );
};
export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60
    h-full bg-background border-r border-[#2D2E35] z-50">
     <RecommendedSkelton/>
    </aside>
  )
}
