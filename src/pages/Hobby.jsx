import React from "react";
import { useParams } from "react-router";
import Bass from "../assets/bass.jpg";
import Drums from "../assets/drums.jpg";
import guitar from "../assets/guitar.jpg";

const hobbies = [
  {
    id: 1,
    name: "Guitar",
    image:
      guitar,
    description:
      "I play guitar to express my creativity and stay relaxed after a long day.",
    reason:
      "It helps me focus, improves my patience, and lets me create music that feels personal.",
  },
  {
    id: 2,
    name: "Drums",
    image:
      Drums,
    description:
      "I enjoy drums because they are connected to rhythm, energy, and coordination in one powerful instrument.",
    reason:
      "The beat gives me a sense of momentum, and playing along to music keeps me energized and motivated.",
  },
  {
    id: 3,
    name: "Bass",
    color: "from-violet-100 to-fuchsia-100",
    image:
      Bass,
    description:
      "Bass lets me work with groove and harmony, creating the foundation of every song.",
    reason:
      "I enjoy how it ties melody and rhythm together, giving every track a strong and memorable feel.",
  },
];

export default function Hobby() {
  const { id } = useParams();
  const hobby = hobbies.find((item) => String(item.id) === String(id)) ?? hobbies[0];

  return (
    <main className="mx-auto max-w-5xl px-6 py-12 text-slate-800">
      <section className="overflow-hidden border border-slate-200 bg-white shadow-sm">
        <div className={`bg-gradient-to-r ${hobby.color} p-8`}>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-600">
                Hobby
              </p>
              <h1 className="text-4xl font-bold text-slate-900">{hobby.name}</h1>
            </div>
          </div>
        </div>

        <div className="grid gap-8 p-8 md:grid-cols-[1fr_1.1fr] md:p-10">
          <img
            src={hobby.image}
            alt={hobby.name}
            className="h-72 w-full object-cover border border-slate-200"
          />

          <div>
            <p className="text-lg leading-8 text-slate-700">{hobby.description}</p>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              <span className="font-semibold text-slate-900">Why I like it:</span> {hobby.reason}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
