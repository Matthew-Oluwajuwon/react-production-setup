// __tests__/layout.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Layout } from '../layout'

describe('Layout component', () => {
    it('renders children correctly', () => {
        render(
            <Layout>
                <span>Test Content</span>
            </Layout>
        )
        expect(screen.getByText('Test Content')).toBeInTheDocument()
    })
})
