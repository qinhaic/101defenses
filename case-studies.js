// Multi-Defense Case Studies from the book
const caseStudies = [
  {
    id: "steve",
    titleEn: "Steve: Testosterone, Lying, and Marital Conflict",
    titleZh: "Steve案例：睾丸素、撒谎与婚姻冲突",
    phase: "Preface / 前言",
    narrativeEn: `Steve, 26, wanted testosterone shots for impotence with his wife. He had undergone pituitary gland surgery and needed hormone replacement. When asked about other sexual difficulties, he admitted he only needed the shots with his wife — he had a girlfriend with whom he had no issues. His wife had never enjoyed sex, and since their son's birth, sex had been infrequent. He loved his wife but couldn't think of a solution. When his wife learned of the situation, she asked for help overcoming her sexual inhibition.`,
    narrativeZh: `26岁的Steve因为与妻子的性功能障碍要求注射睾丸素。他做过垂体手术，确实需要激素替代。但当被问及其他性困难时，他承认只在与妻子一起时才需要注射——他有个女朋友，和女朋友在一起不需要。他的妻子从未享受过性，儿子出生后性更是几乎没有了。他爱妻子，但不知如何解决。当妻子了解到情况后，她主动寻求帮助克服自己的性抑制。`,
    defensesUsed: [
      { id: 23, name: "Prevarication (Lying)", zh: "搪塞（故意撒谎）", note: "lied about the cause of his impotence" },
      { id: 19, name: "Displacement", zh: "置换", note: "shifted sexual wishes from wife to girlfriend" },
      { id: 42, name: "Rationalization", zh: "合理化", note: "found excuses by seeing problem as purely medical" },
      { id: 52, name: "Concretization", zh: "具体化", note: "blamed a 'chemical imbalance' rather than face relationship issues" },
      { id: 31, name: "Suppression", zh: "压制", note: "consciously put aside frustration" },
      { id: 62, name: "Passivity", zh: "被动", note: "passively avoided confronting the marital problem" }
    ],
    outcomeEn: "By confronting Steve's defenses, the therapist helped Steve reveal his conflicts. Rather than depending on testosterone shots and extramarital affairs, he and his wife could face their psychological problems and resolve conflicts interfering with their sexual relationship.",
    outcomeZh: "通过面质Steve的防御，治疗师帮助他揭示了内心冲突。他不再需要依赖睾丸素和婚外情，而是与妻子一起面对心理问题，解决干扰婚姻中性关系的冲突。"
  },
  {
    id: "msab",
    titleEn: "Ms. AB: Forgotten Date and Marijuana Conflict",
    titleZh: "AB女士案例：忘记约会与大麻冲突",
    phase: "Chapter 1 / 第一章",
    narrativeEn: `Ms. AB, 39, discovered her husband hiding marijuana. She suppressed her anger until the kids were asleep, then confronted him. When he defended his right to smoke, she "lost it" but stopped herself. The next day, she completely forgot their planned "hot sex date" while the kids were at school, instead going to a garden store to pick flowers. When her husband called, she felt guilty for disappointing him.`,
    narrativeZh: `39岁的AB女士发现丈夫在浴室柜里藏大麻。她压制住愤怒直到孩子入睡，然后与丈夫对质。当丈夫为吸毒权辩护时，她"崩溃了"，但控制住了自己。第二天，她完全忘记了两人在孩子上学期间的"激情约会"，反而去了园艺店买花。丈夫打电话来时，她感到内疚。`,
    defensesUsed: [
      { id: 31, name: "Suppression", zh: "压制", note: "consciously put anger aside until children slept" },
      { id: 25, name: "Repression", zh: "压抑", note: "unconsciously forgot the sex date" },
      { id: 4, name: "Projective Identification", zh: "投射性认同", note: "created frustration in husband mirroring her own" },
      { id: 35, name: "Identification with the Aggressor", zh: "与攻击者认同", note: "ignored his wishes as he had ignored hers" },
      { id: 19, name: "Displacement", zh: "置换", note: "shifted attention from husband to feminine activities (flowers)" },
      { id: 20, name: "Symbolization", zh: "象征化", note: "flowers symbolically reaffirmed femininity after feeling rejected" },
      { id: 13, name: "Isolation of Affect", zh: "情感隔离", note: "shut off sensations of depression about the marriage" },
      { id: 62, name: "Passivity", zh: "被动", note: "became passive when conflict between anger and guilt arose" }
    ],
    outcomeEn: "After the therapist pointed out the meanings of her forgetting the date and focusing on flowers, Ms. AB became more aware of her anger and guilt. She later confronted her husband about his stubborn insistence on illegal drug abuse. He apologized and threw out the marijuana.",
    outcomeZh: "治疗师向她指出忘记约会和专注于买花的含义后，AB女士更清楚地意识到了自己的愤怒和内疚。后来她与丈夫对质了他的顽固，丈夫道歉并扔掉了大麻。"
  },
  {
    id: "mrdb",
    titleEn: "Mr. DB: Childhood Trauma and Borderline Defenses",
    titleZh: "DB先生案例：童年创伤与边缘型防御",
    phase: "Chapter 1 / 第一章",
    narrativeEn: `Mr. DB, 25, was severely neglected by his mother and beaten by older brothers. He witnessed his sister's prostitution as a teen. Since age 15, he had been a binge drinker. In graduate school, when asked to do an extra assignment, he became so enraged he couldn't study. He defensively blamed his girlfriend, became grandiose (planning to report the professor), and drank.`,
    narrativeZh: `25岁的DB先生童年被母亲严重忽视，被哥哥们殴打，青少年时期目睹姐姐卖淫。从15岁起他酗酒成性。研究生阶段，当被要求做额外作业时，他愤怒到无法学习。他以指责女友（投射性指责）、变得夸大（计划举报教授）、以及饮酒（物质滥用作为防御）来应对。`,
    defensesUsed: [
      { id: 5, name: "Projective Blaming", zh: "投射性指责", note: "blamed girlfriend for encouraging him to attend grad school" },
      { id: 63, name: "Grandiosity/Omnipotence", zh: "夸大/全能感", note: "thought he would report the professor for unfairness" },
      { id: 69, name: "Substance Abuse", zh: "物质滥用", note: "drank to assuage shame over ego breakdown" }
    ],
    outcomeEn: "This case illustrates how early trauma damages affect-tolerance. When even normative stress (an extra assignment) caused overwhelm, pathological defenses were activated to handle the shame of the breakdown in concentration and integration.",
    outcomeZh: "这个案例说明早期创伤如何损害情感容忍度。当正常压力（额外作业）导致自我功能崩溃时，病理性防御被激活来处理因无法集中注意力和整合思维而产生的羞耻感。"
  },
  {
    id: "renee",
    titleEn: "Renée: Panic, Pregnancy Wishes, and Transference",
    titleZh: "Renée案例：恐慌、生育愿望与移情",
    phase: "Chapter 1 / 第一章",
    narrativeEn: `Renée, 34, felt panicky about her wish to bear children. She was afraid to tell her husband, since they'd agreed not to conceive. She didn't want to become "dependent" on his income. As a teenager, she had to beg her father for allowance and hated it. The therapist pointed out she seemed to expect her husband to be as parsimonious as her father. She realized this was unfair — he had always been generous.`,
    narrativeZh: `34岁的Renée因想生孩子的愿望感到恐慌。她不敢告诉丈夫，因为他们最初约定不要孩子。她也不想"依赖"丈夫的收入。青少年时期，她不得不向父亲乞讨零花钱，她痛恨那种感觉。治疗师指出她似乎期望丈夫像父亲一样吝啬。她意识到这不公平——丈夫一直很大方。`,
    defensesUsed: [
      { id: 59, name: "Reticence", zh: "缄默", note: "stopped speaking to avoid being found out about her wish" },
      { id: 61, name: "Avoidance", zh: "回避", note: "stayed away from the topic of children" },
      { id: 72, name: "Pseudoindependence", zh: "假性独立", note: "didn't want to rely on husband's income" },
      { id: 79, name: "Transference", zh: "移情", note: "expected husband to be parsimonious like her father" }
    ],
    outcomeEn: "After brief psychotherapy, Renée broached the subject of children with her husband, who was excited and happy about the idea. Her signal anxiety (not overwhelming) had generated these pathological defenses, which were resolved through insight.",
    outcomeZh: "经过短期心理治疗后，Renée与丈夫讨论了孩子的事，丈夫对此非常兴奋和开心。她的信号焦虑（并非压倒性的）产生了这些病理性防御，通过领悟得以解决。"
  },
  {
    id: "msuu",
    titleEn: "Ms. UU: Projective Identification in Therapy",
    titleZh: "UU女士案例：治疗中的投射性认同",
    phase: "Chapter 2, Defense #4 / 第二章 防御#4",
    narrativeEn: `Ms. UU, 23, depressed and single, described problems with her irrationally attacking father. One session, she criticized the therapist for being one minute late: "You treat me like an invertebrate! You know I can't stand waiting because of my father, and you keep me waiting! I demand an apology!" The therapist felt unfairly accused but realized his emotional reaction mirrored how Ms. UU felt when attacked by her father. He said, "I now feel like I've met your father."`,
    narrativeZh: `23岁的UU女士，抑郁单身，描述了父亲对她的无理攻击。一次治疗中，治疗师迟到一分钟，她大发雷霆："你把我当低等生物！你知道因为我父亲的原因我受不了等待，你还让我等！我要求道歉！"治疗师感到被无理指责，但意识到自己的情绪反应正是UU女士面对父亲时的感受。他说："我现在感觉好像见到了你父亲。"`,
    defensesUsed: [
      { id: 4, name: "Projective Identification", zh: "投射性认同", note: "made therapist feel the helpless anger she felt with her father" },
      { id: 35, name: "Identification with the Aggressor", zh: "与攻击者认同", note: "acted toward therapist as her father acted toward her" },
      { id: 19, name: "Displacement", zh: "置换", note: "shifted anger from father onto therapist" }
    ],
    outcomeEn: "The therapist's interpretation that he now understood what her father felt like helped build trust. Later work revealed she used projective identification to ensure someone understood what she'd gone through.",
    outcomeZh: "治疗师的解释——'我现在感觉好像见到了你父亲'——帮助建立了信任。后来的治疗揭示，她使用投射性认同来确保有人真正理解她所经历的一切。"
  }
];
