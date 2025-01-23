import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="footer bg-primary text-neutral-content items-center p-4">
        คณะแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย โทร. 02 256 4183 หรือ 02 256 4462
        <Link
          className="link link-accent"
          href="https://www.facebook.com/anandamahidol.day/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Facebook
        </Link>
      </footer>
    </>
  );
}
