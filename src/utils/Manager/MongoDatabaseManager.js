const Model = require('../../model/index');
const mongoose = require("mongoose");
class MongoDatabaseManager {
  constructor(client) {
    this.client = client;
    this.models = Model;
  }

  /**
   * @param type {String} Le model
   * @param find {Object} la donnée en trouve. Default : {}
   * @example
   * getData("Guild", {})
   * getData("Guild")
   *  // Envoi toutes les donnée de la table Guild
   *
   * getData("Guild", {id: 123456789012345678})
   *  // Envoie seulement les donnée de la guild 123456789012345678
   * @returns {Promise<Object|boolean>} Envoi les donnée ou false si il n'existe pas
   */

  async getData(type, find = {}) {
    if (typeof find === 'object') find = {};
    if (!type || typeof type !== 'string') throw new Error("Le type n'est pas specifier ou n'est pas une chaine de character");
    const data = await this.models[type].findOne(find);
    if (data) return data;
    return false;
  }
  /**
   * @param type {String} Le model
   * @param find {Object} la donnée en trouve. Default : {}
   * @example
   * getAllData("Guild", {})
   * getAllData("Guild")
   *  // Envoi toutes les donnée de la table Guild
   *
   * getData("Guild", {id: 123456789012345678})
   *  // Envoie seulement les donnée de la guild 123456789012345678
   * @returns {Promise<Array|boolean>} Envoi les donnée ou false si il n'existe pas
   */
  async getAllData(type, find = {}) {
    if (typeof find === 'object') find = {};
    if (!type || typeof type !== 'string') throw new Error("Le type n'est pas specifier ou n'est pas une chaine de character");
    const data = await this.models[type].find(find);
    if (data) return data;
    return false;
  }

  /**
   * @param type {String} Le model
   * @param find {Object} la donnée en trouve. Default : {}
   * @param assign {Object} Met les nouvelle donnée. Default : {}
   * @example
   * updateData("Guild", {}, {autonick : autonick{active:true}})
   *  // Met a toutes les guild l'autonick d'activé
   *
   * updateData("Guild", {id: 123456789012345678},{autonick : autonick{active:true}})
   *  // Met a la guild 123456789012345678 l'autonick d'activé
   * @returns {Promise<Data|boolean>} Envoi les donnée ou false si il n'existe pas
   */
  async updateData(type, find = {}, assign = {}) {
    if (typeof find !== 'object') find = {};
    if (typeof assign !== 'object') assign = {};

    if (!type || typeof type !== 'string') throw new Error("Le type n'est pas specifier ou n'est pas une chaine de character");
    let data = await this.getData(type, find)
    if (!data) return false;
    if (Array.isArray(data)) {
      for (let dataGuild of data) {
        if (typeof dataGuild !== 'object') dataGuild = {};
        for (const key in assign) {
          if (dataGuild[key] !== assign[key]) dataGuild[key] = assign[key];
        }
        return dataGuild.updateOne(Object.assign(dataGuild, assign));
      }
    } else {
      if (typeof data !== 'object') data = {};
      for (const key in assign) {
        if (data[key] !== assign[key]) data[key] = assign[key];
      }
      return data.updateOne(Object.assign(data, assign));
    }

  }
  /**
   * @param type {String} Le model
   * @param id {String} L'id (guildID, userID)
   * @example
   * createData("Guild", "123456789012345678")
   *  // Crée un document ou récupère un document
   * @returns {Promise<Data>}
   */
  async createData(type, id) {
    if (!type || typeof type !== 'string') throw new Error("Le type n'est pas specifier ou n'est pas une chaine de character");

    const merged = Object.assign(
        { _id: mongoose.Types.ObjectId() },
        {
          id: id,
        }
    );
    const createGuild = await new this.models[type](merged);
    createGuild.save();
    console.info(
        `[Mongo] Nouveau serveur ${id}`,
    );
    return createGuild;
  }

  /**
   * @param type {String} Le model
   * @param id {String} L'id (guild, user)
   * @example
   * deleteData("Guild", "123456789012345678")
   *  // Supprime un document
   * @returns {Promise<Boolean>}
   */
  async deleteData(type, id) {
    if (!type || typeof type !== 'string') throw new Error("Le type n'est pas specifier ou n'est pas une chaine de character");
    await this.models[type].findOneAndDelete({ id }).exec();
    return true;
  }

  /**
   * @param type {String} Le model
   * @param id {String} L'id (guild, user)
   * @example
   * findOrCreate("Guild", "123456789012345678")
   *  // Crée un document ou récupère un document
   * @returns {Promise<Data>}
   */
  async findOrCreate(type, find) {
    if (!type || typeof type !== 'string') throw new Error("Le type n'est pas specifier ou n'est pas une chaine de character");
    const data = !find  ? await this.getData(type) : await this.models[type].findOne(find);
    if (data) return data;

    const createGuild = await new this.models[type](find ? find: {});
    createGuild.save();
    console.info(
        `[Mongo] Nouveau document ${type}`,
    );
    return createGuild;
  }
}
module.exports = MongoDatabaseManager;
