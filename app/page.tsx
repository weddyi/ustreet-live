"use client";
import { useState, useRef, useEffect } from "react";

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const QUESTIONS: Record<string, string[]> = {
  "🎵 Music": [
    "What song plays when you walk into a room and own it?",
    "What artist does everyone sleep on that you ride for hard?",
    "What song do you skip when it comes on but secretly know every word?",
    "What music genre says the most about who you really are?",
    "If your life was a movie what song plays in the final scene?",
    "What song has lyrics you live by?",
    "Who's the most overrated artist right now — be honest?",
    "What song gets you in your feelings no matter what?",
    "What song would play if your ex walked in right now?",
    "What artist would you be embarrassed if people saw in your Spotify history?",
    "What song hits different at 2am vs 2pm?",
    "What's the song you always skip but never delete?",
    "Who's the artist that changed your whole taste in music?",
    "What song reminds you of someone you shouldn't have feelings for?",
    "What's your hype song before you walk into something important?",
    "If you could only listen to one genre for the rest of your life what is it?",
    "What artist has never made a bad song?",
    "What song do you use to test if you can vibe with someone?",
    "What's the most iconic DC music moment ever?",
    "If your personality was a music era — which decade?",
    "What song do you turn up when you're alone that you'd never play in public?",
    "What's a song that hit you different after heartbreak?",
    "Who's an artist that sold out and you can't respect them anymore?",
    "What song has a music video that's better than the actual song?",
    "Whose concert would make you spend money you don't have?",
    "What song makes you feel invincible?",
    "What's the song that got you through your hardest time?",
    "What genre do you judge people for listening to?",
    "What artist do you think is actually a terrible person but the music is too good to stop?",
    "What song would you dedicate to someone in this room right now?",
    "What's the most toxic song you still bump?",
    "What artist's lyrics actually describe your love life?",
    "What song do you and your best friend both know word for word?",
    "What's the song that plays when you're about to make a bad decision?",
    "Who's the artist you used to love but now can't explain why?",
    "What's the most underrated city for music right now?",
    "What song hits so hard you can't listen to it in public without reacting?",
    "What's your karaoke song — and be honest, not the safe answer?",
    "What artist do you think is more talent than fame?",
    "What song has the best outro of all time?",
    "What's a song that made you change how you think about something?",
    "Who's an artist that looks good but can't actually perform live?",
    "What song makes you feel like you just got a check?",
    "What song would you never play on a first date?",
    "What's the most embarrassing song on your most-played list?",
    "What song would be playing at your perfect night?",
    "What artist speaks to your soul even if your friends don't get it?",
    "What song makes you want to fight someone?",
    "What's a lyric that lives in your head rent free?",
    "What song do you wish you wrote yourself?"
  ],
  "🌆 DC": [
    "What's the most DC thing you've ever done that people from other cities would never understand?",
    "Best kept secret spot in DC that you're scared to tell people about?",
    "What's something about DC people on the outside get completely wrong?",
    "Gentrification in DC — progress or erasure? Be real.",
    "What neighborhood defines the real DC and why?",
    "What DC restaurant is overrated and you're tired of people recommending it?",
    "What's something that died in DC that needs to come back?",
    "Old DC vs New DC — which one wins and why?",
    "If you had to describe DC's dating scene in one word what is it?",
    "What's the biggest flex about being from DC?",
    "What does someone need to know before moving to DC?",
    "What's the most DC experience you've had that you can't explain to someone who wasn't there?",
    "Is DC underrated or overrated as a city?",
    "What part of DC would you never take a date to?",
    "What event in DC history hits different when you actually lived through it?",
    "What's the best thing about U Street specifically?",
    "What's the most expensive thing DC has cost you?",
    "Howard or Georgetown — where would you rather go?",
    "What DC stereotype about you is actually 100% true?",
    "What do you think DC will look like in 10 years and does that excite or scare you?",
    "What's something locals do in DC that tourists never see?",
    "What's the one thing you miss most about old DC?",
    "What club or venue in DC got way better or worse over time?",
    "What's the most DC way to spot a transplant?",
    "What's the thing about DC that made you stay or made you want to leave?",
    "If DC had a theme song what would it be?",
    "What's the most embarrassing thing about DC that you'd never admit to someone from NY or LA?",
    "What's the best block in DC for vibes on a Friday night?",
    "What's the one thing DC does better than any other city in America?",
    "What's your hot take about DC politics that would get you roasted?",
    "What's the rudest thing DC has ever done to you?",
    "What's a DC tradition that nobody talks about enough?",
    "What's the most disrespectful thing someone from outside DC ever said to you about the city?",
    "Chi-Cha Lounge — rate it and be honest?",
    "What's something about DC that you only appreciate after you leave?",
    "What's the thing you secretly love about DC that doesn't fit your image?",
    "What DC food are you riding for until you die?",
    "What era of DC was the best era?",
    "What's a DC flex that only locals understand?",
    "What DC person — famous or not — represents the city best?",
    "If you had to leave DC tomorrow where would you go?",
    "What's the most controversial opinion you have about DC?",
    "What's the DC experience that changed you as a person?",
    "What's the thing about DC nightlife that outsiders don't understand?",
    "What's the most expensive night you've had on U Street?",
    "What's a moment in DC that made you proud to be from here?",
    "What DC place do you take people to test if they have real taste?",
    "What's the one thing you'd fix about DC if you had the power?",
    "What makes DC different from every other city in America?",
    "What's the real DC experience that no travel guide will tell you about?"
  ],
  "🔥 Spicy": [
    "Would you stay with someone you love if they cheated once — and what would they have to do to earn it back?",
    "What's the biggest lie you've told in a relationship that you never came clean about?",
    "Emotional cheating vs physical cheating — which one actually ends the relationship?",
    "What's the most you've ever spent trying to impress someone who wasn't worth it?",
    "Have you ever stayed in a relationship purely for financial reasons?",
    "What's the longest you've gone without sex in a relationship and what did it do to you?",
    "What's the real reason your last relationship ended — not the story you tell people?",
    "Would you forgive cheating if it was a one-time mistake with a stranger?",
    "What toxic trait do you have that you've never fully admitted out loud?",
    "What's the biggest mistake you made that cost you someone who actually loved you?",
    "What's the worst thing you've ever done in a relationship that you justified at the time?",
    "Have you ever ghosted someone who really deserved a conversation?",
    "What body count is a dealbreaker for you and why?",
    "What's the most embarrassing thing you've done for attention from someone who didn't care?",
    "What's one thing about your sex life you've never told anyone?",
    "If your friends knew everything about your DMs right now would they judge you?",
    "Have you ever caught real feelings for someone you were just supposed to be physical with?",
    "What's one relationship rule you say you have but constantly break?",
    "What's the most money you've lost over someone you were dating?",
    "What's something you pretend not to want in a relationship but actually need?",
    "Have you ever stayed with someone just because leaving felt too hard?",
    "What's the hardest truth about yourself that you avoid in relationships?",
    "What's your biggest romantic regret — the person you let go or the person you held on to too long?",
    "Is loyalty dead or are you just not as loyal as you think you are?",
    "Would you want to know if your best friend had feelings for your partner?",
    "What's the most you've ever compromised who you are for a relationship?",
    "What's something your ex knew about you that nobody else does?",
    "Have you ever been in love with two people at the same time?",
    "What's the line between privacy and secrecy in a relationship?",
    "Have you ever talked to an ex behind your partner's back and told yourself it was innocent?",
    "What do you do in secret that your partner would not be okay with?",
    "What's the thing about you in relationships that you're most ashamed of?",
    "Would you take your ex back if they showed up tomorrow fully changed?",
    "What's the most disrespectful thing someone you loved ever did to you?",
    "Have you ever loved someone you knew was bad for you and chose them anyway?",
    "What's the role you always play in relationships — the chaser, the avoidant, the fixer?",
    "What's a standard you hold others to that you don't fully hold yourself to?",
    "What's one thing about dating in 2026 that's making it harder for everyone?",
    "What's your actual non-negotiable vs what you just say your non-negotiable is?",
    "Have you ever used someone emotionally when you were going through something?",
    "What's the most vulnerable thing you've ever said to someone who didn't deserve it?",
    "Is marriage worth it in 2026 or is it a financial contract dressed up as romance?",
    "What's something in your past that would make someone think twice about dating you?",
    "What's the most selfish thing you've ever done in a relationship?",
    "What's the real reason you're single right now — or the real reason your relationship works?",
    "Have you ever been the side piece — knowingly or not?",
    "What's the most painful thing someone has ever said to you that turned out to be true?",
    "What's the version of yourself in relationships that you're not proud of?",
    "What's your biggest insecurity that always shows up in your love life?",
    "What would you do if you found out your partner had a secret life you knew nothing about?"
  ],
  "🏷️ Brand": [
    "What's the most money you've ever spent and immediately regretted?",
    "Would you leave your partner for $10 million — no conditions, they just never know why?",
    "What's the smallest amount of money that would genuinely change your life right now?",
    "What's the most money you've ever made in a single day?",
    "If you had $100K tomorrow what would be the first call you make?",
    "What's the most financially stupid thing you've ever done in your 20s?",
    "Have you ever lied about money to someone you were dating?",
    "What's the biggest financial mistake you're still paying for right now?",
    "Would you date someone broke but brilliant or comfortable but boring?",
    "What's the most expensive thing your ego has ever cost you?",
    "If your net worth was public right now how would it change how people treat you?",
    "What's something you spend money on that you'd be embarrassed to admit?",
    "What's the hustle you gave up on that you think about every day?",
    "What's the first thing you would buy if you hit $1 million — be specific?",
    "Have you ever let money come between you and someone you loved?",
    "What does financial freedom actually mean to you — not the Instagram answer?",
    "What's the most money you've ever lost in a single decision?",
    "Would you rather make $500K a year doing something you hate or $80K doing what you love?",
    "What's the money conversation you've been avoiding?",
    "Have you ever stayed somewhere — a job, a city, a relationship — because of money?",
    "What's your biggest money goal this year and are you actually on track?",
    "What's one thing rich people do that poor people judge but secretly want to do?",
    "What's your relationship with debt right now — honest answer?",
    "Would you marry someone with $200K in debt if you loved them?",
    "What business idea have you been sitting on that you've never started?",
    "What's the one investment you wish you had made 5 years ago?",
    "If your job ended tomorrow what would you do?",
    "What's the lifestyle you want vs the lifestyle you're actually building toward?",
    "What's a money habit from your upbringing that you're still unlearning?",
    "What would you do with fame if the money wasn't guaranteed?",
    "If your bank account balance was displayed on your forehead tonight what energy would you have?",
    "What's the most generous thing you've ever done with money?",
    "Have you ever spent money to make someone love you or stay?",
    "What's the biggest career risk you've been too scared to take?",
    "What are you currently building that most people in your life don't know about?",
    "What's the price tag on your dream life and are you being honest about how to get there?",
    "What's something you spend money on to feel better that doesn't actually work?",
    "Would you sell your personal data to a company for $50K a year?",
    "What's the money conversation you wish your parents had with you growing up?",
    "Have you ever judged someone for how they make money and later regretted it?",
    "What's your emergency fund situation right now — be honest?",
    "What would you do if you found out your partner was secretly rich?",
    "What's the biggest lie people tell about success that you've actually bought into?",
    "What's something you've bought for clout that you've never told anyone about?",
    "What does your spending say about your actual priorities?",
    "What's the most you've ever spent on a night out and was it worth it?",
    "What's the financial decision you made that changed everything?",
    "Fame or generational wealth — which one and why?",
    "What would you do differently in your 20s if you understood money the way you do now?",
    "What's the hustle you're running right now that most people in your life don't know about?"
  ],
  "💭 Random": [
    "What's the version of yourself you show online vs who you actually are?",
    "If you found out you had 6 months to live what would you do first?",
    "What opinion do you have that you'd never post publicly but fully believe?",
    "What's something people assume about you from how you look that's completely wrong?",
    "What's the thing you're most afraid to admit you want?",
    "Would you rather be famous and broke or anonymous and wealthy?",
    "What's the biggest thing you've ever sacrificed that you still wonder about?",
    "If everyone could hear your thoughts for one hour today what would be the most revealing?",
    "What's the version of your life you imagined at 16 and how does that compare to now?",
    "What's something you judge other people for that you actually do yourself?",
    "What's the hardest no you've ever had to say and was it the right call?",
    "What's the thing you're working on in yourself that most people can't see?",
    "What's a belief you held strongly that you completely changed your mind on?",
    "If you could go back and undo one decision what would it be?",
    "What's the thing people close to you would be shocked to know you think about?",
    "What's the one thing you want but are too proud to ask for?",
    "What's the moment that made you grow up faster than you should have?",
    "What does success look like to you in 5 years — be specific not inspirational?",
    "What's the part of your personality you hide in professional settings?",
    "What's a compliment you received that you never forgot?",
    "What's the situation that showed you someone's true character?",
    "If you had to describe your 20s in one word what would it be?",
    "What's the thing you're most proud of that nobody knows about?",
    "What's one thing society tells you to want that you actually don't?",
    "What do you think about at 3am that you never bring up in conversation?",
    "What's the version of yourself you're becoming that your old self wouldn't recognize?",
    "What's the thing you do when nobody's watching that says the most about who you are?",
    "What's the most important lesson you've learned that came from real pain?",
    "What's something you believe about yourself that other people would disagree with?",
    "What's the moment you realized the world was different than you thought it was?",
    "If your life had a plot twist coming what do you think it would be?",
    "What's the thing you've forgiven but not forgotten?",
    "What part of who you are did you inherit from someone you had to distance yourself from?",
    "What's the dream you've been too embarrassed to say out loud?",
    "What's the most honest thing anyone has ever said to your face?",
    "What's the decision you're avoiding right now that you already know the answer to?",
    "What's the best advice you've ever ignored?",
    "What's the thing that keeps you up at night that you can't control?",
    "What's the version of yourself 10 years ago you want to apologize to?",
    "What's one thing you've never said to someone you love that they deserve to hear?",
    "What's the hardest part about being you that nobody sees?",
    "What's something you've outgrown that you're still holding onto?",
    "What's the thing you would change about how you were raised?",
    "If you could know one truth about your future would you actually want to know it?",
    "What's the story you tell yourself about your life that might not be true?",
    "What's the thing that would surprise people most if they really knew you?",
    "What's the moment you stopped caring what other people thought?",
    "What's the one relationship in your life you wish you had handled differently?",
    "What's the thing you want to be remembered for that has nothing to do with your job?",
    "What's the feeling you keep chasing and never quite catching?"
  ],
};

