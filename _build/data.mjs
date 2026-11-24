export const SITE = {
  name: 'Vespera Protective',
  short: 'Vespera',
  url: 'https://justuseflint.github.io/vespera-protective/',
  tagline: 'Discreet private security and executive protection',
  phone: '+1 (212) 555-0147',
  phoneHref: '+12125550147',
  email: 'briefings@vesperaprotective.com',
  desk: 'Operations Desk · 24/7',
  hubs: [
    { city: 'New York', tz: 'America/New_York', coord: '40.7580° N · 73.9855° W', role: 'Americas command and the Global Operations Center', addr: 'Midtown Manhattan · by appointment' },
    { city: 'London', tz: 'Europe/London', coord: '51.5072° N · 0.1276° W', role: 'Europe, Middle East and Africa coordination', addr: 'Mayfair · by appointment' },
    { city: 'Geneva', tz: 'Europe/Zurich', coord: '46.2044° N · 6.1432° E', role: 'Advisory, family office and diplomatic programs', addr: 'Rive Droite · by appointment' },
  ],
};

export const NAV = [
  { label: 'Services', href: 'services/', img: 'service-executive', brief: 'Five protective disciplines, planned as one program.' },
  { label: 'Methodology', href: 'methodology/', img: 'about-monolith', brief: 'Intelligence, advance, presence, continuity.' },
  { label: 'Sectors', href: 'sectors/', img: 'service-estate', brief: 'Family offices, boards, dignitaries, collections, public figures.' },
  { label: 'Briefings', href: 'briefings/', img: 'service-intelligence', brief: 'Long-form research from our advisory desk.' },
  { label: 'About', href: 'about/', img: 'hero-fluted-wave', brief: 'An ethos of restraint, from New York, London and Geneva.' },
  { label: 'Contact', href: 'contact/', img: 'service-events', brief: 'Request a private briefing with a senior lead.' },
];

