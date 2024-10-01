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
      Required: true
    },
    skillsInUse: {
      Type: Array,
      Required: true
    }
  },
  components: {
    OptimizationImport,
    EventBus,
    Download
  },
  computed: {
    editSkillsJson () {
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

    clearData () {
      let wholeSkillsInUse = []
      let notInUse = []
      for (const skill of this.editSkills) {
        if (this.skillsInUse.includes(skill.id)) {
          wholeSkillsInUse.push(skill.clone())
        } else {
          notInUse.push(skill.id)
        }
      }
      if (notInUse.length === 0) {
        this.showWarning(this.$t('editSkills.allSkills') + this.$t('editSkills.inUseShort'))
      } else {
        this.showInfo(this.$t('editSkills.onlyDelete') + this.$t('editSkills.inUseShort'))
        this.editId = 0
        this.editSkills = wholeSkillsInUse
      }
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
      localStorage.setItem('skills', JSON.stringify(this.editSkillsJson))
      this.closeSkillsModal()
    },
    // add a new skill
    addSkill () {
      const newSkill = new Skill('', this.editSkills.length + 1)
      this.editSkills.push(newSkill)
    },
    // delete a skill
    removeSkill (id) {
      if (this.skillsInUse.includes(this.editSkills[id-1].id)) {
        this.showWarning(this.$t('editSkills.inUse'))
      } else {
        this.editSkills.splice(id-1,1)
        for (const i in this.editSkills) {
          this.editSkills[i].setId(parseInt(i)+1)
        }
      }
    },
  }
}
