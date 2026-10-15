import { SuggestedQuestion, ConceptCard, DiagramPart, QuizQuestion } from '../types';

export const SUGGESTED_QUESTIONS: SuggestedQuestion[] = [
  {
    id: 'q1',
    topic: 'ciri_ciri',
    question: 'Mengapa virus dianggap sebagai peralihan antara benda mati dan makhluk hidup?',
    shortLabel: 'Makhluk Hidup vs Benda Mati',
    category: 'Ciri-Ciri Virus',
    iconName: 'HelpCircle'
  },
  {
    id: 'q2',
    topic: 'ciri_ciri',
    question: 'Apa arti istilah "parasit intraseluler obligat" pada virus?',
    shortLabel: 'Parasit Intraseluler Obligat',
    category: 'Ciri-Ciri Virus',
    iconName: 'ShieldAlert'
  },
  {
    id: 'q3',
    topic: 'struktur',
    question: 'Sebutkan bagian-bagian utama struktur Bakteriofag T4 dan jelaskan fungsinya!',
    shortLabel: 'Struktur Bakteriofag T4',
    category: 'Struktur Virus',
    iconName: 'Dna'
  },
  {
    id: 'q4',
    topic: 'struktur',
    question: 'Apa perbedaan antara virus DNA dan virus RNA? Berikan contoh masing-masing!',
    shortLabel: 'Virus DNA vs Virus RNA',
    category: 'Struktur Virus',
    iconName: 'Binary'
  },
  {
    id: 'q5',
    topic: 'reproduksi',
    question: 'Jelaskan tahapan Siklus Litik dan Siklus Lisogenik! Apa perbedaan utamanya?',
    shortLabel: 'Siklus Litik vs Lisogenik',
    category: 'Reproduksi Virus',
    iconName: 'RefreshCw'
  },
  {
    id: 'q6',
    topic: 'reproduksi',
    question: 'Apa yang dimaksud dengan "Profag" dalam siklus lisogenik?',
    shortLabel: 'Apa itu Profag?',
    category: 'Reproduksi Virus',
    iconName: 'Layers'
  },
  {
    id: 'q7',
    topic: 'peranan_pencegahan',
    question: 'Sebutkan 5 contoh penyakit pada manusia yang disebabkan oleh virus beserta cara penularannya!',
    shortLabel: 'Penyakit Manusia Akibat Virus',
    category: 'Peranan Virus',
    iconName: 'Activity'
  },
  {
    id: 'q8',
    topic: 'peranan_pencegahan',
    question: 'Bagaimana cara kerja vaksin dalam membangun kekebalan tubuh terhadap serangan virus?',
    shortLabel: 'Cara Kerja Vaksin',
    category: 'Peranan & Pencegahan',
    iconName: 'Syringe'
  },
  {
    id: 'q9',
    topic: 'peranan_pencegahan',
    question: 'Mengapa obat antibiotik tidak dapat digunakan untuk mengobati penyakit akibat infeksi virus?',
    shortLabel: 'Mengapa Antibiotik Tak Mempan?',
    category: 'Peranan & Pencegahan',
    iconName: 'Pill'
  },
  {
    id: 'q10',
    topic: 'peranan_pencegahan',
    question: 'Sebutkan contoh peranan virus yang menguntungkan bagi kehidupan manusia!',
    shortLabel: 'Peranan Menguntungkan Virus',
    category: 'Peranan & Pencegahan',
    iconName: 'Sparkles'
  }
];

