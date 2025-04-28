import { Geist, Geist_Mono } from "next/font/google";
import TaskManagerIcon from "@/assets/task_manager_icon.webp";
import Home from "@/components/Home/home";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function TaskManager() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className={geistSans.className}>
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl mt-4 ml-4">
            <div className="flex items-center">
              <img
                src={TaskManagerIcon.src}
                className="mr-3 h-6 sm:h-9"
                alt="TaskManager Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Task Manager
              </span>
            </div>
          </div>
        </nav>
      </header>

      <main className={geistMono.className + " flex-1"}>
        <Home />
      </main>

        <footer className="bg-white rounded-lg shadow-sm m-4 dark:bg-gray-800">
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-center">
            <span className="text-sm text-gray-500 text-center dark:text-gray-400">
              Built with NextJS and TailwindCSS.
            </span>
          </div>
        </footer>
    </div>
  );
}
