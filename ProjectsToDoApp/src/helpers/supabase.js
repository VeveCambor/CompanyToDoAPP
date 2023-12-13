import { createClient } from '@supabase/supabase-js'
import store from '../store/index.js'

const supabaseUrl = 'https://etwxitwtceqodpcathcn.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
// eslint-disable-next-line no-unused-vars
const supabase = createClient(supabaseUrl, supabaseKey)

export default {
  async get (table) {
    try {
      let { data, error } = await supabase
        .from(table)
        .select('*')

      if (error) throw error
      return data
    } catch (error) {
      store.commit('setErrorMessage', 'Chyba při načítání dat.')
      store.commit('setError', true)
      // Handle error
    }
  },

  async post (table, body) {
    try {
      let { data, error } = await supabase
        .from(table)
        .insert([body])

      if (error) throw error
      return data
    } catch (error) {
      store.commit('setErrorMessage', 'Chyba při ukládání dat do databáze.')
      store.commit('setError', true)
      // Handle error
    }
  },

  async put (table, body, matchCriteria) {
    try {
      let { data, error } = await supabase
        .from(table)
        .update(body)
        .match(matchCriteria)

      if (error) throw error
      return data
    } catch (error) {
      store.commit('setErrorMessage', 'Chyba při editaci dat.')
      store.commit('setError', true)
      // Handle error
    }
  },

  async delete (table, matchCriteria) {
    try {
      let { data, error } = await supabase
        .from(table)
        .delete()
        .match(matchCriteria)

      if (error) throw error
      return data
    } catch (error) {
      store.commit('setErrorMessage', 'Chyba při mazání záznamu.')
      store.commit('setError', true)
      // Handle error
    }
  }
}