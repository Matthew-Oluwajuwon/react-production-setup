import type { FC, PropsWithChildren } from 'react'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
    return <div className="h-svh flex items-center justify-center">{children}</div>
}
