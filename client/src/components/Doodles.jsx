export function Doodle({ kind = "star", className = "" }) {
  const drawings = {
    kite: <><path d="M50 12a16 16 0 0 1 16 16v25a16 16 0 0 1-32 0V28a16 16 0 0 1 16-16Z" fill="var(--gold)" /><path d="M27 48v5a23 23 0 0 0 46 0v-5M50 76v25m-15 0h30M39 27h22m-27 9h32m-32 9h32" /><path d="m74 22 7-6m-3 17 10 1" stroke="var(--maroon)" /></>,
    star: <><circle cx="51" cy="20" r="10" fill="var(--gold)" /><path d="M48 32q-12 18-10 38l-18 22m19-31 23 8 19-19M44 39l21 12 7 28m-10-10 16 24M35 97l-18 8m59-7 14 6" fill="none" /><path d="M17 42q9-12 18-10M72 20q10-5 15 3" stroke="var(--blush)" /></>,
    music: <><path d="M35 78V28l43-10v51M35 40l43-10" /><ellipse cx="24" cy="79" rx="12" ry="8" fill="var(--blush)" transform="rotate(-20 24 79)" /><ellipse cx="67" cy="70" rx="12" ry="8" fill="var(--blue)" transform="rotate(-20 67 70)" /><path d="m16 19 2 9m-7-4 12-1M77 96l9 5" /></>,
    masks: <><path d="M43 37q20 9 43-4l-1 31q-7 23-22 26-21-9-22-31Z" fill="var(--blush)" /><path d="m54 53 7 1m12-5 7-2M57 75q10-13 20-7" /><path d="M12 17q23 12 47 3l-4 32q-8 20-23 23Q12 61 12 39Z" fill="var(--gold)" /><path d="m23 35 7 2m12 0 7-1M23 49q13 17 25 1" /></>,
    stage: <><path d="M15 20h70v77H15z" fill="var(--blush)" /><path d="M15 20q14 12 25 31L15 68m70-48Q71 32 60 51l25 17" fill="var(--gold)" /><path d="M15 20h70M50 51v30m-10 0h20M25 97l25-16 25 16" /><path d="m50 30 4 8 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1z" fill="var(--paper)" /></>,
    stageAlt: <><path d="M10 18q20 11 40 0 20 11 40 0M10 18q20 23 40 0 20 23 40 0M10 18v78q10 7 18 0l5-7m-23 7q13 5 23-3m0-74q5 25 0 43l-10 16q-3 8 8 10l9-8m-7-61q1 24-5 42L21 76q-2 7 8 10M90 18v78q-10 7-18 0l-5-7m23 7q-13 5-23-3m0-74q-5 25 0 43l10 16q3 8-8 10l-9-8m7-61q-1 24 5 42l10 18q2 7-8 10M33 96h34m-30-5h28m-24-5 7 5m8-5 7 5" fill="none" /><path d="M10 18q20 11 40 0 20 11 40 0" stroke="var(--gold)" /></>,
    camera: <><circle cx="37" cy="20" r="11" fill="var(--gold)" /><circle cx="63" cy="20" r="11" fill="var(--blush)" /><circle cx="37" cy="20" r="5" fill="var(--paper)" /><circle cx="63" cy="20" r="5" fill="var(--paper)" /><path d="M23 35 77 31l3 32-55 4z" fill="var(--blue)" /><path d="m79 40 11-6 5 3v22l-5 3-10-7M28 42l44-3 1 17-44 3z" fill="var(--paper)" /><circle cx="53" cy="48" r="2" fill="var(--maroon)" /><circle cx="62" cy="48" r="2" fill="var(--maroon)" /><path d="M20 43h-8v8h10m18 16 2 12m18-13 1 13m-21 0-18 43m20-43 1 43m17-43 18 43m-19-43 1 43m-21-44h23" /></>,
    dance: <><circle cx="30" cy="24" r="10" fill="var(--paper)" /><circle cx="70" cy="29" r="9" fill="var(--paper)" /><path d="M25 23h1m9 0h1m-10 6q5 6 11 0m28-2h1m8 0h1m-9 6q5 5 10 0M30 35q-2 19 4 31m35-27q2 18-7 30M30 43 10 32m25 11 19 8m14-12 18-13M37 66q-2 20-18 35m18-35q13 17 13 34m-17-48 18-5m17 23q12 16 24 19m-24-19-15 18m-9-41q8-10 16-3" fill="none" /><path d="m12 85 2 21m-5-21 8 1m57-59V12l10-3v16m-10-13 10-3" /><ellipse cx="74" cy="27" rx="4" ry="3" fill="var(--maroon)" /><ellipse cx="84" cy="24" rx="4" ry="3" fill="var(--maroon)" /><path d="m15 17 2 8m-5-4 8-1" /></>,
    danceAlt: <><circle cx="47" cy="18" r="8" fill="var(--blush)" /><path d="m47 28 10 20-13 14-20-5m23-29 18 4 12-12m-27 28 17 13 21-3m-34-10-18 20-18 3m35-10-2 25 14 13m-30-49L12 44" fill="none" /><path d="m56 48 18-7 10 12-10 13-23-5z" fill="var(--gold)" /></>,
    flower: <><path d="M50 10C30 10 18 25 18 43c0 13 7 20 15 28 4 4 5 8 5 13h24c0-5 2-9 5-13 8-8 15-15 15-28 0-18-12-33-32-33Z" fill="var(--gold)" /><path d="M38 84h24m-21 8h18m-15 8h12M50 2v-9M17 16 9 8m74 8 8-8M12 47H2m96 0H88" /><path d="m40 47 8 8 13-18" stroke="var(--maroon)" /></>,
    ticket: <><path d="M9 30 83 19l3 20q-14 5 3 15l3 19-74 12-3-20q13-8-3-15Z" fill="var(--peach)" /><path d="m28 31 7 44" strokeDasharray="3 5" /><path d="m55 35 5 9 11 1-7 8 2 11-10-5-9 6 1-11-8-7 11-2Z" fill="var(--paper)" /></>,
  };
  return <svg className={`doodle ${className}`} viewBox="0 0 100 120" fill="none" stroke="#744759" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{drawings[kind] || drawings.star}</svg>;
}

export default function DoodleRail() {
  return <div className="doodle-rail" aria-hidden="true">
    {["masks", "dance", "music", "ticket", "camera", "stageAlt"].map((kind, index) => <Doodle key={kind} kind={kind} className={`side-doodle side-doodle-${index + 1}`} />)}
  </div>;
}
