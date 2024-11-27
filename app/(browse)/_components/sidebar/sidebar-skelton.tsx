import { RecommendedSkelton } from "./recommended";

// SidebarSkeleton.tsx
const SidebarSkeleton = () => {
  return (
    <aside
      className="fixed left-0 flex flex-col w-[70px] lg:w-60
      h-full bg-background border-r border-[#2D2E35] z-50"
    >
      <RecommendedSkelton />
    </aside>
  );
};

export default SidebarSkeleton;
