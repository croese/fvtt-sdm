import SDMActorBase from "./base-actor.mjs";

export default class SDMCharacter extends SDMActorBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.attributes = new fields.SchemaField({
      level: new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 1, max: 9 })
      }),
      xp: new fields.NumberField({ ...requiredInteger, initial: 300, min: 0, max: 99999 }),
      save: new fields.NumberField({ ...requiredInteger, initial: 13, min: 0 })
    });

    // Iterate over ability names and create a new SchemaField for each.
    schema.abilities = new fields.SchemaField(Object.keys(CONFIG.SDM.abilities).reduce((obj, ability) => {
      obj[ability] = new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 5 }),
      });
      return obj;
    }, {}));

    return schema;
  }

  prepareDerivedData() {
    console.log('prepareDerivedData', this);

    // Loop through ability scores, and add their modifiers to our sheet output.
    for (const key in this.abilities) {
      // Calculate the modifier using d20 rules.
      // this.abilities[key].mod = Math.floor((this.abilities[key].value - 10) / 2);
      // Handle ability label localization.
      this.abilities[key].label = game.i18n.localize(CONFIG.SDM.abilities[key]) ?? key;
    }

    this.attacks = {};
    for(let [k,v] of Object.entries(CONFIG.SDM.attackTypes)) {
      this.attacks[k] = {
        label: game.i18n.localize(v.labelKey) ?? k,
        value: this.abilities[v.ability].value
      };
    }
  }

  getRollData() {
    const data = {};

    // Copy the ability scores to the top level, so that rolls can use
    // formulas like `@str + 4`.
    if (this.abilities) {
      for (let [k,v] of Object.entries(this.abilities)) {
        data[k] = v.value;
      }
    }

    if(this.attacks) {
      for (let [k,v] of Object.entries(this.attacks)) {
        data[k] = v.value;
      }
    }

    data.lvl = this.attributes.level.value;

    console.log('getRollData', this, data);

    return data;
  }
}