const ORIGINAL_CATEGORIES = Object.keys(QUESTIONS);

// Shuffled question pools per category (shuffled on mount)
const EMPTY_SHUFFLED: Record<string, string[]> = {};

export default function CardsPage() {
  const [category, setCategory] = useState(ORIGINAL_CATEGORIES[0]);
  const [cardIndex, setCardIndex] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState<Record<string, string[]>>(EMPTY_SHUFFLED);
  const [categories, setCategories] = useState(ORIGINAL_CATEGORIES);

  useEffect(() => {
    const shuffled: Record<string, string[]> = {};
    for (const cat of ORIGINAL_CATEGORIES) {
      shuffled[cat] = shuffleArray(QUESTIONS[cat]);
    }
    setShuffledQuestions(shuffled);
    setCategories(shuffleArray(ORIGINAL_CATEGORIES));
  }, []);
  const [flipped, setFlipped] = useState(false);
  const [totalSeen, setTotalSeen] = useState(1);
  const touchStartX = useRef<number | null>(null);

  const questions = (shuffledQuestions[category] || QUESTIONS[category]);
  const currentQ = questions[cardIndex % questions.length];

  function nextCard() {
    setFlipped(false);
    setTimeout(() => {
      setCardIndex((i) => i + 1);
      setTotalSeen((t) => t + 1);
    }, 200);
  }

  function handleCategoryChange(cat: string) {
    setCategory(cat);
    setCardIndex(0);
    setFlipped(false);
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 60) {
      nextCard();
    }
    touchStartX.current = null;
  }

  return (
    <div style={{
      minHeight: "100dvh",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      overflow: "hidden",
    }}>
      {/* Hero background */}
      <div style={{
        position: "fixed",
        inset: 0,
        backgroundImage: "url('/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: 0,
      }} />
      <div style={{
        position: "fixed",
        inset: 0,
        background: "linear-gradient(180deg, rgba(10,10,10,0.75) 0%, rgba(10,10,10,0.88) 50%, rgba(10,10,10,0.97) 100%)",
        zIndex: 1,
      }} />

      {/* Content */}
      <div style={{
        position: "relative",
        zIndex: 2,
        width: "100%",
        maxWidth: "430px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0 20px",
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", paddingTop: "52px", marginBottom: "24px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "0.3em", color: "rgba(212,175,55,0.7)", fontWeight: 600, marginBottom: "6px" }}>
            CHI-CHA PRESENTS
          </div>
          <div style={{
            fontSize: "32px",
            fontWeight: 900,
            letterSpacing: "0.12em",
            color: "#D4AF37",
            textShadow: "0 0 40px rgba(212,175,55,0.5)",
          }}>
            U STREET LIVE
          </div>
        </div>

        {/* Category pills */}
        <div style={{
          display: "flex",
          gap: "8px",
          overflowX: "auto",
          width: "100%",
          paddingBottom: "4px",
          marginBottom: "24px",
        }} className="no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              style={{
                flexShrink: 0,
                padding: "8px 14px",
                borderRadius: "999px",
                border: `1.5px solid ${cat === category ? "#D4AF37" : "rgba(255,255,255,0.15)"}`,
                background: cat === category ? "rgba(212,175,55,0.15)" : "rgba(255,255,255,0.05)",
                color: cat === category ? "#D4AF37" : "rgba(255,255,255,0.6)",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Card */}
        <div
          className="card-scene"
          onClick={() => setFlipped((f) => !f)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className={`card-inner ${flipped ? "flipped" : ""}`}>
            {/* Back (shown first) */}
            <div className="card-face card-back">
              <div style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "rgba(212,175,55,0.2)",
                border: "2px solid rgba(212,175,55,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "36px",
                marginBottom: "20px",
              }}>🃏</div>
              <div style={{
                fontSize: "22px",
                fontWeight: 900,
                letterSpacing: "0.12em",
                color: "#D4AF37",
                marginBottom: "8px",
              }}>U STREET</div>
              <div style={{
                fontSize: "11px",
                letterSpacing: "0.25em",
                color: "rgba(212,175,55,0.6)",
              }}>TAP TO REVEAL</div>
            </div>

            {/* Front (shows question) */}
            <div className="card-face card-front">
              <div style={{
                fontSize: "11px",
                letterSpacing: "0.25em",
                color: "rgba(212,175,55,0.7)",
                marginBottom: "20px",
                fontWeight: 600,
              }}>{category}</div>
              <p style={{
                fontSize: "22px",
                fontWeight: 800,
                color: "#fff",
                textAlign: "center",
                lineHeight: 1.35,
                letterSpacing: "-0.01em",
              }}>
                {currentQ}
              </p>
              <div style={{
                marginTop: "24px",
                fontSize: "11px",
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.1em",
              }}>SWIPE ← FOR NEXT</div>
            </div>
          </div>
        </div>

        {/* Counter & button */}
        <div style={{
          width: "100%",
          marginTop: "28px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          alignItems: "center",
        }}>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em" }}>
            Card {totalSeen} of ∞
          </div>
          <button
            onClick={nextCard}
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "14px",
              background: "#FF1744",
              border: "none",
              color: "#fff",
              fontSize: "16px",
              fontWeight: 800,
              letterSpacing: "0.06em",
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(255,23,68,0.4)",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            NEW CARD 🃏
          </button>
        </div>
      </div>
    </div>
  );
}
