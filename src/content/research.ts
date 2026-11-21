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
  | { type: "callout"; title: string; text?: string; items?: string[] }
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
  /** Sort key: the first author's surname or organization. */
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
  title: "Think Outside the Mystery Box",
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
  brown: {
    id: "brown-story-boxes",
    sort: "Brown",
    before: "Brown, J. (n.d.). ",
    italic: "Easy to create story boxes",
    after: ". Paths to Literacy.",
    url: "https://www.pathstoliteracy.org/easy-create-story-boxes/",
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
      "12 BLV young adults (about 18 to 30): 2 blind and 10 with varying levels of low vision, including collectors and people who have never opened a mystery box. An accessibility needs assessment sets each person's preferred formats and accommodations.",
  },
  {
    id: "collaboration",
    name: "Collaboration",
    theme: "lavender",
    definition:
      "Participants build concepts on their own first, then work in pairs to combine ideas into a shared prototype and give feedback on another pair's work.",
  },
  {
    id: "empowerment",
    name: "Empowerment",
    theme: "mint",
    definition:
      "Participants decide which features to keep, change or remove, and confirm that their contributions are represented accurately. They are credited and paid as co-designers.",
  },
  {
    id: "iteration",
    name: "Iteration",
    theme: "butter",
    definition:
      "Prototypes are tested, feedback is synthesized into themes, and participants choose what goes into the next iteration.",
  },
  {
    id: "context",
    name: "Contextual understanding",
    theme: "peach",
    definition:
      "Sessions start with real mystery boxes and participants' own unboxing habits, not abstract discussion.",
  },
  {
    id: "advocacy",
    name: "Audience advocacy",
    theme: "sky",
    definition:
      "The final concept and a record of which recommendations were used, changed or left out are shared with participants in their chosen formats, so their priorities stay visible.",
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
    activity: "Accessibility needs assessment; prepare accessible materials and consent",
    participants: "12 participants (2 blind, 10 low vision)",
    output: "An inclusive environment with equitable opportunities to contribute",
  },
  {
    id: "stage-2",
    name: "Discovery and contextual inquiry",
    theme: "lavender",
    activity: "Explore mystery boxes and packaging, then discuss",
    participants: "12 participants",
    output: "Emotional expectations, access needs, interpretations of surprise",
  },
  {
    id: "stage-3",
    name: "Co-ideation and co-design",
    theme: "mint",
    activity: "Individual tactile concepts, then paired co-design",
    participants: "12 participants, in pairs",
    output: "Concepts built around access and emotional engagement",
  },
  {
    id: "stage-4",
    name: "Prototyping and feedback",
    theme: "butter",
    activity: "Pairs explore and discuss each other’s prototypes",
    participants: "12 participants, in pairs",
    output: "Feedback on accessibility and surprise",
  },
  {
    id: "stage-5",
    name: "Implementation and refinement",
    theme: "peach",
    activity: "Synthesize feedback; participants decide what to keep, change, or remove",
    participants: "Researchers and 12 participants",
    output: "Design changes chosen by participants",
  },
  {
    id: "stage-6",
    name: "Sustain and governance",
    theme: "sky",
    activity: "Share the final concept and document design decisions",
    participants: "12 participants",
    output: "Transparent record of decisions; participants confirm their input",
  },
];

