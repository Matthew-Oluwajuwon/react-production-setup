import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Layout } from '../index'

describe('Barrel file export (shared/index.ts)', () => {
    it('exports Layout and renders it properly', () => {
        render(
            <Layout>
                <span>From shared index</span>
            </Layout>
        )
        expect(screen.getByText('From shared index')).toBeInTheDocument()
    })
})
