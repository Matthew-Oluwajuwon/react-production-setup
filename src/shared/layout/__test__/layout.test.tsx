import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Layout } from '../layout'

describe('Layout', () => {
    it('renders children correctly', () => {
        render(
            <Layout>
                <span>Test Child</span>
            </Layout>
        )
        expect(screen.getByText('Test Child')).toBeInTheDocument()
    })

    it('applies the correct class names', () => {
        render(
            <Layout>
                <span>Child</span>
            </Layout>
        )
        const div = screen.getByText('Child').parentElement
        expect(div).toHaveClass('h-svh')
        expect(div).toHaveClass('flex')
        expect(div).toHaveClass('items-center')
        expect(div).toHaveClass('justify-center')
    })

    it('renders multiple children', () => {
        render(
            <Layout>
                <span>Child 1</span>
                <span>Child 2</span>
            </Layout>
        )
        expect(screen.getByText('Child 1')).toBeInTheDocument()
        expect(screen.getByText('Child 2')).toBeInTheDocument()
    })

    it('renders fragment children', () => {
        render(
            <Layout>
                <>
                    <span>Fragment Child 1</span>
                    <span>Fragment Child 2</span>
                </>
            </Layout>
        )
        expect(screen.getByText('Fragment Child 1')).toBeInTheDocument()
        expect(screen.getByText('Fragment Child 2')).toBeInTheDocument()
    })
})
