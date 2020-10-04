// some hand-picked common timezone names
const timezoneNames = {
	'Eastern Daylight Time': -240,
	'Eastern Standard Time': -300,
	'Central Daylight Time': -300,
	'Central Standard Time': -360,
	'Mountain Daylight Time': -360,
	'Mountain Standard Time': -420,
	'Pacific Daylight Time': -420,
	'Pacific Standard Time': -480,
	ACDT: 630, // Australian Central Daylight Savings Time
	ACST: 570, // Australian Central Standard Time
	ACT: 480, // ASEAN Common Time
	ADT: -180, // Atlantic Daylight Time
	AEDT: 660, // Australian Eastern Daylight Savings Time
	AEST: 600, // Australian Eastern Standard Time
	AFT: 270, // Afghanistan Time
	AKDT: -480, // Alaska Daylight Time
	AKST: -540, // Alaska Standard Time
	AMST: -180, // Amazon Summer Time (Brazil)
	AMT: -240, // Amazon Time (Brazil)
	ART: -180, // Argentina Time
	AST: 180, // Arabia Standard Time
	AWDT: 540, // Australian Western Daylight Time
	AWST: 480, // Australian Western Standard Time
	AZOST: -60, // Azores Standard Time
	AZT: 240, // Azerbaijan Time
	BDT: 360, // Bangladesh Daylight Time (Bangladesh Daylight saving time keeps UTC+06 offset)
	BIOT: 360, // British Indian Ocean Time
	BIT: -720, // Baker Island Time
	BOT: -240, // Bolivia Time
	BRST: -120, // Brasilia Summer Time
	BRT: -180, // Brasilia Time
	BTT: 360, // Bhutan Time
	CAT: 120, // Central Africa Time
	CCT: 390, // Cocos Islands Time
	CDT: -300, // Central Daylight Time (North America)
	CEDT: 120, // Central European Daylight Time
	CEST: 120, // Central European Summer Time (Cf. HAEC)
	CET: 60, // Central European Time
	CHADT: 825, // Chatham Daylight Time
	CHAST: 765, // Chatham Standard Time
	CHOT: 480, // Choibalsan
	ChST: 600, // Chamorro Standard Time
	CHUT: 600, // Chuuk Time
	CIST: -480, // Clipperton Island Standard Time
	CIT: 480, // Central Indonesia Time
	CKT: -600, // Cook Island Time
	CLST: -180, // Chile Summer Time
	CLT: -240, // Chile Standard Time
	COST: -240, // Colombia Summer Time
	COT: -300, // Colombia Time
	CST: -360, // Central Standard Time (North America)
	CT: 480, // China time
	CVT: -60, // Cape Verde Time
	CXT: 420, // Christmas Island Time
	DAVT: 420, // Davis Time
	DDUT: 600, // Dumont d'Urville Time
	DFT: 60, // AIX specific equivalent of Central European Time
	EASST: -300, // Easter Island Standard Summer Time
	EAST: -360, // Easter Island Standard Time
	EAT: 180, // East Africa Time
	ECT: -300, // Ecuador Time
	EDT: -240, // Eastern Daylight Time (North America)
	EEDT: 180, // Eastern European Daylight Time
	EEST: 180, // Eastern European Summer Time
	EET: 120, // Eastern European Time
	EGST: 0, // Eastern Greenland Summer Time
	EGT: -60, // Eastern Greenland Time
	EIT: 540, // Eastern Indonesian Time
	EST: -300, // Eastern Standard Time (North America)
	FET: 180, // Further-eastern European Time
	FJT: 720, // Fiji Time
	FKST: -180, // Falkland Islands Standard Time
	FKT: -240, // Falkland Islands Time
	FNT: -120, // Fernando de Noronha Time
	GALT: -360, // Galapagos Time
	GAMT: -540, // Gambier Islands
	GET: 240, // Georgia Standard Time
	GFT: -180, // French Guiana Time
	GILT: 720, // Gilbert Island Time
	GIT: -540, // Gambier Island Time
	GMT: 0, // Greenwich Mean Time
	GST: -120, // South Georgia and the South Sandwich Islands
	GYT: -240, // Guyana Time
	HADT: -540, // Hawaii-Aleutian Daylight Time
	HAEC: 120, // Heure Avancée d'Europe Centrale francised name for CEST
	HAST: -600, // Hawaii-Aleutian Standard Time
	HKT: 480, // Hong Kong Time
	HMT: 300, // Heard and McDonald Islands Time
	HOVT: 420, // Khovd Time
	HST: -600, // Hawaii Standard Time
	IBST: 0, // International Business Standard Time
	ICT: 420, // Indochina Time
	IDT: 180, // Israel Daylight Time
	IOT: 180, // Indian Ocean Time
	IRDT: 270, // Iran Daylight Time
	IRKT: 480, // Irkutsk Time
	IRST: 210, // Iran Standard Time
	IST: 120, // Israel Standard Time
	JST: 540, // Japan Standard Time
	KGT: 360, // Kyrgyzstan time
	KOST: 660, // Kosrae Time
	KRAT: 420, // Krasnoyarsk Time
	KST: 540, // Korea Standard Time
	LHST: 630, // Lord Howe Standard Time
	LINT: 840, // Line Islands Time
	MAGT: 720, // Magadan Time
	MART: -510, // Marquesas Islands Time
	MAWT: 300, // Mawson Station Time
	MDT: -360, // Mountain Daylight Time (North America)
	MET: 60, // Middle European Time Same zone as CET
	MEST: 120, // Middle European Summer Time Same zone as CEST
	MHT: 720, // Marshall Islands
	MIST: 660, // Macquarie Island Station Time
	MIT: -510, // Marquesas Islands Time
	MMT: 390, // Myanmar Time
	MSK: 180, // Moscow Time
	MST: -420, // Mountain Standard Time (North America)
	MUT: 240, // Mauritius Time
	MVT: 300, // Maldives Time
	MYT: 480, // Malaysia Time
	NCT: 660, // New Caledonia Time
	NDT: -90, // Newfoundland Daylight Time
	NFT: 660, // Norfolk Time
	NPT: 345, // Nepal Time
	NST: -150, // Newfoundland Standard Time
	NT: -150, // Newfoundland Time
	NUT: -660, // Niue Time
	NZDT: 780, // New Zealand Daylight Time
	NZST: 720, // New Zealand Standard Time
	OMST: 360, // Omsk Time
	ORAT: 300, // Oral Time
	PDT: -420, // Pacific Daylight Time (North America)
	PET: -300, // Peru Time
	PETT: 720, // Kamchatka Time
	PGT: 600, // Papua New Guinea Time
	PHOT: 780, // Phoenix Island Time
	PKT: 300, // Pakistan Standard Time
	PMDT: -120, // Saint Pierre and Miquelon Daylight time
	PMST: -180, // Saint Pierre and Miquelon Standard Time
	PONT: 660, // Pohnpei Standard Time
	PST: -480, // Pacific Standard Time (North America)
	PYST: -180, // Paraguay Summer Time (South America)
	PYT: -240, // Paraguay Time (South America)
	RET: 240, // Réunion Time
	ROTT: -180, // Rothera Research Station Time
	SAKT: 660, // Sakhalin Island time
	SAMT: 240, // Samara Time
	SAST: 120, // South African Standard Time
	SBT: 660, // Solomon Islands Time
	SCT: 240, // Seychelles Time
	SGT: 480, // Singapore Time
	SLST: 330, // Sri Lanka Standard Time
	SRET: 660, // Srednekolymsk Time
	SRT: -180, // Suriname Time
	SST: 480, // Singapore Standard Time
	SYOT: 180, // Showa Station Time
	TAHT: -600, // Tahiti Time
	THA: 420, // Thailand Standard Time
	TFT: 300, // Indian/Kerguelen
	TJT: 300, // Tajikistan Time
	TKT: 780, // Tokelau Time
	TLT: 540, // Timor Leste Time
	TMT: 300, // Turkmenistan Time
	TOT: 780, // Tonga Time
	TVT: 720, // Tuvalu Time
	UCT: 0, // Coordinated Universal Time
	ULAT: 480, // Ulaanbaatar Time
	USZ1: 120, // Kaliningrad Time
	UTC: 0, // Coordinated Universal Time
	UYST: -120, // Uruguay Summer Time
	UYT: -180, // Uruguay Standard Time
	UZT: 300, // Uzbekistan Time
	VET: -240, // Venezuelan Standard Time
	VLAT: 600, // Vladivostok Time
	VOLT: 240, // Volgograd Time
	VOST: 360, // Vostok Station Time
	VUT: 660, // Vanuatu Time
	WAKT: 720, // Wake Island Time
	WAST: 120, // West Africa Summer Time
	WAT: 60, // West Africa Time
	WEDT: 60, // Western European Daylight Time
	WEST: 60, // Western European Summer Time
	WET: 0, // Western European Time
	WIT: 420, // Western Indonesian Time
	WST: 480, // Western Standard Time
	YAKT: 540, // Yakutsk Time
	YEKT: 300, // Yekaterinburg Time
	Z: 0, // Zulu Time (Coordinated Universal Time)
};

module.exports = timezoneNames;
