import { FaGithub, FaBlog } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="py-14 bg-neutral-100 text-black border-t border-zinc-300">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <div className="flex justify-center gap-4 mb-4">
          <a
            href="https://github.com/HoyoungParkme"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded bg-black text-white hover:bg-zinc-700 transition"
          >
            <FaGithub /> GitHub
          </a>
          <a
            href="https://hypark.tistory.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded bg-white text-black border border-zinc-300 hover:bg-zinc-100 transition"
          >
            <FaBlog /> 기술 블로그
          </a>
        </div>
        <div className="mt-6 text-sm text-zinc-500">© {new Date().getFullYear()} 박호영. All rights reserved.</div>
      </div>
    </footer>
  );
}
