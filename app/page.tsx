"use client";

import { useEffect, useState } from "react";

const posts = [
  {
    type: "post",
    variant: "a",
    lines: ["NOT", "HER", "JOB"],
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

export default function Home() {
  const [activePost, setActivePost] = useState<(typeof posts)[0] | null>(null);
  const [activeBtn, setActiveBtn] = useState<HTMLButtonElement | null>(null);

  const reelIcon = `<svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>`;
  const carouselIcon = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="7" y="7" width="14" height="14" rx="2.5"/><path d="M4 14V6a2 2 0 0 1 2-2h8"/></svg>`;

  const dropMark = (color: string, size = 14) => `<svg class="drop-mark" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}"><path d="M12 2C12 2 5 12 5 16a7 7 0 0 0 14 0c0-4-7-14-7-14z"/></svg>`;

  const dropColorFor = (variant: string) =>
    variant === "a" || variant === "b" || variant === "d" ? "#fff" : "var(--crimson)";

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
        }

        .stage{
          max-width:1180px;
          margin:0 auto;
          padding:56px 20px 80px;
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

        .header{
          text-align:center;
          position:relative;
          z-index:1;
          margin-bottom:8px;
        }
        .kicker{
          font-size:12px;
          letter-spacing:3px;
          color:var(--gold);
          font-weight:600;
          margin-bottom:10px;
        }
        .hero-line{
          font-family:var(--font-display);
          font-size:clamp(34px, 6vw, 58px);
          line-height:0.95;
          letter-spacing:0.5px;
          margin:0 0 14px;
        }
        .hero-line em{
          font-style:normal;
          color:var(--crimson);
        }
        .sub{
          font-size:14.5px;
          color:#C9B4BB;
          max-width:460px;
          margin:0 auto;
          line-height:1.55;
        }

        .layout{
          display:flex;
          gap:44px;
          align-items:flex-start;
          justify-content:center;
          width:100%;
          margin-top:48px;
          position:relative;
          z-index:1;
        }

        /* ---------- DEVICE CARD ---------- */
        .phone-wrap{flex-shrink:0;}
        .phone{
          width:352px;
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
        .tile .icon-corner{position:absolute; top:8px; right:8px; opacity:.92;}
        .tile .drop-mark{position:absolute; bottom:9px; right:9px; opacity:.9;}

        .v-a{background:var(--crimson); color:#fff;}
        .v-b{background:var(--brand-black); color:var(--crimson);}
        .v-c{background:#fff; color:var(--crimson); box-shadow:inset 0 0 0 2px var(--crimson);}
        .v-d{background:var(--brand-black); color:#fff; box-shadow:inset 0 0 0 2px var(--crimson);}

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
          width:300px;
          flex-shrink:0;
          position:sticky;
          top:56px;
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
        .post-art .icon-corner{position:absolute; top:14px; right:14px;}
        .post-art .drop-mark{position:absolute; bottom:14px; right:14px; opacity:.9;}

        .post-actions{display:flex; align-items:center; gap:14px; padding:12px 16px 2px; color:var(--ink);}
        .post-actions svg{width:21px; height:21px;}
        .post-actions .spacer{flex:1;}

        .post-likes{padding:8px 16px 0; font-size:12.5px; font-weight:700;}
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
        .c-heart{opacity:.3; flex-shrink:0; margin-top:3px;}
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
        <div className="header">
          <div className="kicker">CARMESI × NOT HER JOB</div>
          <h1 className="hero-line">
            If this campaign
            <br />
            went live, here's <em>the grid.</em>
          </h1>
          <p className="sub">
            A takeover week on @mycarmesi, imagined post by post. Tap any tile to see the
            strategist's note behind it.
          </p>
        </div>

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
                          className={`tile v-${p.variant}`}
                          onClick={() => setActivePost(p)}
                          aria-label={p.lines.join(" ") + " — open post"}
                        >
                          <span
                            className="icon-corner"
                            dangerouslySetInnerHTML={{
                              __html: p.type === "reel" ? reelIcon : p.type === "carousel" ? carouselIcon : ""
                            }}
                          />
                          <span className="lines">
                            {p.lines.map((l, j) => (
                              <div key={j}>{l}</div>
                            ))}
                          </span>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: dropMark(dropColorFor(p.variant)),
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

                    <div className={`post-art v-${activePost.variant} ${activePost.type === "reel" ? "is-reel" : "is-post"}`}>
                      <span
                        className="icon-corner"
                        dangerouslySetInnerHTML={{
                          __html: activePost.type === "reel" ? reelIcon : activePost.type === "carousel" ? carouselIcon : ""
                        }}
                      />
                      <span className="lines">
                        {activePost.lines.map((l, i) => (
                          <div key={i}>{l}</div>
                        ))}
                      </span>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: dropMark(dropColorFor(activePost.variant), 20),
                        }}
                      />
                    </div>

                    <div className="post-actions">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M12 21s-7-4.4-9.5-9C.8 8 3 4.5 6.7 4.5c2 0 3.6 1 5.3 2.8 1.7-1.8 3.3-2.8 5.3-2.8C21 4.5 23.2 8 21.5 12 19 16.6 12 21 12 21z" />
                      </svg>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M21 11.5a8.4 8.4 0 0 1-8.9 8.4 9 9 0 0 1-3.6-.8L3 20l1-5.2a8.4 8.4 0 0 1-.8-3.6A8.4 8.4 0 0 1 11.6 3a8.5 8.5 0 0 1 9.4 8.5z" />
                      </svg>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M22 2L11 13" />
                        <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                      </svg>
                      <span className="spacer" />
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                      </svg>
                    </div>

                    <div className="post-likes">{activePost.likes} likes</div>
                    <div className="post-caption">
                      <b>mycarmesi</b>
                      {activePost.caption}
                    </div>
                    <div className="post-comments">
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
                          <svg
                            className="c-heart"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M12 21s-7-4.4-9.5-9C.8 8 3 4.5 6.7 4.5c2 0 3.6 1 5.3 2.8 1.7-1.8 3.3-2.8 5.3-2.8C21 4.5 23.2 8 21.5 12 19 16.6 12 21 12 21z" />
                          </svg>
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
                          <svg
                            className="c-heart"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M12 21s-7-4.4-9.5-9C.8 8 3 4.5 6.7 4.5c2 0 3.6 1 5.3 2.8 1.7-1.8 3.3-2.8 5.3-2.8C21 4.5 23.2 8 21.5 12 19 16.6 12 21 12 21z" />
                          </svg>
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
