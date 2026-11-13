// Historical VC Buzzwords & Funding Data (2006 - 2026, every 2 years)
// Values in USD Billions (estimated global VC capital captured by the tag across Seed, Series A, Series B, and Growth)

window.VC_DATA = {
  eras: [
    {
      year: 2006,
      title: "Era Web 2.0 & Redes Sociais",
      totalGlobalVC: 32,
      macroContext: "Pós-bolha ponto-com. O capital de risco volta a crescer apostando na internet participativa, conteúdo gerado pelo usuário (UGC), AJAX e nos primeiros serviços de Cloud (lançamento da AWS).",
      stageHighlight: "Seed institucional ainda embrionário (Y Combinator recém-criada em 2005); Series A de $2M-$5M dominavam a validação.",
      tags: [
        { id: "web2", name: "Web 2.0", category: "Consumer & Social", totalFundingB: 8.5, seedShare: 18, seriesAShare: 42, seriesBPlusShare: 40, peakRound: "Series A / B", dealsEst: 620, examples: ["Facebook", "Digg", "YouTube", "Reddit"], desc: "Sites interativos, wikis e plataformas colaborativas substituindo páginas estáticas." },
        { id: "ugc", name: "Social Media & UGC", category: "Consumer & Social", totalFundingB: 6.2, seedShare: 22, seriesAShare: 45, seriesBPlusShare: 33, peakRound: "Series A", dealsEst: 480, examples: ["Twitter", "MySpace", "Vimeo", "Slide"], desc: "Redes sociais e plataformas onde o próprio usuário cria a mídia e o efeito de rede." },
        { id: "semicon", name: "Semiconductors & Telecom", category: "Hardware & Infra", totalFundingB: 5.8, seedShare: 5, seriesAShare: 30, seriesBPlusShare: 65, peakRound: "Series B+", dealsEst: 310, examples: ["Infinera", "Atheros", "Clearwire"], desc: "Infraestrutura de banda larga, chips Wi-Fi/3G e redes ópticas." },
        { id: "early_saas", name: "On-Demand Software (SaaS)", category: "Enterprise & Cloud", totalFundingB: 4.1, seedShare: 12, seriesAShare: 38, seriesBPlusShare: 50, peakRound: "Series B", dealsEst: 290, examples: ["Netsuite", "SuccessFactors", "Box", "Zendesk"], desc: "Transição do software instalado em servidores locais para assinatura via navegador." },
        { id: "adtech_06", name: "AdTech & Search", category: "Enterprise & Cloud", totalFundingB: 3.6, seedShare: 15, seriesAShare: 44, seriesBPlusShare: 41, peakRound: "Series A / B", dealsEst: 340, examples: ["Right Media", "DoubleClick", "Kayak"], desc: "Redes de anúncios programáticos iniciais e motores de busca verticais." },
        { id: "biopharma_06", name: "Biotech & MedDevices", category: "Bio & Health", totalFundingB: 3.8, seedShare: 8, seriesAShare: 35, seriesBPlusShare: 57, peakRound: "Series B+", dealsEst: 260, examples: ["Illumina (expansão)", "23andMe", "Pacific Biosciences"], desc: "Sequenciamento genético inicial e dispositivos médicos tradicionais." }
      ],
      links: [
        ["web2", "ugc"], ["web2", "adtech_06"], ["web2", "early_saas"], ["semicon", "early_saas"]
      ]
    },
    {
      year: 2008,
      title: "Bolha CleanTech 1.0 & Início do Mobile",
      totalGlobalVC: 44,
      macroContext: "Crise financeira global de 2008 colide com o pico do petróleo ($140/barril) e o lançamento da App Store da Apple. VCs despejam bilhões em energia limpa pesada antes de migrarem para apps.",
      stageHighlight: "Mega-rodadas Series B/C em capital intensivo (solar/biocombustíveis) contrastam com micro-seeds de $500k para apps de iPhone.",
      tags: [
        { id: "cleantech1", name: "CleanTech & Solar", category: "Climate & Energy", totalFundingB: 11.4, seedShare: 7, seriesAShare: 28, seriesBPlusShare: 65, peakRound: "Series B+", dealsEst: 490, examples: ["Tesla Motors", "Solyndra", "Fisker", "Better Place"], desc: "Painéis solares de filme fino, biocombustíveis, baterias e primeiros veículos elétricos." },
        { id: "mobile_apps", name: "Mobile & App Store", category: "Consumer & Social", totalFundingB: 6.8, seedShare: 30, seriesAShare: 42, seriesBPlusShare: 28, peakRound: "Seed / Series A", dealsEst: 780, examples: ["Evernote", "Pandora", "Zynga", "Foursquare"], desc: "Explosão de aplicativos móveis impulsionada pelo iPhone SDK e Android." },
        { id: "cloud_infra", name: "Cloud & Virtualization", category: "Enterprise & Cloud", totalFundingB: 7.2, seedShare: 12, seriesAShare: 36, seriesBPlusShare: 52, peakRound: "Series B", dealsEst: 410, examples: ["Dropbox", "Cloudera", "Rackspace", "RightScale"], desc: "Armazenamento em nuvem, virtualização de servidores e infraestrutura elástica." },
        { id: "social_gaming", name: "Social Gaming & Viral", category: "Consumer & Social", totalFundingB: 5.4, seedShare: 24, seriesAShare: 46, seriesBPlusShare: 30, peakRound: "Series A", dealsEst: 520, examples: ["Zynga", "Playfish", "Playdom", "Kabam"], desc: "Jogos casuais integrados ao grafo social do Facebook com bens virtuais." },
        { id: "adtech_08", name: "Real-Time Bidding (AdTech)", category: "Enterprise & Cloud", totalFundingB: 4.5, seedShare: 14, seriesAShare: 41, seriesBPlusShare: 45, peakRound: "Series A / B", dealsEst: 360, examples: ["AppNexus", "Criteo", "Rubicon Project"], desc: "Leilões em tempo real de anúncios digitais e retargeting." },
        { id: "smart_grid", name: "Smart Grid & Biofuels", category: "Climate & Energy", totalFundingB: 4.9, seedShare: 9, seriesAShare: 31, seriesBPlusShare: 60, peakRound: "Series B+", dealsEst: 230, examples: ["Silver Spring Networks", "Amyris", "Sapphire Energy"], desc: "Medidores inteligentes de energia e combustíveis sintéticos de algas." }
      ],
      links: [
        ["cleantech1", "smart_grid"], ["mobile_apps", "social_gaming"], ["cloud_infra", "mobile_apps"], ["social_gaming", "adtech_08"]
      ]
    },
    {
      year: 2010,
      title: "Mobile-First, Social Local & Compras Coletivas",
      totalGlobalVC: 56,
      macroContext: "Recuperação pós-crise. Smartphones ganham GPS ubíquo: o jargão mágico para levantar Seed e Series A torna-se 'SoLoMo' (Social-Local-Mobile) e clones de compras coletivas.",
      stageHighlight: "Formalização do 'Seed Stage' como classe de ativos própria (AngelList, Super Angels, rodadas Seed de $1M-$1.5M).",
      tags: [
        { id: "solomo", name: "SoLoMo (Social-Local-Mobile)", category: "Consumer & Social", totalFundingB: 12.8, seedShare: 28, seriesAShare: 42, seriesBPlusShare: 30, peakRound: "Seed / Series A", dealsEst: 1150, examples: ["Instagram", "Foursquare", "UberCab", "WhatsApp", "Waze"], desc: "Apps nativos de celular combinando geolocalização em tempo real e rede social." },
        { id: "flash_sales", name: "Daily Deals & E-Commerce", category: "Consumer & Social", totalFundingB: 10.6, seedShare: 18, seriesAShare: 37, seriesBPlusShare: 45, peakRound: "Series B+", dealsEst: 890, examples: ["Groupon", "LivingSocial", "Gilt Groupe", "Fab.com", "Peixe Urbano"], desc: "Compras coletivas, cupons locais relâmpago e clubes de compras verticais." },
        { id: "saas_10", name: "Cloud SaaS", category: "Enterprise & Cloud", totalFundingB: 11.2, seedShare: 16, seriesAShare: 39, seriesBPlusShare: 45, peakRound: "Series A / B", dealsEst: 840, examples: ["Workday", "Okta", "Twilio", "Asana", "Stripe (Seed)"], desc: "APIs para desenvolvedores e softwares corporativos 100% na nuvem." },
        { id: "freemium", name: "Freemium & Consumer Cloud", category: "Enterprise & Cloud", totalFundingB: 6.4, seedShare: 22, seriesAShare: 40, seriesBPlusShare: 38, peakRound: "Series A", dealsEst: 530, examples: ["Spotify", "Dropbox", "Evernote", "Prezi"], desc: "Produtos de consumidor com adoção gratuita viral que convertem para assinatura." },
        { id: "mobile_pay", name: "Mobile Payments", category: "FinTech & Crypto", totalFundingB: 5.1, seedShare: 20, seriesAShare: 42, seriesBPlusShare: 38, peakRound: "Series A / B", dealsEst: 340, examples: ["Square", "Braintree", "Klarna", "Adyen"], desc: "Maquininhas no celular e gateways de pagamento para a economia mobile." },
        { id: "cleantech_fade", name: "CleanTech & EVs", category: "Climate & Energy", totalFundingB: 5.8, seedShare: 6, seriesAShare: 24, seriesBPlusShare: 70, peakRound: "Series B+", dealsEst: 260, examples: ["ChargePoint", "Nest Labs", "Bloom Energy"], desc: "Sobreviventes da onda limpa migrando para eficiência energética e hardware conectado." }
      ],
      links: [
        ["solomo", "flash_sales"], ["solomo", "mobile_pay"], ["saas_10", "freemium"], ["saas_10", "mobile_pay"]
      ]
    },
    {
      year: 2012,
      title: "Big Data, Enterprise SaaS & Marketplaces",
      totalGlobalVC: 80,
      macroContext: "Após o tropeço de IPOs de consumo (Groupon/Zynga), VCs redescobrem o B2B. 'Big Data' e 'Consumerization of IT' dominam os pitch decks de Series A e Series B.",
      stageHighlight: "Surge o 'Series A Crunch': explosão de startups Seed disputando um funil mais seletivo de Series A ($5M-$10M).",
      tags: [
        { id: "big_data", name: "Big Data & Analytics", category: "AI & Data", totalFundingB: 16.5, seedShare: 15, seriesAShare: 38, seriesBPlusShare: 47, peakRound: "Series A / B", dealsEst: 1120, examples: ["Snowflake", "Databricks (início)", "Palantir", "MongoDB", " Hortonworks"], desc: "Hadoop, NoSQL, Data Lakes e análise preditiva para volumes massivos de dados." },
        { id: "ent_saas_12", name: "Enterprise SaaS & BYOD", category: "Enterprise & Cloud", totalFundingB: 18.2, seedShare: 18, seriesAShare: 40, seriesBPlusShare: 42, peakRound: "Series B", dealsEst: 1450, examples: ["Slack (início)", "Zoom", "HubSpot", "DocuSign", "Atlassian"], desc: "Softwares corporativos com UX de consumidor adotados de baixo para cima nas empresas." },
        { id: "marketplace_12", name: "Collaborative Economy", category: "Consumer & Social", totalFundingB: 13.4, seedShare: 21, seriesAShare: 39, seriesBPlusShare: 40, peakRound: "Series A / B", dealsEst: 980, examples: ["Airbnb", "Lyft", "Instacart", "TaskRabbit", "Etsy"], desc: "Marketplaces peer-to-peer conectando oferta ociosa (carros, quartos, tempo) à demanda." },
        { id: "fintech_early", name: "FinTech & Lending", category: "FinTech & Crypto", totalFundingB: 9.2, seedShare: 19, seriesAShare: 38, seriesBPlusShare: 43, peakRound: "Series B", dealsEst: 670, examples: ["Stripe", "SoFi", "LendingClub", "Robinhood (início)", "Nubank (gestação)"], desc: "Empréstimos P2P, pagamentos via API e ataque às tarifas dos grandes bancos." },
        { id: "edtech_mooc", name: "MOOCs & EdTech", category: "Consumer & Social", totalFundingB: 4.8, seedShare: 26, seriesAShare: 44, seriesBPlusShare: 30, peakRound: "Seed / Series A", dealsEst: 490, examples: ["Coursera", "Udacity", "Udemy", "Duolingo"], desc: "Cursos online abertos e massivos prometendo democratizar universidades de elite." },
        { id: "wearables_12", name: "Hardware & Wearables", category: "Hardware & Infra", totalFundingB: 6.1, seedShare: 24, seriesAShare: 41, seriesBPlusShare: 35, peakRound: "Series A", dealsEst: 540, examples: ["Fitbit", "Oculus VR", "Pebble", "Jawbone", "MakerBot"], desc: "Renascimento do hardware apoiado por crowdfunding, sensores baratos e impressão 3D." }
      ],
      links: [
        ["big_data", "ent_saas_12"], ["marketplace_12", "fintech_early"], ["ent_saas_12", "edtech_mooc"], ["marketplace_12", "wearables_12"]
      ]
    },
    {
      year: 2014,
      title: "'Uber for X', On-Demand, FinTech & IoT",
      totalGlobalVC: 142,
      macroContext: "Juros baixos inflam o mercado privado e nasce o termo 'Unicórnio' ($1B+ valuation). Todo pitch deck promete ser o 'Uber de alguma coisa' ou conectar objetos à internet (IoT).",
      stageHighlight: "Series B e Late-Stage explodem para subsidiar crescimento a qualquer custo (descontos em corridas e entregas).",
      tags: [
        { id: "on_demand", name: "On-Demand / 'Uber for X'", category: "Consumer & Social", totalFundingB: 34.5, seedShare: 14, seriesAShare: 30, seriesBPlusShare: 56, peakRound: "Series B+", dealsEst: 1850, examples: ["Uber", "DoorDash", "Grab", "Didi", "Rappi", "Postmates"], desc: "Logística instantânea pelo celular: transporte, comida, mercado e serviços em minutos." },
        { id: "fintech_14", name: "FinTech & Neobanks", category: "FinTech & Crypto", totalFundingB: 24.8, seedShare: 16, seriesAShare: 35, seriesBPlusShare: 49, peakRound: "Series B", dealsEst: 1420, examples: ["Nubank", "Revolut", "Chime", "Plaid", "Stripe"], desc: "Bancos digitais sem agências, open banking e desempacotamento de serviços financeiros." },
        { id: "iot_14", name: "IoT & Connected Hardware", category: "Hardware & Infra", totalFundingB: 16.2, seedShare: 22, seriesAShare: 40, seriesBPlusShare: 38, peakRound: "Series A / B", dealsEst: 1280, examples: ["Ring", "Peloton", "DJI", "August", " Samsara"], desc: "Internet das Coisas: casas inteligentes, drones, sensores industriais e hardware com assinatura." },
        { id: "cloud_devops", name: "DevOps & Microservices", category: "Enterprise & Cloud", totalFundingB: 21.4, seedShare: 15, seriesAShare: 38, seriesBPlusShare: 47, peakRound: "Series A / B", dealsEst: 1340, examples: ["Docker", "HashiCorp", "Datadog", "GitLab", "Confluent"], desc: "Containers, observabilidade e ferramentas para engenharia de software em escala." },
        { id: "cyber_14", name: "Cybersecurity", category: "Security & Defense", totalFundingB: 11.6, seedShare: 14, seriesAShare: 37, seriesBPlusShare: 49, peakRound: "Series B", dealsEst: 760, examples: ["CrowdStrike", "Cloudflare", "Tanium", "SentinelOne"], desc: "Segurança de endpoint em nuvem após grandes vazamentos corporativos globais." },
        { id: "ad_mar_tech", name: "MarTech & Growth SaaS", category: "Enterprise & Cloud", totalFundingB: 10.5, seedShare: 20, seriesAShare: 42, seriesBPlusShare: 38, peakRound: "Series A", dealsEst: 910, examples: ["Segment", "Braze", "Amplitude", "Intercom"], desc: "Automação de marketing, dados de clientes (CDP) e growth hacking." }
      ],
      links: [
        ["on_demand", "fintech_14"], ["iot_14", "cloud_devops"], ["cloud_devops", "cyber_14"], ["cloud_devops", "ad_mar_tech"]
      ]
    },
    {
      year: 2016,
      title: "Deep Learning 1.0, AR/VR, Bots & Autônomos",
      totalGlobalVC: 162,
      macroContext: "Saturação dos apps mobile leva VCs às ciências profundas. Após o AlphaGo vencer no Go, 'Machine Learning / AI' vira requisito nos decks, junto com VR/AR (Pokémon GO / Oculus) e carros autônomos.",
      stageHighlight: "Rodadas Series A valorizam doutores (PhDs) em IA e visão computacional; aquisições precoces ('acqui-hires') disparam.",
      tags: [
        { id: "ml_ai_16", name: "Machine Learning & Deep Learning", category: "AI & Data", totalFundingB: 28.4, seedShare: 20, seriesAShare: 39, seriesBPlusShare: 41, peakRound: "Series A / B", dealsEst: 1950, examples: ["OpenAI (início)", "Scale AI", "UiPath", "DataRobot", "SenseTime"], desc: "Visão computacional, PNL clássico, automação robótica (RPA) e plataformas de ML." },
        { id: "av_mobility", name: "Autonomous Vehicles & Mobility", category: "Hardware & Infra", totalFundingB: 25.2, seedShare: 9, seriesAShare: 26, seriesBPlusShare: 65, peakRound: "Series B+", dealsEst: 680, examples: ["Cruise", "Zoox", "Nuro", "Aurora", "Luminar"], desc: "Corrida pelos carros autônomos Nível 4/5, sensores LiDAR e frotas robóticas." },
        { id: "ar_vr_16", name: "VR / AR & Spatial", category: "Consumer & Social", totalFundingB: 14.1, seedShare: 25, seriesAShare: 38, seriesBPlusShare: 37, peakRound: "Series A / B", dealsEst: 890, examples: ["Magic Leap", "Niantic", "Unity", "Rec Room"], desc: "Óculos de realidade virtual e aumentada prometendo substituir telas de smartphones." },
        { id: "digital_health_16", name: "Digital Health & Biotech", category: "Bio & Health", totalFundingB: 24.6, seedShare: 13, seriesAShare: 35, seriesBPlusShare: 52, peakRound: "Series B+", dealsEst: 1320, examples: ["Moderna (privada)", "Grail", "Tempus", "Oscar Health", "Benchling"], desc: "CRISPR, biologia sintética, oncologia líquida e prontuários/seguros digitais." },
        { id: "chatbots_16", name: "Conversational Bots & API SaaS", category: "Enterprise & Cloud", totalFundingB: 19.5, seedShare: 22, seriesAShare: 41, seriesBPlusShare: 37, peakRound: "Seed / Series A", dealsEst: 1580, examples: ["Notion", "Figma", "Airtable", "Drift", "Algolia"], desc: "Primeira onda de chatbots e ferramentas colaborativas multiplayer no navegador." },
        { id: "crypto_early", name: "Blockchain & Bitcoin Infra", category: "FinTech & Crypto", totalFundingB: 4.8, seedShare: 34, seriesAShare: 44, seriesBPlusShare: 22, peakRound: "Seed / Series A", dealsEst: 460, examples: ["Coinbase", "Chainalysis", "Ripple", "Blockstream", "Ledger"], desc: "Corretoras cripto, carteiras e blockchains corporativas ('distributed ledger')." }
      ],
      links: [
        ["ml_ai_16", "av_mobility"], ["ml_ai_16", "chatbots_16"], ["ml_ai_16", "digital_health_16"], ["ar_vr_16", "av_mobility"]
      ]
    },
    {
      year: 2018,
      title: "Era dos Mega-Funds, Blockchain/Crypto, PropTech & D2C",
      totalGlobalVC: 295,
      macroContext: "O Vision Fund do SoftBank ($100B) redefine o mercado: capital abundante cria 'reis de categoria' via cheques gigantes. No Seed/Series A, febre de Blockchain/ICOs, patinetes elétricos e marcas D2C.",
      stageHighlight: "Cheques de $100M+ viram o 'novo Series B/C'. No early-stage, tokens e cripto competem direto com equity tradicional.",
      tags: [
        { id: "ent_cloud_18", name: "Hypergrowth Cloud & SaaS", category: "Enterprise & Cloud", totalFundingB: 58.0, seedShare: 11, seriesAShare: 29, seriesBPlusShare: 60, peakRound: "Series B+", dealsEst: 2400, examples: ["Snowflake", "Databricks", "UiPath", "Monday.com", "Carta"], desc: "SaaS B2B escalando globalmente com métricas agressivas de Net Dollar Retention." },
        { id: "crypto_18", name: "Blockchain, Crypto & Web3 Infra", category: "FinTech & Crypto", totalFundingB: 28.5, seedShare: 38, seriesAShare: 39, seriesBPlusShare: 23, peakRound: "Seed / Token", dealsEst: 2150, examples: ["OpenSea (Seed)", "Polygon", "Solana (Seed)", "Alchemy", "Anchorage"], desc: "Protocolos Layer-1, smart contracts e infraestrutura descentralizada pós-boom de ICOs." },
        { id: "proptech_18", name: "PropTech & Co-Working", category: "Consumer & Social", totalFundingB: 32.4, seedShare: 10, seriesAShare: 25, seriesBPlusShare: 65, peakRound: "Series B+", dealsEst: 980, examples: ["WeWork", "Opendoor", "QuintoAndar", "Loft", "Compass"], desc: "iBuying imobiliário, escritórios flexíveis e digitalização de aluguéis." },
        { id: "micromobility", name: "Micromobility & Autonomous", category: "Hardware & Infra", totalFundingB: 36.8, seedShare: 12, seriesAShare: 28, seriesBPlusShare: 60, peakRound: "Series B+", dealsEst: 840, examples: ["Bird", "Lime", "Waymo", "Rivian", "Grow Mobility"], desc: "Guerra dos patinetes elétricos (startups mais rápidas a virar unicórnio) e EVs." },
        { id: "d2c_18", name: "D2C Brands & Creator Tools", category: "Consumer & Social", totalFundingB: 21.2, seedShare: 22, seriesAShare: 38, seriesBPlusShare: 40, peakRound: "Series A / B", dealsEst: 1520, examples: ["Glossier", "Allbirds", "Gymshark", "Patreon", "TikTok/ByteDance"], desc: "Marcas nativas digitais vendendo direto ao consumidor via Instagram e criadores." },
        { id: "fintech_b2b_18", name: "Embedded FinTech & B2B Cards", category: "FinTech & Crypto", totalFundingB: 39.5, seedShare: 14, seriesAShare: 32, seriesBPlusShare: 54, peakRound: "Series B+", dealsEst: 1680, examples: ["Brex", "Ramp (gestação)", "Checkout.com", "Creditas", "Stone"], desc: "Cartões corporativos para startups, pagamentos cross-border e crédito embutido." }
      ],
      links: [
        ["proptech_18", "fintech_b2b_18"], ["d2c_18", "fintech_b2b_18"], ["crypto_18", "fintech_b2b_18"], ["ent_cloud_18", "fintech_b2b_18"], ["proptech_18", "micromobility"]
      ]
    },
    {
      year: 2020,
      title: "Choque da Pandemia: Remote Work, Telehealth, DeFi & EdTech",
      totalGlobalVC: 345,
      macroContext: "Após 60 dias de pânico em março de 2020, juros zero (ZIRP) e estímulos trilhonários disparam a digitalização forçada: trabalho remoto, telemedicina, e-commerce acelerado e verão DeFi.",
      stageHighlight: "Due diligence 100% via Zoom: rodadas Seed e Series A passam a ser fechadas em 48 horas com múltiplos recordes de ARR.",
      tags: [
        { id: "remote_collab", name: "Remote Work & Product-Led SaaS", category: "Enterprise & Cloud", totalFundingB: 72.0, seedShare: 14, seriesAShare: 32, seriesBPlusShare: 54, peakRound: "Series B+", dealsEst: 2850, examples: ["Deel", "Remote", "Miro", "Loom", "Figma", "Hopin"], desc: "Contratação global remota, quadros brancos virtuais, vídeo assíncrono e PLG." },
        { id: "telehealth_bio", name: "Telehealth, mRNA & BioTech", category: "Bio & Health", totalFundingB: 68.5, seedShare: 11, seriesAShare: 30, seriesBPlusShare: 59, peakRound: "Series B+", dealsEst: 2100, examples: ["Ro", "Hims & Hers", "BioNTech/mRNA", "Insitro", "devoted Health"], desc: "Consultas online, farmácias digitais, plataformas de mRNA e saúde mental remota." },
        { id: "ecom_qcom", name: "Quick Commerce & E-Com Infra", category: "Consumer & Social", totalFundingB: 54.0, seedShare: 15, seriesAShare: 33, seriesBPlusShare: 52, peakRound: "Series A / B+", dealsEst: 1960, examples: ["Gorillas", "Gopuff", "Faire", "Bolt", "VTEX", "Nuvemshop"], desc: "Mercado em 15 minutos (dark stores), agregadores da Amazon (Thrasio) e checkout 1-click." },
        { id: "fintech_20", name: "FinTech, Trading & BaaS", category: "FinTech & Crypto", totalFundingB: 58.2, seedShare: 16, seriesAShare: 34, seriesBPlusShare: 50, peakRound: "Series B+", dealsEst: 2240, examples: ["Robinhood", "Klarna (BNPL)", "Affirm", "Mercury", "Pipe"], desc: "Buy Now Pay Later (BNPL), apps de investimento para varejo e Banking-as-a-Service." },
        { id: "edtech_20", name: "EdTech & Creator Economy", category: "Consumer & Social", totalFundingB: 26.4, seedShare: 21, seriesAShare: 38, seriesBPlusShare: 41, peakRound: "Series A / B", dealsEst: 1420, examples: ["Byju's", "MasterClass", "Substack", "Clubhouse", "Kahoot"], desc: "Escolas online durante lockdowns, áudio social ao vivo e monetização de criadores." },
        { id: "defi_web3_20", name: "DeFi, Crypto & NFT Genesis", category: "FinTech & Crypto", totalFundingB: 18.5, seedShare: 36, seriesAShare: 40, seriesBPlusShare: 24, peakRound: "Seed / Series A", dealsEst: 1380, examples: ["Uniswap", "Aave", "Dapper Labs", "Fireblocks", "FTX"], desc: "Finanças descentralizadas ('DeFi Summer'), custódia institucional e primeiros NFTs." }
      ],
      links: [
        ["remote_collab", "fintech_20"], ["fintech_20", "defi_web3_20"], ["ecom_qcom", "fintech_20"], ["remote_collab", "edtech_20"], ["telehealth_bio", "remote_collab"]
      ]
    },
    {
      year: 2022,
      title: "Ressaca ZIRP, Web3/Metaverse, ClimateTech 2.0 & Spark da GenAI",
      totalGlobalVC: 452,
      macroContext: "Ano de duas metades: Q1 ainda surfava na euforia de Web3, NFTs e Metaverso de 2021; no 2º semestre, juros sobem, FTX quebra, múltiplos caem 70% — mas ClimateTech resiste e o ChatGPT nasce em novembro.",
      stageHighlight: "Late-stage congela quase por completo; fundos recuam para Seed/Series A focados em Web3, Clima, Cyber e nos primeiros labs de IA Generativa.",
      tags: [
        { id: "climatetech_22", name: "ClimateTech & Clean Energy 2.0", category: "Climate & Energy", totalFundingB: 70.2, seedShare: 14, seriesAShare: 31, seriesBPlusShare: 55, peakRound: "Series B+", dealsEst: 2350, examples: ["Northvolt", "Climeworks", "Redwood Materials", "Commonwealth Fusion", "Watershed"], desc: "Baterias, captura direta de carbono, fusão nuclear e contabilidade de emissões (impulsionados pelo IRA)." },
        { id: "web3_meta_22", name: "Web3, NFTs, Gaming & Metaverse", category: "FinTech & Crypto", totalFundingB: 48.6, seedShare: 35, seriesAShare: 39, seriesBPlusShare: 26, peakRound: "Seed / Series A", dealsEst: 2950, examples: ["Yuga Labs", "Aptos", "Sui/Mysten Labs", "Immutable", "ConsenSys"], desc: "Pico da febre 'Web3' no 1º semestre: blockchains L1/L2, jogos Play-to-Earn e mundos virtuais." },
        { id: "eff_saas_22", name: "Efficient SaaS & Data Stack", category: "Enterprise & Cloud", totalFundingB: 84.0, seedShare: 15, seriesAShare: 34, seriesBPlusShare: 51, peakRound: "Series A / B", dealsEst: 3100, examples: ["dbt Labs", "Supabase", "Vercel", "Rippling", "Celonis"], desc: "Modern Data Stack, ferramentas de desenvolvedor e automação focada em cortar custos de TI." },
        { id: "cyber_zero_22", name: "Zero-Trust & Cloud Security", category: "Security & Defense", totalFundingB: 36.4, seedShare: 16, seriesAShare: 35, seriesBPlusShare: 49, peakRound: "Series B+", dealsEst: 1240, examples: ["Wiz", "Snyk", "Socure", "Drata", "Vanta"], desc: "Segurança nativa em nuvem (CNAPP), automação de compliance (SOC2) e proteção de identidade." },
        { id: "supply_def_22", name: "Supply Chain & Early DefenseTech", category: "Security & Defense", totalFundingB: 32.8, seedShare: 13, seriesAShare: 32, seriesBPlusShare: 55, peakRound: "Series B+", dealsEst: 1050, examples: ["Anduril", "Flexport", "SpaceX", "Shield AI", "Project44"], desc: "Geopolítica (Guerra na Ucrânia) e gargalos logísticos destravam teses de soberania e defesa." },
        { id: "genai_seed_22", name: "Generative AI (Primeira Onda)", category: "AI & Data", totalFundingB: 16.5, seedShare: 32, seriesAShare: 40, seriesBPlusShare: 28, peakRound: "Seed / Series A", dealsEst: 820, examples: ["Stability AI", "Jasper", "Runway", "Hugging Face", "Anthropic (Series B)"], desc: "Modelos de difusão de imagem, copilotos de texto e fundação dos laboratórios de LLMs." }
      ],
      links: [
        ["eff_saas_22", "genai_seed_22"], ["eff_saas_22", "cyber_zero_22"], ["climatetech_22", "supply_def_22"], ["web3_meta_22", "genai_seed_22"]
      ]
    },
    {
      year: 2024,
      title: "Consolidação da IA Generativa, LLMs, Co-Pilots & DefenseTech",
      totalGlobalVC: 368,
      macroContext: "Bifurcação histórica do Venture Capital: startups tradicionais enfrentam seca severa de liquidez, enquanto qualquer tese com 'GenAI', 'LLM' ou 'Autonomous Defense' levanta rodadas superdimensionadas.",
      stageHighlight: "Nasce o 'Mega-Seed' ($20M-$100M+) para ex-pesquisadores do Google/OpenAI/Meta; quase 40% de todos os dólares de VC vão para IA.",
      tags: [
        { id: "genai_llm_24", name: "Foundation Models & GenAI Infra", category: "AI & Data", totalFundingB: 98.5, seedShare: 10, seriesAShare: 22, seriesBPlusShare: 68, peakRound: "Series B / Mega-Growth", dealsEst: 2650, examples: ["OpenAI", "xAI", "Anthropic", "Mistral AI", "Safe Superintelligence", "CoreWeave"], desc: "Corrida armamentista por GPUs, clusters de treinamento e modelos fundacionais de fronteira." },
        { id: "ai_copilots_24", name: "Vertical AI & Enterprise Co-Pilots", category: "AI & Data", totalFundingB: 48.2, seedShare: 28, seriesAShare: 40, seriesBPlusShare: 32, peakRound: "Seed / Series A / B", dealsEst: 3400, examples: ["Cursor (Anysphere)", "Harvey", "Glean", "Perplexity", "Abridge", "ElevenLabs"], desc: "Co-pilotos para código, direito, saúde, busca conversacional e áudio sintético." },
        { id: "defensetech_24", name: "DefenseTech & Dual-Use", category: "Security & Defense", totalFundingB: 38.4, seedShare: 15, seriesAShare: 31, seriesBPlusShare: 54, peakRound: "Series B+", dealsEst: 920, examples: ["Anduril", "Saronic", "Helsing", "Skydio", "Palantir ecosystem"], desc: "Drones autônomos, sistemas marítimos não-tripulados e software militar dual-use." },
        { id: "techbio_24", name: "TechBio & AI Drug Discovery", category: "Bio & Health", totalFundingB: 36.0, seedShare: 16, seriesAShare: 36, seriesBPlusShare: 48, peakRound: "Series A / B", dealsEst: 1280, examples: ["Xaira Therapeutics ($1B Seed)", "Formation Bio", "Isomorphic Labs", "EvolutionaryScale"], desc: "Modelos generativos de proteínas (pós-AlphaFold 3) e ensaios clínicos guiados por IA." },
        { id: "cyber_ai_24", name: "Cloud & AI Cybersecurity", category: "Security & Defense", totalFundingB: 31.5, seedShare: 18, seriesAShare: 36, seriesBPlusShare: 46, peakRound: "Series A / B+", dealsEst: 1150, examples: ["Wiz", "Cyera", "Protect AI", "Oasis Security", "Chainguard"], desc: "Segurança de dados para IA, identidades não-humanas e cadeia de suprimentos de software." },
        { id: "energy_grid_24", name: "AI Energy, Nuclear & GridTech", category: "Climate & Energy", totalFundingB: 29.8, seedShare: 15, seriesAShare: 33, seriesBPlusShare: 52, peakRound: "Series B", dealsEst: 1090, examples: ["Fervo Energy", "Pacific Fusion", "Koloma", "Base Power", "Crusoe"], desc: "Geotérmica avançada, pequenos reatores nucleares (SMRs) e baterias para alimentar Data Centers." }
      ],
      links: [
        ["genai_llm_24", "ai_copilots_24"], ["genai_llm_24", "energy_grid_24"], ["genai_llm_24", "techbio_24"], ["ai_copilots_24", "cyber_ai_24"], ["defensetech_24", "cyber_ai_24"]
      ]
    },
    {
      year: 2026,
      title: "Hegemonia de Agentic AI, Physical AI (Robótica) & Infra Soberana",
      totalGlobalVC: 690,
      macroContext: "Concentração extrema de capital em 2026: menos startups totais recebem cheques, mas jargões como 'Agentic AI', 'Physical AI / World Models' e 'AI Compute / Nuclear' batem todos os recordes nominais da história do VC.",
      stageHighlight: "Seeds de $50M-$1B (ex: Ineffable Intelligence) e Series A de $500M+ convivem com enxutas startups 'AI-native' que atingem $50M ARR com 20 pessoas.",
      tags: [
        { id: "agentic_ai_26", name: "Agentic AI & Autonomous Enterprise", category: "AI & Data", totalFundingB: 168.0, seedShare: 19, seriesAShare: 33, seriesBPlusShare: 48, peakRound: "Seed / Series A / B", dealsEst: 3850, examples: ["Cognition (Devin)", "Sierra", "Cursor", "Mercor", "TypeSafe AI", "Decagon"], desc: "Transição de 'chatbots que respondem' para agentes autônomos que executam fluxos inteiros de engenharia, suporte, finanças e vendas." },
        { id: "frontier_infra_26", name: "Frontier AI Labs, Chips & Compute", category: "AI & Data", totalFundingB: 215.0, seedShare: 6, seriesAShare: 14, seriesBPlusShare: 80, peakRound: "Mega-Rounds ($1B+)", dealsEst: 780, examples: ["OpenAI", "Anthropic", "xAI", "Cerebras", "Etched", "Ineffable Intelligence", "Wafer"], desc: "Superclusters de inferência, chips ASIC especializados em transformers, RL environments e labs de superinteligência." },
        { id: "physical_ai_26", name: "Physical AI, Robotics & World Models", category: "Hardware & Infra", totalFundingB: 64.5, seedShare: 18, seriesAShare: 35, seriesBPlusShare: 47, peakRound: "Series A / B", dealsEst: 1240, examples: ["Physical Intelligence (π)", "Figure AI", "Skild AI", "1X", "World Labs", "Tutor Intelligence"], desc: "Cérebros fundacionais para robôs humanoides e industriais atuarem no mundo físico não-estruturado." },
        { id: "defense_space_26", name: "Defense Autonomy, Space & Re-Industrialization", category: "Security & Defense", totalFundingB: 58.0, seedShare: 14, seriesAShare: 30, seriesBPlusShare: 56, peakRound: "Series B+", dealsEst: 1020, examples: ["Shield AI", "Anduril", "Saronic", "Hypersonica", "CesiumAstro", "Hadrian"], desc: "Fábricas autônomas, enxames de drones sem GPS, hipersônicos, satélites em órbita baixa e reindustrialização." },
        { id: "energy_compute_26", name: "Compute Power, Nuclear & Climate HardTech", category: "Climate & Energy", totalFundingB: 49.0, seedShare: 15, seriesAShare: 32, seriesBPlusShare: 53, peakRound: "Series A / B+", dealsEst: 1180, examples: ["Valar Atomics", "Rainmaker", "Fervo Energy", "Base Power", "Aalo Atomics", "WAVR"], desc: "Energia nuclear modular, geotérmica e adaptação climática para sustentar a demanda elétrica insaciável da IA." },
        { id: "programmable_bio_26", name: "Programmable Biology & Clinical AI", category: "Bio & Health", totalFundingB: 46.5, seedShare: 17, seriesAShare: 36, seriesBPlusShare: 47, peakRound: "Series A / B", dealsEst: 1390, examples: ["Chai Discovery", "Vivodyne", "Abridge", "Anterior", "Syremis", "Isomorphic"], desc: "Design de moléculas 'zero-shot' via IA, tecidos humanos cultivados em laboratório robótico e automação hospitalar." },
        { id: "agentic_sec_26", name: "AI & Agentic Cybersecurity", category: "Security & Defense", totalFundingB: 38.2, seedShare: 22, seriesAShare: 39, seriesBPlusShare: 39, peakRound: "Seed / Series A / B", dealsEst: 1160, examples: ["Adaptive Security", "Wiz", "Cyera", "Zenity", "HiddenLayer", "7AI"], desc: "Defesa contra deepfakes em tempo real, governança de agentes autônomos e SOCs operados por enxames de IA." },
        { id: "stable_fintech_26", name: "Stablecoin Rails & Agentic FinTech", category: "FinTech & Crypto", totalFundingB: 34.8, seedShare: 20, seriesAShare: 37, seriesBPlusShare: 43, peakRound: "Series A / B", dealsEst: 1290, examples: ["Bridge", "Ramp", "Griffin", "ARQ", "Stripe Agent Toolkit", "BVNK"], desc: "Liquidação global via stablecoins, tesouraria autônoma B2B e infraestrutura de pagamentos entre agentes de IA." }
      ],
      links: [
        ["frontier_infra_26", "agentic_ai_26"],
        ["frontier_infra_26", "physical_ai_26"],
        ["frontier_infra_26", "energy_compute_26"],
        ["agentic_ai_26", "agentic_sec_26"],
        ["agentic_ai_26", "stable_fintech_26"],
        ["physical_ai_26", "defense_space_26"],
        ["frontier_infra_26", "programmable_bio_26"]
      ]
    }
  ],

  categories: {
    "AI & Data": { color: "#38bdf8", glow: "rgba(56, 189, 248, 0.55)", label: "IA, Dados & Infra" },
    "Enterprise & Cloud": { color: "#a78bfa", glow: "rgba(167, 139, 250, 0.55)", label: "SaaS & Cloud B2B" },
    "FinTech & Crypto": { color: "#fbbf24", glow: "rgba(251, 191, 36, 0.55)", label: "FinTech, Pagamentos & Web3" },
    "Security & Defense": { color: "#f43f5e", glow: "rgba(244, 63, 94, 0.55)", label: "Defesa, Espaço & Cyber" },
    "Hardware & Infra": { color: "#fb923c", glow: "rgba(251, 146, 60, 0.55)", label: "Robótica, Mobilidade & HardTech" },
    "Bio & Health": { color: "#34d399", glow: "rgba(52, 211, 153, 0.55)", label: "TechBio & Saúde" },
    "Climate & Energy": { color: "#a3e635", glow: "rgba(163, 230, 53, 0.55)", label: "Energia, Nuclear & Clima" },
    "Consumer & Social": { color: "#e879f9", glow: "rgba(232, 121, 249, 0.55)", label: "Consumo, Social & Marketplaces" }
  },

  // Hub 2: Hottest Emerging Startups Radar (Separated by Sector)
  startupSectors: [
    {
      id: "agentic-ai",
      name: "Agentic AI & DevTools",
      icon: "✦",
      color: "#38bdf8",
      hotTag: "Agentic Workflows • AI Coding • RL Environments",
      thesis: "Startups que deixaram para trás simples 'wrappers de chat' e constroem agentes capazes de programar sistemas inteiros, operar softwares corporativos e tomar decisões multi-etapas.",
      startups: [
        { name: "Cursor (Anysphere)", stage: "Series B+", raised: "$900M+", hq: "San Francisco, EUA", hotScore: 99, tags: ["AI Coding", "Agentic IDE"], backers: "Thrive, a16z, Accel", oneLiner: "Ambiente de engenharia nativo em IA que mais cresce em receita recorrente na história recente do SaaS." },
        { name: "Cognition AI", stage: "Series B", raised: "$500M+", hq: "San Francisco, EUA", hotScore: 96, tags: ["Autonomous SWE", "Agentic AI"], backers: "Founders Fund, Khosla", oneLiner: "Criadora do Devin, engenheiro de software autônomo que planeja, codifica, depura e faz deploy de ponta a ponta." },
        { name: "Sierra", stage: "Series B+", raised: "$450M+", hq: "San Francisco, EUA", hotScore: 95, tags: ["Enterprise Agents", "CX AI"], backers: "Sequoia, Benchmark, Greenoaks", oneLiner: "Plataforma de agentes conversacionais autônomos para grandes empresas (co-fundada por Bret Taylor)." },
        { name: "Mercor", stage: "Series B", raised: "$130M+", hq: "San Francisco, EUA", hotScore: 94, tags: ["RLHF Talent", "AI Recruiting"], backers: "Benchmark, General Catalyst", oneLiner: "Rede movida a IA conectando especialistas humanos de elite para treinar e avaliar modelos de fronteira." },
        { name: "Wafer", stage: "Seed / Series A", raised: "$44M", hq: "San Francisco, EUA", hotScore: 89, tags: ["AI Inference", "YC Breakout"], backers: "Y Combinator, Tier-1 Angels", oneLiner: "Otimização radical de infraestrutura de inferência de baixa latência para agentes em produção." },
        { name: "Halluminate", stage: "Series A", raised: "$30M", hq: "San Francisco, EUA", hotScore: 88, tags: ["RL Environments", "Agent Evals"], backers: "YC, Institutional VCs", oneLiner: "Ambientes simulados de Reinforcement Learning (RL) para treinar agentes no trabalho do conhecimento." }
      ]
    },
    {
      id: "physical-ai",
      name: "Physical AI & Robótica",
      icon: "◈",
      color: "#fb923c",
      hotTag: "World Models • Humanoids • Robot Brains",
      thesis: "A maior fronteira pós-LLMs: modelos fundacionais multimodais ('cérebros gerais') que permitem a robôs manipular objetos inéditos no mundo real sem programação rígida.",
      startups: [
        { name: "Physical Intelligence (π)", stage: "Series A / B", raised: "$470M+", hq: "San Francisco, EUA", hotScore: 98, tags: ["Robot Foundation Model", "Physical AI"], backers: "Thrive, Sequoia, OpenAI, Khosla", oneLiner: "Desenvolve modelos gerais de ação-linguagem-visão (π0) capazes de controlar qualquer braço ou corpo robótico." },
        { name: "Skild AI", stage: "Series A / B", raised: "$300M+", hq: "Pittsburgh, EUA", hotScore: 95, tags: ["General Purpose Brain", "Robotics"], backers: "Lightspeed, Coatue, SoftBank, Bezos", oneLiner: "Cérebro escalável e agnóstico de hardware treinado com bilhões de interações físicas simuladas e reais." },
        { name: "World Labs", stage: "Seed / Series A", raised: "$230M", hq: "San Francisco, EUA", hotScore: 96, tags: ["Spatial Intelligence", "World Models"], backers: "a16z, NEA, Radical Ventures", oneLiner: "Fundada por Fei-Fei Li para criar 'Large World Models' (LWMs) que compreendem física e espaço 3D." },
        { name: "Figure AI", stage: "Series B+", raised: "$750M+", hq: "Sunnyvale, EUA", hotScore: 97, tags: ["Humanoid Robots", "Industrial"], backers: "Parkway, Microsoft, NVIDIA, Bezos", oneLiner: "Robôs humanoides autônomos já operando em linhas de montagem automotiva e logística pesada." },
        { name: "Tutor Intelligence", stage: "Series B", raised: "$75M+", hq: "Cambridge, EUA", hotScore: 88, tags: ["Factory Robotics", "Fleet Learning"], backers: "a16z, Union Square Ventures", oneLiner: "Frotas de robôs operários industriais nascidos no MIT CSAIL que aprendem continuamente em chão de fábrica." }
      ]
    },
    {
      id: "defense-space",
      name: "DefenseTech, Espaço & Re-Industrialização",
      icon: "▲",
      color: "#f43f5e",
      hotTag: "Dual-Use • Autonomous Swarms • Orbital",
      thesis: "Tensões geopolíticas e cadeias globais frágeis transformaram defesa, manufatura autônoma e soberania espacial em uma das teses mais disputadas por Founders Fund, a16z e Sequoia.",
      startups: [
        { name: "Saronic", stage: "Series B+", raised: "$850M+", hq: "Austin, EUA", hotScore: 97, tags: ["Autonomous Maritime", "DefenseTech"], backers: "a16z, General Catalyst, 8VC", oneLiner: "Embarcações navais autônomas (USVs) integrando hardware marítimo veloz e enxames de software." },
        { name: "Shield AI", stage: "Growth / Late", raised: "$2.0B+ (eq/debt)", hq: "San Diego, EUA", hotScore: 95, tags: ["AI Pilot", "Swarm Autonomy"], backers: "Riot Ventures, USIT, Andreessen", oneLiner: "Criadora do piloto de IA Hivemind que permite drones e jatos operarem sem GPS e sem comunicação externa." },
        { name: "Hadrian", stage: "Series B+", raised: "$215M+", hq: "Torrance, EUA", hotScore: 93, tags: ["Autonomous Factories", "Aerospace"], backers: "Founders Fund, Lux Capital, a16z", oneLiner: "Fábricas hiper-automatizadas por software que usinam peças críticas de foguetes, jatos e satélites 10x mais rápido." },
        { name: "Hypersonica", stage: "Series B", raised: "$110M+", hq: "Munique, Alemanha", hotScore: 90, tags: ["Hypersonics", "European Sovereignty"], backers: "General Catalyst, Lightspeed", oneLiner: "Sistemas de voo hipersônico e sensores aeroespaciais liderando a nova onda de DefenseTech europeia." },
        { name: "CesiumAstro", stage: "Series B+", raised: "$185M+", hq: "Austin, EUA", hotScore: 89, tags: ["Space Comms", "Phased Array"], backers: "Kleiner Perkins, Airbus Ventures", oneLiner: "Sistemas de comunicação phased-array ativos definidos por software para constelações de satélites e defesa." }
      ]
    },
    {
      id: "techbio-health",
      name: "TechBio & Saúde Guiada por IA",
      icon: "❖",
      color: "#34d399",
      hotTag: "Generative Biology • Lab-in-the-Loop • Clinical AI",
      thesis: "A biologia passa de ciência artesanal de tentativa-e-erro para engenharia programável: moléculas desenhadas do zero por IA e validadas em tecidos humanos robóticos.",
      startups: [
        { name: "Chai Discovery", stage: "Seed / Series A", raised: "$100M+", hq: "San Francisco, EUA", hotScore: 96, tags: ["Molecular Foundation Model", "Drug Design"], backers: "Thrive Capital, OpenAI, Dimension", oneLiner: "Modelos fundacionais abertos e de fronteira que preveem e desenham estruturas bioquímicas de medicamentos." },
        { name: "Xaira Therapeutics", stage: "Mega-Seed / A", raised: "$1.0B", hq: "San Francisco, EUA", hotScore: 95, tags: ["Generative Protein", "AI Pharma"], backers: "ARCH Venture, Foresite, Sequoia", oneLiner: "Combina modelos generativos de proteínas (RFdiffusion) com geração massiva de dados biológicos próprios." },
        { name: "Vivodyne", stage: "Series A", raised: "$40M+", hq: "Philadelphia, EUA", hotScore: 91, tags: ["Lab-Grown Tissues", "Robotic Testing"], backers: "Khosla Ventures, a16z, Kairos", oneLiner: "Cultiva micro-tecidos humanos reais em laboratório automatizado para testar drogas com IA antes de ensaios clínicos." },
        { name: "Abridge", stage: "Series B+", raised: "$460M+", hq: "Pittsburgh, EUA", hotScore: 94, tags: ["Clinical Ambient AI", "HealthTech"], backers: "Lightspeed, Elad Gil, IVP, Spark", oneLiner: "IA clínica ambiente que escuta consultas médicas e estrutura prontuários e faturamento instantaneamente." },
        { name: "Anterior", stage: "Series B", raised: "$75M+", hq: "New York, EUA", hotScore: 88, tags: ["Healthcare Ops", "Clinical Agents"], backers: "NEA, Sequoia, Neo", oneLiner: "Co-pilotos médicos treinados por clínicos para automatizar autorizações prévias e back-office de planos de saúde." }
      ]
    },
    {
      id: "energy-climate",
      name: "Energia para IA, Nuclear & Climate HardTech",
      icon: "⚡",
      color: "#a3e635",
      hotTag: "Data Center Power • SMR Nuclear • Geothermal",
      thesis: "O gargalo da IA deixou de ser apenas chips e virou gigawatts na tomada. VCs migraram do software de carbono para geração firme de energia limpa, armazenamento de rede e adaptação física.",
      startups: [
        { name: "Fervo Energy", stage: "Series B+", raised: "$650M+", hq: "Houston, EUA", hotScore: 95, tags: ["Enhanced Geothermal", "24/7 Clean Power"], backers: "Breakthrough Energy, DCVC, Capricorn", oneLiner: "Usa técnicas de perfuração horizontal para gerar energia geotérmica limpa 24/7 para redes e data centers de IA." },
        { name: "Base Power", stage: "Series A / B", raised: "$270M+", hq: "Austin, EUA", hotScore: 94, tags: ["Distributed Grid", "Home Batteries"], backers: "a16z, Addition, Valor, Thrive", oneLiner: "Constrói uma usina elétrica virtual distribuída instalando baterias residenciais acessíveis em escala de rede." },
        { name: "Valar Atomics", stage: "Seed / Series A", raised: "$45M+", hq: "El Segundo, EUA", hotScore: 91, tags: ["Modular Nuclear", "Synthetic Fuels"], backers: "Riot Ventures, Founders Fund scouts", oneLiner: "Sítios giga-escala de reatores nucleares de alta temperatura para energia industrial densa e hidrocarbonetos limpos." },
        { name: "Rainmaker", stage: "Series A / B", raised: "$32M+", hq: "El Segundo, EUA", hotScore: 89, tags: ["Weather Modification", "Water Security"], backers: "Long Journey, Lowercarbon, Garry Tan", oneLiner: "Drones meteorológicos e radar de precisão modernizando a semeadura de nuvens contra secas severas." },
        { name: "WAVR Technologies", stage: "Seed / Series A", raised: "$12M+", hq: "Las Vegas, EUA", hotScore: 86, tags: ["Atmospheric Water", "Data Center Heat"], backers: "Climate DeepTech VCs", oneLiner: "Captura calor residual industrial e de data centers para extrair água limpa diretamente da atmosfera." }
      ]
    },
    {
      id: "cyber-fintech",
      name: "Cybersecurity de IA & Stablecoin FinTech",
      icon: "⬡",
      color: "#fbbf24",
      hotTag: "Agent Governance • Deepfake Defense • Stablecoin B2B",
      thesis: "Com agentes autônomos tendo acesso a bancos de dados e carteiras financeiras, surgem duas infraestruturas gêmeas: segurança para identidades não-humanas e trilhos globais programáveis via stablecoins.",
      startups: [
        { name: "Cyera", stage: "Series B+", raised: "$760M+", hq: "New York / Tel Aviv", hotScore: 96, tags: ["AI Data Security", "DSPM"], backers: "Coatue, Sequoia, Accel, Redpoint", oneLiner: "Plataforma guiada por IA que mapeia, classifica e protege dados sensíveis corporativos antes que LLMs os exponham." },
        { name: "Adaptive Security", stage: "Series A / B", raised: "$120M+", hq: "New York, EUA", hotScore: 92, tags: ["Deepfake Defense", "AI Social Eng"], backers: "a16z, OpenAI Startup Fund", oneLiner: "Simulação e defesa em tempo real contra golpes corporativos com clonagem de voz, vídeo deepfake e phishing por IA." },
        { name: "7AI", stage: "Seed / Series A", raised: "$165M+", hq: "Boston, EUA", hotScore: 93, tags: ["Agentic SOC", "Autonomous Cyber"], backers: "Greylock, Index Ventures, Spark", oneLiner: "Enxames de agentes autônomos de cibersegurança que investigam e respondem a alertas de SOC sem fadiga humana." },
        { name: "BVNK / Trilhos Stablecoin", stage: "Series B", raised: "$90M+", hq: "Londres, Reino Unido", hotScore: 90, tags: ["Stablecoin Rails", "Cross-Border B2B"], backers: "Haun Ventures, Visa, Tiger Global", oneLiner: "Infraestrutura de tesouraria multi-moeda liquidando pagamentos corporativos globais em segundos via stablecoins." },
        { name: "ARQ", stage: "Series B", raised: "$70M+", hq: "Cidade do México / LatAm", hotScore: 89, tags: ["Global Treasury", "LatAm FinTech"], backers: "Kaszek, Founders Fund, Sequoia heritage", oneLiner: "Conta financeira dólar-digital e trilhos cambiais modernos escalando rapidamente na América Latina." }
      ]
    }
  ]
};
