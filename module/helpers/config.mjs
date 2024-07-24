export const SDM = {};

/**
 * The set of Ability Scores used within the system.
 * @type {Object}
 */
SDM.abilities = {
  str: 'SDM.Ability.Str.long',
  end: 'SDM.Ability.End.long',
  agi: 'SDM.Ability.Agi.long',
  tho: 'SDM.Ability.Tho.long',
  aur: 'SDM.Ability.Aur.long',
  cha: 'SDM.Ability.Cha.long',
};

SDM.abilityAbbreviations = {
  str: 'SDM.Ability.Str.abbr',
  end: 'SDM.Ability.End.abbr',
  agi: 'SDM.Ability.Agi.abbr',
  tho: 'SDM.Ability.Tho.abbr',
  aur: 'SDM.Ability.Aur.abbr',
  cha: 'SDM.Ability.Cha.abbr',
};

SDM.attacks = {
  mel: { labelKey: 'SDM.Attack.Mel.long', baseAbilityKey: 'str' },
  ran: { labelKey: 'SDM.Attack.Ran.long', baseAbilityKey: 'agi' },
  old: { labelKey: 'SDM.Attack.Old.long', baseAbilityKey: 'tho' },
  psy: { labelKey: 'SDM.Attack.Psy.long', baseAbilityKey: 'cha' }
};
