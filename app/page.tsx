"use client";

import { useEffect, useRef, useState } from "react";

type Comment = { u: string; t: string; reply?: boolean };

type Post = {
  type: string;
  variant: string;
  lines: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  format?: any;
  art?: string;
  caption: string;
  likes: string;
  note: string;
  comments: Comment[];
  official?: string;
};

const posts: Post[] = [
  {
    type: "post",
    variant: "a",
    lines: ["NOT", "HER", "JOB"],
    format: {
      type: "strike",
      struck: ["HER JOB", "HER JOB"],
      final: "OUR JOB",
    },
    art: "/art/2.jpeg",
    caption:
      "Some things shouldn't be a woman's job alone. Starting today, we're talking to someone new. 🧵",
    likes: "24.8K",
    note: "Opens the takeover on curiosity, not explanation — nobody's named it a 'campaign' yet, so nobody can dismiss it as one.",
    comments: [
      { u: "@priya.reads", t: "wait what is this account doing 👀" },
      { u: "@itsarjun", t: "why am I tagged in a period ad", reply: true },
      { u: "@priya.reads", t: "cause it's about time you learned something 💅", reply: true },
    ],
    official: "stay tuned @itsarjun 👀",
  },
  {
    type: "reel",
    variant: "b",
    lines: ["THE", "AISLE"],
    format: {
      type: "sign",
      pill: "AISLE 4",
      main: "FEMININE CARE",
      hand: "(also him, now)",
    },
    caption: "POV: Papa's on aisle 4, out of his depth, and closer than he thinks 🛍️",
    likes: "61.3K",
    note: "Warmth over shock value, built for reach. This is the one the family group chat forwards without cringing.",
    comments: [
      {
        u: "@rhea.kapoor",
        t: "sent this to my dad. he liked it and said nothing else. progress?? 😭",
      },
      {
        u: "@notarjun",
        t: "not me realising I don't know my sister's flow type",
      },
    ],
    official: "progress is progress 🩷",
  },
  {
    type: "reel",
    variant: "c",
    lines: ["GROUP", "CHAT"],
    format: {
      type: "poll",
      q: "WHO KNOWS?",
      rows: [
        { label: "bro 1", pct: 0 },
        { label: "bro 2", pct: 0 },
        { label: "bro 3", pct: 0 },
      ],
    },
    art: "/art/1.jpeg",
    caption: "The bros were NOT ready for this confession thread 💬",
    likes: "88.9K",
    note: "Fast, deadpan, native meme pacing — built for the 18–24 male audience who'd never tap play on a 'period ad.'",
    comments: [
      { u: "@yourfavdesibro", t: "this is literally my hostel group chat help" },
      { u: "@ananya.writes", t: "forwarding to every boy I know" },
      { u: "@kunal.rao", t: "'that's it?' is sending me 💀" },
    ],
  },
  {
    type: "carousel",
    variant: "a",
    lines: ["TAG", "HIM"],
    format: {
      type: "blank",
      lead: "TAG THE GUY WHO",
      pre: "STILL THINKS",
      blank: "______",
    },
    caption: "Swipe, screenshot, send. You already know who needs this ➡️",
    likes: "15.6K",
    note: "The distribution plan is the format itself — women become the media buy, at zero extra spend.",
    comments: [
      { u: "@sneha.k", t: "@dev.here your turn to learn something" },
      { u: "@dev.here", t: "i got tagged in 4 of these today", reply: true },
      { u: "@meandmyshadow", t: "the group chat forwards are insane rn" },
    ],
  },
  {
    type: "carousel",
    variant: "d",
    lines: ["EXPLAIN", "IT TO", "ME"],
    format: {
      type: "qa",
      q: "what even is it",
      a: "not “just cramps.”",
    },
    art: "/art/7.jpeg",
    caption:
      "No, it's not 'just cramps.' A quick one for the guys who never got the talk.",
    likes: "12.1K",
    note: "Keeps Carmesi's real educational pillar — just re-pointed at a reader the brand has never spoken to.",
    comments: [
      { u: "@confused.energy", t: "genuinely did not know this, thank you" },
      { u: "@priya.reads", t: "school really failed all of us on this one" },
      { u: "@itsarjun", t: "ok this one's actually useful ngl" },
    ],
  },
  {
    type: "post",
    variant: "b",
    lines: ["SCAN.", "LEARN."],
    format: {
      type: "steps",
      steps: ["SCAN", "LEARN", "SAY NOTHING"],
    },
    art: "/art/6.jpeg",
    caption: "Every pack now comes with a favour for him. Scan. Watch alone. No questions asked.",
    likes: "9.4K",
    note: "Removes the real barrier: most men won't ask. So the brand takes the asking off the table.",
    comments: [
      { u: "@dev.here", t: "scanned it. didn't tell anyone. no regrets" },
      { u: "@meandmyshadow", t: "the 'no one has to know' line is such a good call" },
    ],
    official: "that's the whole point 🩷",
  },
  {
    type: "post",
    variant: "c",
    lines: ["TIE ONE", "THAT", "COUNTS"],
    format: {
      type: "tag",
      rows: [
        { k: "TO", v: "HIM" },
        { k: "FROM", v: "HER" },
        { k: "CONTENTS", v: "ONE CLUE" },
      ],
    },
    art: "/art/5.jpeg",
    caption: "This Rakhi, tie one thing that actually protects her: understanding.",
    likes: "33.7K",
    note: "Borrows a festival that already exists instead of inventing an awareness day — instant relevance, zero education cost.",
    comments: [
      { u: "@rakhi.ready", t: "crying this is such a good rakhi idea" },
      { u: "@itsarjun", t: "my sister already sent me this, I know what's coming 😭" },
      { u: "@ananya.writes", t: "understanding > another rakhi gift set" },
    ],
  },
  {
    type: "post",
    variant: "a",
    lines: ["NOT", "OVER", "IT"],
    format: {
      type: "quote",
      text: "now i just KNOW.",
      highlight: "KNOW.",
      meta: "— a DM, 2:14 AM",
    },
    art: "/art/3.jpeg",
    caption:
      "'I didn't know until my sister sent me a reel. Now I just… know.' — a DM we're not over 🥹",
    likes: "21.0K",
    note: "Manufactured proof that the mechanic works — shows forwarding happening in the wild, not just hoped for.",
    comments: [
      { u: "@thatonecousin", t: "wait is this about me" },
      { u: "@rhea.kapoor", t: "no but real, my brother finally gets it now" },
      { u: "@notarjun", t: "the dm mention is unhinged (affectionate)" },
    ],
  },
  {
    type: "post",
    variant: "d",
    lines: ["SOMETHING'S", "CHANGING"],
    format: {
      type: "redacted",
      bars: 3,
      word: "CHANGING.",
    },
    art: "/art/4.jpeg",
    caption: "Something's changing on this page. Not for the algorithm — for the group chat 👀",
    likes: "7.8K",
    note: "One beat of curiosity before the reveal — the only post in the sequence built to be seen before launch, not after.",
    comments: [
      { u: "@priya.reads", t: "the suspense is killing me what is happening on this page" },
      { u: "@kunal.rao", t: "did carmesi start posting for men now?? 👀" },
      { u: "@sneha.k", t: "yes and it's about time", reply: true },
    ],
  },
];

