import GameBoard from "../components/GameBoard";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-8 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">
        Catch the Emoji!
      </h1>
      <p className="text-center text-lg md:text-xl mb-4 text-gray-700 dark:text-gray-300">
        Tap or click the emojis before they reach the bottom. 10 misses and it’s game over!
      </p>
      <GameBoard />
      <div className="mt-4 text-sm">
        <p className="text-center text-white">
          Email: j.anton.salingua@gmail.com<br />
          © {new Date().getFullYear()} Ton Salingua. All rights reserved.
        </p>
      </div>
    </main>
  );
}