export const SERVICES = [
  {
    slug: 'executive-protection', short: 'Executive Protection', name: 'Executive & Principal Protection',
    cat: 'personal', catLabel: 'Personal', img: 'service-executive',
    line: 'Close protection that moves at the pace of your day and never announces itself.',
    tags: ['Close protection', 'Advance work', 'Medical readiness'],
    title: 'Executive Protection & Close Protection Services | Vespera',
    desc: 'Discreet executive and principal protection: close protection officers, 72-hour advance protocols, low-profile or overt posture, and integrated medical readiness.',
    hero: 'Close protection, composed around the principal.',
    intro: 'Executive protection at Vespera begins long before a principal steps out of a car. Every assignment is built on an advance: routes walked, venues surveyed, hospitals mapped, and every contingency rehearsed, so that the officers at the principal\'s side can stay calm, close and largely unnoticed.',
    leadTime: '72 hours ideal · 12 hours minimum', team: 'Two to eight officers', coverage: 'Domestic and international', bestFor: 'Executives, founders, families, visiting principals',
    capabilities: [
      { h: 'Close protection officers', p: 'Senior officers with backgrounds in government protective details, specialist policing and corporate protection, selected for temperament as much as skill.' },
      { h: '72-hour advance protocols', p: 'Route reconnaissance, venue walk-throughs, safe-room identification and liaison with local partners, completed and documented before arrival.' },
      { h: 'Posture on a dial', p: 'From a single low-profile officer in business attire to a visible multi-vehicle detail, posture is set by the threat picture and the principal\'s preferences.' },
      { h: 'Medical readiness', p: 'Every detail carries trauma and cardiac equipment, and at least one officer holds advanced pre-hospital care certification. Nearest trauma centers are pre-mapped.' },
      { h: 'Protective drivers', p: 'Drivers trained in evasive and defensive techniques who also know when the best move is simply a different lane and a quieter street.' },
      { h: 'Family and residence handover', p: 'Seamless coordination with estate teams so protection continues from the office door to the front door without gaps.' },
    ],
    timeline: [
      { t: 'T–72h', h: 'Threat and itinerary review', p: 'Intelligence brief, itinerary validation, open-source exposure check and posture recommendation.' },
      { t: 'T–48h', h: 'Physical advance', p: 'Routes driven at the same hour of travel, venues surveyed, choke points and alternates logged.' },
      { t: 'T–24h', h: 'Team brief and rehearsal', p: 'Officers, drivers and venue contacts briefed. Emergency actions rehearsed on site.' },
      { t: 'Arrival', h: 'Live operation', p: 'Detail on station, Operations Desk tracking movement, liaison channels open.' },
      { t: 'After', h: 'Debrief and record', p: 'Written debrief with observations, anomalies and refinements for the next movement.' },
    ],
    postures: [
      { k: 'Low profile', p: 'One or two officers in business dress, blending into the principal\'s team. Vehicles are unbadged and ordinary for the city. Ideal where attention is the main risk.' },
      { k: 'Measured', p: 'A small detail with a lead officer close and a second at distance, supported by a protective driver and a pre-staged secondary vehicle.' },
      { k: 'Overt', p: 'A visible, multi-vehicle detail for elevated threat periods or high-attention events, where deterrence is part of the objective.' },
    ],
    faq: [
      { q: 'How far in advance should executive protection be arranged?', a: 'Seventy-two hours allows a full physical advance and is our standard. We can deploy within twelve hours for urgent needs, with the advance compressed and supported remotely by the Operations Desk.' },
      { q: 'Are your close protection officers armed?', a: 'Where it is lawful and appropriate, and only with properly licensed officers. Many assignments are unarmed by design, particularly internationally, where local law and discretion favor it.' },
      { q: 'Can protection stay invisible in a business setting?', a: 'Yes. Low-profile details are our most common posture. Officers dress to the setting, travel in ordinary vehicles and position themselves as part of the principal\'s staff.' },
      { q: 'Do you provide protection for families and children?', a: 'Yes, with officers specifically selected and trained for family work, including school runs, travel and residence handovers coordinated with estate staff.' },
    ],
    article: 'executive-protection-advance-work-guide',
  },
  {
    slug: 'estate-security', short: 'Estate Security', name: 'Residential & Estate Security',
    cat: 'property', catLabel: 'Property', img: 'service-estate',
    line: 'Perimeters designed like architecture: present everywhere, visible nowhere.',
    tags: ['Estate agents', 'Perimeter design', 'Household vetting'],
    title: 'Residential & Estate Security Services | Vespera Protective',
    desc: 'Private estate security: 24/7 residential agents, perimeter optics and sensor design, household and vendor vetting, and security integrated with architecture.',
    hero: 'Security designed into the house, not bolted onto it.',
    intro: 'A residence should feel like a sanctuary, not a compound. Vespera combines resident estate agents with perimeter systems designed alongside your architects and landscape designers, so detection happens at the boundary, decisions happen in the gatehouse, and the household simply lives.',
    leadTime: 'Two to six weeks for full programs', team: 'Resident team plus remote monitoring', coverage: 'Primary, secondary and seasonal homes', bestFor: 'Families, estates, collectors, staffed residences',
    capabilities: [
      { h: '24/7 estate agents', p: 'Resident security officers who know the household rhythm, manage access and hand over cleanly with family protection details.' },
      { h: 'Perimeter optics and sensors', p: 'Layered thermal and visible optics, buried and fence-line sensors, and analytics tuned to reduce false alarms from wildlife and weather.' },
      { h: 'Household and vendor vetting', p: 'Background screening for staff, contractors and recurring vendors, with access windows and credentials that expire when the job does.' },
      { h: 'Architectural integration', p: 'We work with architects at design stage to place safe rooms, conduit, gate geometry and sightlines without compromising the design intent.' },
      { h: 'Remote monitoring', p: 'The Global Operations Center watches alarms and camera analytics in real time and dispatches the on-site team or local responders.' },
      { h: 'Seasonal homes', p: 'Vacant-period protection with scheduled patrols, environmental sensors and pre-arrival sweeps before the family returns.' },
    ],
    timeline: [
      { t: 'Survey', h: 'Site and household assessment', p: 'Walk the property at day and night, interview the household and map how people actually move.' },
      { t: 'Design', h: 'Layered security design', p: 'Detect, assess, delay and respond, drawn as layers from the outer boundary to the safe room.' },
      { t: 'Integrate', h: 'Build with your architects', p: 'Specifications delivered to your design team, installers vetted and work supervised.' },
      { t: 'Staff', h: 'Resident team in place', p: 'Estate agents selected for the household, briefed on routines and introduced gradually.' },
      { t: 'Review', h: 'Quarterly testing', p: 'Red-team walk-ins, alarm drills and system health reports every quarter.' },
    ],
    postures: [
      { k: 'Monitored', p: 'Sensors, optics and remote monitoring with rapid local response. No resident staff. Suited to secondary homes and low-threat profiles.' },
      { k: 'Resident', p: 'Estate agents on site around the clock, a gatehouse or discreet security office, and monitored systems behind them.' },
      { k: 'Fortified', p: 'Resident team, safe room, hardened envelope, layered vehicle mitigation and a protective detail that integrates with the household.' },
    ],
    faq: [
      { q: 'Can security be added without changing how the home looks?', a: 'Almost always. Most of our work is invisible: sensors concealed in landscaping, optics in architectural details and reinforcement hidden behind existing finishes.' },
      { q: 'Do you vet household staff?', a: 'Yes. We screen staff, contractors and recurring vendors with their consent and within local law, and we design access so that trust is matched to role.' },
      { q: 'What happens when an alarm triggers at night?', a: 'The Operations Desk assesses the camera feed within seconds, directs the on-site team, and escalates to local responders when needed, while keeping the family informed through a single channel.' },
      { q: 'Do you work with our architect during a new build?', a: 'We prefer to. Security decided at design stage costs less and looks better than security retrofitted after completion.' },
    ],
    article: 'residential-estate-security-architecture',
  },
  {
    slug: 'secure-transit', short: 'Secure Transit', name: 'Secure Aviation, Maritime & Ground Transit',
    cat: 'movement', catLabel: 'Movement', img: 'service-transit',
    line: 'Every leg of the journey planned twice, from tarmac to tender to terminal.',
    tags: ['Armored mobility', 'FBO security', 'Maritime'],
    title: 'Secure Transit, Aviation & Armored Vehicle Security | Vespera',
    desc: 'Secure aviation, maritime and ground transit: armored and low-profile fleets, FBO tarmac security, cross-border advance logistics and superyacht security.',
    hero: 'Your movement, uncompromised.',
    intro: 'Most risk concentrates in transit: predictable timings, fixed routes and the gaps between one handler and the next. Vespera plans each leg of a journey as a single protective chain, with vetted drivers, aviation and maritime partners and redundant routes that are already rehearsed before anyone needs them.',
    leadTime: '48 hours ideal for international legs', team: 'Drivers, advance agents, aviation liaison', coverage: 'Ground, private aviation, maritime', bestFor: 'Frequent travelers, delegations, yacht owners',
    capabilities: [
      { h: 'Armored and low-profile fleets', p: 'Certified armored vehicles where the threat warrants them, and ordinary local vehicles with protective drivers where blending in is the better defense.' },
      { h: 'FBO and tarmac security', p: 'Coordination with fixed-base operators for tarmac access, aircraft guarding during ground time and discreet transfers planeside.' },
      { h: 'Cross-border advance logistics', p: 'Border timing, local permits, vetted in-country partners and contingency hospitals arranged for every jurisdiction on the itinerary.' },
      { h: 'Maritime and superyacht security', p: 'Crew security training, port and anchorage assessments, tender transfers and onboard protection officers for guest periods.' },
      { h: 'Route redundancy', p: 'Primary, alternate and emergency routes driven in advance, with safe havens and medical facilities plotted along each.' },
      { h: 'Live movement tracking', p: 'The Operations Desk follows every leg in real time, with check-in points and escalation thresholds agreed beforehand.' },
    ],
    timeline: [
      { t: 'T–48h', h: 'Itinerary and jurisdiction review', p: 'Legal, permit and threat considerations for each country, port or airfield.' },
      { t: 'T–24h', h: 'Route and partner confirmation', p: 'Routes driven, partners confirmed, vehicles inspected, FBO and port contacts briefed.' },
      { t: 'Departure', h: 'Handover discipline', p: 'Each transfer is a handover between named people. Nothing is left to an unvetted gap.' },
      { t: 'In transit', h: 'Tracked and supported', p: 'Live tracking with alternates ready. Delays trigger reassessment, not improvisation.' },
      { t: 'Arrival', h: 'Close and debrief', p: 'Clean handover to the receiving detail and a written record of the movement.' },
    ],
    postures: [
      { k: 'Ground', p: 'Protective drivers, advance routes and lead or follow vehicles as required, from a single airport transfer to a multi-city roadshow.' },
      { k: 'Aviation', p: 'FBO coordination, aircraft guarding, tarmac transfers and in-country receiving teams synchronized to wheels-down.' },
      { k: 'Maritime', p: 'Port assessments, tender security, crew training and onboard protection for charter and owner periods.' },
    ],
    faq: [
      { q: 'Do I always need an armored vehicle?', a: 'No. Armor is the right answer for specific threats and regions. In many cities a well-chosen ordinary vehicle with a trained protective driver is safer because it attracts no attention.' },
      { q: 'Can you secure a private aircraft while it is on the ground?', a: 'Yes. We coordinate with the FBO and airport authority to provide aircraft guarding, controlled access and screened catering and baggage during ground time.' },
      { q: 'Do you provide security for yachts?', a: 'Yes. We assess ports and anchorages, train crew, secure tender transfers and place onboard protection officers during guest periods.' },
      { q: 'How do you handle travel across several countries?', a: 'Each jurisdiction gets its own advance, with vetted local partners, permits and medical plans, all tied together by our Operations Desk as one itinerary.' },
    ],
    article: 'international-secure-travel-protocol',
  },
  {
    slug: 'event-protection', short: 'Event Protection', name: 'Private Events, Galas & High-Profile Venues',
    cat: 'personal', catLabel: 'Personal', img: 'service-events',
    line: 'Hospitality and protection designed as one experience for every guest.',
    tags: ['Credentialing', 'Crowd flow', 'VIP ingress'],
    title: 'Private Event Security for Galas, Auctions & Summits | Vespera',
    desc: 'Event protection for private galas, art auctions and summits: credentialing, crowd flow design, VIP ingress and egress, and discreet command posts.',
    hero: 'Protection that guests experience as hospitality.',
    intro: 'A gala, an auction preview or a closed-door summit concentrates valuable people and objects in a single room for a single night. Vespera designs the security of that night alongside the hospitality, so the welcome feels gracious and the controls are firm, often without guests noticing which is which.',
    leadTime: 'Three to eight weeks', team: 'Event lead, credentialing, protection officers', coverage: 'Private venues, museums, residences', bestFor: 'Foundations, auction houses, hosts, summits',
    capabilities: [
      { h: 'Credentialing and guest screening', p: 'Guest lists verified, credentials issued, and screening designed to feel like a concierge welcome rather than a checkpoint.' },
      { h: 'Crowd flow architecture', p: 'Floor plans studied for density, sightlines and evacuation, with movement shaped by furniture, lighting and staff placement.' },
      { h: 'VIP ingress and egress', p: 'Separate arrival routes, holding rooms and departure timing for principals, coordinated with their own protective details.' },
      { h: 'Discreet command post', p: 'A quiet command post with camera feeds, radio net and venue engineering on hand, invisible to guests.' },
      { h: 'Collection and object security', p: 'For auctions and exhibitions: case placement, handler vetting, and object movement plans agreed with conservators and insurers.' },
      { h: 'Media and device policy', p: 'Phone-free events, press zones and photography rules enforced politely and consistently.' },
    ],
    timeline: [
      { t: 'Weeks out', h: 'Venue and guest assessment', p: 'Venue survey, guest profile review and threat assessment shared with the host.' },
      { t: 'Design', h: 'Event security plan', p: 'Zones, credentials, staffing, ingress and egress drawn on the floor plan.' },
      { t: 'Day before', h: 'Sweep and rehearsal', p: 'Venue swept, staff briefed, arrivals rehearsed with the hospitality team.' },
      { t: 'Event', h: 'Command post live', p: 'Every zone held, every principal tracked, every incident handled quietly.' },
      { t: 'After', h: 'Close and report', p: 'Controlled departures, venue handback and a post-event report.' },
    ],
    postures: [
      { k: 'Salon', p: 'Intimate dinners and private views: a handful of officers dressed for the evening, door management and a quiet guest list check.' },
      { k: 'Gala', p: 'Several hundred guests: credentialing, screening, zoned staffing, VIP routing and a full command post.' },
      { k: 'Summit', p: 'Multi-day closed meetings: TSCM sweeps, delegation liaison, transport coordination and strict device and media controls.' },
    ],
    faq: [
      { q: 'Will security make our event feel less welcoming?', a: 'It should do the opposite. We design arrivals with your hospitality team so screening feels like a concierge greeting and officers dress and behave as part of the evening.' },
      { q: 'Can you work alongside guests\' own protection teams?', a: 'Yes. We run a liaison channel for visiting details, share arrival plans and give them holding areas and clear communication with our command post.' },
      { q: 'Do you secure art and objects during auctions or previews?', a: 'Yes. We plan object placement, handler vetting and movement with conservators and insurers, and staff galleries during viewing hours.' },
      { q: 'How early should we engage you for a gala?', a: 'Six to eight weeks is ideal for large events. Smaller private dinners can be planned in a few days.' },
    ],
    article: 'private-event-crowd-and-vip-security',
  },
  {
    slug: 'intelligence-advisory', short: 'Intelligence & Advisory', name: 'Threat Intelligence, Counter-Surveillance & Advisory',
    cat: 'intelligence', catLabel: 'Intelligence', img: 'service-intelligence',
    line: 'Seeing risk early, reducing exposure quietly, and planning for the worst day.',
    tags: ['TSCM sweeps', 'OSINT hardening', 'Crisis continuity'],
    title: 'Threat Intelligence, TSCM & Security Advisory | Vespera Protective',
    desc: 'Threat intelligence and advisory: TSCM electronic sweeps, OSINT digital footprint hardening, geopolitical risk briefings and crisis continuity planning.',
    hero: 'The quietest protection is the threat that never forms.',
    intro: 'Physical protection is strongest when it is informed. Vespera\'s intelligence and advisory desk watches the open-source picture around each principal, sweeps homes, offices and vehicles for surveillance devices, briefs families on the places they travel and writes the plans that hold when something goes wrong.',
    leadTime: 'Same week for most engagements', team: 'Analysts, TSCM specialists, advisors', coverage: 'Global, remote and on site', bestFor: 'Family offices, boards, public figures',
    capabilities: [
      { h: 'TSCM electronic sweeps', p: 'Technical surveillance countermeasures for residences, offices, boardrooms, vehicles and aircraft, using spectrum analysis, non-linear junction detection and physical search.' },
      { h: 'OSINT footprint hardening', p: 'A map of what can be learned about a family online, followed by removal requests, data-broker opt-outs and habits that keep exposure low.' },
      { h: 'Geopolitical risk briefings', p: 'Concise travel and market briefings on the places principals visit, invest or operate, updated as conditions change.' },
      { h: 'Threat assessment and monitoring', p: 'Structured assessment of concerning communications or individuals, with ongoing monitoring and clear escalation thresholds.' },
      { h: 'Crisis continuity planning', p: 'Plans for medical emergencies, kidnap and extortion, natural disasters and evacuation, rehearsed with the family and its advisors.' },
      { h: 'Security program review', p: 'An independent review of existing security teams, systems and vendors against the actual threat picture.' },
    ],
    timeline: [
      { t: 'Scope', h: 'Confidential scoping', p: 'A conversation under NDA to understand the concern, the people involved and the outcome needed.' },
      { t: 'Collect', h: 'Research and sweep', p: 'Open-source research, technical sweeps and interviews conducted with discretion.' },
      { t: 'Assess', h: 'Analysis', p: 'Findings weighed for likelihood and impact, without alarmism.' },
      { t: 'Advise', h: 'Written brief', p: 'A plain-language brief with prioritized recommendations and the cost of each.' },
      { t: 'Sustain', h: 'Monitor and refresh', p: 'Ongoing monitoring and periodic refreshes as circumstances change.' },
    ],
    postures: [
      { k: 'Assessment', p: 'A single engagement: an exposure audit, a sweep, or a threat assessment, delivered as a written brief.' },
      { k: 'Retained desk', p: 'Continuous monitoring of the family\'s digital and physical risk picture, with monthly briefs and on-call analysts.' },
      { k: 'Crisis', p: 'Immediate support during an active incident, coordinated with legal counsel, insurers and law enforcement where appropriate.' },
    ],
    faq: [
      { q: 'What is a TSCM sweep?', a: 'Technical surveillance countermeasures: a systematic search for listening devices, hidden cameras, GPS trackers and compromised networks in a home, office, vehicle or aircraft.' },
      { q: 'Can you remove our family\'s information from the internet?', a: 'We can remove or reduce a great deal of it: data-broker listings, property and address traces and exposed social content. Some public records cannot be removed, and we will say so plainly.' },
      { q: 'Do you provide travel risk briefings?', a: 'Yes. Concise country and city briefings covering security, health, legal and political considerations, tailored to the itinerary and the travelers.' },
      { q: 'Is intelligence work kept confidential?', a: 'All engagements are under NDA, findings are shared only with named recipients and analysts work on a need-to-know basis.' },
    ],
    article: 'digital-footprint-hardening-for-principals',
  },
];