const highlightsData = [
  { icon: "🔴", label: "Not Her Job" },
  { icon: "🛍️", label: "The Aisle" },
  { icon: "💬", label: "Group Chat" },
  { icon: "❓", label: "FAQs" },
  { icon: "🎀", label: "Rakhi" },
];

const cloud = (cx: number, cy: number, s = 1, cls = "scene-cloud") => (
  <g key={`c-${cx}-${cy}-${cls}`} transform={`translate(${cx} ${cy}) scale(${s})`}>
    <ellipse className={cls} cx="-10" cy="0" rx="8" ry="6" />
    <ellipse className={cls} cx="0" cy="-4" rx="11" ry="8" />
    <ellipse className={cls} cx="11" cy="0" rx="8" ry="6" />
    <rect className={cls} x="-16" y="-2" width="34" height="9" rx="4.5" />
  </g>
);

const figure = (cx: number, cy: number, s = 1) => (
  <g key={`f-${cx}-${cy}`} transform={`translate(${cx} ${cy}) scale(${s})`}>
    {/* hair falling behind, past the shoulders */}
    <path
      className="scene-hair soft"
      d="M-9 -3 C -13 6, -12 18, -6 26 L 6 26 C 12 18, 13 6, 9 -3 C 9 -3, 0 -9, -9 -3 Z"
    />
    {/* face */}
    <circle className="scene-skin" cx="0" cy="-5" r="8.5" />
    {/* bangs, arcing above the brow only */}
    <path className="scene-hair" d="M-8 -8 C -5 -13, 5 -13, 8 -8 C 5 -10.5, -5 -10.5, -8 -8 Z" />
    {/* side locks framing the cheeks */}
    <path className="scene-hair" d="M-8.5 -8 C -10.5 -2, -9.5 6, -6.5 11 L -8.5 11 C -11.5 5, -11.5 -3, -9.5 -9.5 Z" />
    <path className="scene-hair" d="M8.5 -8 C 10.5 -2, 9.5 6, 6.5 11 L 8.5 11 C 11.5 5, 11.5 -3, 9.5 -9.5 Z" />
    {/* big eyes, looking up */}
    <circle className="scene-eye" cx="-3.2" cy="-6.5" r="1.5" />
    <circle className="scene-eye" cx="3.2" cy="-6.5" r="1.5" />
  </g>
);

const rain = (xStart: number, xEnd: number, yTop: number, yBottom: number, count: number, cls = "scene-rain") => {
  const arr = [];
  for (let i = 0; i < count; i++) {
    const x = xStart + (xEnd - xStart) * (i / (count - 1 || 1));
    arr.push(<line key={`r-${cls}-${x}-${i}`} className={cls} x1={x} y1={yTop} x2={x - 1.5} y2={yBottom} />);
  }
  return arr;
};

const sceneFor = (index: number) => {
  switch (index) {
    case 0: // NOT HER JOB — two figures, sharing one cloud
      return (
        <>
          {cloud(50, 22, 1.3)}
          {rain(32, 68, 30, 66, 7)}
          {figure(35, 90, 0.9)}
          {figure(65, 90, 0.9)}
        </>
      );
    case 1: // THE AISLE — shelves, one small cloud
      return (
        <>
          {[55, 65, 75, 85].map((x, i) => (
            <line key={`shelf-${i}`} className="scene-line" x1={x} y1="8" x2={x} y2="96" />
          ))}
          {cloud(30, 20, 0.8)}
          {rain(25, 35, 28, 62, 4)}
          {figure(30, 90, 0.85)}
        </>
      );
    case 2: // GROUP CHAT — speech-bubble cloud, three small figures
      return (
        <>
          {cloud(55, 22, 1.2)}
          <path className="scene-cloud" d="M50 30 l6 9 l6 -7 z" />
          {rain(35, 65, 34, 72, 6)}
          {figure(25, 92, 0.55)}
          {figure(50, 94, 0.6)}
          {figure(75, 92, 0.55)}
        </>
      );
    case 3: // TAG HIM — pointing arm, redirected rain
      return (
        <>
          {cloud(42, 20, 1.05)}
          {rain(20, 52, 30, 64, 5)}
          <path className="scene-accent-line" d="M50 76 L74 58" />
          <circle className="scene-dot" cx="76" cy="56" r="1.6" />
          {figure(45, 90, 0.9)}
        </>
      );
    case 4: // EXPLAIN IT TO ME — two figures, deliberate rain between
      return (
        <>
          {cloud(50, 20, 0.85)}
          {rain(45, 55, 28, 58, 3)}
          {figure(32, 90, 0.8)}
          {figure(68, 90, 0.8)}
        </>
      );
    case 5: // SCAN. LEARN. — phone screen, rays instead of rain
      return (
        <>
          <rect className="scene-line" x="44" y="55" width="12" height="19" rx="2" />
          <path className="scene-accent-line" d="M46 54 L40 42" />
          <path className="scene-accent-line" d="M50 52 L50 38" />
          <path className="scene-accent-line" d="M54 54 L60 42" />
          {figure(50, 88, 0.95)}
        </>
      );
    case 6: // TIE ONE THAT COUNTS — thread between wrists
      return (
        <>
          {cloud(30, 20, 0.75)}
          {cloud(70, 20, 0.75)}
          {rain(26, 34, 28, 50, 2)}
          {rain(66, 74, 28, 50, 2)}
          <path className="scene-accent-line" d="M40 78 Q50 66 60 78" />
          {figure(35, 90, 0.85)}
          {figure(65, 90, 0.85)}
        </>
      );
    case 7: // NOT OVER IT — message-bubble cloud, tear-glint rain
      return (
        <>
          {cloud(50, 22, 1.1)}
          <path className="scene-cloud" d="M45 30 l5 9 l5 -8 z" />
          {rain(40, 60, 34, 66, 4, "scene-rain accent")}
          <circle className="scene-dot" cx="40" cy="66" r="1.3" />
          <circle className="scene-dot" cx="60" cy="66" r="1.3" />
          <path className="scene-line" d="M46 84 Q50 80 54 84" />
          {figure(50, 90, 0.95)}
        </>
      );
    case 8: // SOMETHING'S CHANGING — one solid cloud, one unfinished
      return (
        <>
          {cloud(35, 20, 0.9)}
          {cloud(65, 20, 0.9, "scene-cloud-outline")}
          {rain(28, 42, 30, 58, 3)}
          {figure(50, 90, 0.95)}
        </>
      );
    default:
      return null;
  }
};