export const CONCEPT_CARDS: ConceptCard[] = [
  {
    id: 'c1',
    topic: 'ciri_ciri',
    title: 'Ciri-Ciri & Sifat Virus',
    subtitle: 'Bentuk Kehidupan Peralihan (Aseluler)',
    summaryPoints: [
      'Ukuran sangat kecil (ultramikroskopis): 20 – 300 nanometer (nm), hanya dapat dilihat dengan mikroskop elektron.',
      'Aseluler: Tidak memiliki sel, sitoplasma, membran sel, maupun organel sel.',
      'Parasit Intraseluler Obligat: Hanya dapat berkembang biak di dalam sel hidup inang.',
      'Materi Genetik Spesifik: Hanya memiliki satu jenis asam nukleat, yaitu DNA saja ATAU RNA saja.',
      'Dapat Dikristalkan: Benda mati saat berada di luar sel inang tanpa aktivitas metabolisme.'
    ],
    keyTerms: [
      { term: 'Aseluler', definition: 'Bukan berupa sel (tidak memiliki membran sel, sitoplasma, dan organel).' },
      { term: 'Parasit Obligat', definition: 'Hanya bisa hidup dan aktif bermetabolisme jika berada di dalam sel inang hidup.' },
      { term: 'Viron', definition: 'Partikel virus lengkap yang berada di luar sel inang.' }
    ],
    funFact: 'Nama "Virus" berasal dari bahasa Latin yang berarti "racun"!',
    sampleQuestion: 'Kak Bio, mengapa virus disebut dapat dikristalkan dan apa implikasinya?'
  },
  {
    id: 'c2',
    topic: 'struktur',
    title: 'Struktur Tubuh Virus',
    subtitle: 'Anatomi Bakteriofag & Virus Ber-Envelope',
    summaryPoints: [
      'Kapsid: Selubung protein pengbungkus materi genetik yang tersusun atas unit-unit kecil bernama Kapsomer.',
      'Asam Nukleat: Pembawa informasi genetik (DNA rantai tunggal/ganda atau RNA rantai tunggal/ganda).',
      'Kepala & Leher: Tempat penyimpan asam nukleat dan penghubung ke bagian ekor.',
      'Ekor & Serabut Ekor: Alat penempelan (adsorpsi) pada membran sel inang dan penyuntik materi genetik.',
      'Enzim Lisozim: Enzim khusus di ujung ekor untuk melubangi dinding sel bakteri.'
    ],
    keyTerms: [
      { term: 'Kapsid', definition: 'Selubung protein pelindung asam nukleat virus.' },
      { term: 'Kapsomer', definition: 'Unit-unit subunit protein penyusun kapsid.' },
      { term: 'Envelope', definition: 'Lapisan membran luar dari lipid/protein (misal pada Virus Corona dan HIV).' }
    ],
    funFact: 'Bakteriofag adalah virus khusus yang hanya menginfeksi dan membunuh bakteri!',
    sampleQuestion: 'Kak Bio, apa fungsi serabut ekor dan enzim lisozim pada Bakteriofag?'
  },
  {
    id: 'c3',
    topic: 'reproduksi',
    title: 'Reproduksi Virus (Siklus Daur)',
    subtitle: 'Siklus Litik (Mematikan Sel Inang) & Siklus Lisogenik (Berdamai Sementara)',
    summaryPoints: [
      'Tahap Adsorpsi: Penempelan serabut ekor virus pada reseptor spesifik di permukaan sel inang.',
      'Tahap Penetrasi (Injeksi): Penyuntikan asam nukleat virus ke dalam sitoplasma sel inang.',
      'Tahap Sintesis/Eklifase: Mengambil alih mesin DNA/RNA inang untuk membentuk komponen virus baru.',
      'Tahap Perakitan (Asemblase): Penyusunan kapsid dan asam nukleat menjadi partikel virus utuh.',
      'Tahap Lisis / Penggabungan: Sel inang pecah meliriskan virus baru (Litik) ATAU materi genetik bergabung menjadi Profag (Lisogenik).'
    ],
    keyTerms: [
      { term: 'Siklus Litik', definition: 'Daur reproduksi virus yang mengarah pada pemecahan/kematian sel inang secara langsung.' },
      { term: 'Siklus Lisogenik', definition: 'Daur reproduksi di mana materi genetik virus menyatu dengan DNA inang tanpa menghancurkannya.' },
      { term: 'Profag', definition: 'Sisipan DNA virus yang telah bergabung secara stabil ke dalam kromosom bakteri inang.' }
    ],
    funFact: 'Profag dalam siklus lisogenik bisa bangkit menjadi siklus litik jika terpicu radiasi sinar UV!',
    sampleQuestion: 'Kak Bio, beri analogi sederhana agar saya gampang hafal 5 tahap Siklus Litik!'
  },
  {
    id: 'c4',
    topic: 'peranan_pencegahan',
    title: 'Peranan Virus & Pencegahan',
    subtitle: 'Ancaman Penyakit vs Manfaat Rekayasa Biologi',
    summaryPoints: [
      'Penyakit Manusia: COVID-19 (SARS-CoV-2), DBD (Dengue), Influenza, HIV/AIDS, Rabies, Campak, Polio, Cacar Air.',
      'Penyakit Tumbuhan: TMV (Tobacco Mosaic Virus), CVPD (Citrus Vein Phloem Degeneration pada jeruk), Tungro (padi).',
      'Penyakit Hewan: NCD/Tetelo (ayam), FMD/PMK (sapi/kambing), Rabies (anjing/kucing).',
      'Manfaat Menguntungkan: Pembuatan Vaksin (virus dilemahkan/dimatikan), terapi gen, pengontrol hama biologis.',
      'Pencegahan: Vaksinasi berkala, cuci tangan dengan sabun, menjaga imun, masker, dan menghindari kontak langsung.'
    ],
    keyTerms: [
      { term: 'Vaksin', definition: 'Sediaan antigen (virus mati/lemah/potongan mRNA) untuk melatih sistem imun membentuk antibodi.' },
      { term: 'Interferon', definition: 'Protein alami tubuh yang dihasilkan sel untuk melawan infeksi virus.' },
      { term: 'Herd Immunity', definition: 'Kekebalan kelompok yang tercipta bila mayoritas populasi telah divaksinasi.' }
    ],
    funFact: 'Vaksin pertama di dunia diciptakan oleh Edward Jenner pada tahun 1796 menggunakan virus cacar sapi (Cowpox)!',
    sampleQuestion: 'Kak Bio, bagaimana beda mekanisme kerja vaksin attenuated (dilemahkan) dan vaksin inactivating (dimatikan)?'
  }
];

