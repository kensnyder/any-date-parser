import { describe, expect, it } from 'vitest';
import LocaleHelper from './LocaleHelper';

describe('LocaleHelper general', () => {
  it('should use singleton pattern', () => {
    const l1 = LocaleHelper.factory('en');
    const l2 = LocaleHelper.factory('en');
    expect(l1).toBe(l2);
  });
  it('should use singleton pattern (case insensitive)', () => {
    const l1 = LocaleHelper.factory('en');
    const l2 = LocaleHelper.factory('En');
    expect(l1).toBe(l2);
  });
  it('should factory default to system default', () => {
    const l1 = LocaleHelper.factory();
    expect(l1.locale).toBeTruthy();
  });
  it('should instance default to system default', () => {
    const l1 = new LocaleHelper();
    expect(l1.locale).toBeTruthy();
  });
  it('should store locale name', () => {
    const l = new LocaleHelper('en-GB');
    expect(l.locale).toBe('en-GB');
  });
  it('should error on bad templates', () => {
    const l = new LocaleHelper('ar');
    function invalidFoobar() {
      return l.compile('_FOOBAR_');
    }
    expect(invalidFoobar).toThrowError(
      'Template string contains invalid variable _FOOBAR_'
    );
  });
});

describe('LocaleHelper zoneToOffset', () => {
  it('should handle short name "AKDT"', () => {
    const l = new LocaleHelper('en');
    expect(l.zoneToOffset('AKDT')).toBe(-480);
  });
  it('should handle long name "Pacific Daylight Time"', () => {
    const l = new LocaleHelper('en');
    expect(l.zoneToOffset('Pacific Daylight Time')).toBe(-420);
  });
  it('should handle long name with parens "(Mountain Daylight Time)"', () => {
    const l = new LocaleHelper('en');
    expect(l.zoneToOffset('(Mountain Daylight Time)')).toBe(-360);
  });
});

describe('LocaleHelper offsetToMinutes', () => {
  it('should handle naked offsets', () => {
    const l = new LocaleHelper('en');
    expect(l.offsetToMinutes('+0500')).toBe(300);
  });
  it('should handle colon-separated offsets', () => {
    const l = new LocaleHelper('en');
    expect(l.offsetToMinutes('-04:00')).toBe(-240);
  });
  it('should handle U+2212 minus signs', () => {
    const l = new LocaleHelper('en');
    expect(l.offsetToMinutes('−03:00')).toBe(-180);
  });
  it('should handle U+00B1 plus/minus sign', () => {
    const l = new LocaleHelper('en');
    expect(l.offsetToMinutes('±02:00')).toBe(120);
  });
  it('should handle GMT shorthand', () => {
    const l = new LocaleHelper('en');
    expect(l.offsetToMinutes('GMT-5')).toBe(-300);
  });
  it('should handle GMT longhand', () => {
    const l = new LocaleHelper('en');
    expect(l.offsetToMinutes('GMT-01:00')).toBe(-60);
  });
  it('should handle invalid offsets', () => {
    const l = new LocaleHelper('en');
    expect(l.offsetToMinutes('foo')).toEqual(0);
  });
});