const SceneArt = ({ index }: { index: number }) => (
  <svg className="decor-art" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    {sceneFor(index)}
  </svg>
);

const BrandMark = ({ big = false }: { big?: boolean }) => (
  <div className={`brandmark${big ? " brandmark-lg" : ""}`} aria-hidden="true">
    <span className="bm-my">my</span>
    <span className="bm-carmesi">CARMESI</span>
  </div>
);

export default function Home() {
  const [activePost, setActivePost] = useState<(typeof posts)[0] | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<Post>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<Post>>(new Set());
  const [likedOfficial, setLikedOfficial] = useState<Set<Post>>(new Set());
  const [likedComments, setLikedComments] = useState<Set<Comment>>(new Set());
  const [shareToast, setShareToast] = useState(false);
  const commentsRef = useRef<HTMLDivElement | null>(null);

  const toggleInSet = <T,>(setFn: React.Dispatch<React.SetStateAction<Set<T>>>, item: T) => {
    setFn((prev) => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  };

  const reelIcon = `<svg width="15" height="15" viewBox="0 0 24 24" fill="#33424C"><path d="M8 5v14l11-7z"/></svg>`;
  const carouselIcon = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#33424C" stroke-width="2"><rect x="7" y="7" width="14" height="14" rx="2.5"/><path d="M4 14V6a2 2 0 0 1 2-2h8"/></svg>`;

  const dropMark = (color: string, size = 14) => `<svg class="drop-mark" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}"><path d="M12 2C12 2 5 12 5 16a7 7 0 0 0 14 0c0-4-7-14-7-14z"/></svg>`;

  const avatarPalette = [
    "#C81E3A",
    "#4A1622",
    "#B87A1B",
    "#5C7A6B",
    "#3A5A8C",
    "#8C4A6B",
    "#6B5B3A",
  ];
  const avatarColor = (seed: number) => avatarPalette[seed % avatarPalette.length];

  const renderHeadline = (post: (typeof posts)[0], big = false) => (
    <span className={`lines pop-lines${big ? " pop-lg" : ""}`}>
      {post.lines.map((l, j) => (
        <div key={j}>{l}</div>
      ))}
    </span>
  );

  const renderFormatDetail = (post: (typeof posts)[0]) => {
    const f = post.format;
    if (!f) return null;
    const cls = `fmt fmt-detail fmt-${f.type}`;
    switch (f.type) {
      case "strike":
        return (
          <div className={cls}>
            {f.struck.map((s: string, i: number) => (
              <div className="fmt-strike-line" key={i}>{s}</div>
            ))}
            <div className="fmt-strike-final">{f.final}</div>
          </div>
        );
      case "sign":
        return (
          <div className={cls}>
            <div className="fmt-pill">{f.pill}</div>
            <div className="fmt-sign-main">{f.main}</div>
            <div className="fmt-sign-note">{f.hand}</div>
          </div>
        );
      case "poll":
        return (
          <div className={cls}>
            <div className="fmt-poll-q">{f.q}</div>
            {f.rows.map((r: { label: string; pct: number }, i: number) => (
              <div className="fmt-poll-row" key={i}>
                <span className="fmt-poll-label">{r.label}</span>
                <span className="fmt-poll-bar"><i style={{ width: `${Math.max(r.pct, 4)}%` }} /></span>
                <span className="fmt-poll-pct">{r.pct}%</span>
              </div>
            ))}
          </div>
        );
      case "blank":
        return (
          <div className={cls}>
            <div>{f.lead}</div>
            <div>{f.pre} <span className="fmt-underline">{f.blank}</span></div>
          </div>
        );
      case "qa":
        return (
          <div className={cls}>
            <div className="fmt-qa-row"><b>Q:</b> {f.q}</div>
            <div className="fmt-qa-row"><b>A:</b> {f.a}</div>
          </div>
        );
      case "steps":
        return (
          <div className={cls}>
            {f.steps.map((s: string, i: number) => (
              <div className="fmt-step" key={i}>
                <span className="fmt-step-num">{i + 1}</span>{s}
              </div>
            ))}
          </div>
        );
      case "tag":
        return (
          <div className={cls}>
            {f.rows.map((r: { k: string; v: string }, i: number) => (
              <div className="fmt-tag-row" key={i}>
                <span className="fmt-tag-k">{r.k}:</span> {r.v}
              </div>
            ))}
          </div>
        );
      case "quote":
        return (
          <div className={cls}>
            <div className="fmt-quote-text">
              &ldquo;{f.text.replace(f.highlight, "")}<mark className="fmt-mark">{f.highlight}</mark>&rdquo;
            </div>
            <div className="fmt-quote-meta">{f.meta}</div>
          </div>
        );
      case "redacted":
        return (
          <div className={cls}>
            <div className="fmt-redacted-bars">
              {Array.from({ length: f.bars }).map((_, i) => (
                <span className="fmt-bar" key={i} />
              ))}
            </div>
            <div className="fmt-redacted-word">…{f.word}</div>
          </div>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    // Keyboard navigation
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activePost) {
          setActivePost(null);
        }
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [activePost]);

  return (
    <>
      <style>{`
        :root{
          --bg:#1B0A0F;
          --bg-2:#240D14;
          --paper:#FFFFFF;
          --ink:#221114;
          --crimson:#C81E3A;
          --crimson-deep:#8C1029;
          --plum:#4A1622;
          --gold:#E8A33D;
          --brand-black:#111111;
          --muted:#8B7378;
          --line:#ECE4E6;
          --font-display:'Bebas Neue', Impact, sans-serif;
          --font-body:'Inter', system-ui, -apple-system, sans-serif;
          --font-note:'Caveat', cursive;
          --font-pop:var(--font-luckiest-guy), var(--font-display);

          --maroon-1:#3B0A10;
          --maroon-2:#4C0F16;
          --maroon-3:#2A060B;
          --gold:#F2C230;
          --gold-soft:#E9B94A;
          --outline-maroon:#5C1018;

          --ill-bg-a:#DCE7EC;
          --ill-bg-b:#D2E1E8;
          --ill-bg-c:#E3EEF2;
          --ill-bg-d:#CEDFE7;
          --ill-line:#54697A;
          --ill-ink:#33424C;
          --ill-accent:#C81E3A;
        }

        .stage{
          max-width:1400px;
          margin:0 auto;
          padding:40px 20px;
          display:flex;
          flex-direction:column;
          align-items:center;
        }

        .watermark{
          position:fixed;
          top:50%; left:50%;
          transform:translate(-50%,-50%) rotate(-8deg);
          font-family:var(--font-display);
          font-size:min(22vw, 320px);
          color:rgba(255,255,255,0.025);
          letter-spacing:6px;
          pointer-events:none;
          white-space:nowrap;
          z-index:0;
        }

        .layout{
          display:flex;
          gap:44px;
          align-items:flex-start;
          justify-content:center;
          width:100%;
          margin-top:0;
          position:relative;
          z-index:1;
        }

        /* ---------- DEVICE CARD ---------- */
        .phone-wrap{flex-shrink:0;}
        .phone{
          width:600px;
          border-radius:22px;
          box-shadow:0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06);
          overflow:hidden;
        }
        .screen{
          background:var(--paper);
          color:var(--ink);
          padding-top:14px;
        }

        .handle-row{
          display:flex; align-items:center; gap:5px;
          padding:2px 16px 0;
          font-weight:700; font-size:15px;
        }
        .verified{width:14px;height:14px;flex-shrink:0;}
        .lock-icon{width:11px;height:11px;opacity:.55;margin-left:2px;}

        .profile-row{
          display:flex; align-items:center; gap:18px;
          padding:12px 16px 4px;
        }
        .avatar{
          width:74px; height:74px; border-radius:50%;
          background:linear-gradient(135deg,var(--crimson),var(--brand-black) 75%);
          display:flex; align-items:center; justify-content:center;
          font-family:var(--font-display);
          font-size:30px; color:var(--paper);
          flex-shrink:0;
          box-shadow:inset 0 0 0 3px #fff, 0 0 0 1px var(--line);
        }
        .stats{display:flex; flex:1; justify-content:space-around;}
        .stat{text-align:center;}
        .stat b{display:block; font-size:16px; font-weight:700;}
        .stat span{font-size:11px; color:var(--muted);}

        .bio{
          padding:10px 16px 0;
          font-size:12.5px;
          line-height:1.6;
          white-space:pre-line;
        }
        .bio strong{font-weight:700;}
        .bio .tag{color:var(--crimson); font-weight:600;}

        .buttons-row{display:flex; gap:8px; padding:12px 16px 14px;}
        .btn{
          flex:1; text-align:center; padding:7px 0; border-radius:8px;
          font-size:12.5px; font-weight:600; border:none;
        }
        .btn.primary{background:var(--crimson); color:#fff;}
        .btn.secondary{background:#F1EEEF; color:var(--ink);}

        .highlights{
          display:flex; gap:16px; padding:2px 16px 16px;
          overflow-x:auto;
        }
        .highlight{
          display:flex; flex-direction:column; align-items:center; gap:5px;
          flex-shrink:0;
        }
        .h-circle{
          width:54px; height:54px; border-radius:50%;
          border:1.5px solid var(--line);
          display:flex; align-items:center; justify-content:center;
          font-size:20px; background:#FAFAFA;
        }
        .highlight span{font-size:9.5px; color:var(--muted); text-align:center; max-width:56px;}

        .tabs{display:flex; border-top:1px solid var(--line);}
        .tab{
          flex:1; text-align:center; padding:11px 0; opacity:.35;
        }
        .tab.active{opacity:1; border-top:1.4px solid var(--ink); margin-top:-1px;}
        .tab svg{width:19px; height:19px; display:block; margin:0 auto;}

        .grid{
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:2px;
          background:var(--line);
        }
        .tile{
          aspect-ratio:1;
          position:relative;
          border:0; margin:0; cursor:pointer;
          padding:11px;
          display:flex; flex-direction:column; justify-content:flex-end;
          overflow:hidden;
          font-family:var(--font-display);
          text-align:left;
          -webkit-tap-highlight-color:transparent;
          transition:transform .18s ease, filter .18s ease;
          opacity:0;
          animation:tileIn .5s ease forwards;
        }
        .tile:hover{transform:scale(0.96);}
        .tile:focus-visible{outline:3px solid var(--gold); outline-offset:-3px; z-index:2;}
        .tile.active{outline:3px solid var(--gold); outline-offset:-3px; z-index:2;}
        .tile .lines div{font-size:clamp(13px,4vw,18px); line-height:0.92; letter-spacing:0.3px;}
        .tile .icon-corner{position:absolute; top:8px; left:8px; opacity:.92;}
        .tile .drop-mark{position:absolute; bottom:9px; right:9px; opacity:.9;}

        /* ---------- TEXT FORMAT TREATMENTS ---------- */
        .fmt{font-family:var(--font-body); width:100%;}
        .fmt-lg{font-size:1.5em;}

        .fmt-strike-line{
          font-size:clamp(10px,2.6vw,13px); text-decoration:line-through;
          opacity:.55; letter-spacing:.5px; text-transform:uppercase;
        }
        .fmt-strike-final{
          font-family:var(--font-display); font-size:clamp(16px,5vw,22px);
          letter-spacing:.5px; margin-top:2px;
        }
        .fmt-lg .fmt-strike-line{font-size:15px;}
        .fmt-lg .fmt-strike-final{font-size:30px;}

        .fmt-pill{
          display:inline-block; font-size:9px; font-weight:700; letter-spacing:1px;
          border:1px solid currentColor; border-radius:20px; padding:2px 8px;
          opacity:.85; margin-bottom:5px;
        }
        .fmt-sign-main{
          font-family:var(--font-display); font-size:clamp(14px,4vw,18px);
          letter-spacing:.5px; line-height:1;
        }
        .fmt-sign-note{
          font-family:var(--font-note); font-size:clamp(12px,3vw,15px);
          opacity:.85; margin-top:3px;
        }
        .fmt-lg .fmt-pill{font-size:11px; padding:3px 10px;}
        .fmt-lg .fmt-sign-main{font-size:26px;}
        .fmt-lg .fmt-sign-note{font-size:20px;}

        .fmt-poll-q{
          font-family:var(--font-display); font-size:clamp(12px,3.4vw,15px);
          letter-spacing:.5px; margin-bottom:5px;
        }
        .fmt-poll-row{display:flex; align-items:center; gap:5px; margin-top:3px;}
        .fmt-poll-label{font-size:8.5px; width:26px; flex-shrink:0; opacity:.8; text-transform:uppercase;}
        .fmt-poll-bar{flex:1; height:4px; background:currentColor; opacity:.2; border-radius:3px; overflow:hidden; position:relative;}
        .fmt-poll-bar i{position:absolute; left:0; top:0; bottom:0; background:currentColor; opacity:1; display:block;}
        .fmt-poll-pct{font-size:8.5px; opacity:.7; width:22px; text-align:right; flex-shrink:0;}
        .fmt-lg .fmt-poll-q{font-size:22px;}
        .fmt-lg .fmt-poll-label, .fmt-lg .fmt-poll-pct{font-size:12px;}

        .fmt-underline{text-decoration:underline; text-underline-offset:3px;}
        .fmt-blank{font-family:var(--font-display); font-size:clamp(13px,3.6vw,17px); letter-spacing:.4px; line-height:1.1;}
        .fmt-lg.fmt-blank{font-size:26px;}

        .fmt-qa-row{
          font-family:var(--font-body); font-size:clamp(10px,2.8vw,12.5px);
          line-height:1.4; margin-top:3px;
        }
        .fmt-qa-row b{font-family:var(--font-display); margin-right:3px;}
        .fmt-lg .fmt-qa-row{font-size:16px;}

        .fmt-step{
          display:flex; align-items:center; gap:6px;
          font-family:var(--font-display); font-size:clamp(11px,3vw,14px);
          letter-spacing:.4px; margin-top:2px;
        }
        .fmt-step-num{
          display:inline-flex; align-items:center; justify-content:center;
          width:15px; height:15px; border-radius:50%; border:1px solid currentColor;
          font-size:8px; flex-shrink:0;
        }
        .fmt-lg .fmt-step{font-size:20px;}
        .fmt-lg .fmt-step-num{width:22px; height:22px; font-size:11px;}

        .fmt-tag{border:1px dashed currentColor; border-radius:4px; padding:8px 9px; opacity:.95;}
        .fmt-tag-row{font-size:clamp(9px,2.4vw,11px); letter-spacing:.3px; margin-top:2px;}
        .fmt-tag-k{font-weight:700; opacity:.7;}
        .fmt-lg .fmt-tag{padding:14px 16px;}
        .fmt-lg .fmt-tag-row{font-size:15px;}

        .fmt-quote-text{
          font-family:var(--font-note); font-size:clamp(14px,4vw,19px);
          line-height:1.25;
        }
        .fmt-mark{background:transparent; color:inherit; text-decoration:underline wavy currentColor;}
        .fmt-quote-meta{font-size:9px; opacity:.65; margin-top:4px;}
        .fmt-lg .fmt-quote-text{font-size:26px;}
        .fmt-lg .fmt-quote-meta{font-size:13px;}

        .fmt-redacted-bars{display:flex; gap:4px; margin-bottom:6px;}
        .fmt-bar{height:9px; flex:1; background:currentColor; opacity:.85; border-radius:2px;}
        .fmt-redacted-word{
          font-family:var(--font-display); font-size:clamp(13px,3.6vw,17px);
          letter-spacing:.4px; opacity:.9;
        }
        .fmt-lg .fmt-bar{height:14px;}
        .fmt-lg .fmt-redacted-word{font-size:26px;}

        .v-a, .v-b, .v-c, .v-d{color:var(--ill-ink); box-shadow:inset 0 0 0 1px rgba(51,66,76,0.1);}
        .v-a{background:linear-gradient(160deg, var(--ill-bg-c), var(--ill-bg-a) 70%);}
        .v-b{background:linear-gradient(160deg, var(--ill-bg-a), var(--ill-bg-b) 70%);}
        .v-c{background:linear-gradient(160deg, var(--ill-bg-c), var(--ill-bg-d) 70%);}
        .v-d{background:linear-gradient(160deg, var(--ill-bg-b), var(--ill-bg-d) 70%);}

        /* ---------- POP HEADLINE + SCENE ART + WORDMARK ---------- */
        .pop-lines{position:relative; z-index:2;}
        .pop-lines div{
          font-family:var(--font-pop);
          color:var(--ill-accent);
          -webkit-text-stroke:0.6px var(--ill-ink);
          text-shadow:1.5px 1.5px 0 rgba(255,255,255,0.7);
          line-height:0.92;
          letter-spacing:.3px;
        }
        .pop-lg div{font-size:clamp(30px,7.5vw,44px) !important;}

        .decor-art{position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:0;}
        img.decor-art.tile-photo{object-fit:cover;}
        .art-overlay{
          position:absolute; inset:0; z-index:0; pointer-events:none;
          background:linear-gradient(to top, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.2) 42%, rgba(0,0,0,0) 68%);
        }
        .tile.has-art .bm-my, .post-art.has-art .bm-my{color:#fff;}
        .tile.has-art .bm-carmesi, .post-art.has-art .bm-carmesi{color:#fff; opacity:.85;}
        .post-art.has-art .fmt-detail{color:#fff;}
        .tile.has-art .pop-lines div, .post-art.has-art .pop-lines div{
          text-shadow:0 2px 8px rgba(0,0,0,0.6), 0 0 2px rgba(0,0,0,0.4);
        }
        .scene-cloud{fill:var(--ill-line); opacity:.5;}
        .scene-cloud.solid-accent{fill:var(--ill-accent); opacity:.35;}
        .scene-cloud-outline{fill:none; stroke:var(--ill-line); stroke-width:1; stroke-dasharray:2.5 2.2; opacity:.55;}
        .scene-rain{stroke:var(--ill-line); stroke-width:1; opacity:.5; stroke-linecap:round;}
        .scene-rain.accent{stroke:var(--ill-accent); opacity:.6;}
        .scene-hair{fill:var(--ill-ink); opacity:.85;}
        .scene-hair.soft{opacity:.55;}
        .scene-skin{fill:var(--ill-bg-a); opacity:.9; stroke:var(--ill-ink); stroke-width:.6;}
        .scene-eye{fill:var(--ill-ink);}
        .scene-line{stroke:var(--ill-line); stroke-width:.8; opacity:.45; fill:none;}
        .scene-accent-line{stroke:var(--ill-accent); stroke-width:1.1; opacity:.7; fill:none; stroke-linecap:round;}
        .scene-dot{fill:var(--ill-accent); opacity:.6;}

        .brandmark{
          position:absolute; top:8px; right:9px; text-align:right;
          z-index:1; opacity:.5; pointer-events:none; line-height:1;
        }
        .bm-my{display:block; font-family:var(--font-note); font-size:10px; color:var(--ill-accent);}
        .bm-carmesi{display:block; font-family:var(--font-body); font-weight:700; font-size:8.5px; letter-spacing:1.6px; color:var(--ill-ink); margin-top:1px;}
        .brandmark-lg{top:14px; right:16px;}
        .brandmark-lg .bm-my{font-size:16px;}
        .brandmark-lg .bm-carmesi{font-size:13px; letter-spacing:2.2px;}

        .fmt-detail{
          position:relative; z-index:2; margin-top:10px;
          color:var(--ill-ink); opacity:.9;
        }

        @keyframes tileIn{
          from{opacity:0; transform:translateY(8px) scale(0.98);}
          to{opacity:1; transform:translateY(0) scale(1);}
        }
        .tile:nth-child(1){animation-delay:.05s;}
        .tile:nth-child(2){animation-delay:.11s;}
        .tile:nth-child(3){animation-delay:.17s;}
        .tile:nth-child(4){animation-delay:.23s;}
        .tile:nth-child(5){animation-delay:.29s;}
        .tile:nth-child(6){animation-delay:.35s;}
        .tile:nth-child(7){animation-delay:.41s;}
        .tile:nth-child(8){animation-delay:.47s;}
        .tile:nth-child(9){animation-delay:.53s;}

        /* ---------- NOTE PANEL ---------- */
        .note-panel{
          width:320px;
          flex-shrink:0;
          position:sticky;
          top:40px;
        }
        .note-empty{
          font-family:var(--font-note);
          font-size:21px;
          color:#E9D8DC;
          opacity:.8;
          text-align:center;
          padding:70px 18px 0;
          line-height:1.4;
        }
        .note-content{
          background:var(--paper);
          color:var(--ink);
          border-radius:3px;
          padding:22px 22px 24px;
          position:relative;
          transform:rotate(-1.4deg);
          box-shadow:0 25px 50px rgba(0,0,0,0.45);
        }
        .note-content::before{
          content:"";
          position:absolute;
          top:-12px; left:50%; transform:translateX(-50%) rotate(-3deg);
          width:64px; height:22px;
          background:rgba(232,163,61,0.55);
          box-shadow:0 2px 4px rgba(0,0,0,0.15);
        }
        .note-close{
          position:absolute; top:10px; right:12px;
          background:none; border:none; font-size:18px;
          color:var(--muted); cursor:pointer; line-height:1;
          padding:4px;
        }
        .note-label{font-size:10.5px; letter-spacing:1.6px; color:var(--gold-deep,#B87A1B); font-weight:700;}
        .note-text{
          font-family:var(--font-note);
          font-size:20px; line-height:1.35;
          color:var(--crimson-deep);
          margin-top:6px;
        }

        .backdrop{
          display:none;
          position:fixed; inset:0;
          background:rgba(10,4,6,0.6);
          z-index:40;
          opacity:0; pointer-events:none;
          transition:opacity .25s ease;
        }

        /* ---------- POST DETAIL VIEW ---------- */
        #postView[hidden], #profileView[hidden]{display:none;}
        #postView{animation:viewIn .35s ease;}
        @keyframes viewIn{ from{opacity:0; transform:translateX(10px);} to{opacity:1; transform:translateX(0);} }

        .post-header{display:flex; align-items:center; gap:10px; padding:14px 14px 8px;}
        .back-btn{background:none; border:none; padding:4px; cursor:pointer; color:var(--ink); display:flex;}
        .post-header .handle-mini{font-weight:700; font-size:13.5px; flex:1; display:flex; align-items:center; gap:5px;}
        .post-header .handle-mini svg{width:12px;height:12px;}
        .post-header .more{opacity:.4; font-size:18px; letter-spacing:1px;}

        .post-art{
          width:100%; position:relative;
          font-family:var(--font-display);
          display:flex; align-items:flex-end;
          padding:18px; overflow:hidden;
        }
        .post-art.is-post{aspect-ratio:1/1;}
        .post-art.is-reel{aspect-ratio:4/5;}
        .post-art .lines div{font-size:clamp(22px,7vw,32px); line-height:0.92;}
        .post-art .icon-corner{position:absolute; top:14px; left:14px;}
        .post-art-body{position:relative; z-index:2;}
        .post-art .drop-mark{position:absolute; bottom:14px; right:14px; opacity:.9;}

        .post-actions{display:flex; align-items:center; gap:14px; padding:12px 16px 2px; color:var(--ink);}
        .post-actions svg{width:21px; height:21px;}
        .post-actions .spacer{flex:1;}

        .icon-btn{
          background:none; border:none; padding:0; margin:0;
          display:inline-flex; color:inherit; cursor:pointer;
          -webkit-tap-highlight-color:transparent;
        }
        .icon-btn svg{transition:transform .15s ease;}
        .icon-btn:active svg{transform:scale(0.8);}
        .icon-btn.liked svg, .icon-btn.saved svg{animation:iconPop .3s ease;}
        @keyframes iconPop{0%{transform:scale(1);} 35%{transform:scale(1.28);} 65%{transform:scale(0.92);} 100%{transform:scale(1);}}

        .share-wrap{position:relative; display:inline-flex;}
        .share-toast{
          position:absolute; bottom:28px; left:50%; transform:translateX(-50%);
          background:var(--ink); color:#fff; font-size:9.5px; font-weight:600;
          padding:4px 9px; border-radius:6px; white-space:nowrap;
          animation:toastIn .18s ease; pointer-events:none;
        }
        @keyframes toastIn{ from{opacity:0; transform:translate(-50%,4px);} to{opacity:1; transform:translate(-50%,0);} }

        .post-likes{padding:8px 16px 0; font-size:12.5px; font-weight:700;}
        .you-liked{color:var(--crimson); font-weight:600;}
        .post-caption{padding:5px 16px 4px; font-size:12.5px; line-height:1.5;}
        .post-caption b{font-weight:700; margin-right:5px;}

        .post-comments{padding:6px 16px 20px; min-height:36px;}
        .comment{
          display:flex; gap:9px; padding:7px 0; align-items:flex-start;
          opacity:0; transform:translateY(6px);
          animation:commentIn .4s ease forwards;
        }
        .comment.reply{padding-left:32px;}
        .c-avatar{
          width:25px; height:25px; border-radius:50%; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
          font-size:10px; font-weight:700; color:#fff;
        }
        .c-body{flex:1; font-size:12.5px; line-height:1.45; padding-top:1px;}
        .c-body b{font-weight:700; margin-right:5px;}
        .comment.official{background:rgba(200,30,58,0.05); margin:2px -16px; padding:8px 16px; border-radius:8px;}
        .comment.official .c-body b{color:var(--crimson);}
        .comment.official .c-body b::after{content:" ✓"; font-size:9px; color:var(--crimson);}
        .c-heart-btn{
          background:none; border:none; padding:0; margin-top:3px;
          flex-shrink:0; display:inline-flex; cursor:pointer; color:inherit;
          -webkit-tap-highlight-color:transparent;
        }
        .c-heart{opacity:.3; flex-shrink:0; transition:opacity .15s ease;}
        .c-heart-btn.liked .c-heart{opacity:1; animation:iconPop .3s ease;}
        .c-heart-btn:active .c-heart{transform:scale(0.8);}
        @keyframes commentIn{ to{opacity:1; transform:translateY(0);} }

        .typing-row{
          display:flex; gap:9px; padding:7px 0; align-items:center;
          opacity:0; animation:commentIn .3s ease forwards;
        }
        .typing-dots{display:flex; gap:3px; background:#F1EEEF; padding:9px 11px; border-radius:14px;}
        .typing-dots span{width:5px; height:5px; border-radius:50%; background:var(--muted); display:block; animation:blink 1.1s infinite;}
        .typing-dots span:nth-child(2){animation-delay:.15s;}
        .typing-dots span:nth-child(3){animation-delay:.3s;}
        @keyframes blink{0%,80%,100%{opacity:.25;} 40%{opacity:1;}}

        .note-type-pill{
          display:inline-block; font-size:9.5px; letter-spacing:1px; font-weight:700;
          color:#fff; background:var(--crimson); padding:3px 9px; border-radius:20px;
          margin-bottom:12px; text-transform:uppercase;
        }

        @media (prefers-reduced-motion: reduce){
          #postView{animation:none;}
          .comment, .typing-row{animation:none; opacity:1; transform:none;}
        }

        @media (max-width:900px){
          .layout{flex-direction:column; align-items:center; gap:0;}
          .note-panel{
            position:fixed; left:0; right:0; bottom:0; width:auto;
            z-index:50; padding:0 14px 14px;
            transform:translateY(110%);
            transition:transform .35s cubic-bezier(.32,.72,0,1);
          }
          .note-panel.open{transform:translateY(0);}
          .note-empty{display:none;}
          .note-content{
            border-radius:18px 18px 4px 4px;
            transform:none;
            max-height:65vh; overflow-y:auto;
            box-shadow:0 -10px 40px rgba(0,0,0,0.5);
          }
          .note-content::before{display:none;}
          .backdrop{display:block;}
          .backdrop.show{opacity:1; pointer-events:auto;}
        }
        @media (min-width:901px){
          .backdrop{display:none !important;}
        }

        @media (prefers-reduced-motion: reduce){
          .tile{animation:none; opacity:1;}
          .note-panel, .tile, .backdrop{transition:none;}
        }
      `}</style>

      <div className="watermark">CARMESI</div>

      <div className="stage">
        <div className="layout">
          <div className="phone-wrap">
            <div className="phone">
              <div className="screen">
                {!activePost ? (
                  <div id="profileView">
                    <div className="handle-row">
                      @mycarmesi
                      <svg className="verified" viewBox="0 0 24 24">
                        <path
                          fill="#4FA8E0"
                          d="M12 2l2.2 2 3-.4.9 2.9 2.7 1.3-.8 3 1.4 2.7-2.3 2 .4 2.9-3 .5-1.6 2.6-2.7-1.1-2.7 1.1-1.6-2.6-3-.5.4-2.9-2.3-2 1.4-2.7-.8-3 2.7-1.3.9-2.9 3 .4z"
                        />
                        <path
                          fill="#fff"
                          d="M9.7 12.4l-1.7-1.7-1.1 1.1 2.8 2.8 5-5-1.1-1.1z"
                        />
                      </svg>
                    </div>

                    <div className="profile-row">
                      <div className="avatar">C</div>
                      <div className="stats">
                        <div className="stat">
                          <b>1,204</b>
                          <span>Posts</span>
                        </div>
                        <div className="stat">
                          <b>507K</b>
                          <span>Followers</span>
                        </div>
                        <div className="stat">
                          <b>61</b>
                          <span>Following</span>
                        </div>
                      </div>
                    </div>

                    <div className="bio">
                      <strong>Carmesi</strong>
                      <br />
                      🩸 Rewriting period talk
                      <br />
                      👨 This week: teaching the men too
                      <br />
                      📍 India <span className="tag">#NotHerJob</span>
                    </div>

                    <div className="buttons-row">
                      <button className="btn secondary">Following</button>
                      <button className="btn secondary">Message</button>
                    </div>

                    <div className="highlights">
                      {highlightsData.map((h, i) => (
                        <div key={i} className="highlight">
                          <div className="h-circle">{h.icon}</div>
                          <span>{h.label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="tabs">
                      <div className="tab active">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                          <rect x="3" y="3" width="7" height="7" />
                          <rect x="14" y="3" width="7" height="7" />
                          <rect x="3" y="14" width="7" height="7" />
                          <rect x="14" y="14" width="7" height="7" />
                        </svg>
                      </div>
                      <div className="tab">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                          <path d="M12 21s-7.5-4.6-10-9.3C.5 7.8 3 4 7 4c2 0 3.6 1 5 2.8C13.4 5 15 4 17 4c4 0 6.5 3.8 5 7.7C19.5 16.4 12 21 12 21z" />
                        </svg>
                      </div>
                    </div>

                    <div className="grid">
                      {posts.map((p, i) => (
                        <button
                          key={i}
                          className={`tile v-${p.variant}${p.art ? " has-art" : ""}`}
                          onClick={() => setActivePost(p)}
                          aria-label={p.lines.join(" ") + " — open post"}
                        >
                          {p.art ? (
                            <img src={p.art} alt="" className="decor-art tile-photo" />
                          ) : (
                            <SceneArt index={i} />
                          )}
                          {p.art && <div className="art-overlay" />}
                          <BrandMark />
                          <span
                            className="icon-corner"
                            dangerouslySetInnerHTML={{
                              __html: p.type === "reel" ? reelIcon : p.type === "carousel" ? carouselIcon : ""
                            }}
                          />
                          {renderHeadline(p)}
                          <div
                            dangerouslySetInnerHTML={{
                              __html: dropMark("var(--ill-accent)"),
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div id="postView">
                    <div className="post-header">
                      <button
                        className="back-btn"
                        onClick={() => setActivePost(null)}
                        aria-label="Back to grid"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="20"
                          height="20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M15 18l-6-6 6-6" />
                        </svg>
                      </button>
                      <div className="handle-mini">
                        mycarmesi
                        <svg className="verified" viewBox="0 0 24 24">
                          <path
                            fill="#4FA8E0"
                            d="M12 2l2.2 2 3-.4.9 2.9 2.7 1.3-.8 3 1.4 2.7-2.3 2 .4 2.9-3 .5-1.6 2.6-2.7-1.1-2.7 1.1-1.6-2.6-3-.5.4-2.9-2.3-2 1.4-2.7-.8-3 2.7-1.3.9-2.9 3 .4z"
                          />
                          <path
                            fill="#fff"
                            d="M9.7 12.4l-1.7-1.7-1.1 1.1 2.8 2.8 5-5-1.1-1.1z"
                          />
                        </svg>
                      </div>
                      <div className="more">⋯</div>
                    </div>

                    <div
                      className={`post-art v-${activePost.variant} ${activePost.type === "reel" ? "is-reel" : "is-post"}${activePost.art ? " has-art" : ""}`}
                    >
                      {activePost.art ? (
                        <img src={activePost.art} alt="" className="decor-art tile-photo" />
                      ) : (
                        <SceneArt index={posts.indexOf(activePost)} />
                      )}
                      {activePost.art && <div className="art-overlay" />}
                      <BrandMark big />
                      <span
                        className="icon-corner"
                        dangerouslySetInnerHTML={{
                          __html: activePost.type === "reel" ? reelIcon : activePost.type === "carousel" ? carouselIcon : ""
                        }}
                      />
                      <div className="post-art-body">
                        {renderHeadline(activePost, true)}
                        {renderFormatDetail(activePost)}
                      </div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: dropMark("var(--ill-accent)", 20),
                        }}
                      />
                    </div>

                    <div className="post-actions">
                      <button
                        type="button"
                        className={`icon-btn${likedPosts.has(activePost) ? " liked" : ""}`}
                        aria-pressed={likedPosts.has(activePost)}
                        aria-label={likedPosts.has(activePost) ? "Unlike" : "Like"}
                        onClick={() => toggleInSet(setLikedPosts, activePost)}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill={likedPosts.has(activePost) ? "var(--crimson)" : "none"}
                          stroke={likedPosts.has(activePost) ? "var(--crimson)" : "currentColor"}
                          strokeWidth="1.8"
                        >
                          <path d="M12 21s-7-4.4-9.5-9C.8 8 3 4.5 6.7 4.5c2 0 3.6 1 5.3 2.8 1.7-1.8 3.3-2.8 5.3-2.8C21 4.5 23.2 8 21.5 12 19 16.6 12 21 12 21z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="icon-btn"
                        aria-label="View comments"
                        onClick={() => commentsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M21 11.5a8.4 8.4 0 0 1-8.9 8.4 9 9 0 0 1-3.6-.8L3 20l1-5.2a8.4 8.4 0 0 1-.8-3.6A8.4 8.4 0 0 1 11.6 3a8.5 8.5 0 0 1 9.4 8.5z" />
                        </svg>
                      </button>
                      <span className="share-wrap">
                        <button
                          type="button"
                          className="icon-btn"
                          aria-label="Share"
                          onClick={() => {
                            setShareToast(true);
                            window.setTimeout(() => setShareToast(false), 1400);
                          }}
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M22 2L11 13" />
                            <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                          </svg>
                        </button>
                        {shareToast && <span className="share-toast">Link copied</span>}
                      </span>
                      <span className="spacer" />
                      <button
                        type="button"
                        className={`icon-btn${savedPosts.has(activePost) ? " saved" : ""}`}
                        aria-pressed={savedPosts.has(activePost)}
                        aria-label={savedPosts.has(activePost) ? "Unsave" : "Save"}
                        onClick={() => toggleInSet(setSavedPosts, activePost)}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill={savedPosts.has(activePost) ? "var(--ink)" : "none"}
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                        </svg>
                      </button>
                    </div>

                    <div className="post-likes">
                      {activePost.likes} likes
                      {likedPosts.has(activePost) && <span className="you-liked"> · liked by you</span>}
                    </div>
                    <div className="post-caption">
                      <b>mycarmesi</b>
                      {activePost.caption}
                    </div>
                    <div className="post-comments" ref={commentsRef}>
                      {activePost.comments.map((c, i) => (
                        <div key={i} className={`comment ${c.reply ? "reply" : ""}`}>
                          <div
                            className="c-avatar"
                            style={{ background: avatarColor(c.u.length) }}
                          >
                            {c.u.replace("@", "")[0].toUpperCase()}
                          </div>
                          <div className="c-body">
                            <b>{c.u}</b>
                            {c.t}
                          </div>
                          <button
                            type="button"
                            className={`c-heart-btn${likedComments.has(c) ? " liked" : ""}`}
                            aria-pressed={likedComments.has(c)}
                            aria-label={likedComments.has(c) ? "Unlike comment" : "Like comment"}
                            onClick={() => toggleInSet(setLikedComments, c)}
                          >
                            <svg
                              className="c-heart"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill={likedComments.has(c) ? "var(--crimson)" : "none"}
                              stroke={likedComments.has(c) ? "var(--crimson)" : "currentColor"}
                              strokeWidth="2"
                            >
                              <path d="M12 21s-7-4.4-9.5-9C.8 8 3 4.5 6.7 4.5c2 0 3.6 1 5.3 2.8 1.7-1.8 3.3-2.8 5.3-2.8C21 4.5 23.2 8 21.5 12 19 16.6 12 21 12 21z" />
                            </svg>
                          </button>
                        </div>
                      ))}
                      {activePost.official && (
                        <div className="comment official">
                          <div className="c-avatar" style={{ background: "var(--crimson)" }}>
                            C
                          </div>
                          <div className="c-body">
                            <b>mycarmesi</b>
                            {activePost.official}
                          </div>
                          <button
                            type="button"
                            className={`c-heart-btn${likedOfficial.has(activePost) ? " liked" : ""}`}
                            aria-pressed={likedOfficial.has(activePost)}
                            aria-label={likedOfficial.has(activePost) ? "Unlike comment" : "Like comment"}
                            onClick={() => toggleInSet(setLikedOfficial, activePost)}
                          >
                            <svg
                              className="c-heart"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill={likedOfficial.has(activePost) ? "var(--crimson)" : "none"}
                              stroke={likedOfficial.has(activePost) ? "var(--crimson)" : "currentColor"}
                              strokeWidth="2"
                            >
                              <path d="M12 21s-7-4.4-9.5-9C.8 8 3 4.5 6.7 4.5c2 0 3.6 1 5.3 2.8 1.7-1.8 3.3-2.8 5.3-2.8C21 4.5 23.2 8 21.5 12 19 16.6 12 21 12 21z" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <aside className="note-panel">
            {!activePost ? (
              <div className="note-empty">☞ tap a post<br />and watch it<br />go live</div>
            ) : (
              <div className="note-content">
                <button className="note-close" onClick={() => setActivePost(null)} aria-label="Close">
                  ×
                </button>
                <div className="note-type-pill">{activePost.type}</div>
                <div className="note-label">STRATEGIST&apos;S NOTE</div>
                <div className="note-text">{activePost.note}</div>
              </div>
            )}
          </aside>
      </div>
      </div>

      <div className="backdrop" onClick={() => setActivePost(null)} />
    </>
  );
}
