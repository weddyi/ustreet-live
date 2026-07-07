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

interface CategoryData {
  color: string;
  questions: string[];
}

const QUESTIONS: Record<string, CategoryData> = {
  "⚖️ Courtroom": {
    color: "#6366f1",
    questions: [
      "Your best friend committed a crime. Do you turn them in?",
      "You find a wallet with $500 cash and ID. What do you do?",
      "You see your coworker stealing. Do you report it?",
      "You accidentally hit a parked car. No one saw. Do you leave a note?",
      "Your partner cheated. Do you tell their family?",
      "You find out your boss is committing fraud. What do you do?",
      "You witness a hit-and-run. Do you come forward?",
      "Your friend is in an abusive relationship but doesn't want help. Do you intervene?",
      "You know someone is cheating on their taxes by a lot. Do you report them?",
      "You're on a jury. Everyone else says guilty. You have doubt. What do you do?",
      "Your child breaks something expensive at a store. Do you pay for it?",
      "You get too much change back at a restaurant. Do you return it?",
      "Your friend is driving drunk. Do you let them?",
      "You find someone's phone unlocked. Do you snoop?",
      "Your neighbor is clearly dealing drugs. Do you call the police?",
      "You overhear someone planning to do something dangerous. What do you do?",
      "You get a job offer but know a friend needed it more. Do you take it?",
      "Someone confesses a secret to you and asks you to keep it. But it involves someone you love. What do you do?",
      "You could get away with lying in court. Do you?",
      "Your teammate cheated on an exam you both needed to pass. Do you tell?",
      "You read your kid's texts because you're worried. Was that okay?",
      "You find out a celebrity you love did something terrible years ago. Do you still support them?",
      "Someone asks you to be their alibi. They were somewhere they shouldn't have been. Do you do it?",
      "Your friend is spreading lies about someone you don't like. Do you correct them?",
      "You know your company is polluting illegally. What do you do?",
      "You catch your parent in a lie about something serious. Do you confront them?",
      "Someone cuts the line and no one else says anything. Do you?",
      "You inherited money from someone who made it doing something unethical. Do you keep it?",
      "Your friend got the job because of nepotism. Do you say something?",
      "You find explicit photos on your partner's phone. What do you do?",
    ],
  },
  "🔥 Hot Takes": {
    color: "#ef4444",
    questions: [
      "Social media is making people mentally ill and nobody wants to admit it.",
      "Most people who say they want love actually just want validation.",
      "The 9-5 was designed to keep you poor.",
      "Marriage is a contract — not a spiritual bond — and people need to stop confusing the two.",
      "Most people are in relationships out of fear of being alone.",
      "Therapy is becoming a crutch for people who don't want to actually change.",
      "Cancel culture has ruined the ability to grow as a person.",
      "The side hustle culture is making people more miserable, not less.",
      "Most people don't actually have standards — they have preferences.",
      "Loyalty is dead. People only stay when it benefits them.",
      "Kids raised by social media are going to be the most damaged generation.",
      "Most people calling themselves entrepreneurs are just unemployed.",
      "Hustle culture is just capitalism dressed up as self-improvement.",
      "People who say 'I don't see color' are the most dangerous kind of ignorant.",
      "Being emotionally available is seen as weak and that's destroying relationships.",
      "Religion is used more to control people than to free them.",
      "Most friendships over 30 are out of habit, not actual connection.",
      "Money doesn't change people — it reveals them.",
      "The reason most people are unhappy is because they won't be honest with themselves.",
      "Dating apps have made people treat humans like Amazon products.",
      "Most people's 'mental health days' are just avoiding accountability.",
      "The phrase 'my truth' is used to avoid real accountability.",
      "People who always play the victim never have to take responsibility.",
      "Success is 80% who you know and 20% what you know.",
      "Most people preach about authenticity while performing a version of themselves online.",
      "The reason people stay broke is mindset not circumstance.",
      "Men are more emotionally damaged than they admit and it affects everyone around them.",
      "Women are socialized to compete with each other instead of build together.",
      "The education system punishes creativity and rewards compliance.",
      "Most people are not actually kind — they're just conflict-avoidant.",
    ],
  },
  "🤐 Confessions": {
    color: "#ec4899",
    questions: [
      "What's the biggest lie you've told that someone still believes?",
      "What's something you did that you've never told anyone about?",
      "Have you ever pretended to be someone's friend while secretly disliking them?",
      "What's the most selfish thing you've ever done?",
      "Have you ever taken credit for something you didn't do?",
      "What's a secret you're keeping from your family right now?",
      "Have you ever read someone's messages without them knowing?",
      "What's the most jealous you've ever been of someone?",
      "Have you ever sabotaged someone's opportunity?",
      "What's something you judge people for that you also do?",
      "Have you ever faked an emotion to manipulate someone?",
      "What's the worst thing you've said about someone behind their back?",
      "Have you ever been attracted to someone you absolutely shouldn't be?",
      "What's a habit you have that you'd be embarrassed if people knew about?",
      "Have you ever ghosted someone who really deserved a real conversation?",
      "What's the most money you've spent on something you've never told anyone about?",
      "Have you ever stolen something? What and when?",
      "What's something you've never admitted about a past relationship?",
      "Have you ever pretended to be okay when you were completely falling apart?",
      "What's the most embarrassing reason you've ended a friendship?",
      "Have you ever cheated — on a test, a game, a partner, anything?",
      "What's something you're deeply ashamed of from your past?",
      "Have you ever let someone take the blame for something you did?",
      "What's a toxic behavior you know you have but haven't fully addressed?",
      "Have you ever broken a promise that really mattered to someone?",
      "What's the most cowardly thing you've ever done?",
      "Have you ever been the reason a relationship ended — even if no one knows it?",
      "What's something you've done that contradicts who you say you are?",
      "Have you ever felt relieved when something bad happened to someone you didn't like?",
      "What's the real reason you ended your last relationship — not the story you tell people?",
    ],
  },
  "🧠 Impossible Choices": {
    color: "#8b5cf6",
    questions: [
      "Save your best friend or save 10 strangers?",
      "Know when you'll die or know how you'll die?",
      "Be loved but misunderstood or understood but alone?",
      "Lose all your memories or lose all your friends?",
      "Be the smartest person in the room or the most loved?",
      "Tell every truth or tell no truths for a year?",
      "$1M today or $10M in 10 years?",
      "Live forever with no one you love or die on time with everyone?",
      "Be famous and hated or anonymous and beloved?",
      "Have complete freedom or complete security?",
      "Watch everyone you love die before you or die before them?",
      "Lose your sense of taste or your sense of touch?",
      "Know everyone's true opinion of you or never know?",
      "Give up social media forever or give up traveling forever?",
      "Be the most attractive person alive but broke or average looking and wealthy?",
      "Your partner is loyal but emotionally unavailable OR emotionally present but unfaithful?",
      "Relive your worst day 10 times or forget your best day forever?",
      "Be always honest and hurt people or always kind and lie?",
      "Know every secret about everyone around you or know nothing?",
      "Lose the ability to feel pain or the ability to feel pleasure?",
      "Work your dream job for $30K or a job you hate for $300K?",
      "Have 10 true friends or 10,000 acquaintances?",
      "Be able to read minds but never be understood or never read minds but always be understood?",
      "Cure one disease or end world hunger?",
      "Never feel fear or never feel loneliness?",
      "Have a perfect memory or perfect ability to forget?",
      "Love someone who doesn't love you back or be loved by someone you don't love?",
      "Give up your phone for a year or give up physical touch for a year?",
      "Be always the one who loves more or always the one who loves less?",
      "Change your past or see your future?",
    ],
  },
  "💰 Money Wars": {
    color: "#f59e0b",
    questions: [
      "$10K cash now or flip it for a chance at $100K?",
      "Would you marry someone with $200K in debt if you loved them?",
      "Would you leave your partner for $10 million — no one ever finds out why?",
      "What's your actual number — the amount that would make you feel free?",
      "Would you take $1M but have to give up social media forever?",
      "Would you work for your enemy if they paid you 3x your current salary?",
      "Would you sell your personal data — location, purchases, messages — for $50K/year?",
      "You find $100K in cash. No way to trace it. What do you do?",
      "Would you invest your last $1,000 or save it?",
      "What's the most financially stupid thing you've ever done?",
      "Would you rather be rich and lonely or comfortable and loved?",
      "Would you let your parents move in to save $2,000/month?",
      "Would you take a pay cut to work on something that actually matters?",
      "What's the most you've ever spent to impress someone?",
      "Would you quit your job today if you had 6 months of savings?",
      "Your friend needs $5,000 and you have it. But they've never paid you back before. Do you lend it?",
      "Would you rather earn $500K doing something you hate or $80K doing what you love?",
      "What's the biggest financial regret of your life so far?",
      "Would you split finances completely with a partner or keep everything separate?",
      "What's the one thing you spend money on that you could never justify to anyone else?",
      "Would you accept a $50K gift from someone who made it illegally?",
      "Would you tell your partner exactly how much debt you have before getting serious?",
      "What's your honest relationship with money — abundance or scarcity mindset?",
      "If you found out your company was underpaying you by $20K vs coworkers, what would you do?",
      "Would you start a business with a friend knowing it could destroy the friendship?",
      "What's the minimum salary that would make you feel respected at a job?",
      "Would you take generational wealth from a family member who was racist or abusive?",
      "What's something you've bought purely for status that you'd never admit?",
      "Would you be honest with your partner about every purchase you make?",
      "If money wasn't an issue, what would you do with your life tomorrow?",
    ],
  },
  "❤️ Relationship Trials": {
    color: "#f43f5e",
    questions: [
      "What's the real reason your last relationship ended?",
      "Have you ever stayed in a relationship for the wrong reason?",
      "What's the most hurtful thing a partner has ever said to you?",
      "What's the most hurtful thing you've ever said to a partner?",
      "Emotional cheating vs physical cheating — which is worse and why?",
      "Would you get back with your most recent ex if they showed up changed tomorrow?",
      "What's the thing you need in a relationship that you've never directly asked for?",
      "What's your attachment style and how has it damaged relationships?",
      "Have you ever loved someone you couldn't trust?",
      "What's the pattern you keep repeating in relationships?",
      "Would you forgive cheating once — what would they have to do to earn it?",
      "What's one thing your ex knew about you that nobody else does?",
      "Have you ever been the toxic one in a relationship?",
      "What does love actually mean to you — not the definition, the feeling?",
      "What's the thing you always give in relationships that you never get back?",
      "Have you ever been in love with two people at the same time?",
      "What's your biggest insecurity that affects your relationships?",
      "Would you rather know your partner's full body count or never know?",
      "What's a lie you've told in a relationship that you never corrected?",
      "Have you ever broken someone's heart on purpose?",
      "What's the version of yourself in relationships that you're not proud of?",
      "Would you stay with someone who loves you if you weren't fully in love?",
      "What's the one thing that would make you leave immediately no questions asked?",
      "Have you ever used someone emotionally when you were going through something?",
      "What does your ideal relationship actually look like — be specific, not poetic?",
      "What's the most vulnerable thing you've ever said to someone?",
      "Have you ever regretted choosing someone over everything else in your life?",
      "What's something you've never forgiven a partner for, even after you said you did?",
      "What's the deal you've made with yourself about love that might not be true?",
      "If your current or future partner could see every thought you've had about them — would you be okay with that?",
    ],
  },
  "👥 Friend Exposures": {
    color: "#06b6d4",
    questions: [
      "Who in your friend group is the most fake?",
      "Have you ever talked about a friend's relationship to other people?",
      "What's something your best friend does that you've never told them bothers you?",
      "Have you ever been jealous of a friend's success?",
      "Who's the friend you'd call at 3am and who would actually pick up?",
      "Have you ever told a friend's secret to someone else?",
      "What's the friendship you regret ending — or not ending sooner?",
      "Have you ever competed with a friend without them knowing?",
      "What's something a friend has done that you've never fully forgiven?",
      "Have you ever cut someone off without explanation?",
      "Who in your life would you say is a real friend vs someone you just know?",
      "Have you ever let a friend believe something false about you?",
      "What's the thing your friends don't know about you that would change how they see you?",
      "Have you ever distanced yourself from a friend because they were doing better than you?",
      "What's the most you've ever sacrificed for a friendship?",
      "Have you ever been a bad friend during someone's worst time?",
      "What's a friendship you've outgrown but haven't addressed?",
      "Have you ever chosen a partner over a friendship and regretted it?",
      "What do your friends think about you that isn't actually true?",
      "Have you ever introduced two friends hoping they wouldn't get close?",
      "What's something a friend said to you that changed how you see yourself?",
      "Have you ever been left out by your friend group and not said anything?",
      "What's the thing you'd tell your best friend if you knew there were no consequences?",
      "Have you ever been fake happy for a friend's good news?",
      "What's a friendship that ended that you still think about?",
      "Who do you know now that you would not be friends with if you met them today?",
      "Have you ever let a friendship fade because confronting an issue felt too hard?",
      "What's the most honest thing a friend has ever told you?",
      "Who's the friend that's seen the worst version of you?",
      "If your closest friends described you honestly — what would they actually say?",
    ],
  },
  "🎲 Luck vs Skill": {
    color: "#10b981",
    questions: [
      "Is success 80% luck or 80% skill?",
      "Would you bet $500 on a coin flip right now?",
      "Do you think where you were born determined most of your life outcomes?",
      "Is meeting the right person mostly luck or mostly who you become?",
      "Would you rather be the most talented person in the room or the most connected?",
      "Has luck ever saved you when skill couldn't?",
      "Do you believe in the right place right time — or do you make your own timing?",
      "Would you rather work hard for $200K or stumble into $200K?",
      "If you lost everything tomorrow, how much of what you have was skill vs luck?",
      "Do you think rich kids think they're successful because of skill?",
      "Have you ever gotten credit for luck that you presented as skill?",
      "Would you play poker with your rent money if you were really good at it?",
      "Is confidence a skill or is it something you're born with?",
      "Do you think your career path was mostly planned or mostly happened to you?",
      "Would you rather be born beautiful or born brilliant?",
      "Is charisma something you can learn or are you born with it?",
      "Have you ever been in the right place at the right time and not taken advantage of it?",
      "Do you think God plays a role in your outcomes or is that just comfort thinking?",
      "If you had to bet everything on yourself right now, what would you bet on?",
      "Is timing in relationships luck or do you create the right timing?",
      "Would you rather be average at everything or exceptional at one thing?",
      "Do you think most wealthy people are genuinely smarter than average or just luckier?",
      "If you were raised in a different family, would you be the same person?",
      "Have you ever failed at something where you had all the skill but none of the luck?",
      "Would you rather have a great work ethic or great natural talent?",
      "Do you think the way you look has helped or hurt your outcomes in life?",
      "Is being in the right generation luck or something else?",
      "Would you rather have one extraordinary talent or be above average at everything?",
      "Do you think your successes are more YOU or more circumstances?",
      "If you could go back and change one lucky break you missed — what would it be?",
    ],
  },
  "👑 Ego Checks": {
    color: "#f97316",
    questions: [
      "Rate yourself honestly as a partner 1-10. Now rate how you think you rate yourself.",
      "What's the most arrogant thing you've ever done?",
      "Have you ever talked about yourself too much on a first date?",
      "What's a skill you think you have that people around you would disagree with?",
      "Have you ever dismissed someone's opinion because of how they looked?",
      "What's the last time you were genuinely humbled?",
      "Do you think you're above average intelligence? What makes you say that?",
      "Have you ever not apologized because you couldn't admit you were wrong?",
      "What's something you believe about yourself that your ex would laugh at?",
      "When did your confidence cross into arrogance?",
      "What's the harshest thing someone has said about you that was completely true?",
      "Do you think you're a good listener or do you just think you are?",
      "What's a compliment you give yourself that you've never fully earned?",
      "Have you ever made someone feel small to make yourself feel bigger?",
      "What's the biggest L you've ever taken that changed how you see yourself?",
      "Do you think you're as funny as you think you are?",
      "What's a flaw you have that you disguise as a personality trait?",
      "Have you ever refused help because asking felt like weakness?",
      "What's something you're proud of that you talk about more than you should?",
      "Do you actually take criticism well or do you just say you do?",
      "What's a version of yourself that you've outgrown that you haven't fully let go of?",
      "Have you ever taken up too much space in a room — literally or figuratively?",
      "What's the most you've ever overestimated yourself?",
      "Do you think people like you as much as you think they do?",
      "What's something you judge in other people that you do yourself?",
      "Have you ever competed with someone who didn't know they were competing with you?",
      "What's the role ego has played in your biggest mistakes?",
      "Do you have a savior complex — always needing to fix or help others?",
      "What's the difference between confidence and delusion — and where are you?",
      "If the people closest to you roasted you honestly right now, what would hurt the most?",
    ],
  },
  "📱 Phone Challenges": {
    color: "#6366f1",
    questions: [
      "Show the last photo in your camera roll — no deleting first.",
      "Read your last text message out loud.",
      "Show how many hours of screen time you had this week.",
      "Read your most recent Google search out loud.",
      "Open your Spotify and show what you last listened to.",
      "Show your most used app this month.",
      "Read your last DM out loud — no skipping.",
      "Open your notes app and read the most recent note.",
      "Show your battery percentage and everyone judges your phone habits.",
      "Show the last person you called and how long the call was.",
      "Open your camera roll and show the 10th photo.",
      "Read the last voice memo you recorded.",
      "Show your most-texted contact — no lying.",
      "Open your email and read the subject line of the most recent unread email.",
      "Show your alarm setup — how many alarms do you have?",
      "Go to your Instagram following and show the last person you followed.",
      "Show the last thing you added to your shopping cart online.",
      "Read the last comment you left on social media.",
      "Show your step count for today.",
      "Open your maps and show the last place you navigated to.",
      "Show your phone's wallpaper and explain why you chose it.",
      "Read the last thing you copy-pasted.",
      "Show your most recent app download.",
      "Open your contacts and show how many people you have saved.",
      "Show the last video you watched on YouTube.",
      "Read the last thing you screenshot.",
      "Show your subscriptions — what are you actually paying for monthly?",
      "Show the oldest photo in your camera roll.",
      "Read your most recent deleted message if you can recover it.",
      "Hand your phone to the person next to you for 30 seconds — they can look at anything.",
    ],
  },
  "🎵 Music": {
    color: "#D4AF37",
    questions: [
      "What song plays when you walk into a room and own it?",
      "What artist does everyone sleep on that you ride for hard?",
      "What song do you skip when it comes on but secretly know every word?",
      "What music genre says the most about who you really are?",
      "If your life was a movie what song plays in the final scene?",
      "What song would play if your ex walked in right now?",
      "What artist would you be embarrassed if people saw in your Spotify history?",
      "What song hits different at 2am vs 2pm?",
      "Who's the artist that changed your whole taste in music?",
      "What's your hype song before you walk into something important?",
      "If you could only listen to one genre for the rest of your life what is it?",
      "Drake or Kendrick?",
      "Usher or Chris Brown?",
      "90s or 2000s?",
      "Afrobeats or Amapiano?",
      "Burna Boy or Wizkid?",
      "Beyoncé or Rihanna?",
      "Future or Lil Baby?",
      "Michael Jackson or Prince?",
      "Go-Go or Hip-Hop?",
      "What song do you and your best friend both know word for word?",
      "What artist's lyrics actually describe your love life?",
      "Who's an artist that sold out and you can't respect them anymore?",
      "What artist has never made a bad song?",
      "Whose concert would make you spend money you don't have?",
      "What song makes you feel invincible?",
      "What's the song that got you through your hardest time?",
      "What genre do you judge people for listening to?",
      "What's the most toxic song you still bump?",
      "What's your karaoke song — and be honest, not the safe answer?",
    ],
  },
  "🌆 DC": {
    color: "#10b981",
    questions: [
      "What's the most DC thing you've ever done that people from other cities would never understand?",
      "Best kept secret spot in DC that you're scared to tell people about?",
      "What's something about DC people on the outside get completely wrong?",
      "Gentrification in DC — progress or erasure? Be real.",
      "What neighborhood defines the real DC and why?",
      "Old DC vs New DC — which one wins and why?",
      "If you had to describe DC's dating scene in one word what is it?",
      "What's the biggest flex about being from DC?",
      "What does someone need to know before moving to DC?",
      "Is DC underrated or overrated as a city?",
      "What part of DC would you never take a date to?",
      "Howard or Georgetown — where would you rather go?",
      "What DC stereotype about you is actually 100% true?",
      "What do you think DC will look like in 10 years and does that excite or scare you?",
      "What's the most DC way to spot a transplant?",
      "If DC had a theme song what would it be?",
      "What's the best block in DC for vibes on a Friday night?",
      "What's the one thing DC does better than any other city in America?",
      "Chi-Cha Lounge — rate it and be honest?",
      "What's something about DC that you only appreciate after you leave?",
      "What era of DC was the best era?",
      "What DC food are you riding for until you die?",
      "If you had to leave DC tomorrow where would you go?",
      "What's the most controversial opinion you have about DC?",
      "What's the most expensive night you've had on U Street?",
      "DC or ATL?",
      "Describe DC in 3 words.",
      "What's the real DC experience that no travel guide will tell you about?",
      "What's the thing about DC nightlife that outsiders don't understand?",
      "What makes DC different from every other city in America?",
    ],
  },
  "🔥 Spicy": {
    color: "#ef4444",
    questions: [
      "Would you stay with someone you love if they cheated once?",
      "What's the biggest lie you've told in a relationship you never came clean about?",
      "What's the most you've ever spent trying to impress someone who wasn't worth it?",
      "Have you ever stayed in a relationship purely for financial reasons?",
      "What's the longest you've gone without sex in a relationship and what did it do to you?",
      "Have you ever caught real feelings for someone you were just supposed to be physical with?",
      "What's one relationship rule you say you have but constantly break?",
      "What's the most money you've lost over someone you were dating?",
      "Have you ever stayed with someone just because leaving felt too hard?",
      "Would you want to know if your best friend had feelings for your partner?",
      "Would you forgive cheating one time?",
      "What's worse: emotional cheating or physical cheating?",
      "Can men and women really be just friends?",
      "What's your biggest toxic trait?",
      "Have you ever ghosted someone?",
      "What's your biggest regret in dating?",
      "What's one lie you tell all the time?",
      "Is marriage still worth it in 2026?",
      "Say one opinion that would get you canceled.",
      "What truth are people not ready to hear?",
      "Men or women — who has it easier?",
      "Is love real or just good timing?",
      "What's a hill you're willing to die on?",
      "What's one dating rule everyone should break?",
      "If your partner cheated and no one would ever find out, would you want to know?",
      "What's something everyone pretends to enjoy?",
      "Have you ever been the side piece — knowingly or not?",
      "What's the most painful thing someone said to you that turned out to be true?",
      "What's your biggest insecurity that always shows up in your love life?",
      "What would you do if you found out your partner had a secret life you knew nothing about?",
    ],
  },
  "💼 Brand": {
    color: "#f59e0b",
    questions: [
      "If you started a business tomorrow what would it be?",
      "What's your side hustle?",
      "What app are you opening first in the morning?",
      "Best investment you ever made?",
      "What's your money move this year?",
      "Entrepreneur or 9-5?",
      "What would make you quit your job today?",
      "Would you leave your partner for $10 million?",
      "What's the smallest amount of money that would change your life today?",
      "If your ex offered you $50,000 to get back together, yes or no?",
      "Would you rather be rich and lonely or broke with the love of your life?",
      "If your spouse secretly won the lottery, should they have to tell you?",
      "What's your dream business — be specific?",
      "Would you quit your job for YouTube?",
      "What's the most financially stupid thing you've ever done?",
      "What's your actual number — the amount that would make you feel free?",
      "Would you work for your enemy if they paid you 3x your current salary?",
      "You find $100K in cash. No way to trace it. What do you do?",
      "What's the biggest financial regret of your life so far?",
      "What's something you've bought purely for status?",
      "Fame or generational wealth — which one?",
      "What's the hustle you're running that most people don't know about?",
      "Have you been to Chi-Cha? Rate it.",
      "Would you start a business with a friend knowing it could destroy the friendship?",
      "What's the money conversation you've been avoiding?",
      "Save or spend?",
      "Lottery or hard work?",
      "Invest or real estate?",
      "What does financial freedom actually mean to you?",
      "What would you do differently in your 20s if you understood money the way you do now?",
    ],
  },
  "💭 Random": {
    color: "#8b5cf6",
    questions: [
      "What's the version of yourself you show online vs who you actually are?",
      "If you found out you had 6 months to live what would you do first?",
      "What opinion do you have that you'd never post publicly but fully believe?",
      "What's the thing you're most afraid to admit you want?",
      "Would you rather be famous and broke or anonymous and wealthy?",
      "What's the biggest thing you've ever sacrificed that you still wonder about?",
      "If everyone could hear your thoughts for one hour today what would be the most revealing?",
      "What's something you judge other people for that you actually do yourself?",
      "What's the hardest no you've ever had to say?",
      "What's a belief you held strongly that you completely changed your mind on?",
      "If you could go back and undo one decision what would it be?",
      "What's the one thing you want but are too proud to ask for?",
      "What's the moment that made you grow up faster than you should have?",
      "What does success look like to you in 5 years — be specific not inspirational?",
      "What do you think about at 3am that you never bring up in conversation?",
      "What's the thing you do when nobody's watching that says the most about who you are?",
      "What's something you believe about yourself that other people would disagree with?",
      "What's the dream you've been too embarrassed to say out loud?",
      "What's the most honest thing anyone has ever said to your face?",
      "What's the decision you're avoiding right now that you already know the answer to?",
      "What's the best advice you've ever ignored?",
      "What's one thing you've never said to someone you love that they deserve to hear?",
      "What's the hardest part about being you that nobody sees?",
      "What's something you've outgrown that you're still holding onto?",
      "If you could know one truth about your future would you actually want to know it?",
      "What's the thing that would surprise people most if they really knew you?",
      "What's the moment you stopped caring what other people thought?",
      "What's the one relationship in your life you wish you had handled differently?",
      "What's the thing you want to be remembered for that has nothing to do with your job?",
      "What's the feeling you keep chasing and never quite catching?",
    ],
  },
};

