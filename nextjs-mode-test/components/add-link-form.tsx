'use client'

import { createLinkAction } from "@/app/actions"
import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from '@mantine/form';

export default function AddLinkForm() {

    const form = useForm({ initialValues: { label: '', link: '' } });

    const handleSubmit = async (values: typeof form.values) => {
        await createLinkAction(values);
        form.reset();
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

                <TextInput
                    withAsterisk
                    label="Link"
                    key={form.key('link')}
                    {...form.getInputProps('link')}
                />

                <Group justify="flex-end" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </div>
    )
}
