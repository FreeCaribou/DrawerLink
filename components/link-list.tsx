'use client'

import { List } from "@mantine/core"

export default function LinkList({ savedLinks }: { savedLinks: any[] }) {
    return (
        <List>
            {savedLinks.map((sl) => (<List.Item key={sl.id}>{sl.label}</List.Item>))}
        </List>
    )
}