export const DIAGRAM_PARTS: DiagramPart[] = [
  {
    id: 'p1',
    name: 'Kapsid / Kepala Virus',
    functionText: 'Melindungi materi genetik (DNA/RNA) di dalamnya dari pengaruh luar.',
    description: 'Bentuk polihedral tersusun atas subunit-subunit protein yang dinamakan kapsomer.',
    x: 50,
    y: 18,
    color: '#3B82F6' // blue
  },
  {
    id: 'p2',
    name: 'Asam Nukleat (DNA / RNA)',
    functionText: 'Membawa instruksi genetik untuk mereplikasi dan merekayasa sel inang.',
    description: 'Terdapat di dalam kepala virus. Hanya 1 jenis: DNA saja atau RNA saja.',
    x: 50,
    y: 28,
    color: '#8B5CF6' // purple
  },
  {
    id: 'p3',
    name: 'Leher Virus',
    functionText: 'Saluran penghubung antara kepala dan ekor virus.',
    description: 'Penyangga struktur kepala dan tempat lewatnya materi genetik saat injeksi.',
    x: 50,
    y: 42,
    color: '#10B981' // green
  },
  {
    id: 'p4',
    name: 'Selubung Ekor (Sheath)',
    functionText: 'Mengontraksikan diri untuk mendorong tabung ekor menembus sel inang.',
    description: 'Struktur silindris berongga berdinding tebal di sepanjang ekor bakteriofag.',
    x: 50,
    y: 60,
    color: '#F59E0B' // amber
  },
  {
    id: 'p5',
    name: 'Serabut Ekor (Tail Fibers)',
    functionText: 'Mengenali dan menempel (adsorpsi) pada reseptor spesifik di membran sel inang.',
    description: 'Serabut berbentuk kaki yang sangat sensitif mengenali permukaan sel inang.',
    x: 28,
    y: 82,
    color: '#EF4444' // red
  },
  {
    id: 'p6',
    name: 'Lempeng Dasar & Jarum Penusuk',
    functionText: 'Melepas enzim lisozim untuk melubangi dinding sel inang dan menyuntikkan DNA.',
    description: 'Landasan bagian bawah ekor tempat jarum penusuk menancap ke sel.',
    x: 50,
    y: 78,
    color: '#EC4899' // pink
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    topic: 'ciri_ciri',
    question: 'Mengapa virus dikategorikan sebagai makhluk tidak hidup (benda mati) ketika berada di luar sel inang?',
    options: [
      'Karena virus memiliki membran sel yang tebal',
      'Karena virus dapat dikristalkan dan tidak memiliki aktivitas metabolisme mandiri',
      'Karena virus berkembang biak dengan cara membelah diri di air',
      'Karena virus memiliki organel mitokondria yang dorman'
    ],
    correctAnswer: 1,
    explanation: 'Virus dapat dikristalkan di luar sel inang dan tidak memiliki sitoplasma atau organel untuk metabolisme sendiri (aseluler). Aktivitas hidup baru terjadi setelah masuk sel inang.',
    hint: 'Pikirkan tentang sifat aseluler dan kemampuan dikristalkan.'
  },
  {
    id: 2,
    topic: 'struktur',
    question: 'Selubung protein pembungkus materi genetik virus dinamakan...',
    options: [
      'Kapsid',
      'Kapsomer',
      'Glikolipida',
      'Peptidoglikan'
    ],
    correctAnswer: 0,
    explanation: 'Selubung protein dinamakan Kapsid, yang tersusun dari subunit-subunit kecil yang disebut Kapsomer.',
    hint: 'Istilah ini berawalan huruf K dan melindungi DNA/RNA.'
  },
  {
    id: 3,
    topic: 'reproduksi',
    question: 'Urutan tahapan reproduksi virus pada Siklus Litik yang tepat adalah...',
    options: [
      'Adsorpsi - Penetrasi - Sintesis - Perakitan - Lisis',
      'Penetrasi - Adsorpsi - Lisis - Perakitan - Sintesis',
      'Adsorpsi - Sintesis - Penetrasi - Lisis - Perakitan',
      'Penggabungan - Adsorpsi - Penetrasi - Pembelahan - Lisis'
    ],
    correctAnswer: 0,
    explanation: 'Urutan Siklus Litik: 1. Adsorpsi (menempel), 2. Penetrasi/Injeksi (menyuntik DNA), 3. Sintesis/Replikasi (membuat komponen), 4. Perakitan (merakit virus), 5. Lisis (sel inang pecah).',
    hint: 'Singkatan mudah: A-P-S-P-L (Adsorpsi, Penetrasi, Sintesis, Perakitan, Lisis).'
  },
  {
    id: 4,
    topic: 'reproduksi',
    question: 'Perbedaan mendasar antara Siklus Lisogenik dan Siklus Litik adalah...',
    options: [
      'Siklus lisogenik tidak membutuhkan materi genetik virus',
      'Pada siklus lisogenik, sel inang langsung hancur/lisis di tahap awal',
      'Pada siklus lisogenik, DNA virus menyatu dengan DNA inang membentuk Profag tanpa merusak sel inang secara langsung',
      'Siklus litik hanya terjadi pada virus berkapsid bulat'
    ],
    correctAnswer: 2,
    explanation: 'Pada siklus lisogenik, DNA virus menggabungkan diri ke kromosom inang membentuk Profag dan ikut membelah saat sel inang membelah tanpa langsung mematikan sel inang.',
    hint: 'Profag adalah kunci utama siklus lisogenik.'
  },
  {
    id: 5,
    topic: 'peranan_pencegahan',
    question: 'Mengapa obat antibiotik tidak dapat membasmi infeksi virus seperti Influenza atau COVID-19?',
    options: [
      'Karena antibiotik menembus kapsid virus terlalu cepat',
      'Karena antibiotik dirancang merusak dinding sel/metabolisme bakteri, sedangkan virus tidak memiliki sel',
      'Karena antibiotik hanya bisa diminum sebelum gejala muncul',
      'Karena virus berada di luar tubuh manusia'
    ],
    correctAnswer: 1,
    explanation: 'Antibiotik bekerja merusak struktur sel seperti dinding sel atau ribosom bakteri. Virus adalah aseluler (bukan sel), sehingga antibiotik tidak berpengaruh pada virus.',
    hint: 'Ingat sifat virus yang aseluler (bukan sel).'
  },
  {
    id: 6,
    topic: 'peranan_pencegahan',
    question: 'Berikut ini penyakit pada tumbuhan yang disebabkan oleh virus adalah...',
    options: [
      'TMV (Tobacco Mosaic Virus) dan CVPD',
      'NCD (Tetelo) dan FMD (PMK)',
      'Dengue dan Rabies',
      'Tifus dan Kolera'
    ],
    correctAnswer: 0,
    explanation: 'TMV menyerang daun tembakau menyebabkan bercak mosaik, dan CVPD menyerang pembuluh tapis tanaman jeruk.',
    hint: 'TMV singkatan dari Tobacco Mosaic Virus (Tembakau).'
  }
];
