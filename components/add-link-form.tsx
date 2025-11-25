'use client'

import { createLink } from "@/app/actions"
import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from '@mantine/form';

export default function AddLinkForm() {

    const form = useForm({ initialValues: { label: '' } });

    const handleSubmit = async (values: typeof form.values) => {
        await createLink(values);
    }

    return (
        <div>
            <h3 className="text-secondary text-lg">Add a link</h3>

            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    withAsterisk
                    label="Label"
                    key={form.key('label')}
                    {...form.getInputProps('label')}
                />

                <Group justify="flex-end" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </div>
    )
}
