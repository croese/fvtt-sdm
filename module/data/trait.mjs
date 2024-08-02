import SdmItemBase from "./item-base.mjs";

export default class SdmTrait extends SdmItemBase {
  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = super.defineSchema();

    schema.rank = new fields.StringField({
      required: true,
      blank: false,
      choices: CONFIG.SDM.TRAIT.TRAIT_RANK,
      initial: CONFIG.SDM.TRAIT.TRAIT_RANK.skilled.id,
    });

    return schema;
  }
}
