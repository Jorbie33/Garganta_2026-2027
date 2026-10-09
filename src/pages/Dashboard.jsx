import React from "react";
import prof from "../assets/prof.jpeg";


const contacts = [
  {
    label: "Email",
    value: "aljon.garganta03@email.com",
    href: "mailto:aljon.garganta03@email.com",
  },
  {
    label: "Phone",
    value: "09051559121",
    href: "tel:09051559121",
  },
  {
    label: "Facebook",
    value: "Aljon Garganta",
    href: "https://facebook.com/Aljon Garganta",
  },
];

export default function Dashboard() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12 text-slate-800">
      <section className="grid gap-8 border border-rose-200 bg-gradient-to-r from-rose-50 via-white to-amber-50 p-8 md:grid-cols-[1.3fr_0.7fr] md:p-12">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-rose-500">
            Portfolio
          </p>
          <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
            About Me
          </h1>
          <h2 className="mt-4 text-2xl font-semibold text-slate-700">
            Hello! I'm Aljon C. Garganta
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
            I'm a passionate developer with experience in creating responsive,
            user-friendly web applications that solve real problems and bring ideas
            to life.
          </p>

          <div className="mt-8 space-y-2">
            {contacts.map((contact) => (
              <div key={contact.label} className="text-base text-slate-700">
                <span className="font-semibold text-slate-900">{contact.label}:</span>{" "}
                <a href={contact.href} className="text-rose-600 underline underline-offset-2">
                  {contact.value}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <img
            src={prof}
            alt="Profile"
            className="h-52 w-52 rounded-full border-4 border-rose-200 object-cover shadow-sm"
          />
        </div>
      </section>
    </main>
  );
}