export const CATS = [
  { k: 'all', label: 'All disciplines' },
  { k: 'personal', label: 'Personal' },
  { k: 'property', label: 'Property' },
  { k: 'movement', label: 'Movement' },
  { k: 'intelligence', label: 'Intelligence' },
];

export const TIERS = [
  { tone: 'obsidian', name: 'Assignment', p: 'A defined engagement: a trip, an event, a sweep or an assessment. Planned in days, delivered to a written scope.', pts: ['Single scope and fixed dates', 'Senior lead from briefing to debrief', 'Operations Desk support throughout'] },
  { tone: 'sand', name: 'Programmatic', p: 'A recurring protective program for a principal or family, combining disciplines under one plan and one lead.', pts: ['Dedicated program lead', 'Consistent officers who know the family', 'Quarterly reviews and testing'] },
  { tone: 'slate', name: 'Retained', p: 'A standing relationship with priority response, retained analysts and pre-planned contingencies for the whole household.', pts: ['Priority deployment worldwide', 'Retained intelligence desk', 'Rehearsed crisis continuity plans'] },
];

export const PHASES = [
  { k: 'intelligence', name: 'Intelligence', short: 'Know the picture before anyone moves.', body: 'Every program begins with understanding: who the principal is, what attention they attract, where they are going and what the open-source picture reveals. Analysts brief the field team so decisions in the moment are informed, not guessed.', pts: ['Principal and family exposure profile', 'Itinerary and venue threat review', 'Open-source and social monitoring', 'Jurisdiction, legal and medical considerations'] },
  { k: 'advance', name: 'Advance', short: 'Walk every step before the principal does.', body: 'Advance agents travel ahead to drive routes at the hour they will be used, walk venues, meet hotel and venue security, identify safe rooms and plot the nearest trauma centers. Nothing is assumed from a map.', pts: ['Primary, alternate and emergency routes', 'Venue surveys and safe-room selection', 'Partner and local liaison', 'Emergency action plans rehearsed on site'] },
  { k: 'presence', name: 'Presence', short: 'Close, calm and largely unnoticed.', body: 'On the day, officers hold a posture matched to the threat and to the principal\'s life. They are trained to de-escalate, to move people early and quietly, and to treat discretion as part of the protection rather than an afterthought.', pts: ['Posture set by threat, not habit', 'Protective drivers and vehicles', 'Live tracking by the Operations Desk', 'Medical readiness on every detail'] },
  { k: 'continuity', name: 'Continuity', short: 'Plan for the worst day, then rehearse it.', body: 'Programs are reviewed after every movement and tested every quarter. Crisis plans for medical emergencies, evacuation and extortion are written with the family\'s advisors and practiced, so a bad day becomes a managed one.', pts: ['Written debrief after every operation', 'Quarterly testing and red-team walk-ins', 'Crisis and evacuation plans', 'Insurer and counsel coordination'] },
];

