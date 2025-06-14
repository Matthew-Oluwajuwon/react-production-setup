import { describe, expect, it } from 'vitest'
import { Layout as FromIndex } from '../index'
import { Layout as FromLayout } from '../layout'

describe('index.ts barrel export', () => {
    it('should re-export Layout correctly', () => {
        expect(FromIndex).toBe(FromLayout)
    })
})
