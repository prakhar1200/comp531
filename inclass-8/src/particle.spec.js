import { expect } from 'chai'
import particle from './particle'
import { update } from './particle'

describe('Particle Functionality', () => {

    it('should have default values', () => {
        const p = particle({})
        expect(p).to.be.ok
        expect(p.missingAttribute).to.not.be.ok
        expect(p.position).to.have.lengthOf(2)
        expect(p.position[0]).to.be.a('number')
        expect(p.position[1]).to.be.a('number')
        expect(p.velocity).to.have.lengthOf(2)
        expect(p.velocity[0]).to.have.a('number')
        expect(p.velocity[1]).to.be.a('number')
        expect(p.acceleration).to.have.lengthOf(2)
        expect(p.acceleration[0]).to.be.a('number')
        expect(p.acceleration[1]).to.be.a('number')
        expect(p.mass).to.be.a('number')
    })

    it('should update the position by the velocity', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 1.0)
        expect(position).to.eql([1.5, 0.5])
    })

    it('should update the position by the velocity and time delta', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 2.0) // dt is different here
        expect(position).to.eql([2.0, 0.0])
    })

    it('should update the velocity by the acceleration', () => {
    	 const p = particle({ velocity: [1, 1], acceleration: [1, 1] })
        const { velocity } = update(p, 2.0)
        expect(velocity).to.eql([3.0, 3.0])
    })

    it('particles should wrap around the world above 800', () => {
        const p = particle({ position: [810, 810], velocity: [0.5, -0.5] })
        const { position } = update(p, 1.0)
        expect(position).to.eql([0, 0])
    })
    it('particles should wrap around the world below 0', () => {
        const p = particle({ position: [-10, -10], velocity: [0.5, -0.5] })
        const { position } = update(p, 1.0)
        expect(position).to.eql([800, 800])
    })

})