/** Stage 4: the feedback questions pairs ask about each other's prototypes (shake-to-reveal). */
export const feedbackQuestions: (Point & { id: string })[] = [
  {
    id: "surprising",
    lead: "Does it feel surprising?",
    text: "Does the box build anticipation and keep the item a secret until the moment it is opened?",
  },
  {
    id: "enjoyable",
    lead: "Is it enjoyable?",
    text: "Is opening it fun, and is it a moment you would want to share with friends?",
  },
  {
    id: "intuitive",
    lead: "Is it intuitive?",
    text: "Can you tell how to open it and what to do next without being told?",
  },
  {
    id: "independent",
    lead: "Is it independently accessible?",
    text: "Can you enjoy the whole experience, from picking a box to the big reveal, without sighted help?",
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
                alt: "Seven plush keychain figures from the same Miffy Bakery Series lined up on a pink background: white and brown bunnies and a brown bear, each in a different apron or hat and holding a different bakery item such as a donut, a latte, a cup, a bun, a toast slice or a baguette. The differences between them are mostly color and small details.",
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
            text: "The mystery box experience has rituals heavily centered around sight; the appealing packaging, the information on the box, the collector’s note or card inside, and the unboxing moment are all visual. For blind and low-vision (abbreviated as BLV) young adults, this experience built around visual anticipation can be exclusionary. Simply adding accessibility features doesn’t seem like the perfect solution for this retail category. Braille printing in the packaging or adding a QR code that reads out the contents could increase inclusivity, but I don’t think it captures the thrill of these unboxing experiences.",
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
            text: "There are many myths and misconceptions around blindness that I am still learning about. Although I have high myopia (if I take my glasses off, the Google doc I am typing on becomes white with lines of black blobs), I need to make clear that I do not assume to understand the experience of blind and visually impaired people. This project is organized as a participatory process, not a product brief or even a product proposal. The question itself, and what counts as “fun”, should be shaped by the people the experience is for. However, a bigger question that comes up is: Do current mystery boxes need “fixing?” The online research I have done seems to tell me that blind and visually impaired people enjoy mystery boxes and collecting items; just in different ways than sighted people. According to the Iowa Department for the Blind (n.d.), “Only approximately 18 percent of people who are legally blind are classified as being totally blind and the majority of blind people can still differentiate between light and dark.” Knowing this, is there even an opportunity to design a better experience for the audience in question? This is why I would leverage a participatory design process with direct stakeholder participation.",
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
      "No one has studied mystery boxes and BLV players directly, so the clues come from three neighboring areas.",
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
            text: "I searched for work on mystery boxes and BLV individuals but found nothing substantial aside from Reddit threads on “blind boxes” and collecting. Research on mystery boxes seems to focus on marketing and the regulation of gambling-like mechanics, not really towards inclusivity. There is an interesting post I came across that isn’t exactly like mystery boxes, though I want to mention it because they have some applicable elements. Jaime Brown wrote a blog about creating story boxes for students with visual impairments as a way to enhance the storytelling experience through multisensory methods. I like the idea of including different sensory elements in storytelling; a stuffed animal, adding movement, using story support apps for sounds, and even taste if relevant. I also love that storytelling is framed as an interactive experience that involves both teachers and students. You can read more about these story boxes by clicking this link: [Easy to Create Story Boxes](https://www.pathstoliteracy.org/easy-create-story-boxes/).",
          },
          {
            type: "p",
            text: "In the next three sections, I explore “related” works. Related is used loosely as I couldn’t find research or case studies done on mystery boxes for BLV individuals, specifically young adults.",
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
          {
            type: "callout",
            title: "Potential prototype suggestions for participants",
            items: [
              "Bigger visual materials, such as the collector cards",
              "QR code that describes the item in audio format",
              "High-contrast packaging and design",
              "Inclusion of other sensory elements such as sound or texture",
            ],
          },
        ],
      },
      {
        id: "co-design",
        heading: "Co-design methods that work with blind participants",
        blocks: [
          {
            type: "p",
            text: "Alzalabny et al. (2025) adapted low-fidelity prototyping for blind participants because design workshops are inaccessible due to their reliance on visual design methods (i.e., sketches and storyboards). Some studies have modified prototyping processes by swapping materials for cardboard mockups, legos, rubber bands and tactile paper. However, design workshops are not just about materials; the structure, dynamics, and settings all matter.",
          },
          {
            type: "p",
            text: "The research in this paper was structured in two phases. They first ran four co-design workshops to develop a haptic prototyping toolkit and workshop structure, then used it in six workshops with 12 blind participants (11 totally blind, one with severe low vision) to design 2D tactile displays. Their key lesson is that accessible co-design needs the whole workshop adapted, not just a swap of visual materials.",
          },
          {
            type: "p",
            text: "This work is different from my co-design project because we aren’t designing assistive technology. We are designing a multisensory experience by exploring how BLV people can experience anticipation and surprise. Adapting some elements from Alzalabny et al. (2025), I would include these concepts into the mystery box co-design workshop:",
          },
          {
            type: "callout",
            title: "Concepts for the mystery box co-design workshop",
            items: [
              "Replace drawing and visual moodboards with physical objects, textures, and tactile materials.",
              "Let participants physically assemble and modify mystery box packaging.",
              "Provide individual exploration time before group brainstorming.",
              "Use pairs or small groups so participants have opportunities to contribute.",
              "Facilitators should describe materials and provide assistance without directing design decisions.",
              "Give participants choices about materials, communication methods, and workshop activities.",
            ],
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
        ],
      },
    ],
    references: [R.alzalabny, R.bolesnikov, R.brown, R.odendaal],
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
      "An overview of all six stages, then preparation and framing, exploring real mystery boxes together, and tactile co-design in pairs.",
    sections: [
      {
        id: "overview",
        heading: "The six stages",
        blocks: [
          {
            type: "p",
            text: "Drawing inspiration from the Parallel (n.d.) participatory design template, I am proposing a 6-stage participatory design protocol, keeping preparation and long-term governance in view.",
          },
          {
            type: "p",
            text: "Tap each box to read a preview about each stage.",
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
            type: "p",
            text: "12 participants (2 blind, 10 with varying levels of low vision) participate in an accessibility needs assessment to identify preferred communication formats, assistive technologies, and accommodations.",
          },
          {
            type: "p",
            text: "Prepare tactile materials, audio descriptions, large-print and Braille labels, and accessible consent forms. Explain that participants will help shape the mystery box concept rather than simply test an existing design. Ensure that there is adjustable lighting throughout the entire protocol.",
          },
          {
            type: "callout",
            title: "Goal",
            text: "Establish an inclusive environment with equitable opportunities to contribute.",
          },
        ],
      },
      {
        id: "stage-2",
        heading: "Stage 2. Discovery and contextual inquiry",
        blocks: [
          {
            type: "p",
            text: "Allow participants to explore different mystery boxes and packaging. Discuss what makes opening boxes exciting, fun, confusing, frustrating and everything in between. Again, provide adjustable lighting and high-contrast/large-print materials throughout the workshop.",
          },
          {
            type: "callout",
            title: "Sample questions",
            items: [
              "What makes opening a mystery box exciting?",
              "How do you know what to do when opening unfamiliar packaging?",
              "What do you like and not like about the mystery boxes you have interacted with so far?",
              "What information would you want before opening the box, and what should remain a surprise?",
            ],
          },
          {
            type: "callout",
            title: "Goal",
            text: "Identify emotional expectations, accessibility needs, and different interpretations of surprise.",
          },
        ],
      },
      {
        id: "stage-3",
        heading: "Stage 3. Co-ideation and co-design",
        blocks: [
          {
            type: "p",
            text: "Participants independently create a mystery box concept using a tactile toolkit containing small boxes, textured surfaces, magnetic pieces, different closures, sound-making elements, etc. Then participants will do collaborative co-design, working together in pairs to combine ideas into a shared prototype. Encourage discussion about how the box builds anticipation, communicates information, and preserves surprise.",
          },
          {
            type: "p",
            text: "Facilitate without privileging visual design ideas. Rather than relying on visual sketches, participants can physically arrange materials, describe their concepts verbally, or construct simple models.",
          },
          {
            type: "callout",
            title: "Goal",
            text: "Generate concepts that incorporate accessibility and emotional engagement from the beginning.",
          },
        ],
      },
    ],
    references: [R.parallel],
  },
  {
    id: "prototype",
    number: "05",
    title: "The Prototype Box",
    label: "The protocol, stages 4 to 6",
    paperNumber: "4",
    paperHeading: "The protocol, stage by stage",
    subtitle:
      "Testing prototypes together, refining them around participant priorities, and closing the loop transparently.",
    theme: "peach",
    emblem: "heart",
    preview:
      "Pairs test each other’s prototypes, participants decide what changes next, and the final concept goes back to them for review.",
    sections: [
      {
        id: "stage-4",
        heading: "Stage 4. Prototyping and feedback",
        blocks: [
          {
            type: "p",
            text: "Each pair will have created a low-fidelity mystery box prototype by this stage. Participants explore another group’s prototype and discuss its emotional and sensory qualities. Ask whether the experience feels surprising, enjoyable, intuitive, and independently accessible.",
          },
          {
            type: "p",
            text: "Shake the box to reveal a feedback question pairs can ask about each other’s prototypes.",
            only: "chapter",
          },
          { type: "interactive", kind: "shake" },
          {
            type: "callout",
            title: "Goal",
            text: "Evaluate whether the design supports both accessibility and the emotional experience of surprise.",
          },
        ],
      },
      {
        id: "stage-5",
        heading: "Stage 5. Implementation and refinement",
        blocks: [
          {
            type: "p",
            text: "Researchers synthesize workshop feedback into themes such as sensory accessibility, emotional engagement, and packaging usability.",
          },
          {
            type: "p",
            text: "Participants share what they learned and identify which design features they would retain, change, or remove. They will also review the proposed design changes and decide which features should be incorporated in the next iterations.",
          },
          {
            type: "callout",
            title: "Goal",
            text: "Ensure design iterations reflect participant priorities rather than researcher assumptions.",
          },
        ],
      },
      {
        id: "stage-6",
        heading: "Stage 6. Sustain and governance",
        blocks: [
          {
            type: "list",
            items: [
              "Share the final proposed concept and a summary of design decisions with participants in their chosen formats.",
              "Invite participants to confirm whether their contributions have been represented accurately and whether any concerns remain.",
              "Document which recommendations were incorporated, modified, or omitted, along with the reasoning.",
            ],
          },
          {
            type: "callout",
            title: "Goal",
            text: "Maintain transparency, acknowledge participants’ contributions, and preserve their agency over design decisions.",
          },
        ],
      },
    ],
    references: [],
  },
  {
    id: "limitations",
    number: "06",
    title: "The Honesty Box",
    label: "Criticisms and limitations",
    paperNumber: "5",
    paperHeading: "Criticisms and limitations",
    subtitle: "Discussing the limitations",
    theme: "sky",
    emblem: "eye",
    preview:
      "A sighted facilitator, a small sample, the morality of mystery boxes, thin evidence, and an untested plan.",
    sections: [
      {
        id: "weaknesses",
        heading: "Critiques and weaknesses",
        blocks: [
          {
            type: "points",
            items: [
              {
                lead: "I am proposing a protocol for BLV participants as a sighted person.",
                text: "Even with participants co-designing, my framing and choice of prompts shape the outcome. Paying participants and letting them review iterations reduces bias but does not remove it.",
              },
              {
                lead: "A small sample size can’t represent a diverse community.",
                text: "Blindness and low vision cover many different conditions, ages, onset times, assistive technologies and cultures. 12 participants can’t speak for all of them, and recruiting through organizations tends to reach people who are already connected and comfortable with research. Additionally, attitudes to mystery boxes, gambling and disability differ across countries and legal contexts.",
              },
              {
                lead: "Morality of mystery boxes.",
                text: "Mystery boxes depend on scarcity and random reward. Making them accessible could also make a gambling-like product more appealing to a group that is already marginalized.",
              },
              {
                lead: "Evidence is thin.",
                text: "There is little published research on mystery boxes and accessibility, so I included adjacent work in tabletop games and tactile co-design. Findings are not entirely transferable to the mystery box market.",
              },
              {
                lead: "Lastly, this is untested.",
                text: "The protocol is a plan. Group size is an assumption, and durations for each stage are not added at this point.",
              },
            ],
          },
        ],
      },
    ],
    references: [],
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
            text: "Mystery boxes make a good test case for participatory design because their core appeal, surprise, seems to conflict with accessibility. Working with BLV young adults as co-designers is the most reliable way to find out whether that conflict is real, and which compromises people actually value. The protocol follows six stages with 12 participants: an accessibility needs assessment, exploring real mystery boxes together, building concepts with a tactile toolkit and then in pairs, testing each other’s prototypes, deciding which features to keep, change or remove, and reviewing the final concept to confirm their contributions are represented accurately. Its limits are real: a sighted facilitator, a small sample, the morality of mystery boxes, thin evidence and an untested plan. If it works, the result is not only a better product but a clearer view of how “fun” is defined, and by whom.",
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
