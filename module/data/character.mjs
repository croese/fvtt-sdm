import SdmActorBase from "./actor-base.mjs";

export default class SdmCharacter extends SdmActorBase {
  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.attributes = new fields.SchemaField({
      level: new fields.SchemaField({
        value: new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: 0,
        }),
      }),
      experience: new fields.SchemaField({
        value: new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: 0,
        }),
      }),
      herodice: new fields.SchemaField({
        value: new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: 0,
        }),
      }),
      save: new fields.SchemaField({
        value: new fields.NumberField({
          ...requiredInteger,
          initial: 13,
          min: 0,
        }),
      }),
    });

    // Iterate over ability names and create a new SchemaField for each.
    schema.abilities = new fields.SchemaField(
      Object.keys(CONFIG.SDM.CHARACTER.ABILITIES_LONG).reduce(
        (obj, ability) => {
          obj[ability] = new fields.SchemaField({
            value: new fields.NumberField({
              ...requiredInteger,
              initial: 0,
              min: 0,
            }),
            max: new fields.NumberField({
              ...requiredInteger,
              initial: 0,
              min: 0,
            }),
            label: new fields.StringField({ required: true, blank: true }),
          });
          return obj;
        },
        {}
      )
    );

    schema.attacks = new fields.SchemaField(
      Object.keys(CONFIG.SDM.CHARACTER.ATTACKS).reduce((obj, attack) => {
        obj[attack] = new fields.SchemaField({
          value: new fields.NumberField({
            ...requiredInteger,
            initial: 0,
            min: 0,
          }),
          label: new fields.StringField({ required: true, blank: true }),
        });
        return obj;
      }, {})
    );

    return schema;
  }

  prepareDerivedData() {
    // Loop through ability scores, and add their modifiers to our sheet output.
    for (const key in this.abilities) {
      // Calculate the modifier using d20 rules.
      // this.abilities[key].mod = Math.floor((this.abilities[key].value - 10) / 2);
      // Handle ability label localization.
      this.abilities[key].label =
        game.i18n.localize(CONFIG.SDM.CHARACTER.ABILITIES_LONG[key].label) ??
        key;
    }

    for (const key in this.attacks) {
      const attack = CONFIG.SDM.CHARACTER.ATTACKS[key];
      const ability = this.abilities[attack.baseAbility];
      this.attacks[key].value = ability.value;
      this.attacks[key].label =
        game.i18n.localize(attack.label) ?? attack.label;
    }
  }

  getRollData() {
    const data = {};

    // Copy the ability scores to the top level, so that rolls can use
    // formulas like `@str.value + 4`.
    if (this.abilities) {
      for (let [k, v] of Object.entries(this.abilities)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    // Copy the attack modifiers to the top level, so that rolls can use
    // formulas like `@mel.value + 4`.
    if (this.attacks) {
      for (let [k, v] of Object.entries(this.attacks)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    data.lvl = this.attributes.level.value;
    data.xp = this.attributes.experience.value;

    return data;
  }
}
