/*
 * ─────────────────────────────────────────────────────────────
 *  SURPRISE WITHOUT SIGHT — CENTRAL RESEARCH CONTENT
 * ─────────────────────────────────────────────────────────────
 *  Every word of the paper lives in this file. The site presents it
 *  two ways from the same source:
 *    • as seven "boxes" (chapters) you open one at a time, and
 *    • as one continuous Full Paper that follows the paper's own
 *      numbered sections (chapters sharing a `paperNumber` are merged).
 *
 *  Blocks marked `only: "chapter"` appear only in the box view (for
 *  example, instructions for an interactive). Blocks marked
 *  `only: "paper"` appear only in the Full Paper view.
 * ─────────────────────────────────────────────────────────────
 */

export type ThemeKey = "blush" | "lavender" | "mint" | "butter" | "peach" | "sky" | "lilac";

export type Point = { lead: string; text: string };

export type FigureImage = { src: string; alt: string; width: number; height: number };

type BlockBody =
  | { type: "p"; text: string }
  | { type: "callout"; title: string; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "figure"; images: FigureImage[]; caption: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "points"; items: Point[] }
  | { type: "interactive"; kind: "shake" | "peel" | "gifts" | "capsule" };

export type Block = BlockBody & { only?: "chapter" | "paper" };

export type Section = {
  id: string;
  heading: string;
  /**
   * Heading used in the Full Paper. Defaults to `heading`.
   * `null` means the paper has no sub-heading here, so the text flows on.
   */
  paperHeading?: string | null;
  blocks: Block[];
};

export type Reference = {
  id: string;
  /** Sort key: the first author's surname or organisation. */
  sort: string;
  before: string;
  /** The italicised part (book, proceedings or journal title). */
  italic?: string;
  after?: string;
  url?: string;
};

export type Chapter = {
  id: string;
  number: string;
  title: string;
  /** Section of the paper this chapter covers. */
  label: string;
  /** Section number in the paper. Consecutive chapters with the same number are merged in the Full Paper. */
  paperNumber: string;
  /** Heading used in the continuous Full Paper view. */
  paperHeading: string;
  subtitle: string;
  theme: ThemeKey;
  emblem: "question" | "heart" | "eye" | "spark" | "hands" | "bulb" | "moon";
  /** Short preview shown on the research card when a box opens. */
  preview: string;
  sections: Section[];
  references: Reference[];
};

const img = (file: string) => `${import.meta.env.BASE_URL}images/${file}`;

export const paperMeta = {
  title: "Surprise Without Sight",
  subtitle:
    "A co-design protocol for making mystery boxes an inclusive, fun experience for blind and low-vision young adults",
  kind: "Participatory Research and Design Project",
  author: "Yvonne Wu",
  course: "HF720 Internationalization and World-Ready Product Design",
  instructor: "Gary C. David, PhD",
  date: "November 2026",
  philosophy: "Everyone deserves to experience the joy of discovery.",
};

export const designQuestion =
  "How might mystery boxes keep the thrill of not knowing while giving BLV players real agency, meaning they can choose, anticipate, reveal, collect and share on equal terms?";

/* ── References ─────────────────────────────────────────────── */