const ALL_CATEGORY_NAMES = Object.keys(QUESTIONS);

interface FlatQuestion {
  category: string;
  question: string;
  color: string;
}

export default function CardsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [allQuestions, setAllQuestions] = useState<FlatQuestion[]>([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [totalSeen, setTotalSeen] = useState(1);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    // Flatten and shuffle all questions on mount
    const flat: FlatQuestion[] = [];
    for (const cat of ALL_CATEGORY_NAMES) {
      for (const q of QUESTIONS[cat].questions) {
        flat.push({ category: cat, question: q, color: QUESTIONS[cat].color });
      }
    }
    setAllQuestions(shuffleArray(flat));
  }, []);

  const filteredQuestions =
    activeCategory === "All"
      ? allQuestions
      : allQuestions.filter((q) => q.category === activeCategory);

  const currentQ = filteredQuestions.length > 0
    ? filteredQuestions[cardIndex % filteredQuestions.length]
    : null;

  const cardColor = currentQ?.color ?? "#6366f1";

  function nextCard() {
    setFlipped(false);
    setTimeout(() => {
      setCardIndex((i) => i + 1);
      setTotalSeen((t) => t + 1);
    }, 200);
  }

  function handleCategoryChange(cat: string) {
    setActiveCategory(cat);
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

  const allPills = ["All", ...ALL_CATEGORY_NAMES];

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
          {allPills.map((cat) => {
            const isActive = cat === activeCategory;
            const catColor = cat === "All" ? "#D4AF37" : QUESTIONS[cat]?.color ?? "#D4AF37";
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                style={{
                  flexShrink: 0,
                  padding: "8px 14px",
                  borderRadius: "999px",
                  border: `1.5px solid ${isActive ? catColor : "rgba(255,255,255,0.15)"}`,
                  background: isActive ? `${catColor}26` : "rgba(255,255,255,0.05)",
                  color: isActive ? catColor : "rgba(255,255,255,0.6)",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s",
                }}
              >
                {cat}
              </button>
            );
          })}
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
            <div className="card-face card-back" style={{
              background: `linear-gradient(135deg, ${cardColor}22 0%, rgba(10,10,10,0.95) 100%)`,
              border: `1.5px solid ${cardColor}55`,
            }}>
              <div style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: `${cardColor}33`,
                border: `2px solid ${cardColor}88`,
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
                color: cardColor,
                marginBottom: "8px",
              }}>U STREET</div>
              <div style={{
                fontSize: "11px",
                letterSpacing: "0.25em",
                color: `${cardColor}99`,
              }}>TAP TO REVEAL</div>
            </div>

            {/* Front (shows question) */}
            <div className="card-face card-front" style={{
              background: `linear-gradient(135deg, ${cardColor}33 0%, rgba(10,10,10,0.98) 100%)`,
              border: `1.5px solid ${cardColor}66`,
            }}>
              <div style={{
                fontSize: "12px",
                letterSpacing: "0.2em",
                color: cardColor,
                marginBottom: "20px",
                fontWeight: 700,
                padding: "4px 12px",
                borderRadius: "999px",
                background: `${cardColor}22`,
                border: `1px solid ${cardColor}44`,
              }}>
                {currentQ?.category ?? ""}
              </div>
              <p style={{
                fontSize: "22px",
                fontWeight: 800,
                color: "#fff",
                textAlign: "center",
                lineHeight: 1.35,
                letterSpacing: "-0.01em",
              }}>
                {currentQ?.question ?? ""}
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
              background: cardColor,
              border: "none",
              color: "#fff",
              fontSize: "16px",
              fontWeight: 800,
              letterSpacing: "0.06em",
              cursor: "pointer",
              boxShadow: `0 4px 20px ${cardColor}66`,
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            NEW CARD 🃏
          </button>
        </div>
        <div style={{ height: "40px" }} />
      </div>
    </div>
  );
}
