import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import App from '../App'

// Mock the Layout component from @/shared
vi.mock('@/shared', () => ({
    Layout: ({ children }: { children: React.ReactNode }) => <div data-testid="layout">{children}</div>
}))

describe('App', () => {
    it('renders Layout component', () => {
        render(<App />)
        const layout = screen.getByTestId('layout')
        expect(layout).toBeInTheDocument()
    })

    it('renders "Hello world!!" inside Layout', () => {
        render(<App />)
        expect(screen.getByText('Hello world!')).toBeInTheDocument()
    })
})