const R = {
  alzalabny: {
    id: "alzalabny-2025",
    sort: "Alzalabny",
    before:
      "Alzalabny, S., Müller, K., Gerling, K., Schwarz, T., Rapp, B., & Stiefelhagen, R. (2025). A low-fidelity prototyping method for blind users: A case study on designing two-dimensional tactile displays. In ",
    italic:
      "Proceedings of the 27th International ACM SIGACCESS Conference on Computers and Accessibility (ASSETS '25)",
    after: ". ACM.",
  },
  bolesnikov: {
    id: "bolesnikov-2022",
    sort: "Bolesnikov",
    before:
      "Bolesnikov, A., Kang, J., & Girouard, A. (2022). Understanding tabletop games accessibility: Exploring board and card gaming experiences of people who are blind and low vision. In ",
    italic:
      "Proceedings of the 16th International Conference on Tangible, Embedded, and Embodied Interaction (TEI '22)",
    after: ". ACM.",
    url: "https://doi.org/10.1145/3490149.3501327",
  },
  delgado: {
    id: "delgado-2021",
    sort: "Delgado",
    before:
      "Delgado, F., Yang, S., Madaio, M., & Yang, Q. (2021). Stakeholder participation in AI: Beyond “add diverse stakeholders and stir.” As cited in Odendaal & Zavala Barreda (2024); not read directly.",
  },
  iowa: {
    id: "iowa-dept-blind",
    sort: "Iowa Department for the Blind",
    before: "Iowa Department for the Blind. (n.d.). ",
    italic: "Misconceptions about blindness",
    after: ".",
    url: "https://blind.iowa.gov/resources-and-publications/misconceptions-about-blindness",
  },
  ixdf: {
    id: "ixdf",
    sort: "Interaction Design Foundation",
    before: "Interaction Design Foundation. (n.d.). ",
    italic: "Participatory design",
    after: ".",
    url: "https://ixdf.org/literature/topics/participatory-design",
  },
  odendaal: {
    id: "odendaal-2024",
    sort: "Odendaal",
    before:
      "Odendaal, A., & Zavala Barreda, K. (2024). Imagining inclusive technological futures through participatory board game design. ",
    italic: "The Design Journal, 27",
    after: "(2), 291–311.",
    url: "https://doi.org/10.1080/14606925.2024.2304409",
  },
  parallel: {
    id: "parallel",
    sort: "Parallel",
    before: "Parallel. (n.d.). ",
    italic: "What is participatory design?",
    url: "https://www.parallelhq.com/blog/what-participatory-design",
  },
  sanders: {
    id: "sanders-2008",
    sort: "Sanders",
    before: "Sanders, E. B.-N., & Stappers, P. J. (2008). Co-creation and the new landscapes of design. ",
    italic: "CoDesign, 4",
    after: "(1), 5–18.",
  },
} satisfies Record<string, Reference>;

/* ── Interactive content ───────────────────────────────────── */

/** Section 3: the six IxDF aspects (peel-to-reveal stickers). */
export const principles: { id: string; name: string; theme: ThemeKey; definition: string }[] = [
  {
    id: "inclusion",
    name: "Inclusion",
    theme: "blush",
    definition:
      "BLV young adults (about 18 to 30) with a range of vision, including collectors and people who have never opened a mystery box. Materials are provided in each person's preferred format.",
  },
  {
    id: "collaboration",
    name: "Collaboration",
    theme: "lavender",
    definition:
      "Two paid BLV co-researchers help plan sessions, review synthesis, and co-facilitate from the start.",
  },
  {
    id: "empowerment",
    name: "Empowerment",
    theme: "mint",
    definition:
      "Participants define success criteria and hold a veto over concepts. They are credited and paid as co-designers.",
  },
  {
    id: "iteration",
    name: "Iteration",
    theme: "butter",
    definition:
      "A relay of workshops and test cycles in which each round starts from the previous round's decisions.",
  },
  {
    id: "context",
    name: "Contextual understanding",
    theme: "peach",
    definition:
      "Sessions happen around real mystery boxes, real shops and real unboxing habits, not abstract discussion.",
  },
  {
    id: "advocacy",
    name: "Audience advocacy",
    theme: "sky",
    definition:
      "The advisory group can speak to makers and retailers on the project's behalf and decide what is shared publicly.",
  },
];

/** Section 4: the six stages (unwrap-the-gift). */
export const stages: {
  id: string;
  name: string;
  theme: ThemeKey;
  activity: string;
  participants: string;
  output: string;
}[] = [
  {
    id: "stage-1",
    name: "Preparation and framing",
    theme: "blush",
    activity: "Partner with BLV organisations, hire co-researchers, agree on access needs and pay",
    participants: "2 co-researchers, partners",
    output: "Shared research question, accessible consent",
  },
  {
    id: "stage-2",
    name: "Discovery and contextual inquiry",
    theme: "lavender",
    activity: "Go-along unboxing sessions and interviews",
    participants: "8 to 10 BLV young adults",
    output: "Rituals, workarounds, pain points, “what surprise means”",
  },
  {
    id: "stage-3",
    name: "Co-ideation and co-design",
    theme: "mint",
    activity: "Two-cohort tactile design relay",
    participants: "2 cohorts of 4 to 6",
    output: "Concept directions and success criteria",
  },
  {
    id: "stage-4",
    name: "Prototyping and feedback cycles",
    theme: "butter",
    activity: "Build and test 2 to 3 concepts over 3 rounds",
    participants: "Returning participants",
    output: "Refined or vetoed concepts",
  },
  {
    id: "stage-5",
    name: "Implementation and refinement",
    theme: "peach",
    activity: "Small pilot with a maker or brand partner",
    participants: "Participants plus new BLV buyers",
    output: "Pilot results and revised guidelines",
  },
  {
    id: "stage-6",
    name: "Sustain and governance",
    theme: "sky",
    activity: "Advisory panel, open guidelines, feedback channel",
    participants: "Advisory panel",
    output: "Ongoing review and shared credit",
  },
];

