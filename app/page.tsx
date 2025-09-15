import { UserForm } from "./components/user";
import VideoPlayer from "./components/VideoPlayer";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] space-y-12">
      <UserForm />
      <VideoPlayer />
    </div>
  );
}
