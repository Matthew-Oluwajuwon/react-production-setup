import { captureException } from '@sentry/react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import App from '../App'

// Mock @sentry/react
vi.mock('@sentry/react', () => ({
    captureException: vi.fn()
}))

describe('App', () => {
    it('renders Layout component with content', () => {
        render(<App />)
        expect(screen.getByText('Hello world!!!')).toBeInTheDocument()
    })

    it('calls Sentry.captureException on button click', () => {
        render(<App />)

        const button = screen.getByRole('button', { name: /hello/i })
        fireEvent.click(button)

        expect(captureException).toHaveBeenCalledTimes(1)
        expect(captureException.mock.calls[0][0].message).toBe('Sentry test error from UI button')
    })
})