/** Stage 4: the starting concept families (shake-to-reveal). */
export const conceptFamilies: (Point & { id: string })[] = [
  {
    id: "tactile",
    lead: "Tactile rarity cues",
    text: "Rarity or series is encoded in textures, shapes or weights on the packaging, so players can tell a box type without sight while the figure inside stays hidden.",
  },
  {
    id: "sound-scent",
    lead: "Sound and scent reveals",
    text: "The reveal becomes an audio or scent moment, such as a series theme or a distinctive scent, so surprise is multisensory and shareable at a table.",
  },
  {
    id: "labelling",
    lead: "Equal-information labelling",
    text: "Odds, series size and brand details appear in accessible formats (Braille, large print, a QR code with audio) so BLV players get the full picture of what they are buying without needing help.",
  },
];

/** Interview questions (Stage 2) and the provocation (Stage 3), for the capsule machine. */
export const reflectionPrompts = [
  "What does surprise mean to you?",
  "When has a mystery purchase felt good?",
  "When has a mystery purchase felt unfair or excluding?",
  "What would “equal” feel like?",
  "Imagine a mystery box shop in ten years where everyone plays on equal terms. What is different?",
];

/* ── Chapters ──────────────────────────────────────────────── */

export const chapters: Chapter[] = [
  {
    id: "curiosity",
    number: "01",
    title: "The Curiosity Box",
    label: "The problem and the opportunity",
    paperNumber: "1",
    paperHeading: "The problem and the opportunity",
    subtitle:
      "Mystery boxes sell the thrill of not knowing. Almost every ritual around them assumes sight.",
    theme: "blush",
    emblem: "question",
    preview:
      "What mystery boxes are, why the culture around them leaves BLV players out, and the design question this project asks.",
    sections: [
      {
        id: "what",
        heading: "What is a mystery box?",
        blocks: [
          {
            type: "p",
            text: "Mystery boxes, more commonly referred to as “blind boxes,” have become their own distinct retail product category with massive demand and popularity. Mystery boxes often have themes; in the image shown below, there is a bakery theme for Miffy figures. Many buyers collect these figurines/toys, and each purchase is essentially a “blind” buy. The surprise is wrapped in opaque plastic packaging inside a decorated box, revealing the item only when torn open. These mystery boxes sell toys, but in my opinion, I think they are mainly selling a feeling. Mystery boxes sell a feeling of surprise, anticipation, or uncertainty. The fun part is not only the surprise itself, but also the entire experience leading up to the big reveal: seeing the lineup on the box packaging, guessing which item you got, and even shaking the box.",
          },
          {
            type: "figure",
            images: [
              {
                src: img("blind-box-packaging.webp"),
                width: 640,
                height: 640,
                alt: "A sealed, opaque orange cardboard box for the Miffy Bakery Series plush keychain mystery box. The front shows a picture of Miffy in a checked apron holding a bunny-shaped bread, with the words “Bakery Series” and “Plush Keychain”. Nothing on the box reveals which of the figures is inside.",
              },
              {
                src: img("blind-box-series.webp"),
                width: 823,
                height: 823,
                alt: "Seven plush keychain figures from the same Miffy Bakery Series lined up on a pink background: white and brown bunnies and a brown bear, each in a different apron or hat and holding a different bakery item such as a donut, a latte, a cup, a bun, a toast slice or a baguette. The differences between them are mostly colour and small details.",
              },
            ],
            caption:
              "Left: the sealed box. Right: the seven figures in the series. Product images of the VIPO × Miffy Bakery Series, shown for educational purposes; Miffy illustrations © Mercis bv.",
          },
        ],
      },
      {
        id: "sight",
        heading: "Rituals centered around sight",
        blocks: [
          {
            type: "p",
            text: "The mystery box experience has rituals heavily centered around sight; the appealing packaging, the information on the box, the collector’s note or card inside, and the unboxing moment are all visual. For blind and low vision (abbreviated as BLV) young adults, this experience built around visual anticipation can be exclusionary. Simply adding accessibility features doesn’t seem like the perfect solution for this retail category. Braille printing in the packaging or adding a QR code that reads out the contents could increase inclusivity, but I don’t think it captures the thrill of these unboxing experiences.",
          },
          { type: "callout", title: "Design question", text: designQuestion },
        ],
      },
      {
        id: "position",
        heading: "Why a participatory process",
        blocks: [
          {
            type: "p",
            text: "There are many myths and misconceptions around blindness that I am still learning about. Although I have high myopia (if I take my glasses off, the Google doc I am typing on becomes white with lines of black blobs), I need to make clear that I do not assume to understand the experience of blind and visually impaired people. This project is organised as a participatory process, not a product brief or even a product proposal. The question itself, and what counts as “fun”, should be shaped by the people the experience is for. However, a bigger question that comes up is: Do current mystery boxes need “fixing?” The online research I have done seems to tell me that blind and visually impaired people enjoy mystery boxes and collecting items; just in different ways than sighted people. According to the Iowa Department for the Blind (n.d.), “Only approximately 18 percent of people who are legally blind are classified as being totally blind and the majority of blind people can still differentiate between light and dark.” Knowing this, is there even an opportunity to design a better experience for the audience in question? This is why I would leverage a participatory design process with direct stakeholder participation.",
          },
        ],
      },
    ],
    references: [R.iowa],
  },
  {
    id: "evidence",
    number: "02",
    title: "The Evidence Box",
    label: "What related work tells us",
    paperNumber: "2",
    paperHeading: "What related work tells us",
    subtitle:
      "No one has studied mystery boxes and BLV players directly, so the clues come from three neighbouring areas.",
    theme: "lavender",
    emblem: "bulb",
    preview:
      "Evidence from tabletop game accessibility, co-design with blind participants, and a participatory “design relay”, and what each lends this protocol.",
    sections: [
      {
        id: "gap",
        heading: "A gap in the research",
        blocks: [
          {
            type: "p",
            text: "I searched for work on mystery boxes and BLV players directly and found none. Research on mystery boxes concerns marketing and the regulation of gambling-like mechanics, not accessibility. That gap is part of the case for this project. The closest evidence comes from three neighbouring areas.",
          },
        ],
      },
      {
        id: "tabletop",
        heading: "Tabletop games and BLV players",
        blocks: [
          {
            type: "p",
            text: "Bolesnikov, Kang and Girouard (2022) interviewed 15 BLV people about board and card games. They report themes about the properties and outcomes of inaccessible and accessible games. Their discussion of accessible games includes rulebooks that are available in accessible formats, such as Braille, and, for low-vision players, large text and high-contrast pieces. They also note that most BLV gaming accessibility research has focused on digital games, so tabletop and physical play remain under-studied. A mystery box is a physical, tabletop-adjacent object, which makes this literature the most useful starting point for the “properties of accessible play” that I want participants to refine.",
          },
        ],
      },
      {
        id: "co-design",
        heading: "Co-design methods that work with blind participants",
        blocks: [
          {
            type: "p",
            text: "Alzalabny et al. (2025) adapted low-fidelity prototyping for blind participants because design workshops often depend on visual materials. They first ran co-design workshops to develop a haptic prototyping toolkit and workshop structure, then used it in six workshops with 12 blind participants (11 totally blind, one with severe low vision) to design a tactile display. Their key lesson is that accessible co-design needs the whole workshop adapted, not just a swap of visual materials for tactile ones. I borrow this directly: tactile kits, individual design time before group merging, and a structure planned with BLV collaborators.",
          },
        ],
      },
      {
        id: "relay",
        heading: "A participatory relay structure for design",
        blocks: [
          {
            type: "p",
            text: "Odendaal and Zavala Barreda (2024) ran four online workshops in which different cohorts of 5 to 15 participants each continued the board-game design where the previous cohort stopped. Across the project, 39 people took part. The authors argue that this “design relay” produced polyvocality, because each group had to engage with, question and build on earlier contributions. They are also candid about two limitations that I treat as design constraints for my own protocol: facilitators ended up with an overbearing editorial role that kept power with the designers, and participants were not involved in the reflective practice itself.",
          },
          {
            type: "p",
            text: "Sanders and Stappers (2008), whom Odendaal and Zavala Barreda cite, distinguish co-design by its emphasis on collaboration from before the design decisions are made through to prototyping. That is the standard I hold this protocol to. The aim is that participants shape the question, not only the answers.",
          },
        ],
      },
    ],
    references: [R.alzalabny, R.bolesnikov, R.odendaal, R.sanders],
  },
  {
    id: "principles",
    number: "03",
    title: "The Principles Box",
    label: "Participatory principles",
    paperNumber: "3",
    paperHeading: "Participatory principles",
    subtitle: "Six aspects of participatory design, and what each one means for this project.",
    theme: "mint",
    emblem: "hands",
    preview:
      "The Interaction Design Foundation's six aspects of participatory design, from inclusion to audience advocacy, applied to mystery boxes.",
    sections: [
      {
        id: "aspects",
        heading: "Six aspects of participatory design",
        blocks: [
          {
            type: "p",
            text: "The Interaction Design Foundation lists six key aspects of participatory design.",
            only: "chapter",
          },
          {
            type: "p",
            text: "The Interaction Design Foundation lists six key aspects of participatory design. The table shows what each one means in this project.",
            only: "paper",
          },
          {
            type: "p",
            text: "Peel each sticker to see what it looks like here.",
            only: "chapter",
          },
          { type: "interactive", kind: "peel" },
        ],
      },
    ],
    references: [R.ixdf],
  },
  {
    id: "protocol",
    number: "04",
    title: "The Protocol Box",
    label: "The protocol, stages 1 to 3",
    paperNumber: "4",
    paperHeading: "The protocol, stage by stage",
    subtitle:
      "Six stages, from preparation to governance. This box covers getting ready, listening, and designing together.",
    theme: "butter",
    emblem: "spark",
    preview:
      "An overview of all six stages, then preparation and framing, go-along unboxing sessions, and a two-cohort tactile design relay.",
    sections: [
      {
        id: "overview",
        heading: "The six stages",
        blocks: [
          {
            type: "p",
            text: "I use the six stages from the Parallel (n.d.) participatory design template provided for this assignment, because it keeps preparation and long-term governance in view, not only the workshops. The protocol is a proposal: no sessions have been run, and every number below is a planning assumption to be revised with the co-researchers.",
          },
          {
            type: "p",
            text: "Unwrap each stage to see its main activity, who takes part, and what it produces.",
            only: "chapter",
          },
          { type: "interactive", kind: "gifts" },
        ],
      },
      {
        id: "stage-1",
        heading: "Stage 1. Preparation and framing",
        blocks: [
          {
            type: "points",
            items: [
              {
                lead: "Partners and co-researchers.",
                text: "Contact local organisations that serve BLV people and recruit two BLV young adults as paid co-researchers before any design work. They review the research question, consent materials and session plans.",
              },
              {
                lead: "Access first.",
                text: "Ask every participant in advance about preferred formats (screen-reader-friendly documents, large print, Braille, audio), travel needs, guide animals, sighted assistance and breaks. Hold sessions in step-free, quiet, well-lit spaces with remote options, and pay for participation and travel.",
              },
              {
                lead: "Consent.",
                text: "Offer consent in the participant's chosen format, read aloud if wanted, and make clear that they can stop at any time and that nothing they say about gambling-like mechanics or their finances is required.",
              },
            ],
          },
        ],
      },
      {
        id: "stage-2",
        heading: "Stage 2. Discovery and contextual inquiry",
        blocks: [
          {
            type: "points",
            items: [
              {
                lead: "Go-along unboxing (60 to 90 minutes, one to one).",
                text: "I supply a few mystery boxes from different brands. Participants open them in whatever way they normally would, and I observe and ask them to think aloud. I watch for the use of weight, shake, sound, smell and texture; remote sighted help (such as video-call assistance); and what is lost or gained.",
              },
              {
                lead: "Open interview.",
                text: "What does surprise mean to you? When has a mystery purchase felt good, and when has it felt unfair or excluding? What would “equal” feel like?",
              },
              {
                lead: "Participants as experts.",
                text: "Their existing workarounds are treated as design knowledge, not as deficits. Co-researchers join the synthesis, and participants review a plain-language summary of what I heard before it is used (see the limitations on this in section 5).",
              },
            ],
          },
        ],
      },
      {
        id: "stage-3",
        heading: "Stage 3. Co-ideation and co-design",
        blocks: [
          {
            type: "p",
            text: "I adapt the design relay of Odendaal and Zavala Barreda (2024) in two cohorts. Cohort A defines what makes a good mystery and the criteria any concept must meet. Cohort B takes those criteria and the unresolved questions and builds concepts, then hands their work back for Stage 4. Each session follows the accessibility lessons from Alzalabny et al. (2025).",
          },
          {
            type: "points",
            items: [
              {
                lead: "Tactile kit.",
                text: "Clay, textured papers and fabrics, bump dots, magnets, small bells, scented swatches and capsules of different weights. No material depends on seeing it.",
              },
              {
                lead: "Individual then merged.",
                text: "Each participant first builds a concept alone, then the group merges the strongest ideas into one shared prototype.",
              },
              {
                lead: "Describe aloud.",
                text: "Everyone narrates what they place and where. Sighted helpers act only as hands when asked, never as designers.",
              },
              {
                lead: "Provocation.",
                text: "Following the critical-play approach in the class reading, one activity is a speculative prompt (“a mystery box shop in ten years where everyone plays on equal terms”) to move discussion past the fixes people already know.",
              },
            ],
          },
        ],
      },
    ],
    references: [R.parallel, R.odendaal, R.alzalabny],
  },
  {
    id: "prototype",
    number: "05",
    title: "The Prototype Box",
    label: "The protocol, stages 4 to 6",
    paperNumber: "4",
    paperHeading: "The protocol, stage by stage",
    subtitle:
      "Testing concepts, piloting what survives, and keeping participants in charge after the project ends.",
    theme: "peach",
    emblem: "heart",
    preview:
      "Three starting concepts to test (and possibly veto), a small pilot with a maker, and an advisory panel with open guidelines.",
    sections: [
      {
        id: "stage-4",
        heading: "Stage 4. Prototyping and feedback cycles",
        blocks: [
          {
            type: "p",
            text: "I expect to test two or three concept families over three rounds. These are starting hypotheses, not the answer; participants may reject all of them:",
          },
          { type: "interactive", kind: "shake" },
          {
            type: "p",
            text: "Each round, participants test low-fidelity prototypes, rate them against the criteria they wrote in Stage 3 (for example: “still feels like a surprise”, “I can do it without help”, “I can share it with friends”), and can veto a concept outright. The next round begins from what survives.",
          },
        ],
      },
      {
        id: "stage-5",
        heading: "Stage 5. Implementation and refinement",
        blocks: [
          {
            type: "p",
            text: "If a concept survives, I would approach a small independent maker or brand to produce a limited pilot batch. Participants would be named co-designers, and new BLV buyers would try the boxes in realistic conditions. The pilot must not add mechanics that intensify gambling-like behaviour such as pushing repeat purchases; participants should help set that line.",
          },
        ],
      },
      {
        id: "stage-6",
        heading: "Stage 6. Sustain and governance",
        blocks: [
          {
            type: "points",
            items: [
              {
                lead: "Advisory panel.",
                text: "Participants who want to continue stay on as a paid advisory group with a say in how results are shared.",
              },
              {
                lead: "Participant-led reflection.",
                text: "After each stage, participants and co-researchers join a debrief about what worked and what did not. This directly addresses a limitation that Odendaal and Zavala Barreda (2024) name in their own project.",
              },
              {
                lead: "Open guidelines.",
                text: "Publish a short, accessible set of mystery box design guidelines, free to reuse, with participants credited as they choose.",
              },
            ],
          },
        ],
      },
    ],
    references: [R.odendaal],
  },
  {
    id: "limitations",
    number: "06",
    title: "The Honest Box",
    label: "Criticisms and limitations",
    paperNumber: "5",
    paperHeading: "Criticisms and limitations",
    subtitle: "What this approach cannot do, named plainly.",
    theme: "sky",
    emblem: "eye",
    preview:
      "A sighted facilitator, a small sample, tokenism, a gambling-like product, an unresolved tension, cost, thin evidence, and an untested plan.",
    sections: [
      {
        id: "weaknesses",
        heading: "Eight real weaknesses",
        blocks: [
          {
            type: "p",
            text: "This approach has real weaknesses. I list them plainly because the assignment asks for criticism and because naming them is part of doing participatory work honestly.",
          },
          {
            type: "points",
            items: [
              {
                lead: "I am a sighted facilitator interpreting a lived experience I do not have.",
                text: "Even with co-researchers, my framing, my choice of prompts and my synthesis shape the outcome. Odendaal and Zavala Barreda (2024) found the same: designer-facilitators end up in an editorial role that partly defeats the aim of dissolving power relations. Paying co-researchers and letting participants review synthesis reduces this but does not remove it.",
              },
              {
                lead: "A small group cannot represent a diverse community.",
                text: "Blindness and low vision cover many different conditions, ages, onset times, assistive technologies and cultures. Eight to ten people cannot speak for all of them, and recruiting through organisations tends to reach people who are already connected and comfortable with research. This is relevant for an internationalisation course too: attitudes to mystery boxes, gambling and disability differ across countries and legal contexts, and a protocol rooted in one place may not travel.",
              },
              {
                lead: "Tokenism risk.",
                text: "A veto and a paid panel help, but if the pilot partner is a company with its own priorities, participants may still be consulted without real decision power. Participation can end up as “a veneer” over existing inequalities, a critique that Odendaal and Zavala Barreda (2024) attribute to Delgado et al. (2021).",
              },
              {
                lead: "The product itself may be the problem.",
                text: "Mystery boxes depend on scarcity and random reward. Making them accessible could also make a gambling-like product more appealing to a group that is already marginalised. The co-design process may conclude that some mechanics should not exist, and a commercial partner may not accept that outcome.",
              },
              {
                lead: "The surprise-versus-agency tension may not resolve.",
                text: "It is possible that every way of giving a BLV player information weakens the mystery. A good result might be honest trade-offs, not a single elegant solution.",
              },
              {
                lead: "Cost, time and fatigue.",
                text: "Tactile kits, accessible venues, travel, pay and multiple rounds are expensive, and repeated sessions can tire participants. A relay with different cohorts also loses continuity, which Odendaal and Zavala Barreda (2024) managed only by restructuring each workshop around the last one's outcome and which placed a heavy adaptation burden on facilitators.",
              },
              {
                lead: "Evidence is thin.",
                text: "There is little published research on mystery boxes and accessibility, so I lean on adjacent work in tabletop games and tactile co-design. Some findings may not transfer to a retail product bought on impulse.",
              },
              {
                lead: "This is untested.",
                text: "The protocol is a plan. I have not run it, so every duration and group size is an assumption.",
              },
            ],
          },
        ],
      },
    ],
    references: [R.odendaal, R.delgado],
  },
  {
    id: "conclusion",
    number: "07",
    title: "The Reflection Box",
    label: "Conclusion",
    paperNumber: "6",
    paperHeading: "Conclusion",
    subtitle: "Is the conflict between surprise and access real? Ask the people it affects.",
    theme: "lilac",
    emblem: "moon",
    preview:
      "Why mystery boxes are a good test case for participatory design, what the protocol combines, and what a successful result would show.",
    sections: [
      {
        id: "conclusion",
        heading: "Final thoughts",
        blocks: [
          {
            type: "p",
            text: "Mystery boxes make a good test case for participatory design because their core appeal, surprise, seems to conflict with accessibility. Working with BLV young adults as co-researchers and co-designers is the most reliable way to find out whether that conflict is real, and which compromises people actually value. The protocol combines a six-stage structure with tactile, adapted workshop methods and a relay of cohorts, and it builds in the participant-led reflection that earlier work identified as missing. Its limits are real: a sighted designer, a small sample, commercial pressure and unproven methods. If it works, the result is not only a better product but a clearer view of how “fun” is defined, and by whom.",
          },
        ],
      },
      {
        id: "capsule",
        heading: "A question to take with you",
        blocks: [
          {
            type: "p",
            text: "Before closing the lid, turn the knob for a capsule. Each one holds a question from the Stage 2 interviews or the Stage 3 provocation.",
            only: "chapter",
          },
          { type: "interactive", kind: "capsule", only: "chapter" },
        ],
      },
    ],
    references: [],
  },
];

/** Every reference, once, in alphabetical order. */
export const allReferences = (): Reference[] => {
  const seen = new Set<string>();
  return chapters
    .flatMap((c) => c.references)
    .filter((r) => (seen.has(r.id) ? false : (seen.add(r.id), true)))
    .sort((a, b) => a.sort.localeCompare(b.sort));
};

export const getChapter = (id: string) => chapters.find((c) => c.id === id);
