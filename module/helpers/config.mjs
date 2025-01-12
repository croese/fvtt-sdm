export const SDM = {};

/**
 * The set of Ability Scores used within the system.
 * @type {Object}
 */
SDM.abilities = {
  str: 'SDM.Ability.Str.long',
  end: 'SDM.Ability.End.long',
  agi: 'SDM.Ability.Agi.long',
  cha: 'SDM.Ability.Cha.long',
  aur: 'SDM.Ability.Aur.long',
  tho: 'SDM.Ability.Tho.long',
};

SDM.abilityAbbreviations = {
  str: 'SDM.Ability.Str.abbr',
  end: 'SDM.Ability.End.abbr',
  agi: 'SDM.Ability.Agi.abbr',
  cha: 'SDM.Ability.Cha.abbr',
  aur: 'SDM.Ability.Aur.abbr',
  tho: 'SDM.Ability.Tho.abbr',
};

SDM.skillRankModifiers = {
  Skilled: 3,
  Expert: 6,
  Master: 9
};

SDM.attackTypes = {
  mel: { ability: 'str', labelKey: 'SDM.Attack.Melee' },
  ran: { ability: 'agi', labelKey: 'SDM.Attack.Ranged' },
  fan: { ability: 'cha', labelKey: 'SDM.Attack.Fantascience' },
  old: { ability: 'tho', labelKey: 'SDM.Attack.Oldtech' }
}
