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
import { db } from '../helpers/db.js'
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
    this.loading = true;
    const fetchProjects = db.from('projects').select('*');
    const fetchTasks = db.from('tasks').select('*');
    const fetchPersons = db.from('persons').select('*');

    Promise.all([fetchProjects, fetchTasks, fetchPersons])
      .then((responses) => {
        this.projects = responses[0].data;
        this.tasks = responses[1].data;
        this.persons = responses[2].data;
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle the error appropriately
      })
      .finally(() => {
        this.loading = false;
      });

    // const promises = [
    //   db.get('projects').then((projects) => {
    //     this.projects = projects
    //   }),
    //   db.get('tasks').then((tasks) => {
    //     this.tasks = tasks
    //   }),
    //   db.get('persons').then((persons) => {
    //     this.persons = persons
    //   })
    // ]
    // Promise.all(promises).then(() => {
    //   this.loading = false
    // })
  },
  components: { TPage }
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