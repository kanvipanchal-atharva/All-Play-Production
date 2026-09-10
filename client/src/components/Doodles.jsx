export function Doodle({ kind = "star", className = "" }) {
  const drawings = {
    kite: <><path d="M48 8 80 38 48 77 20 38Z" fill="var(--gold)" /><path d="m48 8 0 69 32-39Z" fill="var(--blush)" /><path d="M20 38h60M48 8v69M48 77c-22 17 25 18 4 38" /><path d="m46 88-12-5 2 12Zm9 14 12-5-2 12Z" fill="var(--blue)" /></>,
    star: <><path d="m48 12 11 25 28 3-21 20 6 28-24-14-25 13 6-28L9 39l28-3Z" fill="var(--gold)" /><path d="m38 48 1 2m19-2 1 2M39 61q10 10 19-1M81 12l-3 10M92 26l-8 3" /></>,
    music: <><path d="M35 78V28l43-10v51M35 40l43-10" /><ellipse cx="24" cy="79" rx="12" ry="8" fill="var(--blush)" transform="rotate(-20 24 79)" /><ellipse cx="67" cy="70" rx="12" ry="8" fill="var(--blue)" transform="rotate(-20 67 70)" /><path d="m16 19 2 9m-7-4 12-1M77 96l9 5" /></>,
    masks: <><path d="M43 37q20 9 43-4l-1 31q-7 23-22 26-21-9-22-31Z" fill="var(--blush)" /><path d="m54 53 7 1m12-5 7-2M57 75q10-13 20-7" /><path d="M12 17q23 12 47 3l-4 32q-8 20-23 23Q12 61 12 39Z" fill="var(--gold)" /><path d="m23 35 7 2m12 0 7-1M23 49q13 17 25 1" /></>,
    flower: <><path d="M49 61q-8 24 1 45m-2-17q-26 0-28-18 21-1 28 18m1 8q22-3 26-18-24 1-26 18" fill="var(--blue)" /><path d="M35 24C23 1 6 24 23 38 0 44 17 65 34 53c-1 26 27 22 26 1 21 12 32-11 11-21 20-16-3-36-17-15-8-21-28-15-19 6Z" fill="var(--blush)" /><circle cx="45" cy="37" r="13" fill="var(--gold)" /></>,
    ticket: <><path d="M9 30 83 19l3 20q-14 5 3 15l3 19-74 12-3-20q13-8-3-15Z" fill="var(--peach)" /><path d="m28 31 7 44" strokeDasharray="3 5" /><path d="m55 35 5 9 11 1-7 8 2 11-10-5-9 6 1-11-8-7 11-2Z" fill="var(--paper)" /></>,
  };
  return <svg className={`doodle ${className}`} viewBox="0 0 100 120" fill="none" stroke="#744759" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{drawings[kind] || drawings.star}</svg>;
}

export default function DoodleRail() {
  return <div className="doodle-rail" aria-hidden="true">
    {["kite", "star", "music", "masks", "flower", "ticket"].map((kind, index) => <Doodle key={kind} kind={kind} className={`side-doodle side-doodle-${index + 1}`} />)}
  </div>;
}
