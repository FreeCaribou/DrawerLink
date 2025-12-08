'use client'

import { loginAction } from "@/app/actions"
import { Button, Group, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from '@mantine/form';

export default function LoginForm() {

    const form = useForm({ initialValues: { username: '', password: '' } });

    const handleSubmit = async (values: typeof form.values) => {
        try {
            await loginAction(values);
        } catch (error) {
            console.warn('an error occur whith the login', error);
        }
    }

    return (
        <div>
            <h1 className="text-secondary text-lg">Login</h1>

            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    withAsterisk
                    label="Username"
                    key={form.key('username')}
                    {...form.getInputProps('username')}
                />

                <PasswordInput
                    withAsterisk
                    label="Password"
                    key={form.key('password')}
                    {...form.getInputProps('password')}
                />

                <Group justify="flex-end" mt="md">
                    <Button type="submit">Login</Button>
                </Group>
            </form>
        </div>
    )
}
