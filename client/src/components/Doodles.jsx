export function Doodle({ kind = "star", className = "" }) {
  const drawings = {
    kite: <><path d="M50 12a16 16 0 0 1 16 16v25a16 16 0 0 1-32 0V28a16 16 0 0 1 16-16Z" fill="var(--gold)" /><path d="M27 48v5a23 23 0 0 0 46 0v-5M50 76v25m-15 0h30M39 27h22m-27 9h32m-32 9h32" /><path d="m74 22 7-6m-3 17 10 1" stroke="var(--maroon)" /></>,
    star: <><circle cx="51" cy="20" r="10" fill="var(--gold)" /><path d="M48 32q-12 18-10 38l-18 22m19-31 23 8 19-19M44 39l21 12 7 28m-10-10 16 24M35 97l-18 8m59-7 14 6" fill="none" /><path d="M17 42q9-12 18-10M72 20q10-5 15 3" stroke="var(--blush)" /></>,
    music: <><path d="M35 78V28l43-10v51M35 40l43-10" /><ellipse cx="24" cy="79" rx="12" ry="8" fill="var(--blush)" transform="rotate(-20 24 79)" /><ellipse cx="67" cy="70" rx="12" ry="8" fill="var(--blue)" transform="rotate(-20 67 70)" /><path d="m16 19 2 9m-7-4 12-1M77 96l9 5" /></>,
    masks: <><path d="M43 37q20 9 43-4l-1 31q-7 23-22 26-21-9-22-31Z" fill="var(--blush)" /><path d="m54 53 7 1m12-5 7-2M57 75q10-13 20-7" /><path d="M12 17q23 12 47 3l-4 32q-8 20-23 23Q12 61 12 39Z" fill="var(--gold)" /><path d="m23 35 7 2m12 0 7-1M23 49q13 17 25 1" /></>,
    flower: <><path d="M50 10C30 10 18 25 18 43c0 13 7 20 15 28 4 4 5 8 5 13h24c0-5 2-9 5-13 8-8 15-15 15-28 0-18-12-33-32-33Z" fill="var(--gold)" /><path d="M38 84h24m-21 8h18m-15 8h12M50 2v-9M17 16 9 8m74 8 8-8M12 47H2m96 0H88" /><path d="m40 47 8 8 13-18" stroke="var(--maroon)" /></>,
    ticket: <><path d="M9 30 83 19l3 20q-14 5 3 15l3 19-74 12-3-20q13-8-3-15Z" fill="var(--peach)" /><path d="m28 31 7 44" strokeDasharray="3 5" /><path d="m55 35 5 9 11 1-7 8 2 11-10-5-9 6 1-11-8-7 11-2Z" fill="var(--paper)" /></>,
  };
  return <svg className={`doodle ${className}`} viewBox="0 0 100 120" fill="none" stroke="#744759" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{drawings[kind] || drawings.star}</svg>;
}

export default function DoodleRail() {
  return <div className="doodle-rail" aria-hidden="true">
    {["kite", "star", "music", "masks", "flower", "ticket"].map((kind, index) => <Doodle key={kind} kind={kind} className={`side-doodle side-doodle-${index + 1}`} />)}
  </div>;
}
