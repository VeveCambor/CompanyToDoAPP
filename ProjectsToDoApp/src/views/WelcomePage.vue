<template>
  <t-page
    title="Welcome :-)"
    :loading="loading"
  >
    <template v-slot:content>
      <div>
        <ul>
          <li>statistics</li>
          <li>
            <span>projects</span>
            <strong>{{ numberOfProjects }}</strong>
          </li>
          <li>
            <span>total tasks</span>
            <strong>{{ numberOfTasks }}</strong>
          </li>
          <li>
            <span>completed</span>
            <strong>{{ numberOfCompleted }}</strong>
          </li>
          <li>
            <span>uncompleted</span>
            <strong>{{ numberOfUncompleted }}</strong>
          </li>
          <li>
            <span>uncompleted over due</span>
            <strong>{{ numberOfOverDue }}</strong>
          </li>
          <li>
            <span>persons</span>
            <strong>{{ numberOfPersons }}</strong>
          </li>
        </ul>
      </div>
    </template>
  </t-page>

</template>

<script>
// import db from '../helpers/db.js'
import { getProjects, getTasks, getPersons } from '../data/data.js'
import { isPast } from '../helpers/dateFunctions.js'
import TPage from '@/components/TPage.vue'

export default {
  name: 'WelcomePage',
  data () {
    return {
      projects: [],
      tasks: [],
      persons: [],
      loading: true
    }
  },
  computed: {
    numberOfProjects () {
      return this.projects.length
    },
    numberOfTasks () {
      return this.tasks.length
    },
    numberOfCompleted () {
      return this.tasks.filter(task => task.completed).length
    },
    numberOfUncompleted () {
      return this.numberOfTasks - this.numberOfCompleted
    },
    numberOfOverDue () {
      return this.tasks.reduce((acc, cur) => {
        return acc + !cur.completed && isPast(cur.date) ? 1 : 0
      })
    },
    numberOfPersons () {
      return this.persons.length
    }
  },
  created () {
    Promise.all([
      getProjects().then(projects => {
        this.projects = projects;
      }),
      getTasks().then(tasks => {
        this.tasks = tasks;
      }),
      getPersons().then(persons => {
        this.persons = persons;
      })
    ]).then(() => {
      this.loading = false;
    });
  },
  components: {TPage }
}

</script>

<style lang="stylus" scoped>
@import '../styles/variables.styl'
ul
  list-style-type: none
  margin: auto
  margin-top: 6rem
  padding: 0
  width: 80%
  max-width: 550px
  //border: 1px solid #cdcdcd
  border-radius: $border-radius
  overflow: hidden
  box-shadow: $box-shadow
  & li
    padding: 1em 1.2em
    &:not(:last-child)
      border-bottom: 2px solid #efefef
    &:first-child
      font-weight: bold
      background: lighten($secondary, 60%)
    &:not(:first-child)
      display: flex
      justify-content: space-between    
</style>