describe('LocaleHelper numbering systems', () => {
  it('should cast digit string to number (latn)', () => {
    const l = new LocaleHelper('en');
    expect(l.toInt('1234567890')).toBe(1234567890);
  });
  it('should cast digit string to number (invalid)', () => {
    const l = new LocaleHelper('en-u-nu-invalid');
    expect(l.toInt('1234567890')).toBe(1234567890);
  });
  it('should cast digit string to number (arab)', () => {
    const l = new LocaleHelper('en-u-nu-arab');
    expect(l.toInt('١٢٣٤٥٦٧٨٩٠')).toBe(1234567890);
  });
  it('should cast digit string to number (arabext)', () => {
    const l = new LocaleHelper('en-u-nu-arabext');
    expect(l.toInt('۱۲۳۴۵۶۷۸۹۰')).toBe(1234567890);
  });
  it('should cast digit string to number (bali)', () => {
    const l = new LocaleHelper('en-u-nu-bali');
    expect(l.toInt('᭑᭒᭓᭔᭕᭖᭗᭘᭙᭐')).toBe(1234567890);
  });
  it('should cast digit string to number (beng)', () => {
    const l = new LocaleHelper('en-u-nu-beng');
    expect(l.toInt('১২৩৪৫৬৭৮৯০')).toBe(1234567890);
  });
  it('should cast digit string to number (deva)', () => {
    const l = new LocaleHelper('en-u-nu-deva');
    expect(l.toInt('१२३४५६७८९०')).toBe(1234567890);
  });
  it('should cast digit string to number (fullwide)', () => {
    const l = new LocaleHelper('en-u-nu-fullwide');
    expect(l.toInt('１２３４５６７８９０')).toBe(1234567890);
    expect(l.toInt('一二三四五六七八九〇')).toBe(1234567890);
    expect(l.toInt('1234567890')).toBe(1234567890);
  });
  it('should cast digit string to number (gujr)', () => {
    const l = new LocaleHelper('en-u-nu-gujr');
    expect(l.toInt('૧૨૩૪૫૬૭૮૯૦')).toBe(1234567890);
  });
  it('should cast digit string to number (hanidec)', () => {
    const l = new LocaleHelper('en-u-nu-hanidec');
    expect(l.toInt('１２３４５６７８９０')).toBe(1234567890);
    expect(l.toInt('一二三四五六七八九〇')).toBe(1234567890);
    expect(l.toInt('1234567890')).toBe(1234567890);
  });
  it('should cast digit string to number (khmr)', () => {
    const l = new LocaleHelper('en-u-nu-khmr');
    expect(l.toInt('១២៣៤៥៦៧៨៩០')).toBe(1234567890);
  });
  it('should cast digit string to number (knda)', () => {
    const l = new LocaleHelper('en-u-nu-knda');
    expect(l.toInt('೧೨೩೪೫೬೭೮೯೦')).toBe(1234567890);
  });
  it('should cast digit string to number (laoo)', () => {
    const l = new LocaleHelper('en-u-nu-laoo');
    expect(l.toInt('໑໒໓໔໕໖໗໘໙໐')).toBe(1234567890);
  });
  it('should cast digit string to number (limb)', () => {
    const l = new LocaleHelper('en-u-nu-limb');
    expect(l.toInt('᥇᥈᥉᥊᥋᥌᥍᥎᥏᥆')).toBe(1234567890);
  });
  it('should cast digit string to number (mlym)', () => {
    const l = new LocaleHelper('en-u-nu-mlym');
    expect(l.toInt('൧൨൩൪൫൬൭൮൯൦')).toBe(1234567890);
  });
  it('should cast digit string to number (mong)', () => {
    const l = new LocaleHelper('en-u-nu-mong');
    expect(l.toInt('᠑᠒᠓᠔᠕᠖᠗᠘᠙᠐')).toBe(1234567890);
  });
  it('should cast digit string to number (mymr)', () => {
    const l = new LocaleHelper('en-u-nu-mymr');
    expect(l.toInt('၁၂၃၄၅၆၇၈၉၀')).toBe(1234567890);
  });
  it('should cast digit string to number (orya)', () => {
    const l = new LocaleHelper('en-u-nu-orya');
    expect(l.toInt('୧୨୩୪୫୬୭୮୯୦')).toBe(1234567890);
  });
  it('should cast digit string to number (tamldec)', () => {
    const l = new LocaleHelper('en-u-nu-tamldec');
    expect(l.toInt('௧௨௩௪௫௬௭௮௯௦')).toBe(1234567890);
  });
  it('should cast digit string to number (telu)', () => {
    const l = new LocaleHelper('en-u-nu-telu');
    expect(l.toInt('౧౨౩౪౫౬౭౮౯౦')).toBe(1234567890);
  });
  it('should cast digit string to number (thai)', () => {
    const l = new LocaleHelper('en-u-nu-thai');
    expect(l.toInt('๑๒๓๔๕๖๗๘๙๐')).toBe(1234567890);
  });
  it('should cast digit string to number (tibt)', () => {
    const l = new LocaleHelper('en-u-nu-tibt');
    expect(l.toInt('༡༢༣༤༥༦༧༨༩༠')).toBe(1234567890);
  });
});
