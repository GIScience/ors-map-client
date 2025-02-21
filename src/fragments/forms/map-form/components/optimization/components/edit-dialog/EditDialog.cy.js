import I18nBuilder from '@/i18n/i18n-builder'
import EditDialog from './EditDialog.vue'
import store from '@/store/store'
import Job from '@/models/job'
import Skill from '@/models/skill'
import Vehicle from '@/models/vehicle'

const i18n = I18nBuilder.build()

describe('<EditDialog />', () => {
  const skills= [Skill.fromObject({id: 1, name: 'heating'})]
  const jobs = [
    Job.fromObject({
      id: 1,
      location: [8.690314292907717,49.4144633204352],
      service: 2400,
      delivery: [2],
      pickup: [3]
    })]
  const vehicles = [
    Vehicle.fromObject({
      id: 1,
      start: [8.682546615600588,49.41242512006711],
      end: [8.682546615600588,49.41242512006711],
      profile: 'driving-car',
      capacity:[5]
    }),
    Vehicle.fromObject({
      id: 2,
      start: [8.667955398559572,49.41915365183029],
      end: [8.68597984313965,49.41281601436811],
      profile: 'driving-car',
      capacity: [10]
    })
  ]
  it('renders', () => {
    cy.mount(EditDialog, {
      propsData: {
        data: [], skills: [], editProp: 'jobs'
      }, i18n: i18n, store: store
    })
  })
  it('renders with jobs', () => {
    cy.mount(EditDialog, {
      propsData: {
        data: jobs, skills: skills, editProp: 'jobs'
      }, i18n: i18n, store: store
    })
    cy.get('[data-cy="dataCards"]').should('have.length', 1)
  })
  it('renders with vehicles', () => {
    cy.mount(EditDialog, {
      propsData: {
        data: vehicles, skills: skills, editProp: 'vehicles'
      }, i18n: i18n, store: store
    })
    cy.get('[data-cy="dataCards"]').should('have.length', 2)
  })
})
