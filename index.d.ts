declare module "src/data/normalizeLocale" {
    export = normalizeLocale;
    /**
     * Given a locale string from an operating system or process env, normalize the name
     * @param {String} name  A name such as fr_FR, en-US, en-us.utf-8
     * @returns {String}
     * @see https://github.com/sindresorhus/os-locale/blob/main/index.js for similar code
     */
    function normalizeLocale(name: string): string;
}
declare module "src/data/defaultLocale" {
    const _exports: string;
    export = _exports;
}
declare module "src/data/twoDigitYears" {
    export = twoDigitYears;
    const twoDigitYears: {};
}
declare module "src/data/timezoneNames" {
    export = timezoneNames;
    const timezoneNames: {
        'Eastern Daylight Time': number;
        'Eastern Standard Time': number;
        'Central Daylight Time': number;
        'Central Standard Time': number;
        'Mountain Daylight Time': number;
        'Mountain Standard Time': number;
        'Pacific Daylight Time': number;
        'Pacific Standard Time': number;
        ACDT: number;
        ACST: number;
        ACT: number;
        ADT: number;
        AEDT: number;
        AEST: number;
        AFT: number;
        AKDT: number;
        AKST: number;
        AMST: number;
        AMT: number;
        ART: number;
        AST: number;
        AWDT: number;
        AWST: number;
        AZOST: number;
        AZT: number;
        BDT: number;
        BIOT: number;
        BIT: number;
        BOT: number;
        BRST: number;
        BRT: number;
        BTT: number;
        CAT: number;
        CCT: number;
        CDT: number;
        CEDT: number;
        CEST: number;
        CET: number;
        CHADT: number;
        CHAST: number;
        CHOT: number;
        ChST: number;
        CHUT: number;
        CIST: number;
        CIT: number;
        CKT: number;
        CLST: number;
        CLT: number;
        COST: number;
        COT: number;
        CST: number;
        CT: number;
        CVT: number;
        CXT: number;
        DAVT: number;
        DDUT: number;
        DFT: number;
        EASST: number;
        EAST: number;
        EAT: number;
        ECT: number;
        EDT: number;
        EEDT: number;
        EEST: number;
        EET: number;
        EGST: number;
        EGT: number;
        EIT: number;
        EST: number;
        FET: number;
        FJT: number;
        FKST: number;
        FKT: number;
        FNT: number;
        GALT: number;
        GAMT: number;
        GET: number;
        GFT: number;
        GILT: number;
        GIT: number;
        GMT: number;
        GST: number;
        GYT: number;
        HADT: number;
        HAEC: number;
        HAST: number;
        HKT: number;
        HMT: number;
        HOVT: number;
        HST: number;
        IBST: number;
        ICT: number;
        IDT: number;
        IOT: number;
        IRDT: number;
        IRKT: number;
        IRST: number;
        IST: number;
        JST: number;
        KGT: number;
        KOST: number;
        KRAT: number;
        KST: number;
        LHST: number;
        LINT: number;
        MAGT: number;
        MART: number;
        MAWT: number;
        MDT: number;
        MET: number;
        MEST: number;
        MHT: number;
        MIST: number;
        MIT: number;
        MMT: number;
        MSK: number;
        MST: number;
        MUT: number;
        MVT: number;
        MYT: number;
        NCT: number;
        NDT: number;
        NFT: number;
        NPT: number;
        NST: number;
        NT: number;
        NUT: number;
        NZDT: number;
        NZST: number;
        OMST: number;
        ORAT: number;
        PDT: number;
        PET: number;
        PETT: number;
        PGT: number;
        PHOT: number;
        PKT: number;
        PMDT: number;
        PMST: number;
        PONT: number;
        PST: number;
        PYST: number;
        PYT: number;
        RET: number;
        ROTT: number;
        SAKT: number;
        SAMT: number;
        SAST: number;
        SBT: number;
        SCT: number;
        SGT: number;
        SLST: number;
        SRET: number;
        SRT: number;
        SST: number;
        SYOT: number;
        TAHT: number;
        THA: number;
        TFT: number;
        TJT: number;
        TKT: number;
        TLT: number;
        TMT: number;
        TOT: number;
        TVT: number;
        UCT: number;
        ULAT: number;
        USZ1: number;
        UTC: number;
        UYST: number;
        UYT: number;
        UZT: number;
        VET: number;
        VLAT: number;
        VOLT: number;
        VOST: number;
        VUT: number;
        WAKT: number;
        WAST: number;
        WAT: number;
        WEDT: number;
        WEST: number;
        WET: number;
        WIT: number;
        WST: number;
        YAKT: number;
        YEKT: number;
        Z: number;
    };
}
declare module "src/data/baseLookups" {
    import timezoneNames = require("src/data/timezoneNames");
    import twoDigitYears = require("src/data/twoDigitYears");
    export const meridiem: {
        am: number;
        pm: number;
        'a.m.': number;
        'p.m.': number;
    };
    export namespace month {
        const january: number;
        const jan: number;
        const february: number;
        const feb: number;
        const march: number;
        const mar: number;
        const april: number;
        const apr: number;
        const may: number;
        const june: number;
        const jun: number;
        const july: number;
        const jul: number;
        const august: number;
        const aug: number;
        const september: number;
        const sep: number;
        const october: number;
        const oct: number;
        const november: number;
        const nov: number;
        const december: number;
        const dec: number;
    }
    export namespace dayname {
        const sunday: number;
        const sun: number;
        const monday: number;
        const mon: number;
        const tuesday: number;
        const tue: number;
        const wednesday: number;
        const wed: number;
        const thursday: number;
        const thu: number;
        const friday: number;
        const fri: number;
        const saturday: number;
        const sat: number;
    }
    export const digit: {};
    export { timezoneNames as zone, twoDigitYears as year };
}
declare module "src/data/templates" {
    export namespace latn {
        const MONTHNAME: string;
        const DAYNAME: string;
        const ZONE: string;
        const MERIDIEM: string;
        const ORDINAL: string;
        const YEAR: string;
        const MONTH: string;
        const MONTH2: string;
        const DAY: string;
        const DAY2: string;
        const OFFSET: string;
        const H24: string;
        const H12: string;
        const MIN: string;
        const SEC: string;
        const MS: string;
        const SPACE: string;
    }
    export namespace other {
        const YEAR_1: string;
        export { YEAR_1 as YEAR };
        const MONTH_1: string;
        export { MONTH_1 as MONTH };
        const MONTH2_1: string;
        export { MONTH2_1 as MONTH2 };
        const DAY_1: string;
        export { DAY_1 as DAY };
        const DAY2_1: string;
        export { DAY2_1 as DAY2 };
        const OFFSET_1: string;
        export { OFFSET_1 as OFFSET };
        const H24_1: string;
        export { H24_1 as H24 };
        const H12_1: string;
        export { H12_1 as H12 };
        const MIN_1: string;
        export { MIN_1 as MIN };
        const SEC_1: string;
        export { SEC_1 as SEC };
        const MS_1: string;
        export { MS_1 as MS };
    }
}
declare module "src/data/numberingSystems" {
    export const chineseGroup: "[０１２３４５６７８９〇一二三四五六七八九\\d]";
    export const defaultLookup: {
        0: number;
        1: number;
        2: number;
        3: number;
        4: number;
        5: number;
        6: number;
        7: number;
        8: number;
        9: number;
        '\uFF10': number;
        '\uFF11': number;
        '\uFF12': number;
        '\uFF13': number;
        '\uFF14': number;
        '\uFF15': number;
        '\uFF16': number;
        '\uFF17': number;
        '\uFF18': number;
        '\uFF19': number;
        〇: number;
        一: number;
        二: number;
        三: number;
        四: number;
        五: number;
        六: number;
        七: number;
        八: number;
        九: number;
    };
    export namespace startCodes {
        const arab: number;
        const arabext: number;
        const bali: number;
        const beng: number;
        const deva: number;
        const fullwide: number;
        const gujr: number;
        const khmr: number;
        const knda: number;
        const laoo: number;
        const limb: number;
        const mlym: number;
        const mong: number;
        const mymr: number;
        const orya: number;
        const tamldec: number;
        const telu: number;
        const thai: number;
        const tibt: number;
    }
    export function buildDigits(nsName: any): any;
}
declare module "src/data/units" {
    export = units;
    const units: string[];
}
declare module "src/LocaleHelper/LocaleHelper" {
    export = LocaleHelper;
    class LocaleHelper {
        /**
         * Get a singleton instance with the given locale
         * @param {String} locale such as en, en-US, es, fr-FR, etc.
         * @returns {LocaleHelper}
         */
        static factory(locale?: string): LocaleHelper;
        /**
         * Create a new instance with the given locale
         * @param {String} locale such as en, en-US, es, fr-FR, etc.
         */
        constructor(locale?: string);
        /**
         * The locale string
         * @type {String}
         */
        locale: string;
        /**
         * Lookups for zone, year, meridiem, month, dayname, digit
         * @type {Object} lookups
         */
        lookups: any;
        /**
         * Template variables including MONTHNAME, MONTH, ZONE, etc.
         * @type {Object} vars
         */
        vars: any;
        /**
         * The numbering system to use (latn=standard arabic digits)
         * @type {String} numberingSystem
         */
        numberingSystem: string;
        /**
         * Cast a string to an integer, minding numbering system
         * @param {String|Number} digitString  Such as "2020" or "二〇二〇"
         * @returns {Number}
         */
        toInt(digitString: string | number): number;
        /**
         * Build lookups for digits, month names, day names, and meridiems based on the locale
         */
        build(): void;
        /**
         * Build lookups for digits
         */
        buildNumbers(): void;
        /**
         * Build lookup for month names
         */
        buildMonthNames(): void;
        /**
         * Build lookup for day name
         */
        buildDaynames(): void;
        /**
         * Build lookup for meridiems (e.g. AM/PM)
         */
        buildMeridiems(): void;
        /**
         * Given a list of unit names and matches, build result object
         * @param {Array} units  Unit names such as "year", "month" and "millisecond"
         * @param {Array} matches  The values matched by a Format's RegExp
         * @returns {Object}
         */
        getObject(units: any[], matches: any[]): any;
        /**
         * Take a response object and cast each unit to Number
         * @param {Object} object  An object with one or more units
         * @returns {Object}  An object with same units but Numeric
         */
        castObject(object: any): any;
        /**
         * Convert an offset string to Numeric minutes (e.g. "-0500", "+5", "+03:30")
         * @param {String} offsetString
         * @returns {Number}
         */
        offsetToMinutes(offsetString: string): number;
        /**
         * Compile template into a RegExp and return it
         * @param {String} template  The template string
         * @returns {RegExp}
         */
        compile(template: string): RegExp;
    }
}
declare module "src/Format/Format" {
    export = Format;
    /**
     * Represents a parsable date format
     */
    class Format {
        /**
         * Given a definition, create a parsable format
         * @param {Object} definition  The format definition
         * @property {String} template  A template for RegExp that can handle multiple languages
         * @property {RegExp} matcher  An actual RegExp to match against
         * @property {Array} units  If the template or RegExp match exact units, you can define the units
         * @property {Function} handler  A flexible alternative to units; must return an object
         * @property {Array} locales  A list of locales that this format should be restricted to
         */
        constructor({ template, matcher, units, handler, locales, }: any);
        /**
         * @type {String} template  A template for RegExp that can handle multiple languages
         */
        template: string;
        /**
         * @type {Array} units  If the template or RegExp match exact units, you can define the units
         */
        units: any[];
        /**
         * @type {RegExp} matcher  An actual RegExp to match against
         */
        matcher: RegExp;
        /**
         * @type {Function} handler  A flexible alternative to units; must return an object
         */
        handler: Function;
        /**
         * @type {String[]} locales  A list of locales that this format should be restricted to
         */
        locales: string[];
        /**
         * A cache of RegExp indexed by locale name
         * @type {Object}
         */
        regexByLocale: any;
        /**
         * Build the RegExp from the template for a given locale
         * @param {String} locale  The language locale such as en-US, pt-BR, zh, es, etc.
         * @returns {RegExp}  A RegExp that matches when this format is recognized
         */
        getRegExp(locale?: string): RegExp;
        /**
         * Run this format's RegExp against the given string
         * @param {String} string  The date string
         * @param {String} locale  The language locale such as en-US, pt-BR, zh, es, etc.
         * @returns {Array|null}  Array of matches or null on non-match
         */
        getMatches(string: string, locale?: string): any[] | null;
        /**
         * Given matches against this RegExp, convert to object
         * @param {String[]} matches  An array of matched parts
         * @param {String} locale  The language locale such as en-US, pt-BR, zh, es, etc.
         * @returns {Object}  Object which may contain year, month, day, hour, minute, second, millisecond, offset, invalid
         */
        toDateTime(matches: string[], locale?: string): any;
        /**
         * Attempt to parse a string in this format
         * @param {String} string  The date string
         * @param {String} locale  The language locale such as en-US, pt-BR, zh, es, etc.
         * @returns {Object|null}  Null if format can't handle this string, Object for result or error
         */
        attempt(string: string, locale?: string): any | null;
        /**
         * Return the current date (used to support unit testing)
         * @returns {Date}
         */
        now(): Date;
    }
}
declare module "src/fromString/fromString" {
    export = fromString;
    function fromString(parser: any, defaultLocale: any): (string: any, locale?: any) => any;
}
declare module "src/fromAny/fromAny" {
    export = fromAny;
    function fromAny(fromString: any): (any: any, locale: any) => any;
}
declare module "src/Parser/Parser" {
    export = Parser;
    class Parser {
        formats: any[];
        /**
         * Register a format object representing a parseable date format
         * @param {Format} format  The Format to add
         * @returns {Parser}
         * @chainable
         */
        addFormat(format: Format): Parser;
        /**
         * Register multiple formats
         * @param {Format[]} formats  The array of Formats to add
         * @returns {Parser}
         * @chainable
         */
        addFormats(formats: Format[]): Parser;
        /**
         * Unregister a format
         * @param {Format} format  The Format to remove
         * @returns {Boolean}  true if format was found and removed, false if it wasn't registered
         */
        removeFormat(format: Format): boolean;
        /**
         * Attempt to parse a date string
         * @param {String} date  A parseable date string
         * @param {String} locale  The name of the locale
         * @returns {Object}
         */
        attempt(date: string, locale?: string): any;
        /**
         * Export this parser as a single function that takes a string
         * @param {String} locale  The default locale it should use
         * @returns {Function}
         */
        exportAsFunction(locale?: string): Function;
        /**
         * Export this parser as a single function that takes a string or Date
         * @param {String} locale  The default locale it should use
         * @returns {Function}
         */
        exportAsFunctionAny(locale?: string): Function;
    }
    import Format = require("src/Format/Format");
}
declare module "src/formats/atSeconds/atSeconds" {
    export = atSeconds;
    const atSeconds: Format;
    import Format = require("src/Format/Format");
}
declare module "src/formats/microsoftJson/microsoftJson" {
    export = microsoftJson;
    const microsoftJson: Format;
    import Format = require("src/Format/Format");
}
declare module "src/data/unitShortcuts" {
    export const y: string;
    export const M: string;
    export const d: string;
    export const w: string;
    export const h: string;
    export const m: string;
    export const s: string;
    export const ms: string;
}
declare module "src/formats/ago/ago" {
    export = ago;
    const ago: Format;
    import Format = require("src/Format/Format");
}
declare module "src/formats/chinese/chinese" {
    export = chinese;
    const chinese: Format;
    import Format = require("src/Format/Format");
}
declare module "src/formats/dayMonth/dayMonth" {
    export = dayMonth;
    const dayMonth: Format;
    import Format = require("src/Format/Format");
}
declare module "src/formats/dayMonthname/dayMonthname" {
    export = dayMonthname;
    const dayMonthname: Format;
    import Format = require("src/Format/Format");
}
declare module "src/formats/dayMonthnameYear/dayMonthnameYear" {
    export = dayMonthnameYear;
    const dayMonthnameYear: Format;
    import Format = require("src/Format/Format");
}
declare module "src/formats/dayMonthYear/dayMonthYear" {
    export = dayMonthYear;
    const dayMonthYear: Format;
    import Format = require("src/Format/Format");
}
declare module "src/formats/monthDay/monthDay" {
    export = monthDay;
    const monthDay: Format;
    import Format = require("src/Format/Format");
}
declare module "src/formats/monthDayYear/monthDayYear" {
    export = monthDayYear;
    const monthDayYear: Format;
    import Format = require("src/Format/Format");
}
declare module "src/formats/monthnameDay/monthnameDay" {
    export = monthnameDay;
    const monthnameDay: Format;
    import Format = require("src/Format/Format");
}
declare module "src/formats/monthnameDayYear/monthnameDayYear" {
    export = monthnameDayYear;
    const monthnameDayYear: Format;
    import Format = require("src/Format/Format");
}
declare module "src/formats/time12Hours/time12Hours" {
    export = time12Hours;
    const time12Hours: Format;
    import Format = require("src/Format/Format");
}
declare module "src/formats/time24Hours/time24Hours" {
    export = time24Hours;
    const time24Hours: Format;
    import Format = require("src/Format/Format");
}
declare module "src/formats/today/today" {
    export = today;
    const today: Format;
    import Format = require("src/Format/Format");
}
declare module "src/formats/twitter/twitter" {
    export = twitter;
    const twitter: Format;
    import Format = require("src/Format/Format");
}
declare module "src/formats/yearMonthDay/yearMonthDay" {
    export = yearMonthDay;
    const yearMonthDay: Format;
    import Format = require("src/Format/Format");
}
declare module "index" {
    export = parser;
    const parser: Parser;
    import Parser = require("src/Parser/Parser");
}
