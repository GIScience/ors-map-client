import OptimizationImport from '@/fragments/forms/map-form/components/optimization/components/optimization-import/OptimizationImport.vue'
import {EventBus} from '@/common/event-bus'
import Skill from '@/models/skill'
import Download from '@/fragments/forms/map-form/components/download/Download'

export default {
  data: () => ({
    isSkillsOpen: true,
    editId: 0,
    editSkills: [],
    selectedSkills: [],
    pastedSkills: [],
    JsonPlaceholder: '[{"name":"example skill","id":1}]',
    isImportOpen: false
  }),
  props: {
    skills: {
      Type: Array[Skill],
      Required: false
    },
  },
  components: {
    OptimizationImport,
    EventBus,
    Download
  },
  computed: {
    editSkillsJSON () {
      const jsonSkills = []
      for (const skill of this.editSkills) {
        jsonSkills.push(skill.toJSON())
      }
      return jsonSkills
    }
  },
  created() {
    for (const skill of this.skills) {
      this.editSkills.push(skill.clone())
    }

    const context = this
    // edit Skills box is open
    EventBus.$on('showSkillsModal', (editId) => {
      context.isSkillsOpen = true
      context.editId = editId
    })
  },
  methods: {
    // close editSkills dialog
    closeSkillsModal() {
      this.isSkillsOpen = false
      this.$emit('close')
    },

    // save skills from JSON
    saveSkillImport(data) {
      this.editSkills = data.skills
      this.saveSkills()
      this.isImportOpen = false
    },

    // save changed skills and emit event to update in component
    saveSkills () {
      this.$emit('skillsChanged', this.editSkills)
      localStorage.setItem('skills', JSON.stringify(this.editSkillsJSON))
      this.closeSkillsModal()
    },
    // add a new skill
    addSkill () {
      const newSkill = new Skill('', this.editSkills.length + 1)
      this.editSkills.push(newSkill)
    },
    // delete a skill
    removeSkill (id) {
      // TODO: check if skills is used in any job/vehicle, only allow removal if not
      this.editSkills.splice(id-1,1)
      for (const i in this.editSkills) {
        this.editSkills[i].setId(parseInt(i)+1)
      }
    },
  }
}