export const SECTORS = [
  { k: 'family', tone: 'sand', name: 'Family offices & UHNW families', p: 'Protection for every generation, coordinated with the family office: school runs, residences, travel and the digital exposure that connects them.', pts: ['Family protection officers', 'Estate and seasonal homes', 'Digital footprint hardening'] },
  { k: 'corporate', tone: 'obsidian', name: 'Corporate executives & boards', p: 'Executive protection, board meeting security and roadshow travel that keeps leaders focused, with reporting suitable for audit and governance committees.', pts: ['Executive protection', 'Boardroom TSCM sweeps', 'Roadshow and AGM security'] },
  { k: 'dignitaries', tone: 'slate', name: 'Visiting dignitaries & delegations', p: 'Receiving teams for delegations and senior officials, coordinated with protocol offices and local authorities.', pts: ['Delegation liaison', 'Motorcade planning', 'Venue and hotel advance'] },
  { k: 'collections', tone: 'crimson', name: 'Art, luxury collections & auctions', p: 'Security for collections in residence and in motion: previews, auctions, loans and private viewings, planned with conservators and insurers.', pts: ['Object movement plans', 'Gallery and preview staffing', 'Handler vetting'] },
  { k: 'public', tone: 'cobalt', name: 'Public figures & talent', p: 'Protection for people whose recognition is the risk: appearances, tours, fixated-person management and homes that must stay private.', pts: ['Appearance and tour security', 'Threat assessment', 'Residential privacy'] },
];

export const HOME_FAQ = [
  { q: 'What does Vespera Protective do?', a: 'We provide discreet private security for individuals, families and organizations: executive protection, residential and estate security, secure transit, private event protection, and threat intelligence and advisory, planned as a single program.' },
  { q: 'Where do you operate?', a: 'Our hubs are in New York, London and Geneva, and our Operations Desk supports assignments worldwide through vetted in-country partners.' },
  { q: 'How quickly can you deploy?', a: 'For urgent needs we can deploy within twelve hours in most major cities. For planned work we prefer a seventy-two hour advance, which is our standard.' },
  { q: 'How do you keep engagements confidential?', a: 'Every engagement is under NDA, principals are referred to by codename internally, and information is shared only with the people who need it to protect you.' },
  { q: 'How does a first conversation work?', a: 'Request a private briefing. A senior lead will contact you through the channel you choose, listen to the situation and outline options. There is no obligation and nothing is shared.' },
];

export const BRIEF_CATS = ['Protection', 'Architecture', 'Intelligence', 'Transit', 'Advisory'];
